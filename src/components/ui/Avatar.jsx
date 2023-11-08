import { useState } from 'react';

import styles from '../styles/avatar.module.css';
import ImageInput from './formChunks/ImageInput';

function Avatar({ artist }) {
  const [imagePreview, setImagePreview] = useState(
    artist ? artist.profile_img : '/images/defaultAvatar.jpg'
  );

  function handleImageChange(image) {
    const imageURL = URL.createObjectURL(image);
    if (imageURL) {
      setImagePreview(imageURL);
    }
    return;
  }

  return (
    <div className={styles.avatar}>
      <img src={imagePreview} alt="User photo" draggable="false" />
      <ImageInput variant="primary" onChange={handleImageChange}>
        Replace
      </ImageInput>
    </div>
  );
}

export default Avatar;
