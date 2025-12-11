/*
editorcoder
SRJC CS55.13 Fall 2025
Weeks 16-17: Assignment 16: Final Hybrid Mobile App  
useProfile.ts
2025-12-09
*/

// Import React hooks for state management and side effects
import { useState, useEffect } from "react";
// Import Capacitor Preferences plugin
import { Preferences } from "@capacitor/preferences";

// Define interface for user profile data
export interface ProfileData {
  // User's display title
  title: string;
  // User's lore/description
  lore: string;
  // Defense stat value
  defense: number;
  // Attack stat value
  attack: number;
  // Lives stat value
  lives: number;
  // Path to profile photo
  photoPath: string;
}

// Define storage key for profile data
const PROFILE_STORAGE = "userProfile";

// Define default profile data
export const DEFAULT_PROFILE: ProfileData = {
  // Set default title
  title: "User Name",
  // Set default lore text
  lore: "Born from whispers of forgotten realms and veiled constellations, this avatar's true beginnings remain shrouded in mystery.",
  // Set default defense value
  defense: 2,
  // Set default attack value
  attack: 2,
  // Set default lives value
  lives: 15,
  // Set default photo path
  photoPath: "/lukas-parnican-uDO05hIt1Kk-unsplash (Small).jpg",
};

// Define default archetype value
export const DEFAULT_ARCHETYPE: "Indoor" | "Outdoor" | "In-or-Out" = "In-or-Out";

// Custom hook for managing user profile
export function useProfile() {
  // Initialize profile state with default profile
  const [profile, setProfile] = useState<ProfileData>(DEFAULT_PROFILE);

  // Load profile from storage on mount
  useEffect(() => {
    // Async function to load saved profile
    const loadProfile = async () => {
      // Get profile data from preferences storage
      const { value: profileData } = await Preferences.get({
        key: PROFILE_STORAGE,
      });
      // Check if profile data exists
      if (profileData) {
        // Parse JSON string to ProfileData object
        const parsedProfile = JSON.parse(profileData) as ProfileData;
        // Update profile state with loaded data
        setProfile(parsedProfile);
      } else {
        // Use default profile if no saved data exists
        setProfile(DEFAULT_PROFILE);
      }
    };

    // Call load function
    loadProfile();
  }, []);

  // Function to save profile data
  const saveProfile = async (profileData: ProfileData) => {
    // Update profile state immediately
    setProfile(profileData);
    // Save profile data to preferences storage
    await Preferences.set({
      key: PROFILE_STORAGE,
      value: JSON.stringify(profileData),
    });
  };

  // Return profile state and save function
  return {
    profile,
    saveProfile,
  };
}

