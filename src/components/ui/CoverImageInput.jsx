import { useRef, useState } from 'react';

import styles from '../styles/coverimageinput.module.css';
import Button from './Button';
import { handleImageCompression } from '../../utilities/helpers';
import ImageInput from './formChunks/ImageInput';

function CoverImageInput({
  handleImage,
  children,
  disabled,
  fullImage = false,
  avatar = false,
}) {
  const [imagePreview, setImagePreview] = useState(
    avatar ? '/images/defaultAvatar.jpg' : '/images/empty-img.jpg'
  );

  const [isCreating, setIsCreating] = useState(false);

  async function handleImageChange(image) {
    setIsCreating(true);
    const imageURL = URL.createObjectURL(image);
    const compressedImage = await handleImageCompression(image, image.name);
    handleImage(compressedImage);
    setImagePreview(imageURL);
    setIsCreating(false);
  }

  return (
    <div>
      <ImageContainer
        fullImage={fullImage}
        imagePreview={imagePreview}
        handleImageChange={handleImageChange}
        disabled={disabled}
        isCreating={isCreating}
        avatar={avatar}
      >
        {children}
      </ImageContainer>
    </div>
  );
}

function ImageContainer({
  fullImage,
  imagePreview,
  handleImageChange,
  disabled,
  isCreating,
  children,
  avatar,
}) {
  const fileInputRef = useRef(null);

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    // console.log(selectedFile);
    if (selectedFile) {
      handleImageChange(selectedFile);
    }
  };

  if (fullImage) {
    return (
      <div className={styles.fullImage}>
        <div className={styles.imageContainer}>
          <img src={imagePreview} alt="Cover Image" draggable="false" />
        </div>
        <div className={styles.buttonWrapper}>
          <ImageInput onChange={handleImageChange}>Replace</ImageInput>
        </div>
      </div>
    );
  } else
    return (
      <div className={avatar ? styles.avatar : styles.coverImgContainer}>
        <img src={imagePreview} alt="Cover Image" draggable="false" />
        <Button
          variant="primary"
          onClick={handleButtonClick}
          disabled={isCreating || disabled}
        >
          {children}
        </Button>

        <input
          type="file"
          id="file"
          accept="image/png, image/jpeg"
          ref={fileInputRef}
          onChange={handleFileChange}
          style={{ display: 'none' }}
        />
      </div>
    );
}

export default CoverImageInput;
