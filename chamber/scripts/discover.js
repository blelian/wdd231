async function fetchPlace() {
  try {
    const response = await fetch('scripts/discover.json');
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
    const places = await response.json();
    displayPlace(places);
    observeLazyImages();
  } catch (error) {
    console.error('Failed to fetch place data:', error);
  }
}

function displayPlace(places) {
  const cardsContainer = document.querySelector('#cards');
  cardsContainer.innerHTML = '';
  places.forEach((place, index) => {
    const card = document.createElement('div');
    card.classList.add('member-card');
    card.style.gridArea = `card${index + 1}`;
    card.innerHTML = `
      <figure>
        <img 
          src="${place.image}" 
          alt="${place.name}" 
          width="300" height="200"
          loading="${index === 0 ? 'eager' : 'lazy'}"
          ${index !== 0 ? `data-src="${place.image}" class="lazy-image"` : ''}
        >
      </figure>
      <h2>${place.name}</h2>
      <address>${place.address}</address>
      <p>${place.description || 'No description available.'}</p>
    `;
    const button = document.createElement('button');
    button.textContent = 'Learn More';
    button.addEventListener('click', () => {
      showModal(place);
    });
    card.appendChild(button);
    cardsContainer.appendChild(card);
  });
}

function observeLazyImages() {
  const images = document.querySelectorAll('img.lazy-image');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.removeAttribute('data-src');
        observer.unobserve(img);
      }
    });
  });
  images.forEach(img => observer.observe(img));
}

function showModal(place) {
  const modal = document.createElement('div');
  modal.classList.add('modal');
  const modalContent = document.createElement('div');
  modalContent.classList.add('modal-content');
  const closeButton = document.createElement('button');
  closeButton.textContent = 'Close';
  closeButton.classList.add('close-button');
  modalContent.innerHTML = `
    <h2>${place.name}</h2>
    <img src="${place.image}" alt="${place.name}" width="300">
    <p>${place.description}</p>
    <address>${place.address}</address>
  `;
  modalContent.appendChild(closeButton);
  modal.appendChild(modalContent);
  document.body.appendChild(modal);
  closeButton.addEventListener('click', () => {
    document.body.removeChild(modal);
  });
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.remove();
    }
  });
}

function displayVisitMessage() {
  const visitDisplay = document.querySelector("#visit-message");
  const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24;
  const lastVisit = Number(localStorage.getItem("lastVisit")) || 0;
  const now = Date.now();
  let message = "";

  if (lastVisit === 0) {
    message = "Welcome! Let us know if you have any questions.";
  } else {
    const daysSince = Math.floor((now - lastVisit) / MILLISECONDS_PER_DAY);
    if (daysSince < 1) {
      message = "Back so soon! Awesome!";
    } else if (daysSince === 1) {
      message = "You last visited 1 day ago.";
    } else {
      message = `You last visited ${daysSince} days ago.`;
    }
  }

  visitDisplay.textContent = message;
  localStorage.setItem("lastVisit", now);
}

document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.getElementById("menu-toggle");
  const closeMenu = document.getElementById("close-menu");
  const nav = document.getElementById("primary-nav");

  if (menuToggle) {
    menuToggle.addEventListener("click", () => {
      nav.classList.add("open");
    });
  }

  if (closeMenu) {
    closeMenu.addEventListener("click", () => {
      nav.classList.remove("open");
    });
  }

  displayVisitMessage();
  fetchPlace();
});
