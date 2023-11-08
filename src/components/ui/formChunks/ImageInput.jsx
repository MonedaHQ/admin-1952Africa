import { useRef } from 'react';
import styles from './styles/imageinput.module.css';
import Button from '../Button';

function ImageInput({ onChange, children }) {
  const fileInputRef = useRef(null);

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      onChange(selectedFile);
    }
  };
  return (
    <div>
      <Button variant="primary" onClick={handleButtonClick}>
        {children}
      </Button>
      <input
        type="file"
        accept="image/png, image/jpeg"
        ref={fileInputRef}
        onChange={handleFileChange}
        style={{ display: 'none' }}
      />
    </div>
  );
}

export default ImageInput;
