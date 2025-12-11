/*
editorcoder
SRJC CS55.13 Fall 2025
Weeks 16-17: Assignment 16: Final Hybrid Mobile App  
PhotoGalleryContext.tsx
2025-12-10
*/

// Photo Gallery Context

// Import React hooks for context and state management
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
// Import Capacitor Camera plugin
import { Camera, CameraResultType, CameraSource } from "@capacitor/camera";
// Import TypeScript types
import type { Photo } from "@capacitor/camera";
// Import Capacitor Filesystem plugin
import { Filesystem, Directory } from "@capacitor/filesystem";
// Import Capacitor Preferences plugin
import { Preferences } from "@capacitor/preferences";
// Import Ionic React utilities
import { isPlatform } from "@ionic/react";
// Import Capacitor core utilities
import { Capacitor } from "@capacitor/core";
// Import UserPhoto interface
import type { UserPhoto } from "../hooks/usePhotoGallery";

// Define context type for photo gallery
interface PhotoGalleryContextType {
  // Array of photos
  photos: UserPhoto[];
  // Function to add new photo to gallery
  addNewToGallery: () => Promise<void>;
  // Function to delete photo from gallery
  deletePhoto: (filepath: string) => Promise<void>;
}

// Create context with undefined default value
const PhotoGalleryContext = createContext<PhotoGalleryContextType | undefined>(
  undefined
);

// Photo Gallery Provider component
export function PhotoGalleryProvider({ children }: { children: ReactNode }) {
  // Initialize photos state with empty array
  const [photos, setPhotos] = useState<UserPhoto[]>([]);

  // Add a key for photo storage
  const PHOTO_STORAGE = "photos";

  // Load saved photos on component mount
  useEffect(() => {
    // Async function to load saved photos from storage
    const loadSaved = async () => {
      // Get photo list from preferences storage
      const { value: photoList } = await Preferences.get({
        key: PHOTO_STORAGE,
      });
      // Parse photo list from JSON or use empty array
      const photosInPreferences = (
        photoList ? JSON.parse(photoList) : []
      ) as UserPhoto[];

      // If running on the web...
      if (!isPlatform("hybrid")) {
        // Process each photo for web platform
        for (const photo of photosInPreferences) {
          // Read photo file from filesystem
          const readFile = await Filesystem.readFile({
            path: photo.filepath,
            directory: Directory.Data,
          });
          // Display the photo by reading into base64 format
          photo.webviewPath = `data:image/jpeg;base64,${readFile.data}`;
        }
      }

      // Update photos state with loaded photos
      setPhotos(photosInPreferences);
    };

    // Call load function
    loadSaved();
  }, []);

  // Function to convert blob to base64 string
  const convertBlobToBase64 = (blob: Blob) => {
    // Return promise that resolves with base64 string
    return new Promise((resolve, reject) => {
      // Create FileReader instance
      const reader = new FileReader();
      // Handle read errors
      reader.onerror = reject;
      // Handle successful read
      reader.onload = () => {
        // Resolve with reader result
        resolve(reader.result);
      };
      // Read blob as data URL (base64)
      reader.readAsDataURL(blob);
    });
  };

  // Function to save photo to filesystem
  const savePicture = async (
    photo: Photo,
    fileName: string
  ): Promise<UserPhoto> => {
    // Fetch the photo, read as a blob, then convert to base64 format
    let base64Data: string | Blob;
    // "hybrid" will detect mobile - iOS or Android
    if (isPlatform("hybrid")) {
      // Read photo file from filesystem on hybrid platform
      const readFile = await Filesystem.readFile({
        path: photo.path!,
      });
      // Use file data directly
      base64Data = readFile.data;
    } else {
      // Fetch the photo, read as a blob, then convert to base64 format
      // Fetch photo from web path
      const response = await fetch(photo.webPath!);
      // Convert response to blob
      const blob = await response.blob();
      // Convert blob to base64 string
      base64Data = (await convertBlobToBase64(blob)) as string;
    }

    // Write photo file to filesystem
    const savedFile = await Filesystem.writeFile({
      path: fileName,
      data: base64Data,
      directory: Directory.Data,
    });

    // Platform check
    if (isPlatform("hybrid")) {
      // Display the new image by rewriting the 'file://' path to HTTP
      return {
        filepath: savedFile.uri,
        webviewPath: Capacitor.convertFileSrc(savedFile.uri),
      };
    } else {
      // Use webPath to display the new image instead of base64 since it's already loaded into memory
      return {
        filepath: fileName,
        webviewPath: photo.webPath,
      };
    }
  };

  // Function to add new photo to gallery
  const addNewToGallery = async () => {
    // Take a photo
    const capturedPhoto = await Camera.getPhoto({
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera,
      quality: 100,
    });

    // Create the `fileName` with current timestamp
    const fileName = Date.now() + ".jpeg";
    // Save the picture and add it to photo collection
    const savedImageFile = await savePicture(capturedPhoto, fileName);
    // Update state with new photo
    const newPhotos = [savedImageFile, ...photos];
    setPhotos(newPhotos);

    // Add method to cache all photo data for future retrieval
    Preferences.set({ key: PHOTO_STORAGE, value: JSON.stringify(newPhotos) });
  };

  // Function to delete photo from gallery
  const deletePhoto = async (filepath: string) => {
    // Remove the photo from state
    const updatedPhotos = photos.filter((photo) => photo.filepath !== filepath);
    setPhotos(updatedPhotos);

    // Delete the file from Filesystem
    try {
      // Extract the filename from the filepath
      // For hybrid platforms, filepath is a full URI, need to extract filename
      // For web platforms, filepath is just the filename
      let fileName: string;
      if (isPlatform("hybrid")) {
        // Extract filename from URI (e.g., "file:///path/to/1234567890.jpeg" -> "1234567890.jpeg")
        fileName = filepath.split("/").pop() || filepath;
      } else {
        fileName = filepath;
      }

      await Filesystem.deleteFile({
        path: fileName,
        directory: Directory.Data,
      });
    } catch (error) {
      // If file deletion fails, still update the state and preferences
      // This handles cases where the file might not exist
      console.error("Error deleting file:", error);
    }

    // Update Preferences storage with the updated photo list
    Preferences.set({ key: PHOTO_STORAGE, value: JSON.stringify(updatedPhotos) });
  };

  // Create context value
  const value: PhotoGalleryContextType = {
    photos,
    addNewToGallery,
    deletePhoto,
  };

  // Return provider with context value
  return (
    <PhotoGalleryContext.Provider value={value}>
      {children}
    </PhotoGalleryContext.Provider>
  );
}

// Custom hook to use photo gallery context
export function usePhotoGalleryContext() {
  // Get context value
  const context = useContext(PhotoGalleryContext);
  // Throw error if hook is used outside provider
  if (context === undefined) {
    throw new Error(
      "usePhotoGalleryContext must be used within a PhotoGalleryProvider"
    );
  }
  // Return context value
  return context;
}

