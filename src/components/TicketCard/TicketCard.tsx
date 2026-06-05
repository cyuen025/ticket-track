import type { Ticket, TicketStatus, TicketPriority } from '../../types';
import { useAppDispatch } from '../../store';
import { updateTicketStatus } from '../../store/ticketsSlice';
import StatusBadge from '../StatusBadge/StatusBadge';
import PriorityBadge from '../PriorityBadge/PriorityBadge';
import styles from './TicketCard.module.css';

interface TicketCardProps {
  ticket: Ticket;
}

const PRIORITY_BORDER_MAP: Record<TicketPriority, string> = {
  Low: styles.borderLow,
  Medium: styles.borderMedium,
  High: styles.borderHigh,
  Critical: styles.borderCritical,
};

const STATUS_OPTIONS: TicketStatus[] = [
  'Open',
  'In Progress',
  'Resolved',
  'Closed',
];

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-CA', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

export default function TicketCard({ ticket }: TicketCardProps) {
  const dispatch = useAppDispatch();

  function handleStatusChange(e: React.ChangeEvent<HTMLSelectElement>) {
    dispatch(
      updateTicketStatus({
        id: ticket.id,
        status: e.target.value as TicketStatus,
      }),
    );
  }

  return (
    <article
      className={`${styles.card} ${PRIORITY_BORDER_MAP[ticket.priority]}`}
    >
      <div className={styles.cardHeader}>
        <div className={styles.badges}>
          <StatusBadge status={ticket.status} />
          <PriorityBadge priority={ticket.priority} />
          <span className={styles.type}>{ticket.type}</span>
        </div>
        <select
          className={styles.statusSelect}
          value={ticket.status}
          onChange={handleStatusChange}
          aria-label={`Update status for ${ticket.title}`}
        >
          {STATUS_OPTIONS.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>

      <h3 className={styles.title}>{ticket.title}</h3>
      <p className={styles.description}>{ticket.description}</p>

      <div className={styles.meta}>
        <span className={styles.metaItem}>
          <span className={styles.metaLabel}>Assignee</span>
          {ticket.assignee}
        </span>
        <span className={styles.metaItem}>
          <span className={styles.metaLabel}>Submitted</span>
          {formatDate(ticket.submittedAt)}
        </span>
        {ticket.updatedAt !== ticket.submittedAt && (
          <span className={styles.metaItem}>
            <span className={styles.metaLabel}>Updated</span>
            {formatDate(ticket.updatedAt)}
          </span>
        )}
      </div>
    </article>
  );
}
