/*
editorcoder
SRJC CS55.13 Fall 2025
Weeks 16-17: Assignment 16: Final Hybrid Mobile App  
CoreCardDetail.tsx
2025-12-07
*/

import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonSpinner } from '@ionic/react';
import { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/Header';
import BackToHomeLink from '../components/BackToHomeLink';
import { getCoreCardData } from '../lib/wordpress/core-cards';
import type { CoreCard } from '../lib/wordpress/types';
import styles from '../components/Card.module.css';

const CoreCardDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [cardData, setCardData] = useState<CoreCard | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const cardRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const fetchCardData = async () => {
      if (!id) {
        setError('No card ID provided');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        const data = await getCoreCardData(id);
        setCardData(data);
      } catch (err) {
        console.error('Error fetching card data:', err);
        setError('Failed to load card data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

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
                className={`${styles.cardPageCard} ${styles.cardBorderCore} ${styles[`cardColor${cardData.type}`]}`}
              >
                <div className={styles.cardBody}>
                  {cardData.cost != null && (
                    <div
                      className={styles.cardCost}
                      aria-label={`Cost ${cardData.cost}`}
                    >
                      {cardData.cost}
                    </div>
                  )}
                  <h3 className={styles.cardTitle}>{cardData.title}</h3>
                  <h4 className={styles.cardType}>
                    {cardData.type}
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

