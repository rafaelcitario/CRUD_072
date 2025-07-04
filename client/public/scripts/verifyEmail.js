const emailElement = document.querySelector('h2 span');
const linkElement = document.querySelector('.pixit-warn a');
window.addEventListener('DOMContentLoaded', () => {
    const email = window.localStorage.getItem('email');
    const link = window.localStorage.getItem('verification_link');
    if (!email && !link) {
        emailElement.textContent = "seu e-mail";
        return;
    }
    emailElement.textContent = email;
    linkElement.textContent = link;
    linkElement.href = link;
});