

// Tutorial library 

const driver = window.driver.js.driver;

const driverObj = driver({
    overlayColor: 'red',
    overlayOpacity: '0.75',
    showProgress: true,
    steps: [
        { element: '#tutorial-step-1', popover: { title: 'Create an account'}},
        { element: '#tutorial-step-2', popover: { title: 'Choose your Os'}},
        { element: '#tutorial-step-3', popover: { title: 'Enjoy these and more!'}},
    ]
});

driverObj.drive();

//

let chooseSystem = document.getElementById('tutorial-step-2');
let systemList = document.querySelector('.systemList');
let systemListItem = document.querySelectorAll('.systemItem');

chooseSystem.addEventListener('click', ()=> {
    systemList.classList.toggle('system-show');
    chooseSystem.classList.toggle('fix-position-showed');
})

let userInfo = [
    {},
];

systemListItem.forEach((item) => {
    item.addEventListener('click', ()=> {
        chooseSystem.querySelector('.step-2').innerHTML = item.innerHTML;

        userInfo[0].OS = item.querySelector('h4').textContent;

        localStorage.setItem('userInfo', JSON.stringify(userInfo));
    })
})

//

function goToRegister() {
    let nextStepButton = document.querySelector('.step-1');
    nextStepButton.setAttribute('type', 'submit');

    nextStepButton.addEventListener('click', (e)=> {
        let systemSelection = document.querySelector('.step-2 h4');

        if(systemSelection && systemSelection.textContent === 'Choose your OS') {
            console.log(systemSelection.textContent);
            e.preventDefault();
        }
    })
}

goToRegister();
