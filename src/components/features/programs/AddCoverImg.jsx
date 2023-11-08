import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { programData } from '../../../data/programsData';

import ImageInput from '../../ui/formChunks/ImageInput';

import styles from './styles/addprograms.module.css';

function AddCoverImg() {
  const { slug } = useParams();
  const [imagePreview, setImagePreview] = useState('/images/empty-img.jpg');
  let program = null;

  if (slug) {
    program = programData.find((program) => program.slug === slug);
  }

  useEffect(
    function () {
      if (program?.cover_img) {
        setImagePreview(program.cover_img);
      }
    },
    [program]
  );

  function handleImageChange(image) {
    const imageURL = URL.createObjectURL(image);
    setImagePreview(imageURL);
  }

  return (
    <div className={styles.coverImgContainer}>
      <img src={imagePreview} alt="Cover Image" draggable="false" />
      <ImageInput onChange={handleImageChange}>Upload Cover Image</ImageInput>
    </div>
  );
}

export default AddCoverImg;
