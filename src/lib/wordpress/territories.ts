/*
editorcoder
SRJC CS55.13 Fall 2025
Weeks 16-17: Assignment 16: Final Hybrid Mobile App  
territories.ts
2025-12-10
*/

// Import TypeScript types for WordPress API responses and application data structures
import type { WordPressTerritoryPost, Territory } from "./types";

// Define REST endpoint URL
const territoryDataURL =
  "https://dev-basic-headless-cms-app.pantheonsite.io/wp-json/wp/v2/territory?per_page=100&acf_format=standard";

// Helper function to fetch and parse JSON data from WordPress API
async function fetchTerritoriesData(): Promise<WordPressTerritoryPost[]> {
  // Declare variable to store parsed JSON data
  let jsonObj: WordPressTerritoryPost[]; // Declare variable to store parsed JSON data

  // Attempt to fetch data from API
  try {
    // Get JSON data from REST endpoint using fetch API
    const response = await fetch(territoryDataURL);
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

// Return all territory info, sorted by title alphabetically (client-side)
export async function getSortedTerritoriesData(): Promise<Territory[]> {
  // Read territories and return metadata sorted by title
  const jsonObj = await fetchTerritoriesData();
  // Sort function to compare territories by title
  jsonObj.sort(function (a, b) {
    // Get title A with fallback to empty string
    const titleA = a.acf?.title || "";
    // Get title B with fallback to empty string
    const titleB = b.acf?.title || "";
    // Compare titles using locale-aware string comparison
    return titleA.localeCompare(titleB);
  }); // End sort function

  // Map each territory to simplified data structure
  const territoryData = jsonObj.map((item) => {
    return {
      // Return simplified territory object
      id: item.id ? item.id.toString() : null, // Convert id to string
      title: item.acf?.title || "", // Territory title
      environment: item.acf?.environment || null, // Territory environment
      level: item.acf?.level || null, // Territory level
      mechanics: item.acf?.mechanics || null, // Mechanics description
      lore: item.acf?.lore || "", // Lore description
      imageURL: item.acf?.photo?.url || "", // WordPress media image URL (from ACF photo object)
      photoArtist: item.acf?.photo_artist_name || "", // Photo artist name
      photoArtistURL: item.acf?.photo_artist_url || "", // Photo artist URL
      photoSourceURL: item.acf?.photo_source_url || "", // Photo source URL
    }; // End return object
  }); // End map function

  return territoryData; // Return array of territory objects
}

// Return specific territory data (client-side)
export async function getTerritoryData(id: string | number): Promise<Territory> {
  // Read one territory and return data plus metadata
  const jsonObj = await fetchTerritoriesData(); // Fetch territories data from API
  // Filter array to find matching territory
  const objMatch = jsonObj.filter((obj) => {
    // Filter array to find territory with matching ID
    return (
      obj.id === parseInt(id.toString()) ||
      obj.id.toString() === id.toString()
    ); // Compare territory id with requested id (handle both string and number)
  }); // End filter function

  // extract object value in filtered array if any
  let objReturned: WordPressTerritoryPost; // Declare variable to store matched territory object
  // Check if match was found
  if (objMatch.length > 0) {
    // Check if matching territory was found
    objReturned = objMatch[0]; // Use first matching territory
  } else {
    // Handle case when no territory matches
    objReturned = {} as WordPressTerritoryPost; // Set empty object as fallback
  } // End if-else block

  // Return transformed territory data
  return {
    // Return territory data object
    id: objReturned.id ? objReturned.id.toString() : null, // Convert id to string or use null
    title: objReturned.acf?.title || "", // Territory title
    environment: objReturned.acf?.environment || null, // Territory environment
    level: objReturned.acf?.level || null, // Territory level
    mechanics: objReturned.acf?.mechanics || null, // Mechanics description
    lore: objReturned.acf?.lore || "", // Lore description
    imageURL: objReturned.acf?.photo?.url || "", // WordPress media image URL (from ACF photo object)
    photoArtist: objReturned.acf?.photo_artist_name || "", // Photo artist name
    photoArtistURL: objReturned.acf?.photo_artist_url || "", // Photo artist URL
    photoSourceURL: objReturned.acf?.photo_source_url || "", // Photo source URL
  }; // End return object
}

