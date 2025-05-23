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

document.addEventListener('DOMContentLoaded', () => {
    const listBtn = document.querySelector('#list-view-button');
    const gridBtn = document.querySelector('#grid-view-button');
    const defaultView = window.innerWidth >= 600 ? 'grid' : 'list';
    toggleView(defaultView);
    fetchCompanies();
    listBtn.addEventListener('click', () => toggleView('list'));
    gridBtn.addEventListener('click', () => toggleView('grid'));
});
