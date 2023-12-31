import { PixabayService } from "./js/pixabayService.js"
import iziToast from 'izitoast';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector(".search-form");
const gallery = document.querySelector(".gallery");
const searchInput = form.elements.searchQuery;
const pixabayService = new PixabayService();

let requestMessage = "";
let activeScroll = true;
let isLoading = false;

function showError(message) {
    iziToast.show({
        title: 'Error',
        message: `❌ Oops! ${message}`,
        position: 'topRight',
        color: 'red',
    });
}

function setScroll() {
    const { height: cardHeight } = document
        .querySelector(".gallery")
        .firstElementChild.getBoundingClientRect();

    window.scrollBy({
        top: cardHeight * 2,
        behavior: "smooth",
    });
}

function isScrollAtEnd() {
    const content = document.querySelector('body');
    return window.innerHeight + window.scrollY >= content.offsetHeight;
}

async function handleScroll() {
    if (isScrollAtEnd()) {
        if (!activeScroll) {
            showMessage("We're sorry, but you've reached the end of search results.");
        }
        else if (!isLoading) {
            await fetchPhotos();
            setScroll();
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

async function fetchPhotos() {
    try {
        const data = await pixabayService.fetchImages(requestMessage);
        pixabayService.incrementPageCount();

        isLoading = true;
        activeScroll = true;
        if (!data.hits.length) {
            throw new Error("Sorry, there are no images matching your search query. Please try again.");
        }

        if ((pixabayService.pageCount - 1) * pixabayService.perPage >= data.totalHits) {
            activeScroll = false;
        }
        
        if (!pixabayService.pageCount > 1) {
            showSuccess(`Hooray! We found ${data.totalHits} totalHits images.`);
        }
        
        const markup = data.hits.map(createMarkup).join("");

        gallery.insertAdjacentHTML("beforeend", markup);

        const modal = new SimpleLightbox('.gallery a');
    }
    catch (error) {
        resetGalley();
        showError(error);
    }
    finally {
        isLoading = false;
    }
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
    window.removeEventListener('scroll', handleScroll);
}

async function onFormSubmit(event) {
    try {
        event.preventDefault();
        resetGalley();
        const tempRequest = searchInput.value.trim();
        if (tempRequest === "") {
            throw new Error("Sorry, we can`t handle empty request, please enter the query");
        }
        requestMessage = tempRequest;
        await fetchPhotos();

        window.addEventListener('scroll', handleScroll);
    } catch (error) {
        showError(error);
    }
}

form.addEventListener("submit", onFormSubmit)

