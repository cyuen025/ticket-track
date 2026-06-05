import { useState } from 'react';
import type { TicketType, TicketPriority, Ticket } from '../../types';
import { useAppDispatch } from '../../store';
import { addTicket } from '../../store/ticketsSlice';
import {
  validateTicketForm,
  type FormFields,
  type FormErrors,
} from '../../utils/validateTicketForm';
import styles from './TicketForm.module.css';

const TYPES: TicketType[] = [
  'Bug',
  'Feature Request',
  'Account',
  'Billing',
  'Other',
];
const PRIORITIES: TicketPriority[] = ['Low', 'Medium', 'High', 'Critical'];

const EMPTY_FORM: FormFields = {
  title: '',
  type: '',
  priority: '',
  assignee: '',
  description: '',
};

export default function TicketForm() {
  const dispatch = useAppDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [fields, setFields] = useState<FormFields>(EMPTY_FORM);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) {
    const { name, value } = e.target;
    setFields((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  }

  function handleSubmit(e: React.SubmitEvent) {
    e.preventDefault();
    const validationErrors = validateTicketForm(fields);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const now = new Date().toISOString();
    const newTicket: Ticket = {
      id: crypto.randomUUID(),
      title: fields.title.trim(),
      type: fields.type as TicketType,
      priority: fields.priority as TicketPriority,
      assignee: fields.assignee.trim(),
      description: fields.description.trim(),
      status: 'Open',
      submittedAt: now,
      updatedAt: now,
    };

    dispatch(addTicket(newTicket));
    setFields(EMPTY_FORM);
    setErrors({});
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setIsOpen(false);
    }, 2000);
  }

  function handleCancel() {
    setFields(EMPTY_FORM);
    setErrors({});
    setIsOpen(false);
  }

  return (
    <div className={styles.wrapper}>
      {!isOpen ? (
        <button className={styles.openBtn} onClick={() => setIsOpen(true)}>
          <svg
            width='16'
            height='16'
            viewBox='0 0 16 16'
            fill='none'
            aria-hidden='true'
          >
            <path
              d='M8 3v10M3 8h10'
              stroke='currentColor'
              strokeWidth='2'
              strokeLinecap='round'
            />
          </svg>
          New Ticket
        </button>
      ) : (
        <div className={styles.formCard}>
          <div className={styles.formHeader}>
            <h2 className={styles.formTitle}>New Ticket</h2>
            <p className={styles.formSubtitle}>
              Fill in the details below to submit a new support ticket.
            </p>
          </div>

          {submitted ? (
            <div className={styles.successMessage} role='status'>
              <svg
                width='18'
                height='18'
                viewBox='0 0 18 18'
                fill='none'
                aria-hidden='true'
              >
                <path
                  d='M3 9l4 4 8-8'
                  stroke='currentColor'
                  strokeWidth='2'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
              </svg>
              Ticket submitted successfully!
            </div>
          ) : (
            <form className={styles.form} onSubmit={handleSubmit} noValidate>
              <div className={styles.formGrid}>
                <div className={`${styles.field} ${styles.fieldFull}`}>
                  <label className={styles.label} htmlFor='title'>
                    Title <span className={styles.required}>*</span>
                  </label>
                  <input
                    id='title'
                    name='title'
                    type='text'
                    className={`${styles.input} ${errors.title ? styles.inputError : ''}`}
                    placeholder='e.g. Login page throws 500 error on Chrome'
                    value={fields.title}
                    onChange={handleChange}
                    aria-describedby={errors.title ? 'title-error' : undefined}
                  />
                  {errors.title && (
                    <span
                      id='title-error'
                      className={styles.errorMsg}
                      role='alert'
                    >
                      {errors.title}
                    </span>
                  )}
                </div>

                <div className={styles.field}>
                  <label className={styles.label} htmlFor='type'>
                    Type <span className={styles.required}>*</span>
                  </label>
                  <select
                    id='type'
                    name='type'
                    className={`${styles.select} ${errors.type ? styles.inputError : ''}`}
                    value={fields.type}
                    onChange={handleChange}
                    aria-describedby={errors.type ? 'type-error' : undefined}
                  >
                    <option value='' disabled>
                      Select a type
                    </option>
                    {TYPES.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                  {errors.type && (
                    <span
                      id='type-error'
                      className={styles.errorMsg}
                      role='alert'
                    >
                      {errors.type}
                    </span>
                  )}
                </div>

                <div className={styles.field}>
                  <label className={styles.label} htmlFor='priority'>
                    Priority <span className={styles.required}>*</span>
                  </label>
                  <select
                    id='priority'
                    name='priority'
                    className={`${styles.select} ${errors.priority ? styles.inputError : ''}`}
                    value={fields.priority}
                    onChange={handleChange}
                    aria-describedby={
                      errors.priority ? 'priority-error' : undefined
                    }
                  >
                    <option value='' disabled>
                      Select a priority
                    </option>
                    {PRIORITIES.map((p) => (
                      <option key={p} value={p}>
                        {p}
                      </option>
                    ))}
                  </select>
                  {errors.priority && (
                    <span
                      id='priority-error'
                      className={styles.errorMsg}
                      role='alert'
                    >
                      {errors.priority}
                    </span>
                  )}
                </div>

                <div className={`${styles.field} ${styles.fieldFull}`}>
                  <label className={styles.label} htmlFor='assignee'>
                    Assignee <span className={styles.required}>*</span>
                  </label>
                  <input
                    id='assignee'
                    name='assignee'
                    type='text'
                    className={`${styles.input} ${errors.assignee ? styles.inputError : ''}`}
                    placeholder='e.g. Jamie Lee'
                    value={fields.assignee}
                    onChange={handleChange}
                    aria-describedby={
                      errors.assignee ? 'assignee-error' : undefined
                    }
                  />
                  {errors.assignee && (
                    <span
                      id='assignee-error'
                      className={styles.errorMsg}
                      role='alert'
                    >
                      {errors.assignee}
                    </span>
                  )}
                </div>

                <div className={`${styles.field} ${styles.fieldFull}`}>
                  <label className={styles.label} htmlFor='description'>
                    Description <span className={styles.required}>*</span>
                  </label>
                  <textarea
                    id='description'
                    name='description'
                    className={`${styles.textarea} ${errors.description ? styles.inputError : ''}`}
                    placeholder='Describe the issue in detail…'
                    rows={4}
                    value={fields.description}
                    onChange={handleChange}
                    aria-describedby={
                      errors.description ? 'description-error' : undefined
                    }
                  />
                  {errors.description && (
                    <span
                      id='description-error'
                      className={styles.errorMsg}
                      role='alert'
                    >
                      {errors.description}
                    </span>
                  )}
                </div>
              </div>

              <div className={styles.formActions}>
                <button
                  type='button'
                  className={styles.cancelBtn}
                  onClick={handleCancel}
                >
                  Cancel
                </button>
                <button type='submit' className={styles.submitBtn}>
                  Submit Ticket
                </button>
              </div>
            </form>
          )}
        </div>
      )}
    </div>
  );
}
