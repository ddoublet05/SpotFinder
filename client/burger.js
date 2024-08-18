const burgerButton = document.querySelector('#burger');
const navMenu = document.querySelector('.overlay');

burgerButton.addEventListener('click', function () {
    if (navMenu.style.display === 'flex') {
        navMenu.style.display = 'none';
    } else {
        navMenu.style.display = 'flex';
    }
});