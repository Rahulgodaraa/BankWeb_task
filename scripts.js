/**
 * Carousel and Interactive Components Module
 * 
 * This script handles multiple interactive components:
 * 1. Dot Navigation Carousel
 * 2. Draggable Carousel
 * 3. View More/Less Functionality
 * 
 * @module InteractiveComponents
 */

(function() {
  'use strict';

  /**
   * Initialize dot navigation for carousel
   * Handles slide navigation and active dot highlighting
   */
  function initDotNavCarousel() {
    const carousel = document.querySelector('.unlearn-cards');
    const dots = document.querySelectorAll('.dot');

    if (!carousel || dots.length === 0) return;

    /**
     * Scroll to specific slide and update active dot
     * @param {number} index - Index of the slide to navigate to
     */
    function navigateToSlide(index) {
      carousel.scrollLeft = index * carousel.offsetWidth;
      
      dots.forEach(dot => dot.classList.remove('active'));
      dots[index].classList.add('active');
    }

    // Add click event to navigation dots
    dots.forEach((dot, index) => {
      dot.addEventListener('click', () => navigateToSlide(index));
    });

    // Update active dot on scroll
    carousel.addEventListener('scroll', () => {
      const scrollLeft = carousel.scrollLeft;
      const slideWidth = carousel.offsetWidth;
      const currentSlide = Math.round(scrollLeft / slideWidth);

      dots.forEach(dot => dot.classList.remove('active'));
      dots[currentSlide].classList.add('active');
    });
  }

  /**
   * Initialize draggable carousel functionality
   * Enables smooth scrolling and drag interaction
   */
  function initDraggableCarousel() {
    const carousel = document.querySelector('.carousel');
    
    if (!carousel) return;

    let isDown = false;
    let startX;
    let scrollLeft;

    carousel.addEventListener('mousedown', (e) => {
      isDown = true;
      startX = e.pageX - carousel.offsetLeft;
      scrollLeft = carousel.scrollLeft;
      
      // Add visual feedback for dragging
      carousel.classList.add('active');
    });

    carousel.addEventListener('mouseleave', () => {
      isDown = false;
      carousel.classList.remove('active');
    });

    carousel.addEventListener('mouseup', () => {
      isDown = false;
      carousel.classList.remove('active');
    });

    carousel.addEventListener('mousemove', (e) => {
      if (!isDown) return;
      e.preventDefault();
      
      const x = e.pageX - carousel.offsetLeft;
      const walk = (x - startX) * 2;
      carousel.scrollLeft = scrollLeft - walk;
    });
  }

  /**
   * Initialize view more/less functionality for card sections
   */
  function initViewMoreToggle() {
    const viewMoreBtns = document.querySelectorAll('.view-more-btn');
    
    viewMoreBtns.forEach(viewMoreBtn => {
      const creditCardServices = viewMoreBtn.closest('.services-container')
        ?.querySelector('.credit-card-services');
      const hiddenCards = viewMoreBtn.closest('.services-container')
        ?.querySelectorAll('.hidden-card');

      if (!creditCardServices || !hiddenCards) return;

      viewMoreBtn.addEventListener('click', () => {
        // Toggle expanded state for services
        creditCardServices.classList.toggle('expanded');
        
        // Update button text based on state
        viewMoreBtn.textContent = creditCardServices.classList.contains('expanded') 
          ? 'View Less' 
          : 'View More';

        // Reveal hidden cards
        hiddenCards.forEach(card => {
          card.classList.remove('hidden-card');
        });

        // Hide view more button if all cards are shown
        if (!creditCardServices.classList.contains('expanded')) {
          viewMoreBtn.style.display = 'none';
        }
      });
    });
  }

  /**
   * Initialize all interactive components when DOM is fully loaded
   */
  function initInteractiveComponents() {
    initDotNavCarousel();
    initDraggableCarousel();
    initViewMoreToggle();
  }

  // Initialize components when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initInteractiveComponents);
  } else {
    initInteractiveComponents();
  }
})();