export type TicketStatus = 'Open' | 'In Progress' | 'Resolved' | 'Closed';

export type TicketType =
  | 'Bug'
  | 'Feature Request'
  | 'Account'
  | 'Billing'
  | 'Other';

export type TicketPriority = 'Low' | 'Medium' | 'High' | 'Critical';

export interface Ticket {
  id: string;
  title: string;
  description: string;
  type: TicketType;
  status: TicketStatus;
  priority: TicketPriority;
  assignee: string;
  submittedAt: string;
  updatedAt: string;
}

export interface TicketFilters {
  status: TicketStatus | 'All';
  type: TicketType | 'All';
  priority: TicketPriority | 'All';
  query: string;
}

export type SortField =
  | 'submittedAt'
  | 'updatedAt'
  | 'priority'
  | 'status'
  | 'type';
export type SortDirection = 'asc' | 'desc';

export interface SortConfig {
  field: SortField;
  direction: SortDirection;
}
