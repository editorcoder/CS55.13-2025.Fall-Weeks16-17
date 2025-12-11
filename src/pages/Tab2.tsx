/*
editorcoder
SRJC CS55.13 Fall 2025
Weeks 16-17: Assignment 16: Final Hybrid Mobile App  
Tab2.tsx
2025-12-09
*/

// Tab 2

// Import React hooks
import { useState } from "react";
// Import Ionic React UI components
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
  IonButton,
  IonAlert,
} from "@ionic/react";
// Import custom hooks
import { usePhotoGallery } from "../hooks/usePhotoGallery";
// Import local components
import Header from "../components/Header";
// Import CSS styles
import "./Tab2.css";
// Import Ionicons icons
import { camera, trash } from "ionicons/icons";

// Tab2 component for Photo App
const Tab2: React.FC = () => {
  // Destructure `addNewToGallery()` and `deletePhoto()` from `usePhotoGallery()`
  const { photos, addNewToGallery, deletePhoto } = usePhotoGallery();

  // State for managing delete confirmation alert
  const [photoToDelete, setPhotoToDelete] = useState<string | null>(null);

  // Handler for delete button click
  const handleDeleteClick = (filepath: string) => {
    // Set photo to delete in state
    setPhotoToDelete(filepath);
  };

  // Handler for delete confirmation
  const handleDeleteConfirm = () => {
    // Check if photo to delete exists
    if (photoToDelete) {
      // Delete the photo
      deletePhoto(photoToDelete);
      // Clear photo to delete from state
      setPhotoToDelete(null);
    }
  };

  // Return page content
  return (
    <IonPage>
      {/* Render page header */}
      <IonHeader>
        {/* Render toolbar with header styling */}
        <IonToolbar className="header-toolbar">
          {/* Render title */}
          <IonTitle>
            {/* Render header content wrapper */}
            <div className="header-content">
              <Header />
            </div>
          </IonTitle>
        </IonToolbar>
      </IonHeader>
      {/* Render page content */}
      <IonContent fullscreen>
        {/* Render collapsible header */}
        <IonHeader collapse="condense">
          {/* Render toolbar with header styling */}
          <IonToolbar className="header-toolbar">
            {/* Render large title */}
            <IonTitle size="large">
              {/* Render header content wrapper */}
              <div className="header-content">
                <Header />
              </div>
            </IonTitle>
          </IonToolbar>
        </IonHeader>
        {/* Render page heading */}
        <h2>Photo App</h2>
        {/* Add a grid component to display the photos */}
        <IonGrid>
          {/* Render grid row */}
          <IonRow>
            {/* Create a new column and image component for each photo */}
            {photos.map((photo) => (
              <IonCol size="6" key={photo.filepath}>
                {/* Render photo container */}
                <div className="photo-container">
                  {/* Render photo image */}
                  <IonImg src={photo.webviewPath} />
                  {/* Render delete button */}
                  <IonButton
                    fill="clear"
                    className="delete-button"
                    onClick={() => handleDeleteClick(photo.filepath)}
                  >
                    {/* Render trash icon */}
                    <IonIcon icon={trash} size="large"></IonIcon>
                  </IonButton>
                </div>
              </IonCol>
            ))}
          </IonRow>
        </IonGrid>
        {/* Delete confirmation alert */}
        <IonAlert
          isOpen={photoToDelete !== null}
          onDidDismiss={() => setPhotoToDelete(null)}
          header="Delete Photo"
          message="Are you sure you want to delete this photo?"
          buttons={[
            {
              text: "Cancel",
              role: "cancel",
            },
            {
              text: "Delete",
              role: "destructive",
              handler: handleDeleteConfirm,
            },
          ]}
        />
        {/* Render floating action button */}
        <IonFab vertical="bottom" horizontal="center" slot="fixed">
          {/* Add a click event listener to the floating action button */}
          <IonFabButton onClick={() => addNewToGallery()}>
            {/* Render camera icon */}
            <IonIcon icon={camera}></IonIcon>
          </IonFabButton>
        </IonFab>
      </IonContent>
    </IonPage>
  );
};

export default Tab2;
