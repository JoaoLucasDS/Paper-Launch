import React, { useState } from 'react';
import { Input, Button, Card } from '@nextui-org/react';

const PhotoUpload: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file)); // Create a preview URL for local display
    }
  };

  return (
    <Card>
      <h4>Upload a Photo (Client-side)</h4>
      <Input
        type="file"
        onChange={handleFileChange}
        accept="image/*"
      />
      {previewUrl && (
        <div style={{ marginTop: '1rem' }}>
          <h5>Preview:</h5>
          <img src={previewUrl} alt="Preview" width="200" />
        </div>
      )}
      <Button disabled={!selectedFile}>
        Photo Selected
      </Button>
    </Card>
  );
};

export default PhotoUpload;
