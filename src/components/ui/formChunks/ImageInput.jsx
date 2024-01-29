import { useRef } from 'react';
import Button from '../Button';

function ImageInput({ onChange, children, disabled }) {
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
      <Button variant="primary" onClick={handleButtonClick} disabled={disabled}>
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
