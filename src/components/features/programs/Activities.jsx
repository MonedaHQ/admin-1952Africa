import { IoMdAddCircle } from 'react-icons/io';
import { activitesData } from '../../../data/programsData';

import styles from './styles/activities.module.css';

function Activities({ programId }) {
  const activity = activitesData.find(
    (activity) => activity.program === programId
  );
  return (
    <div className={styles.activites}>
      <div className={styles.headerPanel}>
        <h3>Activities</h3>
        <button className={styles.btn}>
          <p>
            <span>
              <IoMdAddCircle />
            </span>
            Add activity
          </p>
        </button>
      </div>
    </div>
  );
}

export default Activities;
