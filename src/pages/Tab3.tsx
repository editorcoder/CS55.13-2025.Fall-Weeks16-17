/*
editorcoder
SRJC CS55.13 Fall 2025
Weeks 16-17: Assignment 16: Final Hybrid Mobile App  
Tab3.tsx
2025-12-09
*/

// Tab 3

// Import React hooks
import { useState } from "react";
// Import Ionic React UI components
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButton,
  IonModal,
  IonItem,
  IonLabel,
  IonInput,
  IonSelect,
  IonSelectOption,
  IonGrid,
  IonRow,
  IonCol,
  IonImg,
  IonToast,
} from "@ionic/react";
// Import local components
import Header from "../components/Header";
import Footer from "../components/Footer";
// Import custom hooks
import { usePhotoGallery } from "../hooks/usePhotoGallery";
import {
  useProfile,
  type ProfileData,
  DEFAULT_ARCHETYPE,
} from "../hooks/useProfile";
// Import CSS styles
import "./Tab3.css";
// Import Card CSS styles
import styles from "../components/Card.module.css";

// Tab3 component for User Profile
const Tab3: React.FC = () => {
  // Get profile data and save function from hook
  const { profile, saveProfile } = useProfile();
  // Get photos from photo gallery hook
  const { photos } = usePhotoGallery();
  // Initialize modal open state
  const [isModalOpen, setIsModalOpen] = useState(false);
  // Initialize form data state with current profile
  const [formData, setFormData] = useState<ProfileData>(profile);
  // Initialize selected photo path state
  const [selectedPhotoPath, setSelectedPhotoPath] = useState<string>(
    profile.photoPath
  );
  // Initialize toast state for validation errors
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  // Handler for opening edit modal
  const handleOpenModal = () => {
    // Reset form data to current profile
    setFormData(profile);
    // Reset selected photo to current profile photo
    setSelectedPhotoPath(profile.photoPath);
    // Open modal
    setIsModalOpen(true);
  };

  // Handler for closing modal
  const handleCloseModal = () => {
    // Close modal
    setIsModalOpen(false);
  };

  // Handler for saving profile
  const handleSave = () => {
    // Validate that Title and Lore are not blank
    if (!formData.title?.trim() || !formData.lore?.trim()) {
      // Set error message
      setToastMessage("Title and Lore are required fields.");
      // Show toast
      setShowToast(true);
      // Prevent saving
      return;
    }
    // Create updated profile with selected photo
    const updatedProfile: ProfileData = {
      ...formData,
      photoPath: selectedPhotoPath,
    };
    // Save updated profile
    saveProfile(updatedProfile);
    // Close modal
    setIsModalOpen(false);
  };

  // Function to get emoji for archetype
  const getArchetypeEmoji = (archetype: string) => {
    // Return indoor emoji for Indoor archetype
    if (archetype === "Indoor") return "🏠";
    // Return outdoor emoji for Outdoor archetype
    if (archetype === "Outdoor") return "🏞️";
    // Return in-or-out emoji for In-or-Out archetype
    if (archetype === "In-or-Out") return "🏘️";
    // Return default emoji
    return "🏘️";
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
        <h2>User Profile</h2>
        {/* Render edit button container */}
        <div className="edit-profile-button-container">
          {/* Render edit profile button */}
          <IonButton className="edit-profile-button" onClick={handleOpenModal}>Edit Profile</IonButton>
        </div>
        {/* Render card deck section */}
        <section className={styles.cardDeck}>
          {/* Render profile card article */}
          <article
            className={`${styles.cardSingle} ${styles.cardBorderAvatar} ${styles.cardColorAvatar}`}
          >
            {/* Render card body */}
            <div className={styles.cardBody}>
              {/* Render archetype indicator */}
              <div
                className={styles.cardArchetype}
                aria-label={`Archetype ${DEFAULT_ARCHETYPE}`}
              >
                {getArchetypeEmoji(DEFAULT_ARCHETYPE)}
              </div>
              {/* Render profile title */}
              <h3 className={styles.cardTitle}>{profile.title}</h3>
              {/* Render card type heading */}
              <h4 className={styles.cardType}>
                Avatar
                {/* Render archetype span */}
                <span aria-label={`Archetype ${DEFAULT_ARCHETYPE}`}>
                  {" "}
                  ({DEFAULT_ARCHETYPE})
                </span>
              </h4>
              {/* Render image container with stats */}
              <div className={styles.cardImageContainer}>
                {/* Render defense stat */}
                <div
                  className={`${styles.cardStat} ${styles.cardStatDefense}`}
                  aria-label={`Defense ${profile.defense}`}
                >
                  {/* Render defense icon */}
                  <span aria-hidden="true" className={styles.cardStatIcon}>
                    🛡️
                  </span>
                  {profile.defense}
                </div>
                {/* Render attack stat */}
                <div
                  className={`${styles.cardStat} ${styles.cardStatAttack}`}
                  aria-label={`Attack ${profile.attack}`}
                >
                  {/* Render attack icon */}
                  <span aria-hidden="true" className={styles.cardStatIcon}>
                    💥
                  </span>
                  {profile.attack}
                </div>
                {/* Render lives stat */}
                <div
                  className={`${styles.cardStat} ${styles.cardStatLives}`}
                  aria-label={`Lives ${profile.lives}`}
                >
                  {/* Render lives icon */}
                  <span aria-hidden="true" className={styles.cardStatIcon}>
                    🐱
                  </span>
                  {profile.lives}
                </div>
                {/* Render profile photo */}
                <img
                  src={profile.photoPath}
                  alt=""
                  className={styles.cardImage}
                />
              </div>
              {/* Render mechanics description */}
              <p className={styles.cardMechanics}>
                <strong>This user can browse the card gallery, take photos, and edit their profile.</strong>
              </p>
              {/* Render lore description */}
              <p className={styles.cardLore}>{profile.lore}</p>
            </div>
          </article>
        </section>

        {/* Render edit profile modal */}
        <IonModal isOpen={isModalOpen} onDidDismiss={handleCloseModal}>
          {/* Render modal header */}
          <IonHeader>
            {/* Render modal toolbar */}
            <IonToolbar>
              {/* Render modal title */}
              <IonTitle className="edit-profile-title">Edit Profile</IonTitle>
            </IonToolbar>
          </IonHeader>
          {/* Render modal content */}
          <IonContent>
            {/* Render title input field */}
            <IonItem>
              {/* Render title label */}
              <IonLabel position="stacked">Title *</IonLabel>
              {/* Render title input */}
              <IonInput
                value={formData.title}
                onIonInput={(e) =>
                  setFormData({ ...formData, title: e.detail.value! })
                }
              />
            </IonItem>

            {/* Render lore input field */}
            <IonItem>
              {/* Render lore label */}
              <IonLabel position="stacked">Lore *</IonLabel>
              {/* Render lore input */}
              <IonInput
                value={formData.lore}
                onIonInput={(e) =>
                  setFormData({ ...formData, lore: e.detail.value! })
                }
              />
            </IonItem>

            {/* Render defense select field */}
            <IonItem>
              {/* Render defense label */}
              <IonLabel position="stacked">Defense *</IonLabel>
              {/* Render defense select */}
              <IonSelect
                value={formData.defense}
                onIonChange={(e) =>
                  setFormData({ ...formData, defense: e.detail.value })
                }
              >
                {/* Map over defense values */}
                {[0, 1, 2, 3, 4].map((val) => (
                  <IonSelectOption key={val} value={val}>
                    {val}
                  </IonSelectOption>
                ))}
              </IonSelect>
            </IonItem>

            {/* Render attack select field */}
            <IonItem>
              {/* Render attack label */}
              <IonLabel position="stacked">Attack *</IonLabel>
              {/* Render attack select */}
              <IonSelect
                value={formData.attack}
                onIonChange={(e) =>
                  setFormData({ ...formData, attack: e.detail.value })
                }
              >
                {/* Map over attack values */}
                {[0, 1, 2, 3, 4].map((val) => (
                  <IonSelectOption key={val} value={val}>
                    {val}
                  </IonSelectOption>
                ))}
              </IonSelect>
            </IonItem>

            {/* Render lives select field */}
            <IonItem>
              {/* Render lives label */}
              <IonLabel position="stacked">Lives *</IonLabel>
              {/* Render lives select */}
              <IonSelect
                value={formData.lives}
                onIonChange={(e) =>
                  setFormData({ ...formData, lives: e.detail.value })
                }
              >
                {/* Map over lives values (10-20) */}
                {Array.from({ length: 11 }, (_, i) => i + 10).map((val) => (
                  <IonSelectOption key={val} value={val}>
                    {val}
                  </IonSelectOption>
                ))}
              </IonSelect>
            </IonItem>

            {/* Render photo selection label */}
            <IonItem>
              {/* Render photo selection label and instruction */}
              <div style={{ width: "100%", padding: "0.5rem 0" }}>
                <IonLabel>Select Photo *</IonLabel>
                {/* Render instruction text */}
                <p style={{ fontSize: "0.875rem", color: "var(--ion-color-medium)", margin: "0.25rem 0 0 0" }}>
                  Take a selfie in the Photos app, and return here to select it!
                </p>
              </div>
            </IonItem>
            {/* Render photo grid */}
            <IonGrid>
              {/* Render grid row */}
              <IonRow>
                {/* Render default photo column */}
                <IonCol
                  size="6"
                  key="default-photo"
                  className={`photo-select-item ${
                    selectedPhotoPath ===
                    "/lukas-parnican-uDO05hIt1Kk-unsplash (Small).jpg"
                      ? "selected"
                      : ""
                  }`}
                  onClick={() =>
                    setSelectedPhotoPath(
                      "/lukas-parnican-uDO05hIt1Kk-unsplash (Small).jpg"
                    )
                  }
                >
                  {/* Render default photo image */}
                  <IonImg src="/lukas-parnican-uDO05hIt1Kk-unsplash (Small).jpg" />
                </IonCol>
                {/* Photos from Tab2 Photo App */}
                {photos.map((photo) => (
                  <IonCol
                    size="6"
                    key={photo.filepath}
                    className={`photo-select-item ${
                      selectedPhotoPath === photo.webviewPath ? "selected" : ""
                    }`}
                    onClick={() =>
                      setSelectedPhotoPath(photo.webviewPath || "")
                    }
                  >
                    {/* Render photo image */}
                    <IonImg src={photo.webviewPath} />
                  </IonCol>
                ))}
              </IonRow>
            </IonGrid>

            {/* Render modal buttons container */}
            <div className="modal-button-container">
              {/* Render save button */}
              <IonButton onClick={handleSave}>Save</IonButton>
              {/* Render cancel button */}
              <IonButton onClick={handleCloseModal} fill="outline">
                Cancel
              </IonButton>
            </div>
          </IonContent>
        </IonModal>
        {/* Render validation toast */}
        <IonToast
          isOpen={showToast}
          onDidDismiss={() => setShowToast(false)}
          message={toastMessage}
          duration={3000}
          color="danger"
        />
        {/* Render footer */}
        <Footer />
      </IonContent>
    </IonPage>
  );
};

export default Tab3;
