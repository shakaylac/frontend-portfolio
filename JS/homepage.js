// Gallery hover-preview and dynamic gradient control
// - Uses CSS custom properties on #project-gallery so JS can change the gradient colors at runtime.
// - Shows a single preview image when hovering project thumbnails and swaps the gallery transparent color.

const cultivateEl = document.getElementById('cultivate');
const rootedEl = document.getElementById('rooted-portrait');
const taskflowEl = document.getElementById('taskflow');
const container = document.getElementById('project-gallery');
const projectTitle = document.getElementById('project-title');
const nav = document.getElementById('nav');



const gradient = document.createElement('div');
gradient.style.width = '100%';
gradient.style.height = '100%';
gradient.style.opacity = '50%';

container.appendChild(gradient);

if (!container) console.warn('project-gallery element not found');

// Create a single preview image appended to the gallery container.
const preview = document.createElement('img');
preview.id = 'preview-hover-image';
preview.style.position = 'absolute';
preview.style.zIndex = '-1';
preview.style.top = '50%';
preview.style.left = '50%';
preview.style.transform = 'translate(-50%, -50%)';
preview.style.maxWidth = '100%';
preview.style.maxHeight = '100%';
preview.style.boxShadow = '0 10px 30px rgba(0,0,0,0.3)';
preview.style.transition = 'opacity 200ms ease';
preview.style.opacity = '0';
preview.style.pointerEvents = 'none';

if (container) container.appendChild(preview);

// Read original gradient values (fallback to defaults if variables not set)
const computed = container ? getComputedStyle(container) : null;
const originalStart = (computed && computed.getPropertyValue('--gallery-grad-start').trim()) || '#df8b16c2';
const originalEnd = (computed && computed.getPropertyValue('--gallery-grad-end').trim()) || '#e2ba69a9';

// Functions to control preview visibility
function showPreview(src) {
  if (!src || !container) return;
  preview.src = src;
  preview.style.opacity = '1';
  projectTitle.style.opacity = '0';
}

function hidePreview() {
  preview.style.opacity = '0';
  projectTitle.style.opacity = '1';
}

// Dynamic gradient control: set and restore
function setGalleryGradient(start, end) {
  if (!container) return;
  if (start) container.style.setProperty('--gallery-grad-start', start);
  if (end) container.style.setProperty('--gallery-grad-end', end);
}

function restoreGalleryGradient() {
  if (!container) return;
  container.style.setProperty('--gallery-grad-start', originalStart);
  container.style.setProperty('--gallery-grad-end', originalEnd);
}

// A softer transparent color to use while hovering (tweak as you like)
var hoverStart = 'rgba(153, 30, 30, 0.03)'; 
var hoverEnd = 'rgba(10,10,10,0.06)';

// Wire up handlers for thumbnails — change gradient on hover and show preview
if (cultivateEl) {
  cultivateEl.addEventListener('mouseenter', () => {
    showPreview('./IMAGES/cultivate-hover-image.png');
    var hoverEnd = '#58802b96';
    setGalleryGradient(hoverStart, hoverEnd);
  });
  cultivateEl.addEventListener('mouseleave', () => {
    hidePreview();
    restoreGalleryGradient();
  });
}

if (rootedEl) {
  rootedEl.addEventListener('mouseenter', () => {
    showPreview('./IMAGES/rooted-portriat-hover-image.png');
    hoverEnd = '#eea282a6';
    setGalleryGradient(hoverStart, hoverEnd);
  });
  rootedEl.addEventListener('mouseleave', () => {
    hidePreview();
    restoreGalleryGradient();
  });
}

if (taskflowEl) {
  taskflowEl.addEventListener('mouseenter', () => {
    showPreview('./IMAGES/hover-image.png');
    hoverEnd = '#a24deca1';
    setGalleryGradient(hoverStart, hoverEnd);
  });
  taskflowEl.addEventListener('mouseleave', () => {
    hidePreview();
    restoreGalleryGradient();
  });
}

// Expose API for dynamic updates from console or other scripts
window.__galleryPreview = {
  showPreview,
  hidePreview,
  setGalleryGradient,
  restoreGalleryGradient,
};

let slideIndex = 0;
showSlides();

function showSlides() {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  slideIndex++;
  if (slideIndex > slides.length) {slideIndex = 1}
  slides[slideIndex-1].style.display = "block";
  setTimeout(showSlides, 2000); // Change image every 2 seconds
} 
