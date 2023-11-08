import { useNavigate } from 'react-router-dom';
import { IoMdAddCircle } from 'react-icons/io';

import { activitesData } from '../../../data/programsData';

import Button from '../../ui/Button';

import Modal from '../../ui/Modal';
import ConfirmDelete from '../../ui/ConfirmDelete';

import styles from './styles/activities.module.css';

function Activities({ programId }) {
  const navigate = useNavigate();
  const activities = activitesData.filter(
    (activity) => activity.program === programId
  );

  return (
    <div className={styles.activites}>
      <div className={styles.headerPanel}>
        <h3>Activities</h3>
        <button
          className={styles.btn}
          onClick={() => navigate('/activities/add')}
        >
          <p>
            <span>
              <IoMdAddCircle />
            </span>
            Add activity
          </p>
        </button>
      </div>
      <div className={styles.activityList}>
        {activities.map((activity) => (
          <Activity activity={activity} key={activity.id} />
        ))}
      </div>
    </div>
  );
}

function Activity({ activity }) {
  const navigate = useNavigate();
  return (
    <div className={styles.activity}>
      <div className={styles.activityImage}>
        <img src={activity.image_url} alt={activity.title} draggable="false" />
      </div>
      <h4>{activity.title}</h4>
      <div className={styles.btnWrapper}>
        <Modal>
          <Button
            variant="primary"
            onClick={() => navigate(`/activities/${activity.id}`)}
          >
            Edit
          </Button>
          <Modal.Open opens="delete">
            <Button variant="link-warn">Delete</Button>
          </Modal.Open>
          <Modal.Window name="delete">
            <ConfirmDelete resourceName={activity.title} />
          </Modal.Window>
        </Modal>
      </div>
    </div>
  );
}

export default Activities;
