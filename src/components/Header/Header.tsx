import styles from './Header.module.css';

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <div>
          <span className={styles.appName}>TicketTrack</span>
          <span className={styles.appTagline}>Support Ticket Manager</span>
        </div>
      </div>
    </header>
  );
}
