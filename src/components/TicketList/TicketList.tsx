import { useMemo } from 'react';
import { useAppSelector } from '../../store';
import { filterTickets } from '../../utils/filterTickets';
import TicketCard from '../TicketCard/TicketCard';
import FilterBar from '../FilterBar/FilterBar';
import styles from './TicketList.module.css';

export default function TicketList() {
  const { tickets, filters, sort } = useAppSelector((state) => state.tickets);

  const filteredTickets = useMemo(
    () => filterTickets(tickets, filters, sort),
    [tickets, filters, sort],
  );

  return (
    <section className={styles.section}>
      <FilterBar resultCount={filteredTickets.length} />
      {filteredTickets.length === 0 ? (
        <div className={styles.empty}>
          <svg
            className={styles.emptyIcon}
            xmlns='http://www.w3.org/2000/svg'
            width='40'
            height='40'
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeWidth='1.5'
            strokeLinecap='round'
            strokeLinejoin='round'
            aria-hidden='true'
          >
            <polyline points='22 12 16 12 14 15 10 15 8 12 2 12' />
            <path d='M5.45 5.11L2 12v3a2 2 0 002 2h16a2 2 0 002-2v-3l-3.45-6.89A2 2 0 0016.76 4H7.24a2 2 0 00-1.79 1.11z' />
          </svg>
          <p className={styles.emptyText}>No tickets match your filters.</p>
          <p className={styles.emptySubtext}>
            Try adjusting your status, type, or priority selection.
          </p>
        </div>
      ) : (
        <ul className={styles.list}>
          {filteredTickets.map((ticket) => (
            <li key={ticket.id}>
              <TicketCard ticket={ticket} />
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
