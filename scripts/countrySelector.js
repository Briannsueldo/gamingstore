
let countrySelector = document.querySelector(".country-selector");

let dropdownMenu = document.querySelector(".country-selector-dropdown");

countrySelector.addEventListener("click", () => {
    countrySelector.classList.toggle("active");
    countrySelector.classList.remove('prevError');

    if (countrySelector.classList.contains("active")) {
        dropdownMenu.classList.add("displayBlock")
    } else {
        dropdownMenu.classList.remove("displayBlock")
    }
});

let countryOption = document.querySelectorAll(".country-selector-option");

countryOption.forEach(option => {
    option.addEventListener("click", function () {
        countrySelector.innerHTML = option.innerHTML;

        countrySelector.classList.remove("active");
        dropdownMenu.classList.remove("displayBlock");

        countrySelector.style.color = "#fbfbfb"
    })
});


