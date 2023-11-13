import { eventsData } from '../../../data/programsData';

import { formatDateToRelative } from '../../../utilities/helpers';

import Section from '../../ui/Section';
import HeaderAndButton from '../../ui/headers/HeaderAndButton';
import OperationsPanel from '../../ui/OperationsPanel';
import SearchBar from '../../ui/SearchBar';
import Table from '../../ui/Table';

function Events() {
  const tableHeaders = ['Name', 'Start date', 'End date', 'Sponsored'];
  const dataKeys = ['title', 'start_date', 'end_date', 'sponsored'];
  const newEventsData = eventsData.map((event) => {
    return {
      ...event,
      sponsored: event.sponsored ? 'Sponsored' : 'Not Sponsored',
      start_date: formatDateToRelative(event.start_date),
    };
  });
  const navigationIDs = eventsData.map((event) => `/events/${event.id}`);

  const operations = {
    data: newEventsData,
    keys: dataKeys,
    navigation: navigationIDs,
  };
  return (
    <Section>
      <HeaderAndButton
        header="Events"
        navigateTo={{ label: 'Add event', path: '/events/add' }}
      />
      <SearchBar placeholder="Search event" />
      <OperationsPanel title="All events" />
      <Table
        headers={tableHeaders}
        operationData={operations}
        paginationCount={15}
      />
    </Section>
  );
}

export default Events;
