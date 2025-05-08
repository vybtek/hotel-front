"use client";

import { createContext, useContext, useState, useEffect } from "react";

// Create context to share gallery data across components
const HotelGalleryContext = createContext();

export function HotelGalleryProvider({ children }) {
  // Main gallery state with proper categorization
  const [galleryImages, setGalleryImages] = useState([
    {
      id: "cover-1",
      src: "https://asiatech-channel-manager-document-new.s3.amazonaws.com/hotel/8615/gallery/img_67dbf662999265.69158994.jpg",
      type: "Hotel Cover Photo",
      priority: 0,
    },
    {
      id: "deluxe-king-1",
      src: "https://asiatech-channel-manager-document-new.s3.amazonaws.com/hotel/8615/gallery/img_67f239ae6f5d39.19989277.jpg",
      type: "Deluxe Room with King Bed",
      priority: 1,
    },
    {
      id: "deluxe-twin-1",
      src: "https://asiatech-channel-manager-document-new.s3.amazonaws.com/hotel/8615/gallery/img_67dbf675553a42.07548082.jpg",
      type: "Deluxe Room with Twin Beds",
      priority: 2,
    },
    {
      id: "hotel-1",
      src: "https://asiatech-channel-manager-document-new.s3.amazonaws.com/hotel/8615/gallery/img_67dbf661279be4.49856276.jpg",
      type: "Hotel Image",
      priority: 3,
    },
    {
      id: "vista-1",
      src: "https://asiatech-channel-manager-document-new.s3.amazonaws.com/hotel/8615/gallery/img_67dd62e33f2cf3.40532551.jpg",
      type: "Deluxe Vista Room with King Bed",
      priority: 4,
    },
    {
      id: "premium-1",
      src: "https://asiatech-channel-manager-document-new.s3.amazonaws.com/hotel/8615/gallery/img_67dea6732794d0.12333665.jpg",
      type: "Premium room with King Bed and Private Terrace",
      priority: 5,
    },
    {
      id: "hotel-2",
      src: "https://asiatech-channel-manager-document-new.s3.amazonaws.com/hotel/8615/gallery/img_67dea5e59f6391.72580217.jpg",
      type: "Hotel Image",
      priority: 6,
    },
    {
      id: "hotel-3",
      src: "https://asiatech-channel-manager-document-new.s3.amazonaws.com/hotel/8615/gallery/img_67e3f70487ad95.04425230.jpg",
      type: "Hotel Image",
      priority: 7,
    },
    {
      id: "deluxe-king-2",
      src: "https://asiatech-channel-manager-document-new.s3.amazonaws.com/hotel/8615/gallery/img_67f235a122b582.44872500.jpg",
      type: "Deluxe Room with King Bed",
      priority: 8,
    },
    {
      id: "premium-2",
      src: "https://asiatech-channel-manager-document-new.s3.amazonaws.com/hotel/8615/gallery/img_67f235a2347eb0.26997671.jpeg",
      type: "Premium room with King Bed and Private Terrace",
      priority: 9,
    },
  ]);

  // Available image categories
  const photoTypes = [
    "Hotel Cover Photo",
    "Hotel Image",
    "Hotel Logo",
    "Deluxe Room with Twin Beds",
    "Premium room with King Bed and Private Terrace",
    "Deluxe Room with King Bed",
    "Deluxe Vista Room with King Bed",
  ];

  // Methods to update gallery
  const addImages = (newImages) => {
    if (newImages.length + galleryImages.length > 16) {
      throw new Error("Gallery can only contain a maximum of 16 images");
    }

    setGalleryImages((prev) => [
      ...prev,
      ...newImages.map((img, index) => ({
        ...img,
        priority: Math.max(...prev.map((i) => i.priority), 0) + index + 1,
      })),
    ]);
  };

  const removeImage = (id) => {
    setGalleryImages((prev) => prev.filter((img) => img.id !== id));
  };

  const updateImageType = (id, type) => {
    setGalleryImages((prev) =>
      prev.map((img) => (img.id === id ? { ...img, type } : img))
    );
  };

  const updateImagePriority = (id, newPriority) => {
    setGalleryImages((prev) => {
      const updatedImages = [...prev];
      const imageIndex = updatedImages.findIndex((img) => img.id === id);

      if (imageIndex !== -1) {
        updatedImages[imageIndex] = {
          ...updatedImages[imageIndex],
          priority: newPriority,
        };
      }

      return updatedImages.sort((a, b) => a.priority - b.priority);
    });
  };

  // Get images by type
  const getImagesByType = (type) => {
    if (type === "All")
      return galleryImages.sort((a, b) => a.priority - b.priority);
    return galleryImages
      .filter((img) => img.type === type)
      .sort((a, b) => a.priority - b.priority);
  };

  // Context value
  const value = {
    galleryImages: galleryImages.sort((a, b) => a.priority - b.priority),
    photoTypes,
    getImagesByType,
    addImages,
    removeImage,
    updateImageType,
    updateImagePriority,
  };

  return (
    <HotelGalleryContext.Provider value={value}>
      {children}
    </HotelGalleryContext.Provider>
  );
}

export function useHotelGallery() {
  const context = useContext(HotelGalleryContext);
  if (context === undefined) {
    throw new Error(
      "useHotelGallery must be used within a HotelGalleryProvider"
    );
  }
  return context;
}

// useEffect(() => {
//   async function fetchGalleryImages() {
//     try {
//       const response = await fetch('/api/hotel-gallery');
//       const data = await response.json();
//       setGalleryImages(data);
//     } catch (error) {
//       console.error('Error fetching gallery images:', error);
//     }
//   }

//   fetchGalleryImages();
// }, []);
