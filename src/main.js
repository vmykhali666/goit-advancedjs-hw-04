import { PixabayService } from "./js/pixabayService.js"
import Notiflix from 'notiflix';
import iziToast from 'izitoast';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import { throttle } from 'throttle-debounce';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector(".search-form");
const gallery = document.querySelector(".gallery");
// const loadMoreButton = document.querySelector(".load-more");
const searchInput = form.elements.searchQuery;
const pixabayService = new PixabayService();

let requestMessage = "";
let activeScroll = true;

function showError(message) {
    iziToast.show({
        title: 'Error',
        message: `❌ Oops! ${message}`,
        position: 'topRight',
        color: 'red',
    });
}

function SetScroll() {
    const { height: cardHeight } = document
        .querySelector(".gallery")
        .firstElementChild.getBoundingClientRect();

    window.scrollBy({
        top: cardHeight * 2,
        behavior: "smooth",
    });
}

function isScrollAtEnd() {
    const content = document.querySelector('.gallery');
    return window.innerHeight + window.scrollY >= content.offsetHeight;
}

function handleScroll() {
    if (isScrollAtEnd()) {
        if (!activeScroll) {
            showMessage("We're sorry, but you've reached the end of search results.");
        }
        else {
            fetchPhotos();
        }
    }
}


function showMessage(message) {
    iziToast.show({
        title : 'OK',
        message : `✅ Done! ${message}`,
        position: 'topRight',
        color : 'green'
    });
}

function showSuccess(message) {
    iziToast.success({
      title: 'Success',
      message: message,
      position: 'topRight',
      color: 'green',
    });
  }

// function toggleClass(element, isHide) {
//     element.classList.toggle('hidden', isHide);
// }

// function showLoadMore() {
//     toggleClass(loadMoreButton, false);
// }

// function hideLoadMore() {
//     toggleClass(loadMoreButton, true);
// }

function fetchPhotos() {
    pixabayService.fetchImages(requestMessage)
        .then(data => {
            if (!data.hits.length) {
                throw new Error("Sorry, there are no images matching your search query. Please try again.");
            }

            // showLoadMore();
            let markup = data.hits.map(createMarkup).join("");

            gallery.insertAdjacentHTML("beforeend", markup);

            const modal = new SimpleLightbox('.gallery a');
            SetScroll();

            if ((pixabayService.pageCount - 1) * pixabayService.perPage >= data.totalHits) {
                activeScroll = false;
                // toggleClass(loadMoreButton, true);
            }
            
            if (!pixabayService.pageCount > 1) {
                showSuccess(`Hooray! We found ${data.totalHits} totalHits images.`);
            }
        })
        .catch(error => {
            resetGalley();
            showError(error);
        });
}

function createMarkup(matchElement) {
    return `<div class="photo-card">
                <a class="card-link" href="${matchElement.largeImageURL}">
                    <img class="card-img" src="${matchElement.webformatURL}" alt="${matchElement.tags}" loading="lazy" />
                </a>
                <div class="info">
                    <p class="info-item">
                        <b>Likes</b>
                        <span>${matchElement.likes}</span>
                    </p>
                    <p class="info-item">
                        <b>Views</b>
                        <span>${matchElement.views}</span>
                    </p>
                    <p class="info-item">
                        <b>Comments</b>
                        <span>${matchElement.comments}</span>
                    </p>
                    <p class="info-item">
                        <b>Downloads</b>
                        <span>${matchElement.downloads}</span>
                    </p>
                </div>
            </div>`
}

function resetGalley () {
    pixabayService.resetPageCount();
    // hideLoadMore();
    gallery.innerHTML = "";
    window.removeEventListener('scroll', throttle);
}

function onFormSubmit(event) {
    event.preventDefault();
    resetGalley();
    requestMessage = searchInput.value;
    fetchPhotos();
    
    window.addEventListener('scroll', throttle(300, handleScroll));
}

form.addEventListener("submit", onFormSubmit)

