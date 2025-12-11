/*
editorcoder
SRJC CS55.13 Fall 2025
Weeks 16-17: Assignment 16: Final Hybrid Mobile App  
App.tsx
2025-12-10
*/

// App component

// Import React Router components
import { Redirect, Route } from "react-router-dom";
// Import Ionic React UI components
import {
  IonApp,
  IonRouterOutlet,
  IonTabs,
  setupIonicReact,
} from "@ionic/react";
// Import Ionic React Router components
import { IonReactRouter } from "@ionic/react-router";
// Import local components
import Tab1 from "./pages/Tab1";
import Tab2 from "./pages/Tab2";
import Tab3 from "./pages/Tab3";
import CoreCardDetail from "./pages/CoreCardDetail";
import AvatarDetail from "./pages/AvatarDetail";
import TerritoryDetail from "./pages/TerritoryDetail";
// Import TabBar component
import TabBar from "./components/TabBar";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Ionic Dark Mode - See https://ionicframework.com/docs/theming/dark-mode */

/* Theme variables */
import "./theme/variables.css";

/* Global app styles */
import "./styles/globals.css";

// Initialize Ionic React
setupIonicReact();

// Main app component
const App: React.FC = () => (
  <IonApp>
    {/* Render Ionic React Router */}
    <IonReactRouter>
      {/* Render Ionic tabs container */}
      <IonTabs>
        {/* Render router outlet for routes */}
        <IonRouterOutlet>
          {/* Route for Tab1 (Card Gallery) */}
          <Route exact path="/tab1">
            <Tab1 />
          </Route>
          {/* Route for core card detail page */}
          <Route exact path="/tab1/core-cards/:id">
            <CoreCardDetail />
          </Route>
          {/* Route for avatar detail page */}
          <Route exact path="/tab1/avatars/:id">
            <AvatarDetail />
          </Route>
          {/* Route for territory detail page */}
          <Route exact path="/tab1/territories/:id">
            <TerritoryDetail />
          </Route>
          {/* Route for Tab2 (Photo App) */}
          <Route exact path="/tab2">
            <Tab2 />
          </Route>
          {/* Route for Tab3 (Profile) */}
          <Route path="/tab3">
            <Tab3 />
          </Route>
          {/* Default route redirects to Tab1 */}
          <Route exact path="/">
            <Redirect to="/tab1" />
          </Route>
        </IonRouterOutlet>
        {/* Render tab bar navigation */}
        <TabBar />
      </IonTabs>
    </IonReactRouter>
  </IonApp>
);

// Export app component as default
export default App;
