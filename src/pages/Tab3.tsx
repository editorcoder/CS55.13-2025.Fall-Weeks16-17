/*
editorcoder
SRJC CS55.13 Fall 2025
Weeks 16-17: Assignment 16: Final Hybrid Mobile App  
Tab3.tsx
2025-12-07
*/

// Tab 3

// Import Ionic components
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import Header from "../components/Header";
import "./Tab3.css";

const Tab3: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar className="header-toolbar">
          <IonTitle>
            <div className="header-content">
              <Header />
            </div>
          </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar className="header-toolbar">
            <IonTitle size="large">
              <div className="header-content">
                <Header />
              </div>
            </IonTitle>
          </IonToolbar>
        </IonHeader>
        <h2>User Profile</h2>
        <p className="profile-welcome">Welcome to your profile page.</p>
      </IonContent>
    </IonPage>
  );
};

export default Tab3;
