/*
editorcoder
SRJC CS55.13 Fall 2025
Weeks 16-17: Assignment 16: Final Hybrid Mobile App  
types.ts
2025-12-07
*/

// WordPress REST API response types

// ACF Photo object structure
export interface ACFPhoto {
  url: string;
  alt?: string;
  width?: number;
  height?: number;
}

// ACF Fields for Core Card
export interface ACFCoreCardFields {
  title?: string;
  type?: string;
  subtype?: string | null;
  cost?: number | null;
  catnip?: number | null;
  defense?: number | null;
  attack?: number | null;
  lives?: number | null;
  mechanics?: string | null;
  lore?: string;
  photo?: ACFPhoto;
  photo_artist_name?: string;
  photo_artist_url?: string;
  photo_source_url?: string;
}

// ACF Fields for Avatar
export interface ACFAvatarFields {
  title?: string;
  archetype?: string | null;
  catnip?: number | null;
  defense?: number | null;
  attack?: number | null;
  lives?: number | null;
  mechanics?: string | null;
  lore?: string;
  photo?: ACFPhoto;
  photo_artist_name?: string;
  photo_artist_url?: string;
  photo_source_url?: string;
}

// ACF Fields for Territory
export interface ACFTerritoryFields {
  title?: string;
  environment?: string | null;
  level?: number | null;
  mechanics?: string | null;
  lore?: string;
  photo?: ACFPhoto;
  photo_artist_name?: string;
  photo_artist_url?: string;
  photo_source_url?: string;
}

// WordPress REST API Post response structure
export interface WordPressPost<T = unknown> {
  id: number;
  date: string;
  date_gmt: string;
  guid: {
    rendered: string;
  };
  modified: string;
  modified_gmt: string;
  slug: string;
  status: string;
  type: string;
  link: string;
  title: {
    rendered: string;
  };
  content: {
    rendered: string;
    protected: boolean;
  };
  excerpt: {
    rendered: string;
    protected: boolean;
  };
  author: number;
  featured_media: number;
  comment_status: string;
  ping_status: string;
  sticky: boolean;
  template: string;
  format: string;
  meta: unknown[];
  categories: number[];
  tags: number[];
  acf?: T;
}

// Specific WordPress post types
export type WordPressCoreCardPost = WordPressPost<ACFCoreCardFields>;
export type WordPressAvatarPost = WordPressPost<ACFAvatarFields>;
export type WordPressTerritoryPost = WordPressPost<ACFTerritoryFields>;

// ============================================================================
// Application-level types (transformed data structures used in the UI)
// ============================================================================

// Core Card application type (transformed from WordPress API response)
export interface CoreCard {
  id: string | null;
  title: string;
  type: string;
  subtype: string | null;
  cost: number | null;
  catnip: number | null;
  defense: number | null;
  attack: number | null;
  lives: number | null;
  mechanics: string | null;
  lore: string;
  imageURL: string;
  photoArtist: string;
  photoArtistURL: string;
  photoSourceURL: string;
}

// Avatar application type (transformed from WordPress API response)
export interface Avatar {
  id: string | null;
  title: string;
  archetype: string | null;
  catnip: number | null;
  defense: number | null;
  attack: number | null;
  lives: number | null;
  mechanics: string | null;
  lore: string;
  imageURL: string;
  photoArtist: string;
  photoArtistURL: string;
  photoSourceURL: string;
}

// Territory application type (transformed from WordPress API response)
export interface Territory {
  id: string | null;
  title: string;
  environment: string | null;
  level: number | null;
  mechanics: string | null;
  lore: string;
  imageURL: string;
  photoArtist: string;
  photoArtistURL: string;
  photoSourceURL: string;
}

