import type { Ticket, TicketFilters, SortConfig } from '../types';

export function filterTickets(
  tickets: Ticket[],
  filters: TicketFilters,
  sort: SortConfig,
): Ticket[] {
  let result = [...tickets];

  if (filters.status !== 'All') {
    result = result.filter((t) => t.status === filters.status);
  }

  if (filters.type !== 'All') {
    result = result.filter((t) => t.type === filters.type);
  }

  if (filters.priority !== 'All') {
    result = result.filter((t) => t.priority === filters.priority);
  }

  if (filters.query.trim()) {
    const q = filters.query.toLowerCase();
    result = result.filter(
      (t) =>
        t.title.toLowerCase().includes(q) ||
        t.description.toLowerCase().includes(q),
    );
  }

  result.sort((a, b) => {
    const aVal = a[sort.field] ?? '';
    const bVal = b[sort.field] ?? '';
    const cmp = String(aVal).localeCompare(String(bVal));
    return sort.direction === 'asc' ? cmp : -cmp;
  });

  return result;
}
