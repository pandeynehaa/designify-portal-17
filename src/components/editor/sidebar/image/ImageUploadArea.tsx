
import React from "react";

interface ImageUploadAreaProps {
  onUpload: () => void;
}

const ImageUploadArea: React.FC<ImageUploadAreaProps> = ({ onUpload }) => {
  return (
    <div className="mt-4 px-3 py-2">
      <div 
        className="border-2 border-dashed border-cv-lightgray rounded-lg p-4 text-center cursor-pointer hover:bg-cv-gray/30 hover:border-cv-accent/30 transition-colors"
        onClick={onUpload}
      >
        <p className="text-sm text-cv-white/70">
          Drag & drop images here <br /> or click to upload
        </p>
      </div>
    </div>
  );
};

export default ImageUploadArea;
