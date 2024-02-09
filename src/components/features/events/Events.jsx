import {
  capitalizeFirstLetter,
  formatDateToRelative,
  reformatDateString,
} from '../../../utilities/helpers';

import Section from '../../ui/Section';
import HeaderAndButton from '../../ui/headers/HeaderAndButton';
import OperationsPanel from '../../ui/OperationsPanel';
import SearchBar from '../../ui/SearchBar';
import Table from '../../ui/Table';
import { useEvents } from './useEvents';
import Loader from '../../ui/Loader';
import EmptyData from '../../ui/EmptyData';

function Events() {
  const currentUser = JSON.parse(localStorage.getItem('1952adminUser'));
  const { token } = currentUser;

  const { events, isLoading } = useEvents(token);

  if (isLoading) return <Loader fullScreen={true} />;

  const tableHeaders = ['Title', 'Start date', 'End date', 'Sponsored'];
  const dataKeys = ['title', 'start_date', 'end_date', 'sponsored'];

  const newEventsData = events.data.map((event) => {
    return {
      ...event,
      sponsored: event.open_to_sponsorship ? 'Sponsored' : 'Not Sponsored',
      start_date: capitalizeFirstLetter(
        formatDateToRelative(reformatDateString(event.start_date))
      ),
      end_date: capitalizeFirstLetter(
        formatDateToRelative(reformatDateString(event.end_date))
      ),
    };
  });

  const navigationIDs = events.data.map((event) => `/events/${event.id}`);

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
      <OperationsPanel title={`All events (${events.meta.itemCount})`} />
      {events.meta.itemCount > 0 && (
        <Table
          headers={tableHeaders}
          operationData={operations}
          paginationCount={events.meta.itemCount}
        />
      )}
      {!events.meta.itemCount && <EmptyData />}
    </Section>
  );
}

export default Events;
