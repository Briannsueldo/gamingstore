import { profileUpdate } from './profileUpdate.js';

profileUpdate();

//

let gameSelected = JSON.parse(localStorage.getItem('selectedGame'));

console.log(gameSelected);

function createCard () {
    let mainContainer = document.getElementById('store-main-container');

    let gameCard = document.createElement('section');
    gameCard.classList.add('game-card');

    gameCard.innerHTML = `
            <div class="header-container">
                <img src="${gameSelected.imageCarrousel}" alt="">
            </div>
            <div class="card-info">
                <div class="title-info-container">
                    <div class="title-container">
                        <h2 class="game-title">${gameSelected.name}</h2>
                        <button class="btn-wishlist">Wishlist</button>
                    </div>
                    <div class="rating-container">
                        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                            <path fill="currentColor" d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2L9.19 8.63L2 9.24l5.46 4.73L5.82 21z"/>
                        </svg>
                        <span class="rating">${gameSelected.rating}</span>
                    </div>
                </div>
                <div class="game-img-specs">
                    <div class="images-container">
                        <div class="img-main">
                            <img src="${gameSelected.imageCapsule}" alt="">
                        </div>
                        <div class="img-carrousel">

                        </div>
                    </div>
                    <div class="specs-container">
                        <h4>Game details</h4>
                        <div class="specs-info-dev">
                            <span>Developer</span>
                            <a href="" class="developer-info">${gameSelected.developer}</a>
                        </div>
                        <div class="specs-info-date">
                            <span>Release date</span>
                            <span>${gameSelected.releaseDate}</span>
                        </div>
                        <div class="specs-info-cat">
                            <span class="cat-title">Categories</span>
                            <div id="categories-container"></div>
                        </div>
                    </div>
                </div>
                <div class="game-description-price">
                    <div class="game-description-container">
                        <h4>Description</h4>
                        <span>${gameSelected.description}</span>
                    </div>
                    <div class="game-price-card">

                    </div>
                </div>
            </div>
    `

    createCategories(gameCard.querySelector('#categories-container'));

    mainContainer.appendChild(gameCard);
}

function createCategories(categoriesContainer) {
    let categorias = gameSelected.categories;

    categorias.forEach(cat => {
        let catBox = document.createElement('span');
        catBox.classList.add('game-category');

        catBox.textContent = cat;

        categoriesContainer.appendChild(catBox);
    });
};

createCard();