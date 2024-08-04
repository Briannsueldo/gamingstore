import { profileUpdate } from './profileUpdate.js';

profileUpdate();

//

function wishCounter () {
    let wishStorage = JSON.parse(localStorage.getItem("gamesInWishlist"));
    let wishNumber = document.querySelector('.wishlist-counter');

    wishNumber.textContent = wishStorage.length;
};

export { wishCounter };

wishCounter();

document.addEventListener('DOMContentLoaded', () => {

    let gameSelected = JSON.parse(localStorage.getItem('selectedGame'));
    let gamesInWishlist = JSON.parse(localStorage.getItem('gamesInWishlist')) || [] //

    function createCard () {
        let mainContainer = document.getElementById('store-main-container');

        let gameCard = document.createElement('section');
        gameCard.classList.add('game-card');

        let wishlistCheck = gamesInWishlist.some(game => game.id === gameSelected.id);  //
        let buttonText = wishlistCheck ? 'Remove from wishlist' : 'Add to wishlist';
        

        gameCard.innerHTML = `
                <div class="header-container">
                    <img src="${gameSelected.imageCarrousel}" alt="">
                </div>
                <div class="card-info">
                    <div class="title-info-container">
                        <div class="title-container">
                            <h2 class="game-title">${gameSelected.name}</h2>
                            <button class="btn-wishlist" id="${gameSelected.id}">${buttonText}</button>
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
                        <div class="game-price-card" id="game-price-card">

                        </div>
                    </div>
                </div>
        `

        createCategories(gameCard.querySelector('#categories-container'));

        mainContainer.appendChild(gameCard);

        wishButtonStatus();

        priceStatus();

        removeStyle();
    }

    function priceStatus () {
        let priceCard = document.querySelector('.game-price-card');

        if (gameSelected.priceStatus.is_free === true) {
            priceCard.innerHTML = `
                <div class="buttons-container">
                    <button class="add-library-btn">Add to library</button>
                </div>
            `
        } else if (gameSelected.discountStatus.discount_active === true) {
            priceCard.innerHTML = `
            <div class="price-container">
                <div class="initial-price-container">
                    <span class="initial-price">$${gameSelected.priceStatus.price}</span>
                </div>
                <div class="final-price-container">
                    <span class="final-price">$${(((gameSelected.priceStatus.price) * (100 - gameSelected.discountStatus.discount_amount)) / 100).toFixed(2)}</span>
                    <span class="discount-amount">-${gameSelected.discountStatus.discount_amount}%</span>
                </div>
            </div>
            <div class="buttons-container">
                <button class="buy-btn">Buy now</button>
                <button class="cart-btn">Add to cart</button>
            </div>
        `
        } else {
            priceCard.innerHTML = `
            <div class="price-container">
                <div class="final-price-container-noDiscount">
                    <span class="final-price">$${gameSelected.priceStatus.price}</span>
                </div>
            </div>
            <div class="buttons-container">
                <button class="buy-btn">Buy now</button>
                <button class="cart-btn">Add to cart</button>
            </div>
            `
        }
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

    function wishButtonStatus () {
        let wishBtn = document.querySelector('.btn-wishlist');
        let gamesInWishlist = JSON.parse(localStorage.getItem('gamesInWishlist')) || [];

        wishBtn.addEventListener('click', () => {
            if(!gamesInWishlist.some(wishedGame => wishedGame.id === gameSelected.id)) {
                gamesInWishlist.push(gameSelected);

                wishBtn.textContent = 'Remove from wishlist';
                wishBtn.classList.remove('btn-wishlist');
                wishBtn.classList.add('removeGame');

            } else {
                gamesInWishlist = gamesInWishlist.filter(wishedGame => wishedGame.id !== gameSelected.id);
                wishBtn.textContent = 'Add to wishlist';
                wishBtn.classList.remove('removeGame');
                wishBtn.classList.add('btn-wishlist');

            }

            localStorage.setItem('gamesInWishlist', JSON.stringify(gamesInWishlist));

            wishCounter();
        });
    };

    function removeStyle () {
        let wishBtn = document.querySelector('.btn-wishlist');

        let wishlistCheck = gamesInWishlist.some(game => game.id === gameSelected.id);

        if (wishlistCheck) {
            wishBtn.classList.remove('btn-wishlist');
            wishBtn.classList.add('removeGame');
        };
    };

    createCard();
});



