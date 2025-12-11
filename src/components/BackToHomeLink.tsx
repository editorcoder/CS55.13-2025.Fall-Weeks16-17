/*
editorcoder
SRJC CS55.13 Fall 2025
Weeks 16-17: Assignment 16: Final Hybrid Mobile App  
BackToHomeLink.tsx
2025-12-10
*/

// Back to home page link component that preserves filter query parameters

// Import React Router hooks and components
import { useLocation, Link } from "react-router-dom";
// Import BackToHomeLink CSS styles
import styles from "./BackToHomeLink.module.css";

// Back to home page link component
export default function BackToHomeLink() {
  // Get current location to access search params
  const location = useLocation();
  // Build query string from current search params
  const queryString = location.search;
  // Build href with query params if they exist, otherwise just home page
  const homeHref = queryString ? `/tab1${queryString}` : "/tab1";

  // Return back to home link
  return (
    <div className={styles.backToHomeContainer}>
      {/* Render link to home */}
      <Link to={homeHref}>
        {/* Render back button */}
        <button className={styles.backToHomeButton}>
          ← Back to Card Gallery
        </button>
      </Link>
    </div>
  );
}

