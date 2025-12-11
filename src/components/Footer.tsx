/*
editorcoder
SRJC CS55.13 Fall 2025
Weeks 16-17: Assignment 16: Final Hybrid Mobile App  
Footer.tsx
2025-12-10
*/

// Footer

// Footer component
export default function Footer() {
  // Get current year using Date object
  const currentYear = new Date().getFullYear();

  // Return footer with copyright
  return (
    <footer>
      {/* Render copyright text with current year */}
      <p>Copyright © {currentYear} Reginald Rodriguez</p>
    </footer>
  );
}

