import { redirect } from "./nav.js";

const form = document.getElementById("register-form");
const registerErr = document.querySelector('.error-disable');

form.addEventListener('input', () => {
    registerErr.classList.replace('error-enable', 'error-disable');
    form.button.style.backgroundColor = '#09a717'
    form.button.disabled = false
})

form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const email = form.email.value;
    const password = form.password.value;
    form.button.style.backgroundColor = '#686565'
    form.button.disabled = true

    try {
        const response = await fetch("http://localhost:3000/auth/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email, password })
        });

        if (response.status == 400) {
            registerErr.innerHTML = 'Senha deve conter letras maiusculas, minusculas, números e caracteres especiais.<br> ex: Senha@1';
            registerErr.classList.replace('error-disable', 'error-enable')
            return
        }

        if (response.status == 500) {
            registerErr.textContent = 'Este email não esta disponível para registro.';
            registerErr.classList.replace('error-disable', 'error-enable')
            return
        }

        window.localStorage.setItem('email', email);
        const data = await response.json();
        console.log("Resposta da API:", data);
        if(!data){
            console.log('Estamos passando por problemas técnicos, por favor aguarde!')
            throw new Error('Estamos passando por problemas técnicos, por favor aguarde!')
        }

        window.localStorage.setItem('verification_link', data.tokens.verificationLink);
        window.localStorage.setItem('TaJ', data.tokens.token);
        redirect('public/pages/verify_email.html')

    } catch (error) {
        console.error("Erro ao tentar se registar", error);
    }
});


