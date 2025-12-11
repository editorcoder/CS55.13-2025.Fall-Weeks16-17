/*
editorcoder
SRJC CS55.13 Fall 2025
Weeks 16-17: Assignment 16: Final Hybrid Mobile App  
usePhotoGallery.ts
2025-12-10
*/

// Custom hook for managing photo gallery
// This hook now uses the PhotoGalleryContext to share state across components

// Import custom hook from context
import { usePhotoGalleryContext } from "../contexts/PhotoGalleryContext";

// Custom hook for managing photo gallery
// This maintains backward compatibility with existing components
export function usePhotoGallery() {
  // Get photo gallery context values
  const { photos, addNewToGallery, deletePhoto } = usePhotoGalleryContext();

  // Return hook values and functions (same API as before)
  return {
    addNewToGallery,
    photos,
    deletePhoto,
  };
}
// Define interface for user photo data
export interface UserPhoto {
  // File path to photo
  filepath: string;
  // Optional webview path for displaying photo
  webviewPath?: string;
}
