Photo Gallery page content:
const handleUpload = async () => {
  if (selectedFiles.length + galleryImages.length > 16) {
    alert("Only 16 photos can be added in the system.");
    return;
  }

  const formData = new FormData();
  selectedFiles.forEach(file => {
    formData.append('images', file);
  });

  try {
    const response = await fetch('/api/upload-images', {
      method: 'POST',
      body: formData,
    });

    const uploadedImages = await response.json();
    addImages(uploadedImages);
    setSelectedFiles([]);
  } catch (error) {
    alert('Error uploading images: ' + error.message);
  }
};

Draggable gallery item component