

function firstFormSubmit(submit) {
    submit.preventDefault();

    let nameField = document.getElementById("firstName");
    let lastnameField = document.getElementById("lastName");
    let emailAddressField = document.getElementById("email");
    let passwordField = document.getElementById("password");
    let passwordRepeatField = document.getElementById("repeatPassword");
    let termsAccept = document.getElementById("terms");
    let countrySelector = document.querySelector(".country-selector");

    if (!nameField.value) {
        alert("Name required");
        submit.preventDefault();
        return;
    };

    if (!lastnameField.value) {
        alert("Last name required");
        submit.preventDefault();
        return;
    };

    if (countrySelector.querySelector("span").textContent === "-") {
        alert("Select a country");
        submit.preventDefault();
        return;
    }

    if (!emailAddressField.value) {
        alert("Email required");
        submit.preventDefault();
        return;
    };

    if (!passwordField.value) {
        alert("Password required");
        submit.preventDefault();
        return;
    };

    if(!termsAccept.checked) {
        alert("T&C must be accepted")
        submit.preventDefault();
        return;
    }

    if (passwordField.value === passwordRepeatField.value) {
        // Form submit
    } else {
        alert("Password dont match")
        submit.preventDefault();
        return;
    }

    let selectedCountryName = countrySelector.querySelector("span").textContent;
    let selectedCountryFlag = countrySelector.querySelector("img").getAttribute("src");

    let userInfo = [
        {
            name: nameField.value,
            lastName: lastnameField.value,
            email: emailAddressField.value,
            password: passwordField.value,
            countryName: selectedCountryName,
            countryFlag: selectedCountryFlag,
        },
    ];

    localStorage.setItem("userInfo", JSON.stringify(userInfo));

    postSubtmitAction();

    
};

document.querySelector("form").addEventListener("submit", firstFormSubmit);

function postSubtmitAction() {
    

    let registerContainer = document.querySelector(".register-main-container");
    let formContainer = document.querySelector(".form-register-container");
    let titleContainer = document.querySelector(".register-title-container");
    let titleMain = document.querySelector(".register-title-container h2");
    let realFormContainer = document.querySelector(".form");

    realFormContainer.remove();

    let secondFormContainer = document.createElement("form");
    secondFormContainer.classList.add("secondForm");
    formContainer.appendChild(secondFormContainer);


    titleContainer.classList.add("fadeIn");
    formContainer.classList.add("fadeIn");

    // Svg load

    if (titleContainer.classList.contains("fadeIn")) {
        let svgContainer = document.createElement("div");
        svgContainer.classList.add("svgContainer");
    
        registerContainer.appendChild(svgContainer);
    
        let svgContent = `
            <svg xmlns="http://www.w3.org/2000/svg" width="5rem" height="5rem" viewBox="0 0 24 24">
                <g fill="none" stroke="#fbfbfb" stroke-linecap="round" stroke-width="2">
                    <path stroke-dasharray="60" stroke-dashoffset="60" stroke-opacity="0.3" d="M12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3Z">
                        <animate fill="freeze" attributeName="stroke-dashoffset" dur="1.3s" values="60;0"/>
                    </path>
                    <path stroke-dasharray="15" stroke-dashoffset="15" d="M12 3C16.9706 3 21 7.02944 21 12">
                        <animate fill="freeze" attributeName="stroke-dashoffset" dur="0.3s" values="15;0"/><animateTransform attributeName="transform" dur="1.5s" repeatCount="indefinite" type="rotate" values="0 12 12;360 12 12"/>
                    </path>
                </g>
            </svg>
        `;
    
        svgContainer.innerHTML = svgContent;

        setTimeout(() => {
            titleContainer.classList.remove("fadeIn");
            titleContainer.classList.add("fadeOut");
            titleMain.textContent = "We almost done";


            // Second register creation
            
            /* realFormContainer.innerHTML = ""; */
        }, 3000);

        setTimeout(() => {
            svgContainer.remove();

            // Nickname label - input

            let nicknameContainer = document.createElement("div");
            nicknameContainer.classList.add("form-prompt");

            let nicknameLabel = document.createElement("label");
            nicknameLabel.textContent = "NICKNAME"
            nicknameLabel.classList.add("form-prompt-label");

            nicknameContainer.appendChild(nicknameLabel);

            //

            let nicknameInput = document.createElement("input");
            nicknameInput.id = "nickname"
            nicknameInput.classList.add("form-prompt-input");
            nicknameContainer.appendChild(nicknameInput);

            secondFormContainer.appendChild(nicknameContainer);

            // Profile picture selection

            let profileSelectionContainer = document.createElement("div");
            profileSelectionContainer.classList.add("form-prompt");

            let profileSelectionLabel = document.createElement("label");
            profileSelectionLabel.classList.add("form-prompt-label");
            profileSelectionLabel.textContent = "SELECT A PROFILE ICON";

            let picSelectionContainer = document.createElement("div");
            picSelectionContainer.classList.add("picSelectionContainer");

            let profileImages = [
                /* "../images/profileIcons/profile_1.jpg",
                "../images/profileIcons/profile_2.jpg",
                "../images/profileIcons/profile_3.jpg",
                "../images/profileIcons/profile_4.jpg", */
                {
                    src: "../images/profileIcons/profile_1.jpg",
                },
                {
                    src: "../images/profileIcons/profile_2.jpg",
                },
                {
                    src: "../images/profileIcons/profile_3.jpg",
                },
                {
                    src: "../images/profileIcons/profile_4.jpg",
                },
            ];

            let imageSelected = null;

            for (let i = 0; i < 4; i++) {
                let picContainer = document.createElement("img");
                picContainer.src = profileImages[i].src;

                picSelectionContainer.appendChild(picContainer);

                picContainer.addEventListener("click", function() {
                    let allImages = picSelectionContainer.querySelectorAll("img");
                    allImages.forEach(image => image.classList.remove("active"));

                    picContainer.classList.toggle("active");
                    imageSelected = profileImages[i].src;
                });
            }

            
            // Hidden forwards trigger button action
            let picUpload = document.createElement("input");
            picUpload.type = "file";
            picUpload.classList.add("uploadInput");

            // Upload button
            let uploadButton = document.createElement("button");
            uploadButton.innerText = "UPLOAD YOURS";
            uploadButton.classList.add("uploadButton");
            uploadButton.type = "button";


            //Trigger input type file
            uploadButton.addEventListener("click", () => {
                picUpload.click();
            })



            //Submit button
            let createAccountButton = document.createElement("button");
            createAccountButton.classList.add("submitButton");
            createAccountButton.textContent = "CREATE ACCOUNT!";
            createAccountButton.type = "submit";


            

            profileSelectionContainer.appendChild(profileSelectionLabel);
            profileSelectionContainer.appendChild(picSelectionContainer);
            profileSelectionContainer.appendChild(picUpload);
            profileSelectionContainer.appendChild(uploadButton);
            profileSelectionContainer.appendChild(createAccountButton);

            profileSelectionContainer.style.gap = "1rem";

            secondFormContainer.appendChild(profileSelectionContainer);




            /* document.querySelector("form").addEventListener("submit", function(submit) {
                submit.preventDefault();

                if (!nicknameInput.value) {
                    alert("nickname required");
                    submit.preventDefault();
                    return;
                }
            }) */

            

            secondFormContainer.addEventListener("submit", function(submit) {
                if (!nicknameInput.value) {
                    submit.preventDefault();
                    alert("Chose a nickname");
                    return;
                }

                if (!imageSelected) {
                    submit.preventDefault();
                    alert("Choose an profile picture");
                    return;
                }

                let userInfo = JSON.parse(localStorage.getItem("userInfo"));
                userInfo[0].nickname = nicknameInput.value;
                userInfo[0].userImage = imageSelected;
                localStorage.setItem("userInfo", JSON.stringify(userInfo));
            })

        }, 5000);

        setTimeout(() => {
            formContainer.classList.remove("fadeIn");
            formContainer.classList.add("fadeOut");
        }, 6000);
    }
};






