/// <reference types="cypress" />

// Define test suite for basic app functionality
describe('My First Test', () => {
  // Test visiting the app root URL
  it('Visits the app root url', () => {
    // Navigate to root URL
    cy.visit('/')
    // Assert that page contains expected content
    cy.contains('ion-content', 'Tab 1 page')
  })
})