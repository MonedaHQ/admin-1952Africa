import { activitesData } from '../../../data/programsData';

import HeaderAndButton from '../../ui/headers/HeaderAndButton';
import SearchBar from '../../ui/SearchBar';
import OperationsPanel from '../../ui/OperationsPanel';
import Table from '../../ui/Table';

import styles from './styles/activities.module.css';

function Activities({ programId }) {
  const activities = activitesData.filter(
    (activity) => activity.program === programId
  );

  const activityIds = activities.map(
    (activity) => `/activities/${activity.id}`
  );

  const headers = ['Title', 'Program', 'Date', 'Description'];
  const operationsData = {
    data: activities,
    keys: ['title', 'program', 'date', 'description'],
    navigation: activityIds,
  };

  return (
    <div className={styles.activites}>
      <HeaderAndButton
        header="Activities"
        navigateTo={{ path: '/activities/add', label: 'Add activity' }}
        type="lg"
      />

      <SearchBar placeholder="search activity" />
      <OperationsPanel title="All activites" />
      <Table
        headers={headers}
        operationData={operationsData}
        paginationCount={15}
      />
    </div>
  );
}

export default Activities;
