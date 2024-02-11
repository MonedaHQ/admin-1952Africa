import HeaderAndButton from '../../ui/headers/HeaderAndButton';
import SearchBar from '../../ui/SearchBar';
import OperationsPanel from '../../ui/OperationsPanel';
import Table from '../../ui/Table';

import styles from './styles/activities.module.css';
import { useActivities } from '../activities/useActivities';
import { usePrograms } from './usePrograms';
import EmptyData from '../../ui/EmptyData';

function Activities({ programId }) {
  const currentUser = JSON.parse(localStorage.getItem('1952adminUser'));
  const token = currentUser.token;

  const { programs, isLoading: isLoadingPrograms } = usePrograms(token);

  const { activities, isLoading } = useActivities({
    program_id: programId,
  });

  if (isLoading || isLoadingPrograms) return;

  const formattedActivities = activities.data.map((activity) => {
    return {
      ...activity,
      date: new Date(activity.date).getFullYear(),
      program:
        programs.data.find((program) => program.id === activity.program_id)
          ?.title || null,
    };
  });

  const activityIds = activities.data.map(
    (activity) => `/activities/${activity.id}`
  );

  const headers = ['Title', 'Date', 'Description'];
  const operationsData = {
    data: formattedActivities,
    keys: ['title', 'date', 'description'],
    navigation: activityIds,
  };

  return (
    <div className={styles.activites}>
      <HeaderAndButton
        header="Activities"
        navigateTo={{ path: '/activities/add', label: 'Add activity' }}
        type="lg"
      />

      <SearchBar placeholder="Search activity" />
      <OperationsPanel
        title={`All activities (${activities.meta.itemCount})`}
      />
      {activities.data.length > 0 && (
        <Table
          headers={headers}
          operationData={operationsData}
          paginationCount={activities.meta.itemCount}
          gridNo={3}
        />
      )}
      {!activities.data.length && <EmptyData />}
    </div>
  );
}

export default Activities;
