import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { Ticket, TicketFilters, SortConfig } from '../types';
import { mockTickets } from '../data/mockTickets';

interface TicketsState {
  tickets: Ticket[];
  filters: TicketFilters;
  sort: SortConfig;
}

const initialState: TicketsState = {
  tickets: mockTickets,
  filters: {
    status: 'All',
    type: 'All',
    priority: 'All',
    query: '',
  },
  sort: {
    field: 'submittedAt',
    direction: 'desc',
  },
};

const ticketsSlice = createSlice({
  name: 'tickets',
  initialState,
  reducers: {
    addTicket(state, action: PayloadAction<Ticket>) {
      state.tickets.unshift(action.payload);
    },
    updateTicketStatus(
      state,
      action: PayloadAction<{ id: string; status: Ticket['status'] }>,
    ) {
      const ticket = state.tickets.find((t) => t.id === action.payload.id);
      if (ticket) {
        ticket.status = action.payload.status;
        ticket.updatedAt = new Date().toISOString();
      }
    },
    setFilters(state, action: PayloadAction<Partial<TicketFilters>>) {
      state.filters = { ...state.filters, ...action.payload };
    },
    setSort(state, action: PayloadAction<SortConfig>) {
      state.sort = action.payload;
    },
    resetFilters(state) {
      state.filters = initialState.filters;
    },
  },
});

export const {
  addTicket,
  updateTicketStatus,
  setFilters,
  setSort,
  resetFilters,
} = ticketsSlice.actions;

export default ticketsSlice.reducer;
