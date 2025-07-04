window.addEventListener('DOMContentLoaded', async (e) => {
    e.preventDefault();
    const token = window.localStorage.getItem('TaJ');
    const response = await fetch(`http://localhost:3000/auth/verify_email?token=${token}`);
    
    if(!response.ok){
        await fetch()
    }
})