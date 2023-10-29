import Button from '../../ui/Button';

import styles from './styles/addprograms.module.css';

function AddCoverImg() {
  return (
    <div className={styles.coverImgContainer}>
      <img src="/images/empty-img.jpg" alt="cover image" draggable="false" />
      <Button variant="primary">Upload Cover Image</Button>
    </div>
  );
}

export default AddCoverImg;
