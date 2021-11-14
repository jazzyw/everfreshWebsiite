const gallery = document.getElementById('gallery');
const popup = document.getElementById('popup');
const selectedImage = document.getElementById('selectedImage');
// array of indices so we can iterate over the images
const imageIndexes = [1, 2, 3, 4];
const selectedIndex = null;

imageIndexes.forEach(i => {
    // create img for each one that we have
    const image = document.createElement('img');
    image.src = `images/food_${i}.jpg`;
    image.alt = `food picture #${i} for EverFresh Eatery`;
    image.style.width = `335px`;
    image.style.height = `223px`;
    image.style.objectFit = `cover;`
    image.classList.add('galleryImg');

    image.addEventListener('click', () => {
        // popup stuff
        popup.style.transform = `translateY(0)`;
        selectedImage.src = `images/food_${i}.jpg`;
        selectedImage.alt = `food picture #${i} for EverFresh Eatery`;
    })

    // add it to the gallery
    gallery.appendChild(image);
})

popup.addEventListener('click', () => {
    popup.style.transform = `translateY(-500%)`;
    popup.src = '';
    popup.alt = '';
})


// smooth scroll
// const links = document.querySelectorAll(".scroll_to");
// console.log(links);
// links.forEach((item) => {
//     item.addEventListener("click", () => {
//         const element = document.getElementById(item.getAttribute("data-link"));
//         console.log(element);
//         element.scrollIntoView({behavior: "smooth", block: "end", inline: "nearest"});
//     })
// })


// TODO: teach fancy transition
// transform each letter into its own span tag so that each letter will animate and move

const text = document.querySelector('.fancy');
const strText = text.textContent;

// create an array of each letter
const splitText = strText.split("");
// get rid of the h1 content so it doesn't double repeat the letters
text.textContent = "";

for (let i = 0; i < splitText.length; i++) {
    text.innerHTML += "<span>" + splitText[i] + "</span>";
}

let char = 0;
// onTick function runs every 50 seconds
let timer = setInterval(onTick, 50);

// add class to each span tag
function onTick(fade) {
    // getting each span tag
    // if (fade === 'add') {
    const span = text.querySelectorAll('span')[char];
    span.classList.add('fade');
    char++;
    // }
    // else {
    //     const span = text.querySelectorAll('span')[char];
    //     span.classList.remove('fade');
    //     char++;
    // }

    if (char === splitText.length) {
        complete();
        return;
    }
}

function complete() {
    clearInterval(timer);
    timer = null;
}

// TODO: animate on scroll
let sectionElements = Array.from(document.querySelectorAll(".section"));
console.log(sectionElements);

window.addEventListener('scroll', scanElements);

function scanElements() {
    sectionElements.forEach(element => {
        if (isVisible(element)) {
            element.classList.add('active');
            // onTick('add');
        }
        else {
            element.classList.remove('active');
            // onTick('remove');
        }
    })
}

function isVisible(element) {
    const elementDiv = element.getBoundingClientRect();
    let distanceFromTop = -300;
    if (elementDiv.top - window.innerHeight < distanceFromTop) {
        return true;
    }
    else {
        return false;
    }
}


// TODO: Contact Form Validation Section
// function checks if email is valid
const isValidEmail = (email) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
};

// function checks if phone is valid
const isValidPhone = (phone) => {
    const re = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
    return re.test(String(phone).toLowerCase());
};

const form = document.querySelector('form');
const thankyou = document.querySelector(".thank-you");

const nameInput = document.querySelector('input[name="name"]');
const emailInput = document.querySelector('input[name="email"]');
const phoneInput = document.querySelector('input[name="phone"]');
const messageInput = document.querySelector('textarea[name="message"]');

const inputs = [nameInput, emailInput, phoneInput, messageInput];

let isFormValid = false;
let isValidationOn = false;

// helper function to reset the inputs
const resetElement = (element) => {
    element.classList.remove('invalid');
    element.nextElementSibling.classList.add("hidden");
}

const invalidateElement = (element) => {
    element.classList.add("invalid");
    element.nextElementSibling.classList.remove("hidden");
}

const validateInputs = () => {
    // nameInput.classList.remove('invalid');
    // nameInput.nextElementSibling.classList.add("hidden");
    if (!isValidationOn) return;

    isFormValid = true;
    resetElement(nameInput);
    resetElement(emailInput);
    resetElement(phoneInput);
    resetElement(messageInput);

    if (!nameInput.value) {
        // nameInput.classList.add("invalid");
        // nameInput.nextElementSibling.classList.remove("hidden");
        isFormValid = false;
        invalidateElement(nameInput);
    }

    if (!isValidEmail(emailInput.value)) {
        isFormValid = false;
        invalidateElement(emailInput);
    }

    if (!isValidPhone(phoneInput.value)) {
        isFormValid = false;
        invalidateElement(phoneInput);
    }

    if (!messageInput.value) {
        isFormValid = false;
        invalidateElement(messageInput);
    }
}

form.addEventListener('submit', (event) => {
    event.preventDefault();
    validateInputs();
    isValidationOn = true;

    if (isFormValid) {
        form.remove();
        thankyou.classList.remove("hidden");
    }
})

inputs.forEach(input => {
    input.addEventListener('input', () => {
        validateInputs();
    })
})

// nameInput.addEventListener('input', () => {
//     validateInputs();
// })

// emailInput.addEventListener('input', () => {
//     validateInputs();
// })



// TODO: call to action

// pass in function and it will run debounce on every scroll
// gives more control --> waits 20 ms before 
function debounce(func, wait = 20, immediate = true) {
    var timeout;
    return function() {
        var context = this, args = arguments;
        var later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        var callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    }
}

const sliderBox = document.querySelector('.slide-in');
const closeBtn = document.querySelector('.close');

// runs every time we scroll
function checkSlider(e) {
    // calculate when we need to show the box
    // console.log((window.scrollY + window.innerHeight))
    // console.log(sliderBox.height / 2)

    // half shown through box
    const slideInAt = (window.scrollY + window.innerHeight) - 100;
    console.log(slideInAt)
    // console.log("offset", sliderBox.offsetTop)
    const isHalfShown = slideInAt > sliderBox.offsetTop;

    if (isHalfShown) {
        sliderBox.classList.add('active')
    }
    else {
        sliderBox.classList.remove('active')
    }
}

function closeSlider() {
    sliderBox.classList.remove('active');
}

// every time we do scroll should probably have debounce
window.addEventListener("scroll", debounce(checkSlider));
closeBtn.addEventListener("click", closeSlider);
