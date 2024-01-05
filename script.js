
document.addEventListener('DOMContentLoaded', function () {
    fetch('https://jsonplaceholder.typicode.com/posts')
        .then(response => response.json())
        .then(posts => {
            const slider = document.getElementById('slider');

            posts.slice(0, 10).forEach(post => {
                const postElement = document.createElement('div');
                postElement.className = 'post';
                postElement.textContent = post.title;
                slider.appendChild(postElement);
            });
            let counter = 0;
        setInterval(() => {
            counter++;
            if (counter === 10) {
                counter = 0;
            }
            slider.style.transform = `translateX(${-counter * 100}%)`;
        }, 3000);
    })
    .catch(error => console.error('Error fetching posts:', error));
});


var  btn = document.getElementById("btn").addEventListener('click',getPost);
var con = 0;
var div = document.getElementById("cardDiv");

function getPost(){
    fetch('https://jsonplaceholder.typicode.com/photos')
    .then((res)=>{
        return res.json();
    })
    .then((post)=>{
        for (let i = 0; i < 1; i++) {
            div.innerHTML+=`
                <div class="card col-3 m-1 mx-auto">
                    <img class="card-img-top" src="${post[con].thumbnailUrl}">
                    <div class="card-body">
                        <h5 class="card-title">${post[con].id}</h5>
                        <p class="card-text">${post[con].title}</p>
                    </div>
                </div>
            `
            con=con+1
        }
    })
    .catch((error)=>{
        console.log(error);
    })
}