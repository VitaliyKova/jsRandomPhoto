const accessKey = 'FFUQhKKTYVFXd059VVtqfDQw7FRnCgYaqKZ-J3QQYks';
const photoElement = document.getElementById('photo');
const photographerElement = document.getElementById('photographer');
const likeCountElement = document.getElementById('like-count');

async function getRandomPhoto() {
    try {
        const response = await fetch(`https://api.unsplash.com/photos/random?client_id=${accessKey}`);
        const data = await response.json();
        displayPhoto(data);
    } catch (error) {
        console.error('Ошибка при получении изображения:', error);
    }
}

function displayPhoto(photoData) {
    photoElement.src = photoData.urls.regular;
    photographerElement.textContent = photoData.user.name;
    photoElement.setAttribute('data-photo-id', photoData.id); 
    loadLikes(photoData.id);
}

function likePhoto() {
    let currentCount = parseInt(likeCountElement.textContent);
    currentCount++;
    likeCountElement.textContent = currentCount;
    saveLikes(photoElement.getAttribute('data-photo-id'), currentCount);
}

function saveLikes(photoId, count) {
    localStorage.setItem(`likes-${photoId}`, count);
}

function loadLikes(photoId) {
    const savedCount = localStorage.getItem(`likes-${photoId}`);
    likeCountElement.textContent = savedCount ? savedCount : 0;
}


getRandomPhoto();
