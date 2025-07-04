window.addEventListener('DOMContentLoaded', async (e) => {
    e.preventDefault();
    const token = window.sessionStorage.getItem('actk');
    const response = await fetch(`http://localhost:3000/auth/verify_email?token=${token}`);
})