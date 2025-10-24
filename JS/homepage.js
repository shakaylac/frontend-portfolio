// Hover-preview implementation for project gallery
// When the user hovers a project image, show a larger preview image inside #project-gallery.

const cultivateEl = document.getElementById('cultivate');
const rootedEl = document.getElementById('rooted-portrait');
const taskflowEl = document.getElementById('taskflow');
const container = document.getElementById('project-gallery');

if (!container) {
  console.warn('project-gallery element not found');
}

// Create one preview image and append it to the gallery container.
const preview = document.createElement('img');
preview.id = 'preview-hover-image';
preview.style.position = 'absolute';
preview.style.zIndex = -1;
preview.style.top = '50%';
preview.style.left = '50%';
preview.style.transform = 'translate(-50%, -50%)';
preview.style.maxWidth = '1000%';
preview.style.maxHeight = '1000%';
preview.style.boxShadow = '0 10px 30px rgba(0,0,0,0.3)';
preview.style.transition = 'opacity 200ms ease';
preview.style.opacity = '0';
preview.style.pointerEvents = 'none';

if (container) container.appendChild(preview);

function showPreview(src) {
  if (!src) return;
  preview.src = src;
  // ensure image is visible
  preview.style.opacity = '1';
}

function hidePreview() {
  preview.style.opacity = '0';
}

// Add handlers if the triggers exist. Filenames reflect images in the project IMAGES folder.
if (cultivateEl) {
  cultivateEl.addEventListener('mouseenter', () => showPreview('./IMAGES/cultivate-hover-image.png'));
  cultivateEl.addEventListener('mouseleave', hidePreview);
}

if (rootedEl) {
  // file in repo is named 'rooted-portriat-hover-image.png' (note spelling)
  rootedEl.addEventListener('mouseenter', () => showPreview('./IMAGES/rooted-portriat-hover-image.png'));
  rootedEl.addEventListener('mouseleave', hidePreview);
}

if (taskflowEl) {
  taskflowEl.addEventListener('mouseenter', () => showPreview('./IMAGES/hover-image.png'));
  taskflowEl.addEventListener('mouseleave', hidePreview);
}

// Optional: expose functions for debugging
window.__galleryPreview = { showPreview, hidePreview };
const hoverBtnCultivate = document.getElementById('cultivate');
const hoverBtnRootPoritrait = document.getElementById('rooted-protrait');
const hoverBtnTaskflow = document.getElementById('taskflow');
const containerBackground = document.getElementById('project-gallery');
const cultivateImage = document.createElement('cultivateimg');
const rootedPortreaitImage = document.getElementById('rootedportraitimg');
const taskflowIamge = document.getElementById('taskflowimg');

hoverBtnCultivate.addEventListener('mouseover', () => {
    cultivateImage.src = "./IMAGAES/cultivate-hover-image.png";
    containerBackground.appendChild(cultivateImage)
})

