// Import jest-dom custom matchers for DOM node assertions
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom/extend-expect';

// Mock matchmedia API for testing environment
window.matchMedia = window.matchMedia || function() {
  // Return mock matchMedia object
  return {
      // Return false for matches property
      matches: false,
      // Provide empty addListener function
      addListener: function() {},
      // Provide empty removeListener function
      removeListener: function() {}
  };
};
