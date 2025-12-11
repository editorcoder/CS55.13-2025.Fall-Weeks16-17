/*
editorcoder
SRJC CS55.13 Fall 2025
Weeks 16-17: Assignment 16: Final Hybrid Mobile App  
TabBar.tsx
2025-12-09
*/

// Tab Bar

// Import Ionic React UI components
import { IonIcon, IonLabel, IonTabBar, IonTabButton } from "@ionic/react";
// Import React Router hooks
import { useLocation } from "react-router-dom";
// Import Ionicons icons
import { person, grid, image } from 'ionicons/icons';

// Tab Bar component (Ionic tab navigation)
export default function TabBar() {
  // Get current location to access search params
  const location = useLocation();
  // Build query string from current search params or restore from sessionStorage
  let queryString = location.search;
  
  // If there's no query string in URL, try to restore from sessionStorage
  // This ensures Tab1 link always has the saved filter params when navigating from Tab2/Tab3
  if (!queryString && typeof window !== "undefined") {
    // Get saved query string from session storage
    const savedQueryString = sessionStorage.getItem("tab1FilterQuery");
    // Use saved query string if available
    if (savedQueryString) {
      queryString = savedQueryString;
    }
  }
  
  // Build href with query params if they exist, otherwise just home page
  const tab1Href = queryString ? `/tab1${queryString}` : "/tab1";

  // Return tab bar with navigation buttons
  return (
    <IonTabBar slot="bottom">
      {/* Render Tab1 button for Cards */}
      <IonTabButton tab="tab1" href={tab1Href}>
        {/* Render grid icon */}
        <IonIcon aria-hidden="true" icon={grid} />
        {/* Render Cards label */}
        <IonLabel>Cards</IonLabel>
      </IonTabButton>
      {/* Render Tab2 button for Photos */}
      <IonTabButton tab="tab2" href="/tab2">
        {/* Render image icon */}
        <IonIcon aria-hidden="true" icon={image} />
        {/* Render Photos label */}
        <IonLabel>Photos</IonLabel>
      </IonTabButton>
      {/* Render Tab3 button for Profile */}
      <IonTabButton tab="tab3" href="/tab3">
        {/* Render person icon */}
        <IonIcon aria-hidden="true" icon={person} />
        {/* Render Profile label */}
        <IonLabel>Profile</IonLabel>
      </IonTabButton>
    </IonTabBar>
  );
}

