import { steamGamesInfo } from './arrays/steamGames.js';
import { profileUpdate } from './profileUpdate.js';
import { createCards } from './store.js';
import { addToWishlist } from './store.js';
import { selectedCard } from './store.js';

profileUpdate();

let profile = document.querySelector('.profile-wishlist');

let userInfo = JSON.parse(localStorage.getItem("userInfo"));

profile.querySelector('img').src = userInfo[0].userImage;
profile.querySelector('h2').textContent = `${userInfo[0].nickname}'s wishlist`;

let gamesInWishlist = JSON.parse(localStorage.getItem("gamesInWishlist"));

let gamesContainer = document.querySelector('.games-container');

gamesContainer.innerHTML = '';

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
            let gameId = button.id;
            let card = button.closest('.gameHorizontalCard')
            if(button.textContent === 'Wishlist') {
                card.innerHTML = '';

                gamesInWishlist = gamesInWishlist.filter(game => game.id !== gameId);
                localStorage.setItem('gamesInWishlist', JSON.stringify(gamesInWishlist));
                console.log(gamesInWishlist);

                categoryCount();
            } else {
                applyHover();
            }
        });

        button.addEventListener('mouseover', applyHover);
        button.addEventListener('mouseout', removeHover);
    })
}

deleteCard();

selectedCard();

let categoryColors = {
    "Action": "#FF5733",
    "Arcade": "#33FF57",
    "Adventure": "#3357FF",
    "Co-op": "#FF33A1",
    "FPS": "#FFC300",
    "Free to play": "#FF5733",
    "Fighting": "#C70039",
    "Horror": "#900C3F",
    "Multiplayer": "#581845",
    "Open world": "#DAF7A6",
    "Puzzle": "#FF8C00",
    "Racing": "#FF4500",
    "RTS": "#20B2AA",
    "Roleplay": "#8A2BE2",
    "Simulation": "#B22222",
    "Singleplayer": "#4682B4",
    "Sandbox": "#2E8B57",
    "Software": "#A52A2A",
    "Sports": "#7FFF00",
    "Turns": "#D2691E",
    "VR": "#FF1493"
};

let chartUpdate = null

function categoryCount() {

    let categoryCounter = {};

    gamesInWishlist.forEach(game => {
        game.categories.forEach(category => {
            if (categoryCounter[category]) {
                categoryCounter[category]++;
            } else {
                categoryCounter[category] = 1;
            }
        })
    })

    console.log(categoryCounter);

    let catNames = Object.keys(categoryCounter);
    let catAmount = Object.values(categoryCounter);
    let backgroundColors = catNames.map(category => categoryColors[category]);

    if(chartUpdate) {
        chartUpdate.destroy();
    };

    createChart(catNames, catAmount, backgroundColors);
}

document.addEventListener('DOMContentLoaded', categoryCount);

function createChart(catNames, catAmount, backgroundColors) {
    let chartContainer = document.getElementById('chart');

    let data = {
        labels: catNames,
        datasets: [{
          label: 'Amount',
          data: catAmount,
          backgroundColor: backgroundColors,
          hoverOffset: 4,
          borderWidth: 1,
          borderColor: '#212121bb',
        }]
    };

    let plugin = {
        id: 'customCanvasBackgroundColor',
        beforeDraw: (chart, options) => {
          let {ctx} = chart;
          ctx.save();
          ctx.globalCompositeOperation = 'destination-over';
          ctx.fillStyle = options.color || '#212121';
          ctx.fillRect(0, 0, chart.width, chart.height);
          ctx.restore();
        }
    };

    let config = {
        type: 'doughnut',
        data: data,
        options: {
            animation: {
                duration: 400,
            },
            plugins: {
                customCanvasBackgroundColor: {
                    color: '#212121',
                },
                legend: {
                    position: 'none',
                    labels: {
                        color: '#fbfbfbbb',
                    },
                },
                tooltip: {
                    enabled: true,
                    z: 5,
                },
            }
        },
        plugins: [plugin],
    }

    chartUpdate = new Chart(chartContainer, config);
}
