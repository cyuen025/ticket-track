import { describe, it, expect } from 'vitest';
import { filterTickets } from './filterTickets';
import type { Ticket, TicketFilters, SortConfig } from '../types';

const baseTicket: Ticket = {
  id: '1',
  title: 'Test ticket',
  description: 'Test description',
  type: 'Bug',
  status: 'Open',
  priority: 'High',
  assignee: 'Jamie Lee',
  submittedAt: '2026-02-01T10:00:00Z',
  updatedAt: '2026-02-01T10:00:00Z',
};

const tickets: Ticket[] = [
  {
    ...baseTicket,
    id: '1',
    status: 'Open',
    type: 'Bug',
    priority: 'High',
    title: 'A',
  },
  {
    ...baseTicket,
    id: '2',
    status: 'In Progress',
    type: 'Feature Request',
    priority: 'Medium',
    title: 'B',
  },
  {
    ...baseTicket,
    id: '3',
    status: 'Resolved',
    type: 'Bug',
    priority: 'Low',
    title: 'C',
  },
  {
    ...baseTicket,
    id: '4',
    status: 'Closed',
    type: 'Billing',
    priority: 'Critical',
    title: 'D',
  },
];

const noFilters: TicketFilters = {
  status: 'All',
  type: 'All',
  priority: 'All',
  query: '',
};
const defaultSort: SortConfig = { field: 'submittedAt', direction: 'desc' };

describe('filterTickets', () => {
  describe('filtering', () => {
    it('returns all tickets when all filters are set to All', () => {
      expect(filterTickets(tickets, noFilters, defaultSort)).toHaveLength(4);
    });

    it('filters by status', () => {
      const result = filterTickets(
        tickets,
        { ...noFilters, status: 'Open' },
        defaultSort,
      );
      expect(result).toHaveLength(1);
      expect(result[0].id).toBe('1');
    });

    it('filters by type', () => {
      const result = filterTickets(
        tickets,
        { ...noFilters, type: 'Bug' },
        defaultSort,
      );
      expect(result).toHaveLength(2);
      expect(result.map((t) => t.id)).toEqual(
        expect.arrayContaining(['1', '3']),
      );
    });

    it('filters by priority', () => {
      const result = filterTickets(
        tickets,
        { ...noFilters, priority: 'High' },
        defaultSort,
      );
      expect(result).toHaveLength(1);
      expect(result[0].id).toBe('1');
    });

    it('stacks multiple filters', () => {
      const result = filterTickets(
        tickets,
        { status: 'Open', type: 'Bug', priority: 'High', query: '' },
        defaultSort,
      );
      expect(result).toHaveLength(1);
      expect(result[0].id).toBe('1');
    });

    it('returns an empty array when no tickets match', () => {
      const result = filterTickets(
        tickets,
        { ...noFilters, status: 'In Progress', type: 'Billing' },
        defaultSort,
      );
      expect(result).toHaveLength(0);
    });
  });

  describe('query search', () => {
    const searchTickets: Ticket[] = [
      { ...baseTicket, id: '1', title: 'Login page 500 error', description: 'Safari users cannot log in.' },
      { ...baseTicket, id: '2', title: 'Export to CSV broken', description: 'Downloads an empty file.' },
      { ...baseTicket, id: '3', title: 'Dark mode request', description: 'Users want a dark theme option.' },
    ];

    it('matches on title', () => {
      const result = filterTickets(searchTickets, { ...noFilters, query: 'export' }, defaultSort);
      expect(result).toHaveLength(1);
      expect(result[0].id).toBe('2');
    });

    it('matches on description', () => {
      const result = filterTickets(searchTickets, { ...noFilters, query: 'safari' }, defaultSort);
      expect(result).toHaveLength(1);
      expect(result[0].id).toBe('1');
    });

    it('is case-insensitive', () => {
      const result = filterTickets(searchTickets, { ...noFilters, query: 'DARK' }, defaultSort);
      expect(result).toHaveLength(1);
      expect(result[0].id).toBe('3');
    });

    it('returns empty array when no match', () => {
      const result = filterTickets(searchTickets, { ...noFilters, query: 'billing' }, defaultSort);
      expect(result).toHaveLength(0);
    });

    it('ignores whitespace-only query', () => {
      const result = filterTickets(searchTickets, { ...noFilters, query: '   ' }, defaultSort);
      expect(result).toHaveLength(3);
    });
  });

  describe('sorting', () => {
    // Alphabetical order: 'Closed' < 'In Progress' < 'Open' < 'Resolved'
    it('sorts by status ascending', () => {
      const result = filterTickets(tickets, noFilters, {
        field: 'status',
        direction: 'asc',
      });
      expect(result.map((t) => t.id)).toEqual(['4', '2', '1', '3']);
    });

    it('sorts by status descending', () => {
      const result = filterTickets(tickets, noFilters, {
        field: 'status',
        direction: 'desc',
      });
      expect(result.map((t) => t.id)).toEqual(['3', '1', '2', '4']);
    });
  });

  it('does not mutate the original array', () => {
    const original = [...tickets];
    filterTickets(tickets, noFilters, { field: 'status', direction: 'asc' });
    expect(tickets).toEqual(original);
  });
});
