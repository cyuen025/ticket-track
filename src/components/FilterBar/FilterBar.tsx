import type {
  TicketStatus,
  TicketType,
  TicketPriority,
  SortField,
} from '../../types';
import { useAppDispatch, useAppSelector } from '../../store';
import { setFilters, setSort, resetFilters } from '../../store/ticketsSlice';
import styles from './FilterBar.module.css';

const STATUS_OPTIONS: Array<TicketStatus | 'All'> = [
  'All',
  'Open',
  'In Progress',
  'Resolved',
  'Closed',
];

const TYPE_OPTIONS: Array<TicketType | 'All'> = [
  'All',
  'Bug',
  'Feature Request',
  'Account',
  'Billing',
  'Other',
];

const PRIORITY_OPTIONS: Array<TicketPriority | 'All'> = [
  'All',
  'Low',
  'Medium',
  'High',
  'Critical',
];

const SORT_OPTIONS: Array<{ value: SortField; label: string }> = [
  { value: 'submittedAt', label: 'Submission Date' },
  { value: 'updatedAt', label: 'Last Updated' },
  { value: 'status', label: 'Status' },
  { value: 'type', label: 'Type' },
  { value: 'priority', label: 'Priority' },
];

interface FilterBarProps {
  resultCount: number;
}

export default function FilterBar({ resultCount }: FilterBarProps) {
  const dispatch = useAppDispatch();
  const { filters, sort } = useAppSelector((state) => state.tickets);

  const isFiltered =
    filters.status !== 'All' ||
    filters.type !== 'All' ||
    filters.priority !== 'All' ||
    filters.query !== '';

  return (
    <div className={styles.filterBar}>
      <div className={styles.searchWrapper}>
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          aria-hidden="true"
          className={styles.searchIcon}
        >
          <circle cx="7" cy="7" r="4.5" stroke="currentColor" strokeWidth="1.5" />
          <path d="M11 11l2.5 2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
        <input
          type="search"
          id="search-query"
          className={styles.searchInput}
          placeholder="Search by title or description…"
          value={filters.query}
          onChange={(e) => dispatch(setFilters({ query: e.target.value }))}
          aria-label="Search tickets"
        />
      </div>

      <div className={styles.filterRow}>
        <div className={styles.controls}>
          <div className={styles.filterGroup}>
            <label className={styles.label} htmlFor="filter-status">
              Status
            </label>
            <select
              id="filter-status"
              className={styles.select}
              value={filters.status}
              onChange={(e) =>
                dispatch(
                  setFilters({ status: e.target.value as TicketStatus | 'All' }),
                )
              }
            >
              {STATUS_OPTIONS.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>

          <div className={styles.filterGroup}>
            <label className={styles.label} htmlFor="filter-type">
              Type
            </label>
            <select
              id="filter-type"
              className={styles.select}
              value={filters.type}
              onChange={(e) =>
                dispatch(
                  setFilters({ type: e.target.value as TicketType | 'All' }),
                )
              }
            >
              {TYPE_OPTIONS.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>

          <div className={styles.filterGroup}>
            <label className={styles.label} htmlFor="filter-priority">
              Priority
            </label>
            <select
              id="filter-priority"
              className={styles.select}
              value={filters.priority}
              onChange={(e) =>
                dispatch(
                  setFilters({
                    priority: e.target.value as TicketPriority | 'All',
                  }),
                )
              }
            >
              {PRIORITY_OPTIONS.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>
          </div>

          <div className={styles.filterGroup}>
            <label className={styles.label} htmlFor="sort-field">
              Sort by
            </label>
            <div className={styles.sortRow}>
              <select
                id="sort-field"
                className={styles.select}
                value={sort.field}
                onChange={(e) =>
                  dispatch(
                    setSort({
                      field: e.target.value as SortField,
                      direction: sort.direction,
                    }),
                  )
                }
              >
                {SORT_OPTIONS.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>
              <button
                className={styles.sortToggle}
                onClick={() =>
                  dispatch(
                    setSort({
                      field: sort.field,
                      direction: sort.direction === 'asc' ? 'desc' : 'asc',
                    }),
                  )
                }
                aria-label={`Sort ${sort.direction === 'asc' ? 'descending' : 'ascending'}`}
                title={sort.direction === 'asc' ? 'Ascending' : 'Descending'}
              >
                <svg
                  viewBox="0 0 16 16"
                  fill="none"
                  className={`${styles.sortIcon} ${sort.direction === 'asc' ? styles.sortAsc : ''}`}
                  aria-hidden="true"
                >
                  <path
                    d="M8 3v10M4 9l4 4 4-4"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
          </div>

          {isFiltered && (
            <button
              className={styles.resetBtn}
              onClick={() => dispatch(resetFilters())}
            >
              Clear filters
            </button>
          )}
        </div>

        <p className={styles.resultCount}>
          {resultCount} {resultCount === 1 ? 'ticket' : 'tickets'}
        </p>
      </div>
    </div>
  );
}
