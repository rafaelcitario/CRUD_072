const headerLinks = document.querySelectorAll('.header-links');
const signButtons = document.querySelectorAll('#auth-buttons-div button');
export const header = document.querySelector('header')

headerLinks.forEach(link => {
    link.href = link.textContent.toLowerCase() === 'sobre'
        ? 'https://github.com/rafaelcitario/CRUD_072/blob/master/README.md'
        : 'https://github.com/rafaelcitario/CRUD_072';
    link.target = '_blank';
});
signButtons.forEach(button => {
const buttonLink = button.firstElementChild;
buttonLink.href = buttonLink.outerText.toLowerCase() === 'signin' ? `/client/public/pages/register.html`: `/client/public/pages/login.html`;
});