
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Upload } from 'lucide-react';
import { toast } from 'sonner';

interface ImageUploaderProps {
  currentImage: string;
  onImageSelect: (imageUrl: string) => void;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ currentImage, onImageSelect }) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.includes('image/')) {
      toast.error('Please select an image file');
      return;
    }

    // In a real app, you'd upload to a server here
    // For now we'll use a local URL
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      setPreviewUrl(result);
      onImageSelect(result);
      toast.success('Image updated successfully');
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="flex flex-col items-center space-y-2">
      <div className="w-full h-40 bg-gray-100 rounded-md overflow-hidden flex items-center justify-center">
        {(previewUrl || currentImage) ? (
          <img 
            src={previewUrl || currentImage} 
            alt="Product" 
            className="object-contain w-full h-full"
          />
        ) : (
          <div className="text-gray-400 flex flex-col items-center">
            <Upload className="h-8 w-8 mb-2" />
            <span>No image</span>
          </div>
        )}
      </div>
      
      <Button variant="outline" className="w-full" asChild>
        <label>
          <Upload className="h-4 w-4 mr-2" />
          Upload Image
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageChange}
          />
        </label>
      </Button>
    </div>
  );
};

export default ImageUploader;
