const elements = document.querySelectorAll('.scroll');
window.addEventListener('scroll', () => {
   elements.forEach((el) => {
       const position = el.getBoundingClientRect().top;
       if (position < window.innerHeight - 100) { // Adjust threshold as needed
           el.classList.add('scroll--show');
       }
   });
});

// Fade in hover-text and shrink shadow when user hovers over a .boxes element
const boxes = document.querySelectorAll('.boxes');

boxes.forEach((box) => {
    const hoverText = box.querySelector('.hover-text');
    const shadow = box.querySelector('.shadow');
    
    // Show hover-text and shrink shadow on mouseenter
    box.addEventListener('mouseenter', () => {
        if (hoverText) {
            hoverText.classList.add('hover-text--show');
        }
        if (shadow) {
            shadow.classList.add('shadow--change');
        }
    });
    
    // Hide hover-text and grow shadow on mouseleave
    box.addEventListener('mouseleave', () => {
        if (hoverText) {
            hoverText.classList.remove('hover-text--show');
        }
        if (shadow) {
            shadow.classList.remove('shadow--change');
        }
    });
});