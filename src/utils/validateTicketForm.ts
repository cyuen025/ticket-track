import type { TicketType, TicketPriority } from '../types';

export interface FormFields {
  title: string;
  type: TicketType | '';
  priority: TicketPriority | '';
  assignee: string;
  description: string;
}

export interface FormErrors {
  title?: string;
  type?: string;
  priority?: string;
  assignee?: string;
  description?: string;
}

export function validateTicketForm(fields: FormFields): FormErrors {
  const errors: FormErrors = {};

  if (!fields.title.trim()) {
    errors.title = 'A title is required.';
  } else if (fields.title.trim().length < 5) {
    errors.title = 'Title must be at least 5 characters.';
  }

  if (!fields.type) {
    errors.type = 'Please select a type.';
  }

  if (!fields.priority) {
    errors.priority = 'Please select a priority.';
  }

  if (!fields.assignee.trim()) {
    errors.assignee = 'An assignee is required.';
  }

  if (!fields.description.trim()) {
    errors.description = 'A description is required.';
  } else if (fields.description.trim().length < 20) {
    errors.description = 'Description must be at least 20 characters.';
  }

  return errors;
}
