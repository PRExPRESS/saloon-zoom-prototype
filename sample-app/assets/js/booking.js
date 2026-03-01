/**
 * Booking Page - Service Selection Functionality
 */

// Simple Interaction for Service Selection
function selectService(element) {
    // Remove 'selected' class from all cards
    let cards = document.querySelectorAll('.service-select-card');
    cards.forEach(card => card.classList.remove('selected'));
    
    // Add 'selected' class to the clicked card
    element.classList.add('selected');
}
