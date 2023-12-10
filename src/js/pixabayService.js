import axios from "axios";

export class PixabayService {
    #key = "41115082-57084d131d6361bf0a1460296";
    #baseUrl = "https://pixabay.com/api/";
    pageCount = 1;
    perPage = 40;

    async fetchImages(queryText) {
        
        let parameters = {
            key : this.#key,
            q: queryText,
            image_type : "photo",
            orientation : "horizontal",
            safesearch : "true",
            page : this.pageCount,
            per_page : this.perPage
        };

        let requestUrl = this.#createRequestURL(parameters);
        this.#incrementPageCount();
        return await axios.get(requestUrl).then(responce => {
            console.log(this.pageCount);
            return responce.data;
        });
    }

    resetPageCount() {
        this.pageCount = 1;
    }

    #createRequestURL(params) {
        return this.#baseUrl + "?" + new URLSearchParams(params);
    }

    #incrementPageCount() {
        this.pageCount++;
    }
}