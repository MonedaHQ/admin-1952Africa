import { useState } from 'react';

import styles from '../styles/avatar.module.css';
import ImageInput from './formChunks/ImageInput';

function Avatar({
  imageData,
  editable = true,
  replacementFunction,
  isUpdating,
}) {
  const imageSrc = imageData?.data[imageData.key];
  const [imagePreview, setImagePreview] = useState(
    imageSrc ? imageSrc : '/images/defaultAvatar.jpg'
  );

  function handleImageChange(image) {
    const imageURL = URL.createObjectURL(image);
    if (imageURL) {
      setImagePreview(imageURL);
    }

    replacementFunction(image);
    return;
  }

  return (
    <div className={styles.avatar}>
      <img src={imagePreview} alt="User photo" draggable="false" />
      {editable && (
        <ImageInput
          variant="primary"
          onChange={handleImageChange}
          disabled={isUpdating}
        >
          {isUpdating ? 'Updating' : 'Replace'}
        </ImageInput>
      )}
    </div>
  );
}

export default Avatar;
