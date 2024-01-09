document.addEventListener('DOMContentLoaded', async () => {
    const options = new URLSearchParams(window.location.search);
    const userId = options.get('id');
    const user = await fetchUserData(userId);

    showUsersInfo(user);
});

async function fetchUserData(userId) {
    const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);
    const userData = await response.json();
    return userData;
}

function showUsersInfo(user) {
    const userInfo = document.getElementById('user-info');
    const userInfoCard = document.createElement('div');
    userInfoCard.innerHTML = `
        <h2 class="user-name">${user.name}</h2>
        <p><span class="user-text">Email</span>: ${user.email}</p>
        <p><span class="user-text">Phone</span>: ${user.phone}</p>
        <p><span class="user-text">Website</span>: ${user.website}</p>
        <p><span class="user-text">Username</span>: ${user.username}</p>
        <p><span class="user-text">Company</span>: ${user.company.name}</p>
        <p><span class="user-text">Adress</span>: ${user.address.street}, ${user.address.suite}, ${user.address.city}, ${user.address.zipcode}</p>
        <p><span class="user-text">Geo</span>: Lat ${user.address.geo.lat}, Lng ${user.address.geo.lng}</p>
    `;
    userInfo.appendChild(userInfoCard);
}