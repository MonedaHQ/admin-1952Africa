import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import ImageInput from './ImageInput';

import styles from './styles/addcoverimg.module.css';

/**
 * AddCoverImg Component
 *
 * This component is responsible for displaying a cover image preview and allowing users to upload a new cover image.
 * It utilizes React hooks, such as useEffect and useState, as well as React Router for extracting route parameters.
 *
 * @component
 * @param {Object} imageData - The data object containing information related to cover images.
 * @param {Array} imageData.data - An array of data objects containing information about items.
 * @param {string} imageData.key - The key used to access the image URL in the data objects.
 * @returns {JSX.Element} - The rendered AddCoverImg component.
 */

function AddCoverImg({
  imageData,
  fullImage = false,
  replacementFunction,
  isUpdating = false,
  avatar = false,
}) {
  const { slug } = useParams();
  const { id } = useParams();
  const [imagePreview, setImagePreview] = useState('/images/empty-img.jpg');
  let mainData = null;
  if (slug) {
    const data = imageData.data;
    mainData = data?.find((el) => el.slug === slug);
  }

  if (id) {
    const data = imageData.data;
    mainData = data?.find((el) => el.id === id);
  }

  useEffect(
    function () {
      let key;
      if (imageData) {
        key = imageData.key;
      }
      if (mainData) {
        setImagePreview(mainData[key]);
      }
    },
    [mainData, imageData]
  );

  function handleImageChange(image) {
    const imageURL = URL.createObjectURL(image);

    if (imageURL) {
      setImagePreview(imageURL);
    }

    replacementFunction(image);
    return;
  }

  if (fullImage) {
    return (
      <div className={styles.fullImage}>
        <div className={styles.imageContainer}>
          <img src={imagePreview} alt="Cover Image" draggable="false" />
        </div>
        <div className={styles.buttonWrapper}>
          <ImageInput onChange={handleImageChange} disabled={isUpdating}>
            {`Replac${isUpdating ? 'ing...' : 'e'}`}
          </ImageInput>
        </div>
      </div>
    );
  }

  return (
    <div className={avatar ? styles.avatar : styles.coverImgContainer}>
      <img src={imagePreview} alt="Cover Image" draggable="false" />
      <ImageInput onChange={handleImageChange} disabled={isUpdating}>{`Replac${
        isUpdating ? 'ing...' : 'e'
      }`}</ImageInput>
    </div>
  );
}

export default AddCoverImg;
