import { redirect } from './nav.js';

let token = null;
let rf_token = window.localStorage.getItem('rftk');

async function renewToken() {
    rf_token = window.localStorage.getItem('rftk');

    if (!rf_token) {
        logout();
        return;
    }

    try {
        const response = await fetch('http://localhost:3000/auth/renewer_token', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${rf_token}`,
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            logout();
            return;
        }

        const data = await response.json();
        saveTokens(data.tokens.token, data.tokens.refresh_token);

        token = data.tokens.token;

        const payloadBase64 = data.tokens.token.split('.')[1];
        const payload = JSON.parse(atob(payloadBase64));

        timerRenew(payload.exp * 1000);

    } catch (error) {
        console.error('Fail to renew session token', error);
        logout();
    }
}

function timerRenew(expiresDate) {
    const expireInMs = expiresDate - Date.now();
    const refreshInMs = Math.max(expireInMs - (5 * 60 * 1000), 1000);

    setTimeout(() => {
        console.log('renovando token')
        renewToken();
    }, refreshInMs);
}

function saveTokens(newToken, newRfToken) {
    window.sessionStorage.setItem('actk', newToken);
    window.localStorage.setItem('rftk', newRfToken);
    token = newToken;
    rf_token = newRfToken;
}

function logout() {
    window.localStorage.removeItem('rftk');
    window.sessionStorage.removeItem('actk');
    token = null;
    rf_token = null;
    redirect('index.html');
}

window.addEventListener('DOMContentLoaded', (e) => {
    if (rf_token) {
        renewToken();
    } else {
        logout();
    }
})


