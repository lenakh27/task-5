//------USERS------
async function fetchData(url) {
    const response = await fetch(url);
    const data = await response.json();
    return data;
}

function getRandomElement(arr) {
    const randomIndex = Math.floor(Math.random() * arr.length);
    return arr[randomIndex];
}

async function getUsersAndPhotos() {
    const users = await fetchData('https://jsonplaceholder.typicode.com/users');
    const photos = await fetchData('https://jsonplaceholder.typicode.com/albums/1/photos');
    const randomUsers = Array.from({ length: 6 }, () => getRandomElement(users));

    randomUsers.forEach(user => {
       const randomPhoto = getRandomElement(photos);

       const userWrapper = document.getElementById('users-wrapper');
       const userItem = document.createElement('div');
       userItem.classList.add('users-item');
       userItem.setAttribute('data-user-id', user.id);
       userItem.innerHTML = `
          <img src="${randomPhoto.thumbnailUrl}" alt="${user.name}'s photo">
          <p class="users-text">${user.name}</p>
       `;
       userWrapper.appendChild(userItem);
 
       userItem.addEventListener('click', handleUserClick);
    });
 
    return randomUsers;
}
 
function handleUserClick(event) {
    const userId = event.currentTarget.dataset.userId;
 
    window.location.href = `pages/user.html?id=${userId}`;
}
 

document.addEventListener('DOMContentLoaded', async () => {
    await getUsersAndPhotos();
});


// -------SLIDER------

async function fetchRandomPosts() {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts');
    const posts = await response.json();
    return posts.sort(() => Math.random() - 0.5).slice(0, 10);
}

async function createSlider() {
    const sliderContent = document.getElementById('slider-content');
    const posts = await fetchRandomPosts();
 
    posts.forEach(post => {
       const slide = document.createElement('div');
       slide.classList.add('slide');
       slide.innerHTML = `<p class="slide-title">${post.title}</p><p class="slide-text">${post.body}</p>`;
       sliderContent.appendChild(slide);
    });

    initSlider();
}
 
const initSlider = () => {
    const sliderContent = document.querySelector(".slider-wrapper .slider-content");
    const slideButtons = document.querySelectorAll(".slider-wrapper .slide-button");
    const sliderScrollbar = document.querySelector(".container .slider-scrollbar");
    const scrollbarThumb = sliderScrollbar.querySelector(".scrollbar-thumb");
    const maxScrollLeft = sliderContent.scrollWidth - sliderContent.clientWidth;

    scrollbarThumb.addEventListener("mousedown", (e) => {
        const startX = e.clientX;
        const thumbPosition = scrollbarThumb.offsetLeft;
        const maxThumbPosition = sliderScrollbar.getBoundingClientRect().width - scrollbarThumb.offsetWidth;

        const handleMouseMove = (e) => {
            const deltaX = e.clientX - startX;
            const newThumbPosition = thumbPosition + deltaX;

            const bounderPosition = Math.max(0, Math.min(maxThumbPosition, newThumbPosition));
            const scrollPosition = (bounderPosition / maxThumbPosition) * maxScrollLeft;

            scrollbarThumb.computedStyleMap.left = `${bounderPosition}px`;
        }

        const handleMouseUp = () => {
            document.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseup", handleMouseUp);
        }

        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseup", handleMouseUp);
    });

    slideButtons.forEach(button => {
        button.addEventListener("click", () => {
            const direction = button.id === "prev-slide" ? -1 : 1;
            const scrollAmount = sliderContent.clientWidth * direction;
            sliderContent.scrollBy({ left: scrollAmount, behavior: "smooth"});
        })
    })

    const handleSlideButtons = () => {
        slideButtons[0].style.display = sliderContent.scrollLeft <= 0 ? "none" : "flex";
        slideButtons[1].style.display = sliderContent.scrollLeft >= maxScrollLeft ? "none" : "flex";
    }

    const updateScrollThumbPosition = () => {
        const scrollPosition = sliderContent.scrollLeft;
        const thumbPosition = (scrollPosition / maxScrollLeft) * (sliderScrollbar.clientWidth - scrollbarThumb.offsetWidth);
        scrollbarThumb.style.left = `${thumbPosition}px`;
    }

    sliderContent.addEventListener("scroll", () => {
        updateScrollThumbPosition();
        handleSlideButtons();
    })
} 
createSlider();
window.addEventListener("resize", createSlider);
window.addEventListener("load", createSlider);

