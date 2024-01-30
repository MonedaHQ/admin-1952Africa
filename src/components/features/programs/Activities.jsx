import { activitesData } from '../../../data/programsData';

import HeaderAndButton from '../../ui/headers/HeaderAndButton';
import SearchBar from '../../ui/SearchBar';
import OperationsPanel from '../../ui/OperationsPanel';
import Table from '../../ui/Table';

import styles from './styles/activities.module.css';
import { useActivities } from '../activities/useActivities';
import { usePrograms } from './usePrograms';

function Activities({ programId }) {
  const currentUser = JSON.parse(localStorage.getItem('1952adminUser'));
  const token = currentUser.token;

  const { programs, isLoading: isLoadingPrograms } = usePrograms(token);

  const { activities, isLoading } = useActivities({
    token,
    program_id: programId,
  });

  if (isLoading || isLoadingPrograms) return;

  const formattedActivities = activities.map((activity) => {
    return {
      ...activity,
      date: new Date(activity.date).toDateString(),
      program:
        programs.find((program) => program.id === activity.program_id).title ||
        null,
    };
  });

  const activityIds = activities.map(
    (activity) => `/activities/${activity.id}`
  );

  const headers = ['Title', 'Program', 'Date', 'Description'];
  const operationsData = {
    data: formattedActivities,
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

      <SearchBar placeholder="Search activity" />
      <OperationsPanel title="All activites" />
      <Table
        headers={headers}
        operationData={operationsData}
        paginationCount={0}
      />
    </div>
  );
}

export default Activities;
