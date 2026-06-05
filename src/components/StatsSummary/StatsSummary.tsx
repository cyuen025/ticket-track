import { useMemo } from 'react';
import type { TicketStatus } from '../../types';
import { useAppSelector, useAppDispatch } from '../../store';
import { setFilters } from '../../store/ticketsSlice';
import styles from './StatsSummary.module.css';

const STATUSES: Array<TicketStatus | 'All'> = [
  'All',
  'Open',
  'In Progress',
  'Resolved',
  'Closed',
];

const COUNT_CLASS: Record<TicketStatus | 'All', string> = {
  All: styles.countAll,
  Open: styles.countOpen,
  'In Progress': styles.countInProgress,
  Resolved: styles.countResolved,
  Closed: styles.countClosed,
};

export default function StatsSummary() {
  const dispatch = useAppDispatch();
  const { tickets, filters } = useAppSelector((state) => state.tickets);

  const counts = useMemo(() => {
    const result: Record<string, number> = { All: tickets.length };
    for (const ticket of tickets) {
      result[ticket.status] = (result[ticket.status] ?? 0) + 1;
    }
    return result;
  }, [tickets]);

  function handleClick(status: TicketStatus | 'All') {
    dispatch(setFilters({ status }));
  }

  return (
    <div className={styles.summary}>
      {STATUSES.map((status) => (
        <button
          key={status}
          className={`${styles.stat} ${filters.status === status ? styles.active : ''}`}
          onClick={() => handleClick(status)}
          aria-pressed={filters.status === status}
        >
          <span className={`${styles.count} ${COUNT_CLASS[status]}`}>
            {counts[status] ?? 0}
          </span>
          <span className={styles.label}>{status}</span>
        </button>
      ))}
    </div>
  );
}
