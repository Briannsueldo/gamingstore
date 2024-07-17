let menuContainer = document.querySelector('.menu-container');
let profileMenuContainer = document.querySelector('.profile-menu-container');
let profileNickname = document.querySelector('.profile-nick');

function hideBar () {
    if(profileNickname.textContent === '') {
        menuContainer.style.display = 'none';
        profileMenuContainer.style.display = 'none';
    }
}

hideBar();

export { hideBar };

function profileUpdate () {
    let profileContainer = document.getElementById("profile-container");
    let profileImage = document.getElementById("profile-image");
    let profileNickname = document.getElementById("profile-nickname");


    let userInfo = JSON.parse(localStorage.getItem("userInfo"));
    
    let userNick = userInfo[0].nickname;
    let userImg = userInfo[0].userImage;

    profileImage.src = userImg;
    profileNickname.textContent = userNick;

    profileContainer.style.display = "flex";
    menuContainer.style.display = "flex";
    profileMenuContainer.style.display = "flex";
};

export { profileUpdate };