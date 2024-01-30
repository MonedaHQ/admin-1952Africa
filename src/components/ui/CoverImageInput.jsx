import { useRef, useState } from 'react';

import styles from '../styles/coverimageinput.module.css';
import Button from './Button';
import { handleImageCompression } from '../../utilities/helpers';

function CoverImageInput({ handleImage, children, disabled }) {
  const [imagePreview, setImagePreview] = useState('/images/empty-img.jpg');
  const fileInputRef = useRef(null);

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  async function handleImageChange(image) {
    const imageURL = URL.createObjectURL(image);
    const compressedImage = await handleImageCompression(image, image.name);
    handleImage(compressedImage);
    setImagePreview(imageURL);
  }

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    console.log(selectedFile);
    if (selectedFile) {
      handleImageChange(selectedFile);
    }
  };
  return (
    <div>
      <div className={styles.coverImgContainer}>
        <img src={imagePreview} alt="Cover Image" draggable="false" />
        <Button
          variant="primary"
          onClick={handleButtonClick}
          disabled={disabled}
        >
          {children}
        </Button>
      </div>
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
