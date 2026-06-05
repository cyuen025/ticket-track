import { describe, it, expect } from 'vitest';
import ticketsReducer, {
  addTicket,
  updateTicketStatus,
  setFilters,
  setSort,
  resetFilters,
} from './ticketsSlice';
import type { Ticket } from '../types';

const newTicket: Ticket = {
  id: '99',
  title: 'New test ticket',
  description: 'A ticket added in tests',
  type: 'Bug',
  status: 'Open',
  priority: 'Low',
  assignee: 'Tester',
  submittedAt: '2026-02-10T00:00:00Z',
  updatedAt: '2026-02-10T00:00:00Z',
};

function getInitialState() {
  return ticketsReducer(undefined, { type: '@@INIT' });
}

describe('ticketsSlice', () => {
  describe('addTicket', () => {
    it('prepends a new ticket to the list', () => {
      const state = getInitialState();
      const next = ticketsReducer(state, addTicket(newTicket));
      expect(next.tickets[0]).toEqual(newTicket);
      expect(next.tickets).toHaveLength(state.tickets.length + 1);
    });
  });

  describe('updateTicketStatus', () => {
    it('updates the status of the correct ticket', () => {
      const state = getInitialState();
      const targetId = state.tickets[0].id;
      const next = ticketsReducer(
        state,
        updateTicketStatus({ id: targetId, status: 'Resolved' }),
      );
      const updated = next.tickets.find((t) => t.id === targetId);
      expect(updated?.status).toBe('Resolved');
    });

    it('updates updatedAt when status changes', () => {
      const state = getInitialState();
      const targetId = state.tickets[0].id;
      const originalUpdatedAt = state.tickets[0].updatedAt;
      const next = ticketsReducer(
        state,
        updateTicketStatus({ id: targetId, status: 'Closed' }),
      );
      const updated = next.tickets.find((t) => t.id === targetId);
      expect(updated?.updatedAt).not.toBe(originalUpdatedAt);
    });

    it('does not affect other tickets', () => {
      const state = getInitialState();
      const targetId = state.tickets[0].id;
      const next = ticketsReducer(
        state,
        updateTicketStatus({ id: targetId, status: 'Resolved' }),
      );
      const others = next.tickets.filter((t) => t.id !== targetId);
      const originalsOthers = state.tickets.filter((t) => t.id !== targetId);
      expect(others).toEqual(originalsOthers);
    });
  });

  describe('setFilters', () => {
    it('updates a single filter without affecting others', () => {
      const state = getInitialState();
      const next = ticketsReducer(state, setFilters({ status: 'Open' }));
      expect(next.filters.status).toBe('Open');
      expect(next.filters.type).toBe('All');
      expect(next.filters.priority).toBe('All');
    });

    it('can update multiple filters at once', () => {
      const state = getInitialState();
      const next = ticketsReducer(
        state,
        setFilters({ status: 'Open', type: 'Bug' }),
      );
      expect(next.filters.status).toBe('Open');
      expect(next.filters.type).toBe('Bug');
    });
  });

  describe('setSort', () => {
    it('updates the sort field and direction', () => {
      const state = getInitialState();
      const next = ticketsReducer(
        state,
        setSort({ field: 'priority', direction: 'asc' }),
      );
      expect(next.sort.field).toBe('priority');
      expect(next.sort.direction).toBe('asc');
    });
  });

  describe('resetFilters', () => {
    it('resets all filters back to All', () => {
      const state = getInitialState();
      const withFilters = ticketsReducer(
        state,
        setFilters({ status: 'Open', type: 'Bug', priority: 'High' }),
      );
      const reset = ticketsReducer(withFilters, resetFilters());
      expect(reset.filters).toEqual({
        status: 'All',
        type: 'All',
        priority: 'All',
        query: '',
      });
    });
  });
});
