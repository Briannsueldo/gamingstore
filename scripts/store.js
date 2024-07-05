
import { profileUpdate } from './profileUpdate.js'

profileUpdate();

import { steamGamesInfo } from './arrays/steamGames.js';

/* console.log(steamGamesInfo.length); */

let gamesContainer = document.querySelector('.games-container');

//

//

for (let games = 0; games < steamGamesInfo.length; games++) {

    let game = steamGamesInfo[games];
    
    let gameHorizontalCard = document.createElement('div');
    gameHorizontalCard.classList.add('gameHorizontalCard');

    //

    let horizontalCardLeft = document.createElement('div');
    horizontalCardLeft.classList.add('horizontalCardLeft');
    gameHorizontalCard.appendChild(horizontalCardLeft);

    let horizontalCardRight = document.createElement('div');
    horizontalCardRight.classList.add('horizontalCardRight');
    gameHorizontalCard.appendChild(horizontalCardRight);

    let titleContainer = document.createElement('div');
    titleContainer.classList.add('titleContainer');

    let infoContainer = document.createElement('div');
    infoContainer.classList.add('infoContainer');

    let priceContainer = document.createElement('div');
    priceContainer.classList.add('priceContainer');
    infoContainer.appendChild(priceContainer);

    let buttonsAlertsContainer = document.createElement('div');
    buttonsAlertsContainer.classList.add('buttonsAlertsContainer');
    infoContainer.appendChild(buttonsAlertsContainer);

    let addAnimationContainer = document.createElement('div');
    addAnimationContainer.classList.add('addAnimationContainer');
    buttonsAlertsContainer.appendChild(addAnimationContainer);

    let buttonsContainer = document.createElement('div');
    buttonsContainer.classList.add('buttonsContainer');
    buttonsAlertsContainer.appendChild(buttonsContainer);

    horizontalCardRight.appendChild(titleContainer);
    horizontalCardRight.appendChild(infoContainer);

    //

    let gameHorizontalImage = document.createElement('img');
    gameHorizontalImage.classList.add('gameHorizontalImage');
    horizontalCardLeft.appendChild(gameHorizontalImage);
    gameHorizontalImage.src = game.imageHeader;

    //

    let gameName = document.createElement('h3');
    gameName.classList.add('gameName');
    titleContainer.appendChild(gameName);
    gameName.textContent = game.name;

    //

    //

    let cartButton = document.createElement('button');
    cartButton.classList.add('cartButton');
    cartButton.textContent = 'Add to cart';

    buttonsContainer.appendChild(cartButton);

    let finalGamePriceContainer = document.createElement('div');
    finalGamePriceContainer.classList.add('finalGamePriceContainer');
    let gamePrice = document.createElement('span');
    gamePrice.classList.add('gamePrice');


    if (game.priceStatus.is_free === true) {
        let addLibraryButton = document.createElement('button');
        addLibraryButton.classList.add('addLibraryButton');
        addLibraryButton.textContent = 'Add to library'
        buttonsContainer.appendChild(addLibraryButton);
        cartButton.remove();
    } else {
        if (game.discountStatus.discount_active === true) {
            
            let gameOriginalPriceContainer = document.createElement('div');
            gameOriginalPriceContainer.textContent = `${game.priceStatus.price}$`;
            gameOriginalPriceContainer.classList.add('gameOriginalPriceContainer');
            priceContainer.appendChild(gameOriginalPriceContainer);

            
            priceContainer.appendChild(finalGamePriceContainer);

            
            gamePrice.textContent = `${(((game.priceStatus.price) * (100 - game.discountStatus.discount_amount)) / 100).toFixed(2)}$`;
            finalGamePriceContainer.appendChild(gamePrice);

            let discountAmout = document.createElement('span');
            discountAmout.textContent = `-${game.discountStatus.discount_amount}%`;
            finalGamePriceContainer.appendChild(discountAmout);
            discountAmout.classList.add('discountAmount');
        } else if (game.discountStatus.discount_active === false) {
            gamePrice.textContent = `${game.priceStatus.price}$`;
            finalGamePriceContainer.appendChild(gamePrice);
            priceContainer.appendChild(finalGamePriceContainer);
        }
    }

    let wishlistButton = document.createElement('button');
    wishlistButton.classList.add('wishlistButton');
    wishlistButton.textContent = 'Wishlist';
    wishlistButton.dataset.index = games;

    buttonsContainer.appendChild(wishlistButton);

    gamesContainer.appendChild(gameHorizontalCard);

};

let addToWishlist = function () {
    let wishlistButton = document.querySelectorAll('.wishlistButton');
    let wishlistContainer = document.querySelector('.wishlist-counter');
    let wishlistCounter = 0;

    wishlistButton.forEach(button => {
        let index = button.dataset.index;
        let game = steamGamesInfo[index];

        button.addEventListener('click', () => {

            let parentContainer = button.parentElement.parentElement;

            let addAnimationContainer = parentContainer.querySelector('.addAnimationContainer');

            button.classList.toggle('clicked');
        
            if(button.classList.contains('clicked')) {
                button.textContent = 'Remove';
                game.wishlisted = true;

                wishlistCounter++;
                wishlistContainer.textContent = wishlistCounter;

                addAnimationContainer.textContent = 'Added successfully'
                addAnimationContainer.classList.add('fadeOut');
                setTimeout(() => {
                    addAnimationContainer.classList.remove('fadeOut');
                    addAnimationContainer.classList.add('fadeIn');
                }, 2000);


            } else {
                button.textContent = 'Wishlist'
                game.wishlisted = false;

                wishlistCounter--;
                wishlistContainer.textContent = wishlistCounter;

                addAnimationContainer.textContent = 'Remove successfully'
                addAnimationContainer.classList.add('fadeOut');
                setTimeout(() => {
                    addAnimationContainer.classList.remove('fadeOut');
                    addAnimationContainer.classList.add('fadeIn');
                }, 2000);
            }
        });
    });
};

// gamesContainer
let searchGameInput = document.getElementById('search-game-input');
let searchGameButton = document.getElementById('search-game-button');
let gameName = document.querySelectorAll('.gameName');
let gameCards = document.querySelectorAll('.gameHorizontalCard');

let searchByName = function () {
    searchGameButton.addEventListener('click', () => {

        let search = searchGameInput.value.toLowerCase();

        gameName.forEach((game, index) => {
            let gameText = game.textContent.toLowerCase();

            if(gameText.includes(search)) {
                gameCards[index].style.display = 'flex';
            } else {
                gameCards[index].style.display = 'none';
            };
        });
    });
};

let categorySelector = document.querySelectorAll('.category-selector');

let filterByCategory = function () {
    categorySelector.forEach(button => {
        button.addEventListener('click', (event) => {

            categorySelector.forEach(button => button.classList.remove('category-selected'));

            event.preventDefault();
            let categoryText = button.textContent.toLowerCase();
            filterGamesByCategory(categoryText);

            button.classList.add('category-selected');

            if(button.textContent.toLowerCase() === 'all') {
                setTimeout(() => {
                    button.classList.add('category-selected');
                    button.classList.remove('category-selected');
                }, 2000);
            }
        });
    });
};

let filterGamesByCategory = function (categoryClicked) {
    let categorySelected = categoryClicked.toLowerCase();

    gameCards.forEach((gameCard, index) => {
        let gameCategories = steamGamesInfo[index].categories.map(category => category.toLowerCase());

        if (categorySelected === 'all') {
            gameCard.style.display = 'flex';
        } else if (gameCategories.includes(categorySelected)) {
            gameCard.style.display = 'flex';
        } else {
            gameCard.style.display = 'none';
        };
    });
};

filterByCategory();

searchByName();

addToWishlist();