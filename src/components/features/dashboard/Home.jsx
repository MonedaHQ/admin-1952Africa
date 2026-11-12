import Metrics from './Metrics';
import QuickActions from '../../ui/QuickActions';

import Section from '../../ui/Section';

import BigHeader from '../../ui/headers/BigHeader';
import styles from './styles/home.module.css';

function Home() {
  const quickActions = [
    { label: 'Add Event', path: '/events/add' },
    { label: 'Add Artist', path: '/artists/add' },
    { label: 'Add Activity', path: '/activities/add' },
    { label: 'Add Exhibition', path: '/gallery/add' },
  ];

  const user = JSON.parse(localStorage.getItem('1952adminUser') || 'null');

  return (
    <Section>
      <BigHeader
        title={`Welcome back, ${user?.first_name || 'there'}`}
        userRole={user?.role || 'Team member'}
        variant="xl"
        useRole={true}
      />
      <div className={styles.dashboard}>
        <div className={styles.quickActions}>
          {quickActions.map((action) => (
            <QuickActions action={action} key={action.label} />
          ))}
        </div>
        <Metrics />
      </div>
    </Section>
  );
}

export default Home;
