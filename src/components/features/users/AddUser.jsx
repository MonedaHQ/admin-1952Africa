import Section from '../../ui/Section';
import BigHeader from '../../ui/headers/BigHeader';
import EditUser from './EditUser';

function AddUser() {
  return (
    <Section>
      <BigHeader title="Add User" variant="lg" />
      <EditUser />
    </Section>
  );
}

export default AddUser;
