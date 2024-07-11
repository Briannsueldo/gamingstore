import { profileUpdate } from './profileUpdate.js'

profileUpdate();

let userInfo = JSON.parse(localStorage.getItem("userInfo"));

let userNick = userInfo[0].nickname;
let userImg = userInfo[0].userImage;

let profileImageWishlist = document.querySelector('.profile-image');
let profileNicknameWishlist = document.querySelector('.profile-nickname');

profileImageWishlist.src = userImg;
profileNicknameWishlist.textContent = `${userNick}'s wishlist`;

//

let gamesInWishlist = JSON.parse(localStorage.getItem("gamesInWishlist"));

let wishlistContainer = document.querySelector('.wishlist-games');

for (let games = 0; games < gamesInWishlist.length; games++) {

    let game = gamesInWishlist[games];
    
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
    wishlistButton.textContent = 'Remove';
    wishlistButton.dataset.index = games;

    buttonsContainer.appendChild(wishlistButton);

    wishlistContainer.appendChild(gameHorizontalCard);
};