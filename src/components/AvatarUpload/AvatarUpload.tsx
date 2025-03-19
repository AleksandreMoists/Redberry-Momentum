// src/components/AvatarUpload/AvatarUpload.tsx
import React, { useState, useEffect, useRef } from 'react';
import Typography from '../Typography/Typography';
import styles from './AvatarUpload.style.module.css';
import Button from '../Button/Button';

interface AvatarUploadProps {
  onAvatarSelect: (file: File | null) => void;
  selectedAvatar?: File | null;
}

const MAX_SIZE = 600 * 1024; // 600kb in bytes

const AvatarUpload: React.FC<AvatarUploadProps> = ({ onAvatarSelect, selectedAvatar }) => {
  const [error, setError] = useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.size > MAX_SIZE) {
        setError("ფაილის ზომა არ უნდა აღემატებოდეს 600KB-ს");
        onAvatarSelect(null);
        setPreviewUrl(null);
      } else {
        setError(null);
        onAvatarSelect(file);
        setPreviewUrl(URL.createObjectURL(file));
      }
    }
  };
  
  const handleContainerClick = () => {
    // Trigger the file input click when the container is clicked
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  
  const handleRemoveAvatar = (e: React.MouseEvent) => {
    // Stop the click from propagating to the container
    e.stopPropagation();
    
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
    setPreviewUrl(null);
    setError(null);
    onAvatarSelect(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  return (
    <div className={styles.avatarUploadContainer}>
      <Typography variant='subtitle'>ავატარი*</Typography>
      
      {/* Make the entire container clickable */}
      <div className={styles.avatarContainer} onClick={handleContainerClick}>
        {/* Hidden file input with ref */}
        <input
          type="file"
          id="avatar-upload"
          accept="image/*"
          onChange={handleFileChange}
          ref={fileInputRef}
          style={{ display: 'none' }}
        />
        
        {previewUrl ? (
          <div className={styles.uploadedFileContainer}>
            <div className={styles.uploadedAvatar}>
              <img 
                src={previewUrl} 
                alt="Avatar Preview" 
                className={styles.uploadedImage} 
              />
            </div>
            <button 
              onClick={handleRemoveAvatar}
              className={styles.removeButton}
              type="button"
            >
              ×
            </button>
          </div>
        ) : (
          <div className={styles.uploadInstructions}>
            <Typography variant='caption'>ატვირთეთ ავატარი</Typography>
          </div>
        )}
        
        {error && (
          <div className={styles.error}>
            <Typography variant="caption">{error}</Typography>
          </div>
        )}
      </div>
    </div>
  );
};

export default AvatarUpload;
