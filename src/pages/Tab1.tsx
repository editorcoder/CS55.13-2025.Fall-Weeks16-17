/*
editorcoder
SRJC CS55.13 Fall 2025
Weeks 16-17: Assignment 16: Final Hybrid Mobile App  
Tab1.tsx
2025-12-07
*/

// Tab 1

// Import Ionic components
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonSpinner } from '@ionic/react';
import { useEffect, useState } from 'react';
import CardListings from '../components/CardListings';
import type { CoreCard, Avatar, Territory } from '../lib/wordpress/types';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { getSortedCoreCardsData } from '../lib/wordpress/core-cards';
import { getSortedAvatarsData } from '../lib/wordpress/avatars';
import { getSortedTerritoriesData } from '../lib/wordpress/territories';

const Tab1: React.FC = () => {
  const [coreCards, setCoreCards] = useState<CoreCard[]>([]);
  const [avatars, setAvatars] = useState<Avatar[]>([]);
  const [territories, setTerritories] = useState<Territory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Fetch all data on component mount
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const [cardsData, avatarsData, territoriesData] = await Promise.all([
          getSortedCoreCardsData(),
          getSortedAvatarsData(),
          getSortedTerritoriesData(),
        ]);

        setCoreCards(cardsData);
        setAvatars(avatarsData);
        setTerritories(territoriesData);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to load card data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

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
        
        <h2>Card Gallery</h2>
        
        {loading && (
          <div className="loading-container">
            <IonSpinner name="crescent" />
            <p>Loading cards...</p>
          </div>
        )}

        {error && (
          <div className="error-container">
            <p>{error}</p>
          </div>
        )}

        {!loading && !error && (
          <CardListings
            initialCards={coreCards}
            initialAvatars={avatars}
            initialTerritories={territories}
          />
        )}

        {!loading && !error && <Footer />}
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
