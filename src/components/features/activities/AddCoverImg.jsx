import { useState } from 'react';
import ImageInput from '../../ui/formChunks/ImageInput';

import styles from './styles/addactivity.module.css';

function AddCoverImg() {
  const [imagePreview, setImagePreview] = useState('/images/empty-img.jpg');
  function handleImageChange(image) {
    const imageUrl = URL.createObjectURL(image);
    if (imageUrl) {
      setImagePreview(imageUrl);
    }
  }
  return (
    <div className={styles.coverImgContainer}>
      <img src={imagePreview} alt="cover image" draggable="false" />
      <ImageInput onChange={handleImageChange}>Update Cover Image</ImageInput>
    </div>
  );
}

export default AddCoverImg;
