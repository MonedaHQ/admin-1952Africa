import { useState } from 'react';
import Button from '../../../ui/Button';

import styles from '../styles/profile.module.css';

function Avatar() {
  const [isChanged, setIsChanged] = useState(false);
  return (
    <div className={styles.avatar}>
      <img src="/images/defaultAvatar.jpg" alt="User photo" draggable="false" />
      <div className={styles.btnWrapper}>
        {!isChanged && <Button variant="primary">Replace</Button>}
        {isChanged && <Button variant="primary">Save</Button>}
        {isChanged && <Button variant="link-dark">Replace</Button>}
        <Button variant="link-dark">Cancel</Button>
      </div>
    </div>
  );
}

export default Avatar;
