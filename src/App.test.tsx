// Import React Testing Library rendering utility
import { render } from '@testing-library/react';
// Import App component to test
import App from './App';

// Test that app renders without crashing
test('renders without crashing', () => {
  // Render app component
  const { baseElement } = render(<App />);
  // Assert that base element is defined
  expect(baseElement).toBeDefined();
});
