// taskflow.js
// Show the matching feature content (image + description) when a title is hovered.
// This implementation matches titles to contents by index (order in the DOM)
// which avoids brittle id/data-feature mismatches in the markup.

const titles = Array.from(document.querySelectorAll('.display-titles'));
const contents = Array.from(document.querySelectorAll('.feature-content'));
const hoverSidebar = document.querySelector('.hover-sidebar');
const instructionsEl = document.querySelector('.instructions');

if (titles.length === 0 || contents.length === 0) {
    // nothing to wire up
    console.warn('taskflow: No display titles or feature content found.');
}

function hideAllContents() {
    contents.forEach(c => {
        c.style.display = 'none';
        c.classList.remove('active');
    });
}

// Initialize: hide all feature content by default
hideAllContents();

titles.forEach((titleEl, idx) => {
    // keyboard accessibility: make titles focusable if they aren't
    if (!titleEl.hasAttribute('tabindex')) titleEl.setAttribute('tabindex', '0');

    const showForIndex = () => {
        // mark title active
        titles.forEach(t => t.classList.remove('active'));
        titleEl.classList.add('active');

        // hide others and reveal this content
        hideAllContents();
        const target = contents[idx];
        if (target) {
            target.style.display = 'block';
            // small visual hook class in case CSS animates .active
            target.classList.add('active');
            // hide the blinking instructions while user is interacting with titles
            if (instructionsEl) instructionsEl.style.display = 'none';
        }
    };

    const hideForIndex = () => {
        titleEl.classList.remove('active');
        const target = contents[idx];
        if (target) {
            target.style.display = 'none';
            target.classList.remove('active');
        }
        // restore instructions visibility when not hovering
        if (instructionsEl) instructionsEl.style.display = '';
    };

    // Mouse enter / leave
    titleEl.addEventListener('mouseenter', showForIndex);
    titleEl.addEventListener('mouseleave', hideForIndex);

    // Also support focus / blur so keyboard users can trigger the same behavior
    titleEl.addEventListener('focus', showForIndex);
    titleEl.addEventListener('blur', hideForIndex);
});

// Optionally, hide all when the mouse leaves the sidebar area
if (hoverSidebar) {
    hoverSidebar.addEventListener('mouseleave', () => {
        titles.forEach(t => t.classList.remove('active'));
        hideAllContents();
        if (instructionsEl) instructionsEl.style.display = '';
    });
}

// Expose a tiny API for testing in console
window.__taskflow = {
    showByIndex(i) { if (i >= 0 && i < contents.length) { titles[i].dispatchEvent(new Event('mouseenter')); } },
    hideAll() { hideAllContents(); }
};


const toGoContact = document.querySelectorAll('#contact_btn');

// Add click event to contact button to scroll to form
toGoContact.forEach(button => {
  button.addEventListener('click', () => {
    const contactForm = document.querySelector('.call-to-action');
    if (contactForm) {
      contactForm.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});