/*
editorcoder
SRJC CS55.13 Fall 2025
Weeks 16-17: Assignment 16: Final Hybrid Mobile App  
AvatarDetail.tsx
2025-12-10
*/

// Import Ionic React UI components
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonSpinner } from '@ionic/react';
// Import React hooks for state, side effects, and refs
import { useEffect, useState, useRef } from 'react';
// Import React Router hooks
import { useParams } from 'react-router-dom';
// Import local components
import Header from '../components/Header';
import BackToHomeLink from '../components/BackToHomeLink';
// Import WordPress data functions
import { getAvatarData } from '../lib/wordpress/avatars';
// Import TypeScript types
import type { Avatar } from '../lib/wordpress/types';
// Import Card CSS styles
import styles from '../components/Card.module.css';

// AvatarDetail component for displaying avatar details
const AvatarDetail: React.FC = () => {
  // Get avatar ID from URL parameters
  const { id } = useParams<{ id: string }>();
  // Initialize card data state
  const [cardData, setCardData] = useState<Avatar | null>(null);
  // Initialize loading state
  const [loading, setLoading] = useState(true);
  // Initialize error state
  const [error, setError] = useState<string | null>(null);
  // Create ref for card element
  const cardRef = useRef<HTMLElement>(null);

  // Fetch card data when ID changes
  useEffect(() => {
    // Async function to fetch card data
    const fetchCardData = async () => {
      // Check if ID exists
      if (!id) {
        // Set error if no ID provided
        setError('No card ID provided');
        // Set loading to false
        setLoading(false);
        // Exit early
        return;
      }

      // Attempt to fetch data
      try {
        // Set loading to true
        setLoading(true);
        // Clear any previous errors
        setError(null);
        // Fetch avatar data from API
        const data = await getAvatarData(id);
        // Update card data state
        setCardData(data);
      } catch (err) {
        // Log error to console
        console.error('Error fetching card data:', err);
        // Set error message
        setError('Failed to load card data. Please try again later.');
      } finally {
        // Set loading to false when done
        setLoading(false);
      }
    };

    // Call fetch function
    fetchCardData();
  }, [id]);

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

        {cardData && <h2>Card: {cardData.title}</h2>}

        {loading && (
          <div className="loading-container">
            <IonSpinner name="crescent" />
            <p>Loading card...</p>
          </div>
        )}

        {error && (
          <div className="error-container">
            <p>{error}</p>
          </div>
        )}

        {!loading && !error && cardData && (
          <>
            <section className={styles.cardPage}>
              <article
                ref={cardRef}
                id="card-page-card"
                className={`${styles.cardPageCard} ${styles.cardBorderAvatar} ${styles.cardColorAvatar}`}
              >
                <div className={styles.cardBody}>
                  {cardData.archetype != null && (
                    <div
                      className={styles.cardArchetype}
                      aria-label={`Archetype ${cardData.archetype}`}
                    >
                      {cardData.archetype === "Indoor" && "🏠"}
                      {cardData.archetype === "Outdoor" && "🏞️"}
                      {cardData.archetype === "In-or-Out" && "🏘️"}
                    </div>
                  )}
                  <h3 className={styles.cardTitle}>{cardData.title}</h3>
                  <h4 className={styles.cardType}>
                    Avatar
                    {cardData.archetype != null && (
                      <span
                        aria-hidden="true"
                        aria-label={`Archetype ${cardData.archetype}`}
                      >
                        {" "}
                        ({cardData.archetype})
                      </span>
                    )}
                  </h4>
                  <div className={styles.cardImageContainer}>
                    {cardData.catnip != null && (
                      <div
                        className={`${styles.cardStat} ${styles.cardStatCatnip}`}
                        aria-label={`Catnip ${cardData.catnip}`}
                      >
                        <span aria-hidden="true" className={styles.cardStatIcon}>
                          🌿
                        </span>
                        {cardData.catnip}
                      </div>
                    )}

                    {cardData.defense != null && (
                      <div
                        className={`${styles.cardStat} ${styles.cardStatDefense}`}
                        aria-label={`Defense ${cardData.defense}`}
                      >
                        <span aria-hidden="true" className={styles.cardStatIcon}>
                          🛡️
                        </span>
                        {cardData.defense}
                      </div>
                    )}

                    {cardData.attack != null && (
                      <div
                        className={`${styles.cardStat} ${styles.cardStatAttack}`}
                        aria-label={`Attack ${cardData.attack}`}
                      >
                        <span aria-hidden="true" className={styles.cardStatIcon}>
                          💥
                        </span>
                        {cardData.attack}
                      </div>
                    )}

                    {cardData.lives != null && (
                      <div
                        className={`${styles.cardStat} ${styles.cardStatLives}`}
                        aria-label={`Lives ${cardData.lives}`}
                      >
                        <span aria-hidden="true" className={styles.cardStatIcon}>
                          🐱
                        </span>
                        {cardData.lives}
                      </div>
                    )}

                    <img
                      src={cardData.imageURL}
                      alt=""
                      className={styles.cardImage}
                    />
                  </div>

                  {cardData.mechanics != null && (
                    <p className={styles.cardMechanics}>
                      <strong>{cardData.mechanics}</strong>
                    </p>
                  )}

                  <p className={styles.cardLore}>{cardData.lore}</p>
                </div>
              </article>

              <article className={styles.cardPageDetails}>
                <div className={styles.cardDetailsHeader}>
                  <h3>Card Details:</h3>
                  <button
                    className={styles.showCardLink}
                    onClick={() => {
                      cardRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }}
                  >
                    show card
                  </button>
                </div>
                <p>
                  Title:{" "}
                  <span className={styles.detailsTitle}>{cardData.title}</span>
                </p>
                <p>Content Type: Avatar</p>
                <p>
                  Archetype:{" "}
                  {cardData.archetype === "Indoor" && "🏠"}{" "}
                  {cardData.archetype === "Outdoor" && "🏞️"}{" "}
                  {cardData.archetype === "In-or-Out" && "🏘️"}
                  {cardData.archetype}
                </p>

                <h4>Stats</h4>

                <div>
                  {cardData.catnip != null && (
                    <p>
                      <span aria-hidden="true" className={styles.cardStatIcon}>
                        🌿
                      </span>
                      Catnip: {cardData.catnip}
                    </p>
                  )}

                  {cardData.defense != null && (
                    <p>
                      <span aria-hidden="true" className={styles.cardStatIcon}>
                        🛡️
                      </span>
                      Defense: {cardData.defense}
                    </p>
                  )}

                  {cardData.attack != null && (
                    <p>
                      <span aria-hidden="true" className={styles.cardStatIcon}>
                        💥
                      </span>
                      Attack: {cardData.attack}
                    </p>
                  )}

                  {cardData.lives != null && (
                    <p>
                      <span aria-hidden="true" className={styles.cardStatIcon}>
                        🐱
                      </span>
                      Lives: {cardData.lives}
                    </p>
                  )}
                </div>

                {cardData.mechanics != null && (
                  <div>
                    <h4>Mechanics</h4>
                    <p>{cardData.mechanics}</p>
                  </div>
                )}

                <div>
                  <h4>Lore</h4>
                  <p>{cardData.lore}</p>
                </div>

                <div>
                  <h4>Credits</h4>
                  <p className={styles.cardPhotoCredit}>
                    <a href={cardData.photoSourceURL} target="_blank" rel="noopener noreferrer">
                      Photo
                    </a>{" "}
                    by{" "}
                    <a href={cardData.photoArtistURL} target="_blank" rel="noopener noreferrer">
                      {cardData.photoArtist}
                    </a>
                  </p>
                </div>
              </article>
            </section>

            <BackToHomeLink />
          </>
        )}
      </IonContent>
    </IonPage>
  );
};

export default AvatarDetail;

