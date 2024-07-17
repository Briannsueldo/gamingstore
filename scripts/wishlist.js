import { steamGamesInfo } from './arrays/steamGames.js';
import { profileUpdate } from './profileUpdate.js';
import { createCards } from './store.js';
import { addToWishlist } from './store.js';

profileUpdate();

let profile = document.querySelector('.profile-wishlist');

let userInfo = JSON.parse(localStorage.getItem("userInfo"));

profile.querySelector('img').src = userInfo[0].userImage;
profile.querySelector('h2').textContent = userInfo[0].nickname;

let gamesInWishlist = JSON.parse(localStorage.getItem("gamesInWishlist"));

createCards(gamesInWishlist);

addToWishlist();

function deleteCard () {
    let wishlistButton = document.querySelectorAll('.wishlistButton');


    wishlistButton.forEach(button => {

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
            let card = button.closest('.gameHorizontalCard')
            if(button.textContent === 'Wishlist') {
                card.innerHTML = '';
            } else {
                applyHover();
            }
        });

        button.addEventListener('mouseover', applyHover);
        button.addEventListener('mouseout', removeHover);
    })
}

deleteCard();
