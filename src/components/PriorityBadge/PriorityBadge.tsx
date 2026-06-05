import type { TicketPriority } from '../../types';
import styles from './PriorityBadge.module.css';

interface PriorityBadgeProps {
  priority: TicketPriority;
}

export default function PriorityBadge({ priority }: PriorityBadgeProps) {
  const classMap: Record<TicketPriority, string> = {
    Low: styles.low,
    Medium: styles.medium,
    High: styles.high,
    Critical: styles.critical,
  };

  return (
    <span className={`${styles.badge} ${classMap[priority]}`}>{priority}</span>
  );
}
