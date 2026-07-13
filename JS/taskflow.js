// taskflow.js
// Show the matching feature content (image + description) when a title is hovered.
// This implementation matches titles to contents by index (order in the DOM)
// which avoids brittle id/data-feature mismatches in the markup.
/*
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
            target.style.display = 'flex';
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
}); */

const featureData = {
    kanban: {
        img: "IMAGES/TF/Kanban.png",
        desc: "Visual task management system that displays project progress at a glance, from \"to-do\" through \"completed,\" making it easy for individuals and small teams to track workflow"
    },
    tracking: {
        img: "IMAGES/TF/Time-Tracking.png",
        desc: "Built-in time logging for accurate payroll management and client invoicing, allowing project leads to monitor team activity and freelancers to track billable hours"
    },
    calendar: {
        img: "IMAGES/TF/Calendar.png",
        desc: "Monthly overview of projects, meetings, and deadlines with quick scheduling capabilities to keep teams aligned and on track"
    },
    hub: {
        img: "IMAGES/TF/Project.png",
        desc: "Centralized dashboard displaying all active projects with quick-switch navigation, progress indicators, file uploads, and cross-project messaging that serves as the application's command center"
    },
    messaging: {
        img: "IMAGES/TF/messaging.png",
        desc: "Communication system integrated across all projects, enabling seamless collaboration without leaving the platform"
    }
};

const titles = Array.from(document.querySelectorAll('.display-titles'));
const featureImage = document.getElementById('feature-image');
const featureDesc = document.getElementById('feature-description');
const instructionsEl = document.querySelector('.instructions');

function showFeature(key, activeTitle) {
    const data = featureData[key];
    if (!data) return;

    featureImage.src = data.img;
    featureDesc.textContent = data.desc;

    titles.forEach(t => t.classList.remove('active'));
    if (activeTitle) activeTitle.classList.add('active');

    if (instructionsEl) instructionsEl.style.display = 'none';
}

titles.forEach(titleEl => {
    if (!titleEl.hasAttribute('tabindex')) titleEl.setAttribute('tabindex', '0');

    const key = titleEl.dataset.feature;

    // Works for both mouse hover (desktop) and tap (mobile) —
    // click fires reliably on touch, mouseenter doesn't.
    titleEl.addEventListener('mouseenter', () => showFeature(key, titleEl));
    titleEl.addEventListener('click', () => showFeature(key, titleEl));
    titleEl.addEventListener('focus', () => showFeature(key, titleEl));
});




const menuBtn = document.getElementById('sb-menu-btn');
const sideBar = document.getElementById('sidebar');


menuBtn.addEventListener("click", () => {
  const isHidden = window.getComputedStyle(sideBar).display === "none";

  if (isHidden) {
    sideBar.style.display = "block";
  } else {
    sideBar.style.display = "none";
  }
});