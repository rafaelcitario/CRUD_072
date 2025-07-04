const form = document.getElementById("login-form");
const loginErr = document.querySelector('.error-disable');

form.addEventListener('input', () => {
    form.button.style.backgroundColor = '#09a717'
    form.button.disabled = false
    loginErr.classList.replace('error-enable', 'error-disable');
})

form.addEventListener("submit", async (event) => {
    event.preventDefault();


    const email = form.email.value;
    const password = form.password.value;
    form.button.style.backgroundColor = '#686565'
    form.button.disabled = true

    try {
        const response = await fetch("http://localhost:3000/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email, password })
        });

        if (!response.ok) {
            throw new Error("Falha na requisição: " + response.status);
        }

        const data = await response.json();
        if (!data) {
            console.log("Resposta da API:", data);
        }

        window.localStorage.setItem('TaJ', data.tokens.token);
        window.localStorage.removeItem('email');
        window.localStorage.removeItem('verification_link');
        window.location.href = '../pages/events.html'



    } catch (error) {
        console.error("Erro ao fazer login:", error);
        loginErr.classList.replace('error-disable', 'error-enable')
        loginErr.textContent = 'Erro ao tentar fazer login, por favor verifique seus dados e tente novamente.'
    }
});


