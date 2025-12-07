/*
editorcoder
SRJC CS55.13 Fall 2025
Weeks 16-17: Assignment 16: Final Hybrid Mobile App  
Tab2.tsx
2025-12-07
*/

// Tab 2

// Import Ionic components
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonFab,
  IonFabButton,
  IonIcon,
  IonGrid,
  IonRow,
  IonCol,
  IonImg,
} from "@ionic/react";
import { usePhotoGallery } from "../hooks/usePhotoGallery";
import Header from "../components/Header";
import "./Tab2.css";

const Tab2: React.FC = () => {
  // Destructure `addNewToGallery()` from `usePhotoGallery()`
  const { photos, addNewToGallery } = usePhotoGallery();
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

        <h2>Photo App</h2>

        {/* Add a grid component to display the photos */}
        <IonGrid>
          <IonRow>
            {/* Create a new column and image component for each photo */}
            {photos.map((photo) => (
              <IonCol size="6" key={photo.filepath}>
                <IonImg src={photo.webviewPath} />
              </IonCol>
            ))}
          </IonRow>
        </IonGrid>

        <IonFab vertical="bottom" horizontal="center" slot="fixed">
          {/* Add a click event listener to the floating action button */}
          <IonFabButton onClick={() => addNewToGallery()}>
            <IonIcon icon={camera}></IonIcon>
          </IonFabButton>
        </IonFab>
      </IonContent>
    </IonPage>
  );
};

export default Tab2;
