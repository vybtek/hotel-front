"use client";

import { useState } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useHotelGallery } from "../../../context/HotelGalleryContext/HotelGalleryContext";

const DraggableGalleryItem = ({ img, index, moveImage }) => {
  const { removeImage, updateImageType, photoTypes } = useHotelGallery();

  const [{ isDragging }, drag] = useDrag({
    type: "GALLERY_ITEM",
    item: { id: img.id, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: "GALLERY_ITEM",
    hover: (draggedItem) => {
      if (draggedItem.index !== index) {
        moveImage(draggedItem.index, index);
        draggedItem.index = index;
      }
    },
  });

  return (
    <div
      ref={(node) => drag(drop(node))}
      className={`relative border rounded-lg overflow-hidden shadow-sm bg-gray-100 transition ${
        isDragging ? "opacity-50" : "hover:shadow-md"
      }`}
    >
      <button
        onClick={() => removeImage(img.id)}
        className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600 transition"
        title="Remove Image"
      >
        ×
      </button>

      <div className="absolute top-2 left-2 bg-indigo-600 text-white text-xs px-2 py-1 rounded-full">
        Priority: {img.priority}
      </div>

      <img
        src={img.src}
        alt={img.type || "Uploaded image"}
        className="w-full h-48 object-cover"
      />

      <div className="p-3 bg-gray-200">
        <select
          value={img.type}
          onChange={(e) => updateImageType(img.id, e.target.value)}
          className="w-full p-2 text-gray-700 rounded-md border focus:ring-2 focus:ring-blue-400"
        >
          <option value="">Select Type</option>
          {photoTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default function PhotoGalleryPage() {
  const {
    galleryImages,
    photoTypes,
    addImages,
    updateImagePriority,
    getImagesByType,
  } = useHotelGallery();

  const [selectedFiles, setSelectedFiles] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState("All");

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setSelectedFiles(files);
  };

  const handleUpload = () => {
    if (selectedFiles.length + galleryImages.length > 16) {
      alert("Only 16 photos can be added in the system.");
      return;
    }

    const newImages = selectedFiles.map((file) => ({
      id: crypto.randomUUID(), // Generate unique ID
      src: URL.createObjectURL(file),
      type: "",
      priority:
        galleryImages.length > 0
          ? Math.max(...galleryImages.map((img) => img.priority)) + 1
          : 0,
    }));

    try {
      addImages(newImages);
      setSelectedFiles([]);
    } catch (error) {
      alert(error.message);
    }
  };

  // Move image function for drag and drop reordering
  const moveImage = (fromIndex, toIndex) => {
    const filteredImages = getImagesByType(selectedFilter);
    const draggedImage = filteredImages[fromIndex];
    const targetImage = filteredImages[toIndex];

    if (draggedImage && targetImage) {
      // Swap priorities
      updateImagePriority(draggedImage.id, targetImage.priority);
      updateImagePriority(targetImage.id, draggedImage.priority);
    }
  };

  // Get filtered images
  const filteredImages = getImagesByType(selectedFilter);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header & Filter Section */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h1 className="text-2xl font-bold mb-4 text-gray-800">
            Hotel Photo Gallery
          </h1>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-semibold text-gray-700">
                Filter by Category
              </h2>
              <div className="mt-2">
                <select
                  value={selectedFilter}
                  onChange={(e) => setSelectedFilter(e.target.value)}
                  className="p-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
                >
                  <option value="All">All Photos</option>
                  {photoTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="text-gray-600 bg-blue-50 p-3 rounded-lg">
              <p className="font-medium">
                Current Selection: {filteredImages.length} photos
              </p>
              <p className="text-sm">
                {galleryImages.length} total in system (max: 16)
              </p>
            </div>
          </div>
        </div>

        {/* Upload Section */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">
            PHOTO GALLERY UPLOAD
          </h2>

          <div className="flex flex-col space-y-4">
            <input
              type="file"
              multiple
              accept=".jpg,.jpeg,.png,.gif"
              onChange={handleFileChange}
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4
                file:rounded-full file:border-0
                file:text-sm file:font-semibold
                file:bg-blue-50 file:text-blue-700
                hover:file:bg-blue-100"
            />

            <p className="text-gray-600 text-sm">
              Image size should not be more than 500KB. We accept .jpg, .jpeg,
              .gif, and .png files only. Only 16 photos can be added.
            </p>

            <button
              onClick={handleUpload}
              className="w-fit bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg transition"
              disabled={selectedFiles.length === 0}
            >
              Upload Photo
            </button>
          </div>
        </div>

        {/* Gallery Display */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">
            {selectedFilter === "All"
              ? "ALL IMAGES"
              : selectedFilter.toUpperCase()}
          </h2>

          <p className="text-gray-600 mb-4">
            Drag and drop images to reorder their priority. Lower priority
            numbers appear first in the gallery.
          </p>

          {filteredImages.length === 0 ? (
            <p className="text-gray-500 py-8 text-center">
              No images found in this category.
            </p>
          ) : (
            <DndProvider backend={HTML5Backend}>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {filteredImages.map((img, index) => (
                  <DraggableGalleryItem
                    key={img.id}
                    img={img}
                    index={index}
                    moveImage={moveImage}
                  />
                ))}
              </div>
            </DndProvider>
          )}
        </div>
      </div>
    </div>
  );
}
