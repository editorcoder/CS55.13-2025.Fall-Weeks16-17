/*
editorcoder
SRJC CS55.13 Fall 2025
Weeks 16-17: Assignment 16: Final Hybrid Mobile App  
BackToHomeLink.tsx
2025-12-07
*/

// Back to home page link component that preserves filter query parameters

// Import React Router v5 hooks
import { useLocation, Link } from "react-router-dom";
// Import CSS module
import styles from "./BackToHomeLink.module.css";

// Back to home page link component
export default function BackToHomeLink() {
  // Get current location to access search params
  const location = useLocation();
  // Build query string from current search params
  const queryString = location.search;
  // Build href with query params if they exist, otherwise just home page
  const homeHref = queryString ? `/tab1${queryString}` : "/tab1";

  return (
    <div className={styles.backToHomeContainer}>
      <Link to={homeHref}>
        <button className={styles.backToHomeButton}>
          ← Back to Card Gallery
        </button>
      </Link>
    </div>
  );
}

