/*
editorcoder
SRJC CS55.13 Fall 2025
Weeks 16-17: Assignment 16: Final Hybrid Mobile App  
CardListings.tsx
2025-12-09
*/

// Card listings component

// Import React hooks
import { useState, useEffect, useRef } from "react";
// Import React Router hooks
import { useHistory, useLocation, Link } from "react-router-dom";
// Import CardFilters component
import CardFilters, { FilterState } from "./CardFilters";
// Import Card CSS styles
import styles from "./Card.module.css";
// Import TypeScript types
import type { CoreCard, Avatar, Territory } from "../lib/wordpress/types";

// Union type for card items
type CardItem = CoreCard | Avatar | Territory;

// Interface for card listings component props
interface CardListingsProps {
  // Optional initial core cards array
  initialCards?: CoreCard[];
  // Optional initial avatars array
  initialAvatars?: Avatar[];
  // Optional initial territories array
  initialTerritories?: Territory[];
}

// Helper function to build query string from filters
function buildFilterQueryString(filters: FilterState): string {
  // Create new URLSearchParams object for building query string
  const queryParams = new URLSearchParams();

  // Iterate through all filter entries
  // Loop through each filter key-value pair
  for (const [key, value] of Object.entries(filters)) {
    // Skip empty strings and default sort value
    if (value === "" || value === "title") {
      continue;
    }

    // Handle contentType - always add if not default
    if (key === "contentType") {
      if (value !== "Core Cards") {
        queryParams.append(key, String(value));
      }
      continue;
    }

    // Handle type filters - only add if false (unchecked)
    if (key === "typeAbility" || key === "typeItem" || key === "typeUnit") {
      // Only add to query params if filter is disabled
      if (value === false) {
        queryParams.append(key, "false");
      }
      continue;
    }

    // Handle archetype filters - only add if false (unchecked)
    if (
      key === "archetypeIndoor" ||
      key === "archetypeOutdoor" ||
      key === "archetypeInOrOut"
    ) {
      // Only add to query params if filter is disabled
      if (value === false) {
        queryParams.append(key, "false");
      }
      continue;
    }

    // Handle environment filters - only add if false (unchecked)
    if (key === "environmentIndoor" || key === "environmentOutdoor") {
      // Only add to query params if filter is disabled
      if (value === false) {
        queryParams.append(key, "false");
      }
      continue;
    }

    // Handle cost filters separately - only add if not default
    if (key === "costMin") {
      // Get cost minimum, default to 1 if undefined
      const costMin = filters.costMin !== undefined ? filters.costMin : 1;
      // Only add to query params if not default value
      if (costMin !== 1) {
        queryParams.append(key, String(value));
      }
      continue;
    }
    if (key === "costMax") {
      // Get cost maximum, default to 6 if undefined
      const costMax = filters.costMax !== undefined ? filters.costMax : 6;
      // Only add to query params if not default value
      if (costMax !== 6) {
        queryParams.append(key, String(value));
      }
      continue;
    }

    // Handle level filters separately - only add if not default
    if (key === "levelMin") {
      // Get level minimum, default to 2 if undefined
      const levelMin = filters.levelMin !== undefined ? filters.levelMin : 2;
      // Only add to query params if not default value
      if (levelMin !== 2) {
        queryParams.append(key, String(value));
      }
      continue;
    }
    if (key === "levelMax") {
      // Get level maximum, default to 8 if undefined
      const levelMax = filters.levelMax !== undefined ? filters.levelMax : 8;
      // Only add to query params if not default value
      if (levelMax !== 8) {
        queryParams.append(key, String(value));
      }
      continue;
    }

    // Add other filter values to query params if defined
    if (value !== undefined) {
      queryParams.append(key, String(value));
    }
  }

  // Convert query params to string and return
  return queryParams.toString();
}

// Helper function to filter and sort core cards based on filter criteria
function filterAndSortCoreCards(
  corecards: CoreCard[],
  filters: FilterState
): CoreCard[] {
  // Create a copy of cards array to avoid mutating original
  let filteredCoreCards = [...corecards];

  // Apply type filters (only filter if at least one type is unchecked)
  // Check if each type filter is enabled (not false)
  const typeAbility = filters.typeAbility !== false;
  const typeItem = filters.typeItem !== false;
  const typeUnit = filters.typeUnit !== false;

  // Only filter if not all types are selected (default state)
  if (!typeAbility || !typeItem || !typeUnit) {
    // Filter core cards based on type
    filteredCoreCards = filteredCoreCards.filter((corecard) => {
      // Return true if card type matches enabled filter
      if (corecard.type === "Ability") return typeAbility;
      if (corecard.type === "Item") return typeItem;
      if (corecard.type === "Unit") return typeUnit;
      return false; // Unknown type, exclude it
    });
  }

  // Apply hasCatnip filter
  if (filters.hasCatnip === "Yes") {
    // Filter core cards that have catnip stat
    filteredCoreCards = filteredCoreCards.filter(
      (corecard) => corecard.catnip != null
    );
  }

  // Apply hasDefense filter
  if (filters.hasDefense === "Yes") {
    // Filter core cards that have defense stat
    filteredCoreCards = filteredCoreCards.filter(
      (corecard) => corecard.defense != null
    );
  }

  // Apply hasAttack filter
  if (filters.hasAttack === "Yes") {
    // Filter core cards that have attack stat
    filteredCoreCards = filteredCoreCards.filter(
      (corecard) => corecard.attack != null
    );
  }

  // Apply cost filter
  // Get cost range from filters, default to 1-6 if undefined
  const costMin = filters.costMin !== undefined ? filters.costMin : 1;
  const costMax = filters.costMax !== undefined ? filters.costMax : 6;
  // Only filter if not default range (1-6)
  if (costMin !== 1 || costMax !== 6) {
    // Filter core cards within cost range
    filteredCoreCards = filteredCoreCards.filter((corecard) => {
      // Get card cost, default to 0 if not present
      const cardCost = corecard.cost || 0;
      // Check if card cost is within range
      return cardCost >= costMin && cardCost <= costMax;
    });
  }

  // Apply sorting
  if (filters.sort === "title") {
    // Sort core cards alphabetically by title
    filteredCoreCards.sort((a, b) => a.title.localeCompare(b.title));
  } else if (filters.sort === "type") {
    // Sort core cards alphabetically by type
    filteredCoreCards.sort((a, b) => a.type.localeCompare(b.type));
  } else if (filters.sort === "cost") {
    // Sort cards numerically by cost
    filteredCoreCards.sort((a, b) => (a.cost || 0) - (b.cost || 0));
  }

  // Return filtered and sorted core cards
  return filteredCoreCards;
}

// Helper function to filter and sort avatars based on filter criteria
function filterAndSortAvatars(
  avatars: Avatar[],
  filters: FilterState
): Avatar[] {
  // Create a copy of avatars array to avoid mutating original
  let filteredAvatars = [...avatars];

  // Apply archetype filters (only filter if at least one archetype is unchecked)
  // Check if each archetype filter is enabled (not false)
  const archetypeIndoor = filters.archetypeIndoor !== false;
  const archetypeOutdoor = filters.archetypeOutdoor !== false;
  const archetypeInOrOut = filters.archetypeInOrOut !== false;

  // Only filter if not all archetypes are selected (default state)
  if (!archetypeIndoor || !archetypeOutdoor || !archetypeInOrOut) {
    // Filter avatars based on archetype
    filteredAvatars = filteredAvatars.filter((avatar) => {
      // Return true if avatar archetype matches enabled filter
      if (avatar.archetype === "Indoor") return archetypeIndoor;
      if (avatar.archetype === "Outdoor") return archetypeOutdoor;
      if (avatar.archetype === "In-or-Out") return archetypeInOrOut;
      return false; // Unknown archetype, exclude it
    });
  }

  // Apply sorting
  if (filters.sort === "title") {
    // Sort avatars alphabetically by title
    filteredAvatars.sort((a, b) => a.title.localeCompare(b.title));
  } else if (filters.sort === "archetype") {
    // Sort avatars alphabetically by archetype
    filteredAvatars.sort((a, b) => {
      const archetypeA = a.archetype || "";
      const archetypeB = b.archetype || "";
      return archetypeA.localeCompare(archetypeB);
    });
  }

  // Return filtered and sorted avatars
  return filteredAvatars;
}

// Helper function to filter and sort territories based on filter criteria
function filterAndSortTerritories(
  territories: Territory[],
  filters: FilterState
): Territory[] {
  // Create a copy of territories array to avoid mutating original
  let filteredTerritories = [...territories];

  // Apply environment filters (only filter if at least one environment is unchecked)
  // Check if each environment filter is enabled (not false)
  const environmentIndoor = filters.environmentIndoor !== false;
  const environmentOutdoor = filters.environmentOutdoor !== false;

  // Only filter if not all environments are selected (default state)
  if (!environmentIndoor || !environmentOutdoor) {
    // Filter territories based on environment
    filteredTerritories = filteredTerritories.filter((territory) => {
      // Return true if territory environment matches enabled filter
      if (territory.environment === "Indoor") return environmentIndoor;
      if (territory.environment === "Outdoor") return environmentOutdoor;
      return false; // Unknown environment, exclude it
    });
  }

  // Apply level filter
  // Get level range from filters, default to 2-8 if undefined
  const levelMin = filters.levelMin !== undefined ? filters.levelMin : 2;
  const levelMax = filters.levelMax !== undefined ? filters.levelMax : 8;
  // Only filter if not default range (2-8)
  if (levelMin !== 2 || levelMax !== 8) {
    // Filter territories within level range
    filteredTerritories = filteredTerritories.filter((territory) => {
      // Get territory level, default to 0 if not present
      const territoryLevel = territory.level || 0;
      // Check if territory level is within range
      return territoryLevel >= levelMin && territoryLevel <= levelMax;
    });
  }

  // Apply sorting
  if (filters.sort === "title") {
    // Sort territories alphabetically by title
    filteredTerritories.sort((a, b) => a.title.localeCompare(b.title));
  } else if (filters.sort === "environment") {
    // Sort territories alphabetically by environment
    filteredTerritories.sort((a, b) => {
      const environmentA = a.environment || "";
      const environmentB = b.environment || "";
      return environmentA.localeCompare(environmentB);
    });
  } else if (filters.sort === "level") {
    // Sort territories numerically by level
    filteredTerritories.sort((a, b) => (a.level || 0) - (b.level || 0));
  }

  // Return filtered and sorted territories
  return filteredTerritories;
}

// Main component for displaying card listings with filters
export default function CardListings({
  initialCards = [],
  initialAvatars = [],
  initialTerritories = [],
}: CardListingsProps) {
  // Get router instance for navigation (React Router v5)
  // Get history object for navigation
  const history = useHistory();
  // Get location for URL search params (React Router v5)
  // Get location object for accessing URL
  const location = useLocation();

  // Helper function to parse searchParams into filters object
  const parseSearchParamsToFilters = (
    params: URLSearchParams | Record<string, string>
  ): FilterState => {
    // Convert URLSearchParams or object to a plain object for easier access
    // Convert params to plain object if needed
    const paramsObj =
      params instanceof URLSearchParams
        ? Object.fromEntries(params.entries())
        : params || {};

    const contentType = paramsObj.contentType || "Core Cards";

    // Base filters object
    const baseFilters: FilterState = {
      // Get contentType from search params, default to "Core Cards" if not present
      contentType: contentType,
      // Get sort from search params, default to "title" if not present
      sort: paramsObj.sort || "title",
    };

    if (contentType === "Core Cards") {
      // Core Card specific filters
      return {
        ...baseFilters,
        // Parse typeAbility from search params, default to true if not present
        typeAbility:
          paramsObj.typeAbility !== undefined
            ? paramsObj.typeAbility === "true"
            : true,
        // Parse typeItem from search params, default to true if not present
        typeItem:
          paramsObj.typeItem !== undefined
            ? paramsObj.typeItem === "true"
            : true,
        // Parse typeUnit from search params, default to true if not present
        typeUnit:
          paramsObj.typeUnit !== undefined
            ? paramsObj.typeUnit === "true"
            : true,
        // Get hasCatnip from search params, default to empty string
        hasCatnip: paramsObj.hasCatnip || "",
        // Get hasDefense from search params, default to empty string
        hasDefense: paramsObj.hasDefense || "",
        // Get hasAttack from search params, default to empty string
        hasAttack: paramsObj.hasAttack || "",
        // Parse costMin from search params, default to 1 if not present
        costMin:
          paramsObj.costMin !== undefined ? parseInt(paramsObj.costMin) : 1,
        // Parse costMax from search params, default to 6 if not present
        costMax:
          paramsObj.costMax !== undefined ? parseInt(paramsObj.costMax) : 6,
      };
    } else if (contentType === "Avatars") {
      // Avatar-specific filters
      return {
        ...baseFilters,
        // Parse archetypeIndoor from search params, default to true if not present
        archetypeIndoor:
          paramsObj.archetypeIndoor !== undefined
            ? paramsObj.archetypeIndoor === "true"
            : true,
        // Parse archetypeOutdoor from search params, default to true if not present
        archetypeOutdoor:
          paramsObj.archetypeOutdoor !== undefined
            ? paramsObj.archetypeOutdoor === "true"
            : true,
        // Parse archetypeInOrOut from search params, default to true if not present
        archetypeInOrOut:
          paramsObj.archetypeInOrOut !== undefined
            ? paramsObj.archetypeInOrOut === "true"
            : true,
      };
    } else {
      // Territory-specific filters
      return {
        ...baseFilters,
        // Parse environmentIndoor from search params, default to true if not present
        environmentIndoor:
          paramsObj.environmentIndoor !== undefined
            ? paramsObj.environmentIndoor === "true"
            : true,
        // Parse environmentOutdoor from search params, default to true if not present
        environmentOutdoor:
          paramsObj.environmentOutdoor !== undefined
            ? paramsObj.environmentOutdoor === "true"
            : true,
        // Parse levelMin from search params, default to 2 if not present
        levelMin:
          paramsObj.levelMin !== undefined ? parseInt(paramsObj.levelMin) : 2,
        // Parse levelMax from search params, default to 8 if not present
        levelMax:
          paramsObj.levelMax !== undefined ? parseInt(paramsObj.levelMax) : 8,
      };
    }
  };

  // Check if this is a page reload to reset filters
  // Determine if page was reloaded
  const isReload = typeof window !== "undefined" && (() => {
    // Get performance navigation entries
    const perfEntries = performance.getEntriesByType('navigation') as PerformanceNavigationTiming[];
    // Check if navigation type is reload
    return perfEntries.length > 0 && perfEntries[0].type === 'reload';
  })();

  // Parse initial filters from URL search params, or use defaults on reload
  // Create search params from URL or empty on reload
  const searchParams = isReload ? new URLSearchParams() : new URLSearchParams(location.search);
  // Parse filters from search params
  const initialFilters = parseSearchParamsToFilters(searchParams);

  // Initialize filters state with initial filters
  const [filters, setFilters] = useState<FilterState>(initialFilters);
  // Initialize content state with filtered and sorted initial data
  const [content, setContent] = useState<CardItem[]>(() => {
    const contentType = initialFilters.contentType || "Core Cards";
    if (contentType === "Core Cards") {
      return filterAndSortCoreCards(initialCards || [], initialFilters);
    } else if (contentType === "Avatars") {
      return filterAndSortAvatars(initialAvatars || [], initialFilters);
    } else {
      return filterAndSortTerritories(initialTerritories || [], initialFilters);
    }
  });

  // Ref to track if we're updating from URL to avoid infinite loops
  const isUpdatingFromUrl = useRef(false);
  // Ref to track the last query string we generated to avoid unnecessary URL updates
  const lastQueryString = useRef("");
  // Ref to track the last URL search params string to detect changes
  const lastSearchParamsString = useRef("");
  // Ref to track if we've restored from sessionStorage to avoid doing it multiple times
  const hasRestoredFromStorage = useRef(false);

  // Clear sessionStorage and URL query params on page reload to reset filters
  useEffect(() => {
    if (isReload) {
      // Clear sessionStorage
      sessionStorage.removeItem("tab1FilterQuery");
      // Clear URL query params if on Tab1
      if (location.pathname === "/tab1" && location.search) {
        history.replace("/tab1");
      }
    }
  }, [isReload, location.pathname, location.search, history]); // Run on mount and when location changes

  // Restore filters from sessionStorage on mount if URL has no query params
  useEffect(() => {
    // Only restore once and only if we're on Tab1 with no query params
    if (
      !hasRestoredFromStorage.current &&
      location.pathname === "/tab1" &&
      !location.search &&
      typeof window !== "undefined"
    ) {
      const savedQueryString = sessionStorage.getItem("tab1FilterQuery");
      if (savedQueryString) {
        hasRestoredFromStorage.current = true;
        // Restore query params to URL
        history.replace(location.pathname + savedQueryString);
      }
    }
  }, [location.pathname, location.search, history]);

  // Sync filters from URL search params when they change (e.g., browser back button)
  useEffect(() => {
    // Skip URL sync on reload - filters should reset to defaults
    if (isReload) {
      return;
    }

    // Get current search params as string for comparison
    const currentSearchParamsString = location.search;

    // Only proceed if search params have actually changed
    if (currentSearchParamsString === lastSearchParamsString.current) {
      return;
    }

    // Update the ref
    lastSearchParamsString.current = currentSearchParamsString;

    // Parse filters from current URL search params
    const searchParams = new URLSearchParams(location.search);
    const filtersFromUrl = parseSearchParamsToFilters(searchParams);

    // Compare with current filters to see if they're different
    const contentType = filters.contentType || "Core Cards";
    const contentTypeFromUrl = filtersFromUrl.contentType || "Core Cards";

    let filtersChanged =
      contentType !== contentTypeFromUrl ||
      filters.sort !== filtersFromUrl.sort;

    if (contentType === "Core Cards" && contentTypeFromUrl === "Core Cards") {
      filtersChanged =
        filtersChanged ||
        filters.typeAbility !== filtersFromUrl.typeAbility ||
        filters.typeItem !== filtersFromUrl.typeItem ||
        filters.typeUnit !== filtersFromUrl.typeUnit ||
        filters.hasCatnip !== filtersFromUrl.hasCatnip ||
        filters.hasDefense !== filtersFromUrl.hasDefense ||
        filters.hasAttack !== filtersFromUrl.hasAttack ||
        filters.costMin !== filtersFromUrl.costMin ||
        filters.costMax !== filtersFromUrl.costMax;
    } else if (contentType === "Avatars" && contentTypeFromUrl === "Avatars") {
      filtersChanged =
        filtersChanged ||
        filters.archetypeIndoor !== filtersFromUrl.archetypeIndoor ||
        filters.archetypeOutdoor !== filtersFromUrl.archetypeOutdoor ||
        filters.archetypeInOrOut !== filtersFromUrl.archetypeInOrOut;
    } else if (
      contentType === "Territories" &&
      contentTypeFromUrl === "Territories"
    ) {
      filtersChanged =
        filtersChanged ||
        filters.environmentIndoor !== filtersFromUrl.environmentIndoor ||
        filters.environmentOutdoor !== filtersFromUrl.environmentOutdoor ||
        filters.levelMin !== filtersFromUrl.levelMin ||
        filters.levelMax !== filtersFromUrl.levelMax;
    }

    // Only update if filters are different and we're not already updating from URL
    if (filtersChanged && !isUpdatingFromUrl.current) {
      isUpdatingFromUrl.current = true;
      setFilters(filtersFromUrl);
      // Reset flag after state update
      setTimeout(() => {
        isUpdatingFromUrl.current = false;
      }, 0);
    }
  }, [location.search, filters, isReload]); // Re-run effect when URL search params or filters change

  // Sync filters with URL search params
  useEffect(() => {
    // Only update URL if we're not updating from URL (to avoid loops)
    if (!isUpdatingFromUrl.current) {
      // Build query string from current filters
      const queryString = buildFilterQueryString(filters);

      // Only update URL if the query string has changed
      if (queryString !== lastQueryString.current) {
        lastQueryString.current = queryString;
        // Update URL with new query string (React Router v5)
        const newPath = queryString ? `?${queryString}` : "";
        if (location.pathname + location.search !== location.pathname + newPath) {
          history.push(location.pathname + newPath);
        }
        
        // Save query string to sessionStorage when on Tab1 (for persistence across tab navigation)
        if (location.pathname === "/tab1" && typeof window !== "undefined") {
          if (queryString) {
            sessionStorage.setItem("tab1FilterQuery", `?${queryString}`);
          } else {
            // Clear sessionStorage if filters are reset
            sessionStorage.removeItem("tab1FilterQuery");
          }
        }
      }
    }
  }, [history, location.pathname, location.search, filters]); // Re-run effect when router, pathname, search params, or filters change

  // Filter and sort content based on filter state
  useEffect(() => {
    // Filter and sort content based on current filters
    const contentType = filters.contentType || "Core Cards";
    let filteredContent: CardItem[];

    if (contentType === "Core Cards") {
      filteredContent = filterAndSortCoreCards(initialCards || [], filters);
    } else if (contentType === "Avatars") {
      filteredContent = filterAndSortAvatars(initialAvatars || [], filters);
    } else {
      filteredContent = filterAndSortTerritories(
        initialTerritories || [],
        filters
      );
    }

    // Update content state with filtered results
    setContent(filteredContent);
  }, [filters, initialCards, initialAvatars, initialTerritories]); // Re-run effect when filters or initial data change

  // Return card listings with filters
  return (
    <>
      {/* Render card filters component */}
      <CardFilters filters={filters} setFilters={setFilters} />

      {/* Render card deck section */}
      <section className={styles.cardDeck}>
        {/* Check if content is empty */}
        {content.length === 0 ? (
          <p className={styles.noCardsFound}>
            No cards found matching the current filters.
          </p>
        ) : (
          content.map((item) => {
          // Build query string from current filters
          const queryString = buildFilterQueryString(filters);
          const contentType = filters.contentType || "Core Cards";
          const isCoreCard = contentType === "Core Cards";
          const isTerritory = contentType === "Territories";
          const isAvatar = contentType === "Avatars";

          // Build href with query params if they exist
          let itemHref: string;
          if (isCoreCard) {
            itemHref = queryString
              ? `/tab1/core-cards/${item.id}?${queryString}`
              : `/tab1/core-cards/${item.id}`;
          } else if (isTerritory) {
            itemHref = queryString
              ? `/tab1/territories/${item.id}?${queryString}`
              : `/tab1/territories/${item.id}`;
          } else {
            itemHref = queryString
              ? `/tab1/avatars/${item.id}?${queryString}`
              : `/tab1/avatars/${item.id}`;
          }

          // Determine border class based on content type
          let borderClass = styles.cardBorderCore;
          if (isAvatar) {
            borderClass = styles.cardBorderAvatar;
          } else if (contentType === "Territories") {
            borderClass = styles.cardBorderTerritory;
          }

          // Determine background color class based on content type
          let backgroundColorClass = "";
          if (isCoreCard && (item as CoreCard).type) {
            backgroundColorClass = styles[`cardColor${(item as CoreCard).type}`];
          } else if (isAvatar) {
            backgroundColorClass = styles.cardColorAvatar;
          } else if (contentType === "Territories") {
            backgroundColorClass = styles.cardColorTerritory;
          }

          return (
            <article
              key={item.id}
              className={`${styles.cardSingle} ${borderClass} ${backgroundColorClass}`}
            >
              <Link to={itemHref}>
                <div className={styles.cardBody}>
                  {isCoreCard && (item as CoreCard).cost != null && (
                    <div
                      className={styles.cardCost}
                      aria-label={`Cost ${(item as CoreCard).cost}`}
                    >
                      {(item as CoreCard).cost}
                    </div>
                  )}
                  {!isCoreCard &&
                    !isTerritory &&
                    (item as Avatar).archetype != null && (
                      <div
                        className={styles.cardArchetype}
                        aria-label={`Archetype ${(item as Avatar).archetype}`}
                      >
                        {(item as Avatar).archetype === "Indoor" && "🏠"}
                        {(item as Avatar).archetype === "Outdoor" && "🏞️"}
                        {(item as Avatar).archetype === "In-or-Out" && "🏘️"}
                      </div>
                    )}
                  {isTerritory && (item as Territory).environment != null && (
                    <div
                      className={styles.cardArchetype}
                      aria-label={`Environment ${(item as Territory).environment}`}
                    >
                      {(item as Territory).environment === "Indoor" && "🏠"}
                      {(item as Territory).environment === "Outdoor" && "🏞️"}
                    </div>
                  )}
                  <h3 className={styles.cardTitle}>{item.title}</h3>
                  {isCoreCard ? (
                    <h4 className={styles.cardType}>
                      {(item as CoreCard).type}
                      {(item as CoreCard)?.subtype != null && (
                        <span aria-label={`Subtype ${(item as CoreCard).subtype}`}>
                          {" "}
                          ({(item as CoreCard).subtype})
                        </span>
                      )}
                    </h4>
                  ) : isTerritory ? (
                    <h4 className={styles.cardType}>
                      Territory ({(item as Territory).environment})
                    </h4>
                  ) : (
                    <h4 className={styles.cardType}>
                      Avatar
                      {(item as Avatar)?.archetype != null && (
                        <span aria-label={`Archetype ${(item as Avatar).archetype}`}>
                          {" "}
                          ({(item as Avatar).archetype})
                        </span>
                      )}
                    </h4>
                  )}
                  <div className={styles.cardImageContainer}>
                    {!isTerritory && (item as CoreCard | Avatar)?.catnip != null && (
                      <div
                        className={`${styles.cardStat} ${styles.cardStatCatnip} ${isCoreCard && (item as CoreCard).type ? styles[`statColor${(item as CoreCard).type}`] : ""}`}
                        aria-label={`Catnip ${(item as CoreCard | Avatar).catnip}`}
                      >
                        <span
                          aria-hidden="true"
                          className={styles.cardStatIcon}
                        >
                          🌿
                        </span>
                        {(item as CoreCard | Avatar).catnip}
                      </div>
                    )}
                    {isTerritory && (item as Territory)?.level != null && (
                      <div
                        className={`${styles.cardStat} ${styles.cardStatCatnip}`}
                        aria-label={`Level ${(item as Territory).level}`}
                      >
                        <span
                          aria-hidden="true"
                          className={styles.cardStatIcon}
                        >
                          🌿
                        </span>
                        {(item as Territory).level}
                      </div>
                    )}

                    {!isTerritory && (item as CoreCard | Avatar)?.defense != null && (
                      <div
                        className={`${styles.cardStat} ${styles.cardStatDefense} ${isCoreCard && (item as CoreCard).type ? styles[`statColor${(item as CoreCard).type}`] : ""}`}
                        aria-label={`Defense ${(item as CoreCard | Avatar).defense}`}
                      >
                        <span
                          aria-hidden="true"
                          className={styles.cardStatIcon}
                        >
                          🛡️
                        </span>
                        {(item as CoreCard | Avatar).defense}
                      </div>
                    )}

                    {!isTerritory && (item as CoreCard | Avatar)?.attack != null && (
                      <div
                        className={`${styles.cardStat} ${styles.cardStatAttack} ${isCoreCard && (item as CoreCard).type ? styles[`statColor${(item as CoreCard).type}`] : ""}`}
                        aria-label={`Attack ${(item as CoreCard | Avatar).attack}`}
                      >
                        <span
                          aria-hidden="true"
                          className={styles.cardStatIcon}
                        >
                          💥
                        </span>
                        {(item as CoreCard | Avatar).attack}
                      </div>
                    )}

                    {!isTerritory && (item as CoreCard | Avatar)?.lives != null && (
                      <div
                        className={`${styles.cardStat} ${styles.cardStatLives} ${isCoreCard && (item as CoreCard).type ? styles[`statColor${(item as CoreCard).type}`] : ""}`}
                        aria-label={`Lives ${(item as CoreCard | Avatar).lives}`}
                      >
                        <span
                          aria-hidden="true"
                          className={styles.cardStatIcon}
                        >
                          🐱
                        </span>
                        {(item as CoreCard | Avatar).lives}
                      </div>
                    )}

                    <img
                      src={item.imageURL}
                      alt=""
                      className={styles.cardImage}
                    />
                  </div>

                  {item?.mechanics != null && (
                    <p className={styles.cardMechanics}>
                      <strong>{item.mechanics}</strong>
                    </p>
                  )}

                  <p className={styles.cardLore}>{item.lore}</p>
                </div>
              </Link>
            </article>
          );
        })
        )}
      </section>
    </>
  );
}

