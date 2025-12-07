/*
editorcoder
SRJC CS55.13 Fall 2025
Weeks 16-17: Assignment 16: Final Hybrid Mobile App  
core-cards.ts
2025-12-07
*/

import type { WordPressCoreCardPost, CoreCard } from "./types";

// Define REST endpoint URL
const coreCardDataURL =
  "https://dev-basic-headless-cms-app.pantheonsite.io/wp-json/wp/v2/core-card?per_page=100&acf_format=standard";

// Helper function to fetch and parse JSON data from WordPress API
async function fetchCoreCardsData(): Promise<WordPressCoreCardPost[]> {
  let jsonObj: WordPressCoreCardPost[]; // Declare variable to store parsed JSON data

  try {
    // Get JSON data from REST endpoint using fetch API
    const response = await fetch(coreCardDataURL);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    jsonObj = await response.json();
  } catch (error) {
    // Handle request errors
    jsonObj = []; // Set empty array as fallback
    console.log(error); // Log error for debugging
  }

  return jsonObj; // Return parsed JSON data
}

// Return all core card info, sorted by title alphabetically (client-side)
export async function getSortedCoreCardsData(): Promise<CoreCard[]> {
  // Read core cards and return metadata sorted by title
  const jsonObj = await fetchCoreCardsData(); // Fetch core cards data from API

  // Sort array by title alphabetically
  jsonObj.sort(function (a, b) {
    // Sort array by title in alphabetical order
    const titleA = a.acf?.title || "";
    const titleB = b.acf?.title || "";
    return titleA.localeCompare(titleB); // Compare titles using locale-aware string comparison
  }); // End sort function

  // Process all core cards and get their image URLs
  const coreCardData = jsonObj.map((item) => {
    return {
      // Return simplified core card object
      id: item.id ? item.id.toString() : null, // Convert id to string
      title: item.acf?.title || "", // Core card title
      type: item.acf?.type || "", // Core Card type
      subtype: item.acf?.subtype || null, // Core card subtype
      cost: item.acf?.cost || null, // Card cost
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

  return coreCardData; // Return array of core card objects
}

// Return specific core card data (client-side)
export async function getCoreCardData(id: string | number): Promise<CoreCard> {
  // Read one core card and return data plus metadata
  const jsonObj = await fetchCoreCardsData(); // Fetch core cards data from API

  // find object value in array that has matching id
  const objMatch = jsonObj.filter((obj) => {
    // Filter array to find core card with matching ID
    return (
      obj.id === parseInt(id.toString()) ||
      obj.id.toString() === id.toString()
    ); // Compare core card id with requested id (handle both string and number)
  }); // End filter function

  // extract object value in filtered array if any
  let objReturned: WordPressCoreCardPost; // Declare variable to store matched core card object
  if (objMatch.length > 0) {
    // Check if matching core card was found
    objReturned = objMatch[0]; // Use first matching core card
  } else {
    // Handle case when no core card matches
    objReturned = {} as WordPressCoreCardPost; // Set empty object as fallback
  } // End if-else block

  return {
    // Return core card data object
    id: objReturned.id ? objReturned.id.toString() : null, // Convert id to string or use null
    title: objReturned.acf?.title || "", // Core card title
    type: objReturned.acf?.type || "", // Core card type
    subtype: objReturned.acf?.subtype || null, // Core card subtype
    cost: objReturned.acf?.cost || null, // Core card cost
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

