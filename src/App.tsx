import Header from './components/Header/Header';
import TicketForm from './components/TicketForm/TicketForm';
import TicketList from './components/TicketList/TicketList';
import StatsSummary from './components/StatsSummary/StatsSummary';
import styles from './App.module.css';

export default function App() {
  return (
    <>
      <Header />
      <main className={styles.main}>
        <div className={styles.inner}>
          <div className={styles.pageHeader}>
            <div>
              <h1 className={styles.pageTitle}>Support Tickets</h1>
              <p className={styles.pageSubtitle}>
                Manage and prioritise incoming support requests.
              </p>
            </div>
            <TicketForm />
          </div>
          <StatsSummary />
          <TicketList />
        </div>
      </main>
    </>
  );
}
