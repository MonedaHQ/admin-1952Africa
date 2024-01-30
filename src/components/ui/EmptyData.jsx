import { HiMiniNoSymbol } from 'react-icons/hi2';

import styles from '../styles/emptydata.module.css';

function EmptyData() {
  return (
    <div className={styles.container}>
      <HiMiniNoSymbol />
      <p>No data to display</p>
    </div>
  );
}

export default EmptyData;
