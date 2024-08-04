
import { profileUpdate } from './profileUpdate.js'

profileUpdate();

import { steamGamesInfo } from './arrays/steamGames.js';

import { wishCounter } from './gameProfile.js';

wishCounter();


//

function createCards (gamesArray) {
    let gamesContainer = document.querySelector('.games-container');
    gamesContainer.innerHTML = '';
    gamesArray.forEach(game => {
        let gameHorizontalCard = document.createElement('div');
        gameHorizontalCard.classList.add('gameHorizontalCard');
        gameHorizontalCard.setAttribute('id', `${game.id}`);
    
        gameHorizontalCard.innerHTML = `
            <div class="horizontalCardLeft">
                <img class="gameHorizontalImage" src="${game.imageHeader}">
            </div>
            <div class="horizontalCardRight">
                <div class="titleContainer">
                    <h3 class="gameName">${game.name}</h3>
                </div>
                <div class="infoContainer">
    
                </div>
            </div>
        `
        let infoContainer = gameHorizontalCard.querySelector('.infoContainer');
    
        if (game.priceStatus.is_free === true) {
            infoContainer.innerHTML = `
                <div class="buttonsAlertsContainer">
                    <div class="addAnimationContainer"></div>
                    <div class="buttonsContainer">
                        <button class="addLibraryButton">Add to library</button>
                        <button class="wishlistButton" id="${game.id}">Wishlist</button>
                    </div>
                </div>
            `
        } else {
            if(game.discountStatus.discount_active === false) {
                infoContainer.innerHTML = `
                <div class="priceContainer">
                    <div class="finalGamePriceContainer">
                        <span class="gamePrice">${game.priceStatus.price}$</span>
                    </div>
                </div>
                <div class="buttonsAlertsContainer">
                    <div class="addAnimationContainer"></div>
                    <div class="buttonsContainer">
                        <button class="cartButton">Add to cart</button>
                        <button class="wishlistButton" id="${game.id}">Wishlist</button>
                    </div>
                </div>
            `
            } else {
                infoContainer.innerHTML = `
                <div class="priceContainer">
                    <div class="gameOriginalPriceContainer">
                        ${game.priceStatus.price}$
                    </div>
                    <div class="finalGamePriceContainer">
                        <span class="gamePrice">${(((game.priceStatus.price) * (100 - game.discountStatus.discount_amount)) / 100).toFixed(2)}$</span>
                        <span class="discountAmount">-${game.discountStatus.discount_amount}%</span>
                    </div>
                </div>
                <div class="buttonsAlertsContainer">
                    <div class="addAnimationContainer"></div>
                    <div class="buttonsContainer">
                        <button class="cartButton">Add to cart</button>
                        <button class="wishlistButton" id="${game.id}">Wishlist</button>
                    </div>
                </div>
            `
            }
        }
    
        gamesContainer.appendChild(gameHorizontalCard);
    });
}

createCards(steamGamesInfo);

export { createCards };

function selectedCard () {
    
    let gameHorizontalCard = document.querySelectorAll('.gameHorizontalCard');

    gameHorizontalCard.forEach(card => {
        
        let cardId = card.getAttribute('id');

        let cardArray = steamGamesInfo.find(card => card.id === cardId);

        card.addEventListener('click', () => {

            localStorage.setItem('selectedGame', JSON.stringify(cardArray));

            if (cardId === cardArray.id) {
                /* console.log(cardArray.id) */
                window.location.href = '../pages/game.html';
            }
        });

        let wishBtn = card.querySelector('.wishlistButton');
        wishBtn.addEventListener('click', (e) => {
            e.stopPropagation();
        });
    });
};

selectedCard();

export { selectedCard };


let gamesInWishlist = JSON.parse(localStorage.getItem("gamesInWishlist")) || [];

let addToWishlist = function () {
    let wishlistButton = document.querySelectorAll('.wishlistButton');

    wishlistButton.forEach(button => {
        let gameId = button.id;
        let game = steamGamesInfo.find(game => game.id === gameId);

        if (gamesInWishlist.some(wishedGame => wishedGame.id === gameId)) {
            button.textContent = 'Remove';
            button.classList.add('clicked');
        } else {
            button.textContent = 'Wishlist';
        }

        let applyHover = () => {
            button.style.color = '#da1e28';
            button.style.border = '1px solid #da1e28';
            button.style.transition = '0.2s ease-in-out'
        };
    
        let removeHover = () => {
            button.style.color = '';
            button.style.border = '';
        };

        button.addEventListener('click', () => {

            let parentContainer = button.parentElement.parentElement;

            let addAnimationContainer = parentContainer.querySelector('.addAnimationContainer');

            button.classList.toggle('clicked');
        
            if(button.classList.contains('clicked')) {
                button.textContent = 'Remove';
                game.wishlisted = true;

                addAnimationContainer.textContent = 'Added successfully'
                addAnimationContainer.classList.add('fadeOut');
                setTimeout(() => {
                    addAnimationContainer.classList.remove('fadeOut');
                    addAnimationContainer.classList.add('fadeIn');
                }, 2000);

                if (!gamesInWishlist.find(wishedGame => wishedGame.id === gameId)) {
                    gamesInWishlist.push(game);
                }

                localStorage.setItem("gamesInWishlist", JSON.stringify(gamesInWishlist));

                button.addEventListener('mouseover', applyHover);
                button.addEventListener('mouseout', removeHover);

                wishCounter();
            } else {
                button.textContent = 'Wishlist'
                game.wishlisted = false;

                addAnimationContainer.textContent = 'Remove successfully'
                addAnimationContainer.classList.add('fadeOut');
                setTimeout(() => {
                    addAnimationContainer.classList.remove('fadeOut');
                    addAnimationContainer.classList.add('fadeIn');
                }, 2000);

                gamesInWishlist = gamesInWishlist.filter(wishedGame => wishedGame.id !== gameId);

                localStorage.setItem("gamesInWishlist", JSON.stringify(gamesInWishlist));

                button.removeEventListener('mouseover', applyHover);
                button.removeEventListener('mouseout', removeHover);

                button.style.color = '';
                button.style.border = '';

                wishCounter();
            }
        });

        if(button.textContent === 'Remove') {
            button.addEventListener('mouseover', applyHover);
            button.addEventListener('mouseout', removeHover);
        }
    });
};

export { addToWishlist };

addToWishlist();

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

if (window.location.pathname.includes('store.html')) {
    searchByName();
}

let categorySelector = document.querySelectorAll('.category-selector');

let filterByCategory = function () {
    categorySelector.forEach(button => {
        button.addEventListener('click', (event) => {
            
            event.preventDefault();

            categorySelector.forEach(button => button.classList.remove('category-selected'));

            let categoryText = button.textContent.toLowerCase();

            button.classList.add('category-selected');

            gameCards.forEach((cards, index) => {
                let gameCategories = steamGamesInfo[index].categories.map(category => category.toLowerCase());

                if (categoryText === 'all') {
                    cards.style.display = 'flex';
                } else if (gameCategories.includes(categoryText)) {
                    cards.style.display = 'flex';
                } else {
                    cards.style.display = 'none';
                };
            });
        });
    });
};

if (window.location.pathname.includes('store.html')) {
    filterByCategory();
}
