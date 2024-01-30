import {
  capitalizeFirstLetter,
  formatDateToRelative,
  reformatDateString,
} from '../../../utilities/helpers';

import styles from './styles/lastlogin.module.css';

function LastLogin({ user }) {
  const lastUpdate = reformatDateString(user.updated_at);

  return (
    <div className={styles.container}>
      <p>
        Last Log in:{' '}
        <strong>
          {capitalizeFirstLetter(formatDateToRelative(lastUpdate))}
        </strong>
      </p>
    </div>
  );
}

export default LastLogin;
