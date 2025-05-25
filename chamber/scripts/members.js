async function fetchCompanies() {
    try {
        const response = await fetch('scripts/members.json');
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        const companies = await response.json();
        displayCompanies(companies);
        observeLazyImages();
    } catch (error) {
        console.error('Failed to fetch company data:', error);
    }
}

function displayCompanies(companies) {
    const cardsContainer = document.querySelector('#cards');
    if (!cardsContainer) return;
    cardsContainer.innerHTML = '';
    companies.forEach((c, i) => {
        const isFirst = i === 0;
        const card = document.createElement('div');
        card.classList.add('member-card');
        card.innerHTML = `
            <div class="image-container">
                <img 
                    ${isFirst ? `src="${c.image}" loading="eager" fetchpriority="high"` : `data-src="${c.image}" class="lazy-image" loading="lazy"`}
                    alt="${c.name}" 
                    width="200" 
                    height="200"
                >
            </div>
            <h2>${c.name}</h2>
            <p>${c.address}</p>
            <p>${c.phone}</p>
            <p><a href="${c.website}" target="_blank" rel="noopener noreferrer">Website</a></p>
            <p>Membership Level: ${c.membershipLevel}</p>
        `;
        cardsContainer.appendChild(card);
    });
}

function toggleView(view) {
    const cards = document.querySelector('#cards');
    if (!cards) return;
    cards.classList.remove('grid-view', 'list-view');
    cards.classList.add(`${view}-view`);
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
    }, {
        rootMargin: '100px',
        threshold: 0.1
    });
    images.forEach(img => observer.observe(img));
}

async function fetchSpotlightCompanies() {
    try {
        const response = await fetch('scripts/members.json');
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        const companies = await response.json();

        // Filter for membershipLevel 2 or 3
        const qualified = companies.filter(c => c.membershipLevel === 2 || c.membershipLevel === 3);

        // Shuffle and pick 2 or 3
        const randomCount = Math.floor(Math.random() * 2) + 2; // 2 or 3
        const shuffled = qualified.sort(() => 0.5 - Math.random());
        const spotlightCompanies = shuffled.slice(0, randomCount);

        displaySpotlight(spotlightCompanies);
    } catch (error) {
        console.error('Failed to fetch spotlight data:', error);
    }
}

function displaySpotlight(companies) {
    const container = document.querySelector('#featured-grid');
    if (!container) return;
    container.innerHTML = '';
    companies.forEach(c => {
        const card = document.createElement('div');
        card.className = 'spotlight-card';
        card.innerHTML = `
            <div class="spotlight-image">
                <img src="${c.image}" alt="${c.name}" width="200" height="200" loading="lazy">
            </div>
            <div class="spotlight-info">
                <h2>${c.name}</h2>
                <p><strong>Phone:</strong> ${c.phone}</p>
                <p><strong>Address:</strong> ${c.address}</p>
                <p><strong>Website:</strong> <a href="${c.website}" target="_blank" rel="noopener noreferrer">${c.website}</a></p>
                <p><strong>Membership Level:</strong> ${c.membershipLevel}</p>
            </div>
        `;
        container.appendChild(card);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const listBtn = document.querySelector('#list-view-button');
    const gridBtn = document.querySelector('#grid-view-button');
    const defaultView = window.innerWidth >= 600 ? 'grid' : 'list';

    // For directory.html
    if (document.querySelector('#cards')) {
        toggleView(defaultView);
        fetchCompanies();
        if (listBtn) listBtn.addEventListener('click', () => toggleView('list'));
        if (gridBtn) gridBtn.addEventListener('click', () => toggleView('grid'));
    }

    // For index.html
    if (document.querySelector('#featured-grid')) {
        fetchSpotlightCompanies();
    }
});
