/*
editorcoder
SRJC CS55.13 Fall 2025
Weeks 16-17: Assignment 16: Final Hybrid Mobile App  
Header.tsx
2025-12-10
*/

// Header

// Import Header CSS styles
import styles from "./Header.module.css";

// Header component (content only, will be integrated into Ionic header structure)
export default function Header() {
  // Return header content
  return (
    <>
      <span aria-hidden="true" className={styles.logoIcon}>🐈</span>
      {/* Render main heading */}
      <h1>The Cat TCG Gallery</h1>
    </>
  );
}

