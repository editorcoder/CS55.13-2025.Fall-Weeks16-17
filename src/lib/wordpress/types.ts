/*
editorcoder
SRJC CS55.13 Fall 2025
Weeks 16-17: Assignment 16: Final Hybrid Mobile App  
types.ts
2025-12-10
*/

// WordPress REST API response types

// ACF Photo object structure
export interface ACFPhoto {
  // Photo URL
  url: string;
  // Optional alt text
  // alt?: string;
  // Optional width
  // width?: number;
  // Optional height
  // height?: number;
}

// ACF Fields for Core Card
export interface ACFCoreCardFields {
  // Optional card title
  title?: string;
  // Optional card type
  type?: string;
  // Optional card subtype
  subtype?: string | null;
  // Optional card cost
  cost?: number | null;
  // Optional catnip stat
  catnip?: number | null;
  // Optional defense stat
  defense?: number | null;
  // Optional attack stat
  attack?: number | null;
  // Optional lives stat
  lives?: number | null;
  // Optional mechanics description
  mechanics?: string | null;
  // Optional lore description
  lore?: string;
  // Optional photo object
  photo?: ACFPhoto;
  // Optional photo artist name
  photo_artist_name?: string;
  // Optional photo artist URL
  photo_artist_url?: string;
  // Optional photo source URL
  photo_source_url?: string;
}

// ACF Fields for Avatar
export interface ACFAvatarFields {
  // Optional avatar title
  title?: string;
  // Optional archetype
  archetype?: string | null;
  // Optional catnip stat
  catnip?: number | null;
  // Optional defense stat
  defense?: number | null;
  // Optional attack stat
  attack?: number | null;
  // Optional lives stat
  lives?: number | null;
  // Optional mechanics description
  mechanics?: string | null;
  // Optional lore description
  lore?: string;
  // Optional photo object
  photo?: ACFPhoto;
  // Optional photo artist name
  photo_artist_name?: string;
  // Optional photo artist URL
  photo_artist_url?: string;
  // Optional photo source URL
  photo_source_url?: string;
}

// ACF Fields for Territory
export interface ACFTerritoryFields {
  // Optional territory title
  title?: string;
  // Optional environment
  environment?: string | null;
  // Optional level
  level?: number | null;
  // Optional mechanics description
  mechanics?: string | null;
  // Optional lore description
  lore?: string;
  // Optional photo object
  photo?: ACFPhoto;
  // Optional photo artist name
  photo_artist_name?: string;
  // Optional photo artist URL
  photo_artist_url?: string;
  // Optional photo source URL
  photo_source_url?: string;
}

// WordPress REST API Post response structure
export interface WordPressPost<T = unknown> {
  // Post ID
  id: number;
  // Post date
  date: string;
  // Post date in GMT
  date_gmt: string;
  // Post GUID object
  guid: {
    // Rendered GUID string
    rendered: string;
  };
  // Last modified date
  modified: string;
  // Last modified date in GMT
  modified_gmt: string;
  // Post slug
  slug: string;
  // Post status
  status: string;
  // Post type
  type: string;
  // Post link
  link: string;
  // Post title object
  title: {
    // Rendered title string
    rendered: string;
  };
  // Post content object
  content: {
    // Rendered content string
    rendered: string;
    // Whether content is protected
    protected: boolean;
  };
  // Post excerpt object
  excerpt: {
    // Rendered excerpt string
    rendered: string;
    // Whether excerpt is protected
    protected: boolean;
  };
  // Author ID
  author: number;
  // Featured media ID
  featured_media: number;
  // Comment status
  comment_status: string;
  // Ping status
  ping_status: string;
  // Whether post is sticky
  sticky: boolean;
  // Template name
  template: string;
  // Post format
  format: string;
  // Meta data array
  meta: unknown[];
  // Category IDs array
  categories: number[];
  // Tag IDs array
  tags: number[];
  // Optional ACF fields
  acf?: T;
}

// Specific WordPress post types
// Type alias for core card post
export type WordPressCoreCardPost = WordPressPost<ACFCoreCardFields>;
// Type alias for avatar post
export type WordPressAvatarPost = WordPressPost<ACFAvatarFields>;
// Type alias for territory post
export type WordPressTerritoryPost = WordPressPost<ACFTerritoryFields>;

// ============================================================================
// Application-level types (transformed data structures used in the UI)
// ============================================================================

// Core Card application type (transformed from WordPress API response)
export interface CoreCard {
  // Card ID or null
  id: string | null;
  // Card title
  title: string;
  // Card type
  type: string;
  // Card subtype or null
  subtype: string | null;
  // Card cost or null
  cost: number | null;
  // Catnip stat or null
  catnip: number | null;
  // Defense stat or null
  defense: number | null;
  // Attack stat or null
  attack: number | null;
  // Lives stat or null
  lives: number | null;
  // Mechanics description or null
  mechanics: string | null;
  // Lore description
  lore: string;
  // Image URL
  imageURL: string;
  // Photo artist name
  photoArtist: string;
  // Photo artist URL
  photoArtistURL: string;
  // Photo source URL
  photoSourceURL: string;
}

// Avatar application type (transformed from WordPress API response)
export interface Avatar {
  // Avatar ID or null
  id: string | null;
  // Avatar title
  title: string;
  // Archetype or null
  archetype: string | null;
  // Catnip stat or null
  catnip: number | null;
  // Defense stat or null
  defense: number | null;
  // Attack stat or null
  attack: number | null;
  // Lives stat or null
  lives: number | null;
  // Mechanics description or null
  mechanics: string | null;
  // Lore description
  lore: string;
  // Image URL
  imageURL: string;
  // Photo artist name
  photoArtist: string;
  // Photo artist URL
  photoArtistURL: string;
  // Photo source URL
  photoSourceURL: string;
}

// Territory application type (transformed from WordPress API response)
export interface Territory {
  // Territory ID or null
  id: string | null;
  // Territory title
  title: string;
  // Environment or null
  environment: string | null;
  // Level or null
  level: number | null;
  // Mechanics description or null
  mechanics: string | null;
  // Lore description
  lore: string;
  // Image URL
  imageURL: string;
  // Photo artist name
  photoArtist: string;
  // Photo artist URL
  photoArtistURL: string;
  // Photo source URL
  photoSourceURL: string;
}
