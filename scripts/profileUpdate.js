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
};

export { profileUpdate };