import {
  capitalizeFirstLetter,
  formatDateToRelative,
} from '../../../utilities/helpers';

import styles from './styles/lastlogin.module.css';

function LastLogin({ user }) {
  return (
    <div className={styles.container}>
      <p>
        Last Log in:{' '}
        <strong>
          {capitalizeFirstLetter(formatDateToRelative(user.last_log_in))}
        </strong>
      </p>
    </div>
  );
}

export default LastLogin;
