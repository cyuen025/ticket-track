import type { Ticket } from '../types';

export const mockTickets: Ticket[] = [
  {
    id: '1',
    title: 'Login page throws 500 error on Safari',
    description:
      'Users on Safari 17 are unable to log in. The page returns a 500 error immediately after submitting credentials.',
    type: 'Bug',
    status: 'Open',
    priority: 'Critical',
    assignee: 'Jamie Lee',
    submittedAt: '2026-02-08T09:00:00Z',
    updatedAt: '2026-02-08T09:00:00Z',
  },
  {
    id: '2',
    title: 'Add dark mode support',
    description:
      'Several users have requested a dark mode option in the dashboard settings.',
    type: 'Feature Request',
    status: 'In Progress',
    priority: 'Medium',
    assignee: 'Alex Kim',
    submittedAt: '2026-02-01T14:30:00Z',
    updatedAt: '2026-02-05T10:00:00Z',
  },
  {
    id: '3',
    title: 'Unable to update billing address',
    description:
      'The billing address form does not save changes. The save button appears to do nothing.',
    type: 'Billing',
    status: 'Open',
    priority: 'High',
    assignee: 'Morgan Davis',
    submittedAt: '2026-02-07T11:15:00Z',
    updatedAt: '2026-02-07T11:15:00Z',
  },
  {
    id: '4',
    title: 'Export to CSV not working',
    description:
      'Clicking the Export to CSV button downloads an empty file instead of the expected data.',
    type: 'Bug',
    status: 'In Progress',
    priority: 'High',
    assignee: 'Jamie Lee',
    submittedAt: '2026-02-03T08:45:00Z',
    updatedAt: '2026-02-06T14:00:00Z',
  },
  {
    id: '5',
    title: 'Account deletion request',
    description:
      'User is requesting full account and data deletion in compliance with GDPR.',
    type: 'Account',
    status: 'Resolved',
    priority: 'Medium',
    assignee: 'Morgan Davis',
    submittedAt: '2026-01-28T16:00:00Z',
    updatedAt: '2026-02-02T09:30:00Z',
  },
  {
    id: '6',
    title: 'Dashboard loads slowly on large datasets',
    description:
      'When an account has more than 10,000 records, the dashboard takes over 15 seconds to load.',
    type: 'Bug',
    status: 'Open',
    priority: 'High',
    assignee: 'Alex Kim',
    submittedAt: '2026-02-06T13:00:00Z',
    updatedAt: '2026-02-06T13:00:00Z',
  },
  {
    id: '7',
    title: 'Add bulk ticket assignment',
    description:
      'Agents would like to be able to select multiple tickets and assign them all at once.',
    type: 'Feature Request',
    status: 'Open',
    priority: 'Low',
    assignee: 'Unassigned',
    submittedAt: '2026-02-04T10:20:00Z',
    updatedAt: '2026-02-04T10:20:00Z',
  },
  {
    id: '8',
    title: 'Invoice email not received',
    description:
      'Customer did not receive their monthly invoice email. Verified the email address is correct.',
    type: 'Billing',
    status: 'Closed',
    priority: 'Low',
    assignee: 'Morgan Davis',
    submittedAt: '2026-01-31T09:00:00Z',
    updatedAt: '2026-02-01T11:00:00Z',
  },
];
