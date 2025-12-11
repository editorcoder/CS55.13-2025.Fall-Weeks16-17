/*
editorcoder
SRJC CS55.13 Fall 2025
Weeks 16-17: Assignment 16: Final Hybrid Mobile App  
avatars.ts
2025-12-10
*/

// Import TypeScript types for WordPress API responses and application data structures
import type { WordPressAvatarPost, Avatar } from "./types";

// Define REST endpoint URL
const avatarDataURL =
  "https://dev-basic-headless-cms-app.pantheonsite.io/wp-json/wp/v2/avatar?per_page=100&acf_format=standard";

// Helper function to fetch and parse JSON data from WordPress API
async function fetchAvatarsData(): Promise<WordPressAvatarPost[]> {
  // Declare variable to store parsed JSON data
  let jsonObj: WordPressAvatarPost[]; // Declare variable to store parsed JSON data

  // Attempt to fetch data from API
  try {
    // Get JSON data from REST endpoint using fetch API
    const response = await fetch(avatarDataURL);
    // Check if response is successful
    if (!response.ok) {
      // Throw error if response is not OK
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    // Parse JSON response
    jsonObj = await response.json();
  } catch (error) {
    // Handle request errors
    jsonObj = []; // Set empty array as fallback
    console.log(error); // Log error for debugging
  }

  return jsonObj; // Return parsed JSON data
}

// Return all avatar info, sorted by title alphabetically (client-side)
export async function getSortedAvatarsData(): Promise<Avatar[]> {
  // Read avatars and return metadata sorted by title
  const jsonObj = await fetchAvatarsData(); // Fetch avatars data from API

  // Sort function to compare avatars by title
  jsonObj.sort(function (a, b) {
    // Get title A with fallback to empty string
    const titleA = a.acf?.title || "";
    // Get title B with fallback to empty string
    const titleB = b.acf?.title || "";
    // Compare titles using locale-aware string comparison
    return titleA.localeCompare(titleB); 
  }); // End sort function

  // Map each avatar to simplified data structure
  const avatarData = jsonObj.map((item) => {
    return {
      // Return simplified avatar object
      id: item.id ? item.id.toString() : null, // Convert id to string
      title: item.acf?.title || "", // Avatar title
      archetype: item.acf?.archetype || null, // Avatar archetype
      catnip: item.acf?.catnip || null, // Catnip value
      defense: item.acf?.defense || null, // Defense value
      attack: item.acf?.attack || null, // Attack value
      lives: item.acf?.lives || null, // Lives value
      mechanics: item.acf?.mechanics || null, // Mechanics description
      lore: item.acf?.lore || "", // Lore description
      imageURL: item.acf?.photo?.url || "", // WordPress media image URL (from ACF photo object)
      photoArtist: item.acf?.photo_artist_name || "", // Photo artist name
      photoArtistURL: item.acf?.photo_artist_url || "", // Photo artist URL
      photoSourceURL: item.acf?.photo_source_url || "", // Photo source URL
    }; // End return object
  }); // End map function

  return avatarData; // Return array of avatar objects
}

// Return specific avatar data (client-side)
export async function getAvatarData(id: string | number): Promise<Avatar> {
  // Read one avatar and return data plus metadata
  const jsonObj = await fetchAvatarsData(); 
  // Filter array to find matching avatar
  const objMatch = jsonObj.filter((obj) => {
    // Filter array to find avatar with matching ID
    return (
      obj.id === parseInt(id.toString()) ||
      obj.id.toString() === id.toString()
    ); // Compare avatar id with requested id (handle both string and number)
  }); // End filter function

  // extract object value in filtered array if any
  let objReturned: WordPressAvatarPost; // Declare variable to store matched avatar object
  // Check if match was found
  if (objMatch.length > 0) {
    // Check if matching avatar was found
    objReturned = objMatch[0]; // Use first matching avatar
  } else {
    // Handle case when no avatar matches
    objReturned = {} as WordPressAvatarPost; // Set empty object as fallback
  } // End if-else block

  // Return transformed avatar data
  return {
    // Return avatar data object
    id: objReturned.id ? objReturned.id.toString() : null, // Convert id to string or use null
    title: objReturned.acf?.title || "", // Avatar title
    archetype: objReturned.acf?.archetype || null, // Avatar archetype
    catnip: objReturned.acf?.catnip || null, // Catnip value
    defense: objReturned.acf?.defense || null, // Defense value
    attack: objReturned.acf?.attack || null, // Attack value
    lives: objReturned.acf?.lives || null, // Lives value
    mechanics: objReturned.acf?.mechanics || null, // Mechanics description
    lore: objReturned.acf?.lore || "", // Lore description
    imageURL: objReturned.acf?.photo?.url || "", // WordPress media image URL (from ACF photo object)
    photoArtist: objReturned.acf?.photo_artist_name || "", // Photo artist name
    photoArtistURL: objReturned.acf?.photo_artist_url || "", // Photo artist URL
    photoSourceURL: objReturned.acf?.photo_source_url || "", // Photo source URL
  }; // End return object
}

