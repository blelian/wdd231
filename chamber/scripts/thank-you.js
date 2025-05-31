const getString = window.location.search;
const myInfo = new URLSearchParams(getString);

document.querySelector('#results').innerHTML = `
    <p>Your membership application has been received with the following details:</p>
    <ul>
        <li>First Name: ${myInfo.get('fname')}</li>
        <li>Last Name: ${myInfo.get('lname')}</li>
        <li>Organizational Title: ${myInfo.get('orgtitle')}</li>
        <li>Email: ${myInfo.get('email')}</li>
        <li>Mobile Phone: ${myInfo.get('phone')}</li>
        <li>Organization Name: ${myInfo.get('orgname')}</li>
        <li>Membership Level: ${myInfo.get('membership')}</li>
        <li>Business Description: ${myInfo.get('description')}</li>
    </ul>
    <a href="./join.html" class="back-button">Back</a>
`;

document.getElementById("year").textContent = new Date().getFullYear();
