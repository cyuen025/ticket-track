import type { TicketStatus } from '../../types';
import styles from './StatusBadge.module.css';

interface StatusBadgeProps {
  status: TicketStatus;
}

export default function StatusBadge({ status }: StatusBadgeProps) {
  const classMap: Record<TicketStatus, string> = {
    Open: styles.open,
    'In Progress': styles.inProgress,
    Resolved: styles.resolved,
    Closed: styles.closed,
  };

  return (
    <span className={`${styles.badge} ${classMap[status]}`}>
      <span className={styles.dot} aria-hidden='true' />
      {status}
    </span>
  );
}
