
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

    let buttonsContainer = document.createElement('div');
    buttonsContainer.classList.add('buttonsContainer');
    infoContainer.appendChild(buttonsContainer);

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
    wishlistButton.textContent = 'Wishlist'

    buttonsContainer.appendChild(wishlistButton);

    // 

    //

    gamesContainer.appendChild(gameHorizontalCard);

};

let addToWishlist = function () {
    let wishlistButton = document.querySelectorAll('.wishlistButton');

    wishlistButton.forEach(button => {
        button.addEventListener('click', () => {
            button.classList.toggle('clicked');
        
            if(button.classList.contains('clicked')) {
                button.textContent = 'Remove';
            } else {
                button.textContent = 'Wishlist'
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
            event.preventDefault();
            let categoryText = button.textContent.toLowerCase();
            filterGamesByCategory(categoryText);
        })
    })
}

let filterGamesByCategory = function (categoryClicked) {
    let categorySelected = categoryClicked.toLowerCase();

    gameCards.forEach((gameCard, index) => {
        let gameCategories = steamGamesInfo[index].categories.map(category => category.toLowerCase());

        if (gameCategories.includes(categorySelected)) {
            gameCard.style.display = 'flex';
        } else {
            gameCard.style.display = 'none'
        };
    });
};

filterByCategory();

searchByName();

addToWishlist();