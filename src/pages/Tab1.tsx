/*
editorcoder
SRJC CS55.13 Fall 2025
Weeks 16-17: Assignment 16: Final Hybrid Mobile App  
Tab1.tsx
2025-12-10
*/

// Tab 1

// Import Ionic React UI components
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonSpinner } from '@ionic/react';
// Import React hooks for state and side effects
import { useEffect, useState } from 'react';
// Import local components
import CardListings from '../components/CardListings';
import Header from '../components/Header';
import Footer from '../components/Footer';
// Import TypeScript types
import type { CoreCard, Avatar, Territory } from '../lib/wordpress/types';
// Import WordPress data functions
import { getSortedCoreCardsData } from '../lib/wordpress/core-cards';
import { getSortedAvatarsData } from '../lib/wordpress/avatars';
import { getSortedTerritoriesData } from '../lib/wordpress/territories';

// Tab1 component for Card Gallery
const Tab1: React.FC = () => {
  // Initialize core cards state
  const [coreCards, setCoreCards] = useState<CoreCard[]>([]);
  // Initialize avatars state
  const [avatars, setAvatars] = useState<Avatar[]>([]);
  // Initialize territories state
  const [territories, setTerritories] = useState<Territory[]>([]);
  // Initialize loading state
  const [loading, setLoading] = useState(true);
  // Initialize error state
  const [error, setError] = useState<string | null>(null);

  // Fetch data on component mount
  useEffect(() => {
    // Async function to fetch all card data
    const fetchData = async () => {
      // Attempt to fetch data
      try {
        // Set loading to true
        setLoading(true);
        // Clear any previous errors
        setError(null);
        
        // Fetch all data in parallel
        const [cardsData, avatarsData, territoriesData] = await Promise.all([
          getSortedCoreCardsData(),
          getSortedAvatarsData(),
          getSortedTerritoriesData(),
        ]);

        // Update core cards state
        setCoreCards(cardsData);
        // Update avatars state
        setAvatars(avatarsData);
        // Update territories state
        setTerritories(territoriesData);
      } catch (err) {
        // Log error to console
        console.error('Error fetching data:', err);
        // Set error message
        setError('Failed to load card data. Please try again later.');
      } finally {
        // Set loading to false when done
        setLoading(false);
      }
    };

    // Call fetch function
    fetchData();
  }, []);

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
        <h2>Card Gallery</h2>
        
        {/* Show loading spinner when loading */}
        {loading && (
          <div className="loading-container">
            {/* Render loading spinner */}
            <IonSpinner name="crescent" />
            {/* Render loading message */}
            <p>Loading cards...</p>
          </div>
        )}

        {/* Show error message if error exists */}
        {error && (
          <div className="error-container">
            {/* Display error message */}
            <p>{error}</p>
          </div>
        )}

        {/* Show card listings when not loading and no error */}
        {!loading && !error && (
          <CardListings
            initialCards={coreCards}
            initialAvatars={avatars}
            initialTerritories={territories}
          />
        )}

        {/* Show footer when not loading and no error */}
        {!loading && !error && <Footer />}
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
