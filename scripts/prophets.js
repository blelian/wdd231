const url = 'https://byui-cse.github.io/cse-ww-program/data/latter-day-prophets.json';
const cards = document.querySelector('#cards');

async function getProphetData() {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        displayProphets(data.prophets);
    } catch (error) {
        console.error('Fetch error:', error);
    }
}

getProphetData();

const displayProphets = (prophets) => {
    prophets.forEach((prophet) => {
        const card = document.createElement('section');
        card.classList.add('dark-background');
        
        const fullName = document.createElement('h2');
        fullName.textContent = `${prophet.name} ${prophet.lastname}`;
        
        const dob = document.createElement('p');
        dob.classList.add('birth-info');
        dob.textContent = `Date of Birth: ${prophet.birthdate}`;
        
        const pob = document.createElement('p');
        pob.classList.add('birth-info');
        pob.textContent = `Place of Birth: ${prophet.birthplace}`;
        
        const portrait = document.createElement('img');
        portrait.setAttribute('src', prophet.imageurl);
        portrait.setAttribute('alt', `${prophet.name} ${prophet.lastname}`);
        
        card.appendChild(fullName);
        card.appendChild(dob);
        card.appendChild(pob);
        card.appendChild(portrait);
        cards.appendChild(card);
    });
}