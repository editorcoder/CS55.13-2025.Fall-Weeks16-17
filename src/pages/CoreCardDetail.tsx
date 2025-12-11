/*
editorcoder
SRJC CS55.13 Fall 2025
Weeks 16-17: Assignment 16: Final Hybrid Mobile App  
CoreCardDetail.tsx
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
import { getCoreCardData } from '../lib/wordpress/core-cards';
// Import TypeScript types
import type { CoreCard } from '../lib/wordpress/types';
// Import Card CSS styles
import styles from '../components/Card.module.css';

// CoreCardDetail component for displaying core card details
const CoreCardDetail: React.FC = () => {
  // Get card ID from URL parameters
  const { id } = useParams<{ id: string }>();
  // Initialize card data state
  const [cardData, setCardData] = useState<CoreCard | null>(null);
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
        // Fetch card data from API
        const data = await getCoreCardData(id);
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

        {/* Render card title if card data exists */}
        {cardData && <h2>Card: {cardData.title}</h2>}

        {/* Show loading spinner when loading */}
        {loading && (
          <div className="loading-container">
            {/* Render loading spinner */}
            <IonSpinner name="crescent" />
            {/* Render loading message */}
            <p>Loading card...</p>
          </div>
        )}

        {/* Show error message if error exists */}
        {error && (
          <div className="error-container">
            {/* Display error message */}
            <p>{error}</p>
          </div>
        )}

        {/* Show card content when not loading, no error, and card data exists */}
        {!loading && !error && cardData && (
          <>
            {/* Render card page section */}
            <section className={styles.cardPage}>
              {/* Render card article with ref */}
              <article
                ref={cardRef}
                id="card-page-card"
                className={`${styles.cardPageCard} ${styles.cardBorderCore} ${styles[`cardColor${cardData.type}`]}`}
              >
                {/* Render card body */}
                <div className={styles.cardBody}>
                  {/* Render cost if available */}
                  {cardData.cost != null && (
                    <div
                      className={styles.cardCost}
                      aria-label={`Cost ${cardData.cost}`}
                    >
                      {cardData.cost}
                    </div>
                  )}
                  {/* Render card title */}
                  <h3 className={styles.cardTitle}>{cardData.title}</h3>
                  {/* Render card type heading */}
                  <h4 className={styles.cardType}>
                    {cardData.type}
                    {/* Render subtype if available */}
                    {cardData.subtype != null && (
                      <span
                        aria-hidden="true"
                        aria-label={`Subtype ${cardData.subtype}`}
                      >
                        {" "}
                        ({cardData.subtype})
                      </span>
                    )}
                  </h4>
                  {/* Render image container with stats */}
                  <div className={styles.cardImageContainer}>
                    {cardData.catnip != null && (
                      <div
                        className={`${styles.cardStat} ${styles.cardStatCatnip} ${styles[`statColor${cardData.type}`]}`}
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
                        className={`${styles.cardStat} ${styles.cardStatDefense} ${styles[`statColor${cardData.type}`]}`}
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
                        className={`${styles.cardStat} ${styles.cardStatAttack} ${styles[`statColor${cardData.type}`]}`}
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
                        className={`${styles.cardStat} ${styles.cardStatLives} ${styles[`statColor${cardData.type}`]}`}
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
                <p>Content Type: Core Card</p>
                <p>Type: {cardData.type}</p>
                {cardData.subtype != null && (
                  <p>Subtype: {cardData.subtype}</p>
                )}

                <h4>Stats</h4>

                <div>
                  {cardData.cost != null && <p>Cost: {cardData.cost}</p>}

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

export default CoreCardDetail;

