/*
editorcoder
SRJC CS55.13 Fall 2025
Weeks 16-17: Assignment 16: Final Hybrid Mobile App  
usePhotoGallery.ts
2025-12-09
*/

// Import React hooks for state management and side effects
import { useState, useEffect } from "react";
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

// Custom hook for managing photo gallery
export function usePhotoGallery() {
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

  // Return hook values and functions
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
