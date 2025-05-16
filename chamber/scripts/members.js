const companies = [
    {
        name: "Sunduza Innovations",
        address: "123 Jules Street, Johannesburg, GP",
        phone: "0855123567",
        website: "https://www.sundinnovations.com",
        image: "images/sund-innovations.webp",
        membershipLevel: 3
    },
    {
        name: "Jabulani Solutions",
        address: "456 Persimon St, Johannesburg, GP",
        phone: "0855234678",
        website: "https://www.jabulasolutions.com",
        image: "images/jabula-solutions.webp",
        membershipLevel: 2
    },
    {
        name: "Maguta Corp",
        address: "789 St Aman, Johannesburg, GP",
        phone: "083456789",
        website: "https://www.magutacorp.com",
        image: "images/maguta-corp.webp",
        membershipLevel: 1
    },
    {
        name: "Khuluma Group",
        address: "321 Hearth Ave, Johannesburg, GP",
        phone: "0864567890",
        website: "https://www.khulumagroup.com",
        image: "images/khuluma-group.webp",
        membershipLevel: 3
    },
    {
        name: "Creative Designs",
        address: "654 Main St, Johannesburg, GP",
        phone: "0855678901",
        website: "https://www.creativedesigns.com",
        image: "images/creative-designs.webp",
        membershipLevel: 2
    },
    {
        name: "Travel Adventures",
        address: "987 Jules St, Johannesburg, GP",
        phone: "0856789012",
        website: "https://www.traveladventures.com",
        image: "images/travel-adventures.webp",
        membershipLevel: 1
    },
    {
        name: "Foodies Unite",
        address: "135 Jules St, Johannesburg, GP",
        phone: "0857890123",
        website: "https://www.foodiesunite.com",
        image: "images/foodies-unite.webp",
        membershipLevel: 2
    }
];

function displayCompanies() {
    const cardsContainer = document.querySelector('#cards');
    cardsContainer.innerHTML = '';
    companies.forEach(c => {
        const card = document.createElement('div');
        card.classList.add('member-card');
        card.innerHTML = `
            <div class="image-container">
                <img src="${c.image}" alt="${c.name}" />
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
    cards.classList.add(view + '-view');
}

document.addEventListener('DOMContentLoaded', () => {
    const listBtn = document.querySelector('#list-view-button');
    const gridBtn = document.querySelector('#grid-view-button');

    listBtn.textContent = '\u22EE\u22EE\u22EE';
    gridBtn.textContent = '\u2261\u2261\u2261';

    const defaultView = window.innerWidth >= 600 ? 'grid' : 'list';
    toggleView(defaultView);
    displayCompanies();

    listBtn.addEventListener('click', () => {
        toggleView('list');
    });

    gridBtn.addEventListener('click', () => {
        toggleView('grid');
    });
});
