/*
editorcoder
SRJC CS55.13 Fall 2025
Weeks 16-17: Assignment 16: Final Hybrid Mobile App  
TabBar.tsx
2025-12-07
*/

// Tab Bar

// Import Ionic components
import { IonIcon, IonLabel, IonTabBar, IonTabButton } from "@ionic/react";
// Import React Router v5 hooks
import { useLocation } from "react-router-dom";
// Import icons
import { person, grid, camera } from 'ionicons/icons';

// Tab Bar component (Ionic tab navigation)
export default function TabBar() {
  // Get current location to access search params
  const location = useLocation();
  // Build query string from current search params
  const queryString = location.search;
  // Build href with query params if they exist, otherwise just home page
  const tab1Href = queryString ? `/tab1${queryString}` : "/tab1";

  return (
    <IonTabBar slot="bottom">
      <IonTabButton tab="tab1" href={tab1Href}>
        <IonIcon aria-hidden="true" icon={grid} />
        <IonLabel>Cards</IonLabel>
      </IonTabButton>
      <IonTabButton tab="tab2" href="/tab2">
        <IonIcon aria-hidden="true" icon={camera} />
        <IonLabel>Photos</IonLabel>
      </IonTabButton>
      <IonTabButton tab="tab3" href="/tab3">
        <IonIcon aria-hidden="true" icon={person} />
        <IonLabel>Profile</IonLabel>
      </IonTabButton>
    </IonTabBar>
  );
}

