
export async function getAllUsersList() {
    const lineUserList = document.querySelector('aside');
    const token = window.sessionStorage.getItem('actk');
    const users = await fetch('http://localhost:3000/users', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        }
    })

    const data = await users.json();
    if (data && !Array.isArray(data)) {
        return;
    }

    data.forEach(el => {
        const user = document.createElement('p')
        lineUserList.appendChild(user).textContent = el.email;
    });
}


export async function getEvents() {
    const token = window.sessionStorage.getItem('actk');

    const eventsList = await fetch('http://localhost:3000/events/all', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    });

    const json = await eventsList.json();

    if (!json.events || !Array.isArray(json.events)) {
        console.warn('Nenhum evento encontrado.');
        return;
    }

    const main = document.querySelector('main')
    const aside = main.querySelector('aside')



    json.events.map(ev => {
        const div = document.createElement('div')
        if (div) {
            div.classList.add('event')
            div.innerHTML = `<div class="events-info-container">
                    <p class="title" id="${Object.values(ev)[0]}">${ev.title}</p>
                    <span class="date-event">${formatDate(ev.event_date, 'client')}</span>
                    <div class="buttons-container">
                        <button type="button" class="event-button" ${ev.id}>x</button>
                        <button type="button"  class="event-button">ok</button>
                    </div>
                </div>`
        }
        main.insertBefore(div, aside)
    })

    json.events.map(ev => {
        const button = document.querySelectorAll('.event-button');
        button.forEach(b => b.addEventListener('click', handleDelete))
    })

    async function handleDelete(e) {
        const id = e.target.parentElement.parentElement.querySelector('p').id;
        deleteEvent(id);
    }

}

export async function createEvent() {
    const form = document.querySelector('.event-create');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const title = form.title.value.trim();
        const date = form.date.value;

        if (!title || !date) {
            alert("Preencha todos os campos.");
            return;
        }

        const token = window.sessionStorage.getItem('actk');

        try {
            const response = await fetch('http://localhost:3000/events/new', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    title,
                    date: date
                })
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error('Erro ao criar evento:', errorData);
                alert(`Erro: ${errorData.message || 'Não foi possível criar o evento.'}`);
                return;
            }

            const data = await response.json();
            console.log('Evento criado com sucesso:', data);

            window.location.reload();

        } catch (err) {
            console.error('Erro na requisição:', err);
            alert('Ocorreu um erro ao criar o evento.');
        }
    });
}

export async function updateEvent() {

}

export async function deleteEvent(id) {
    const token = window.sessionStorage.getItem('actk');
    const response = await fetch('http://localhost:3000/events/' + id, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    })

    if (!response.ok) {
        console.error('Erro ao deletar evento:', errorData);
        alert(`Erro: ${errorData.message || 'Não foi possível criar o evento.'}`);
        return;
    }

    window.location.reload();
}

function formatDate(dateString, to) {
    const date = new Date(dateString);

    if (dateString.includes('T')) {
        date.setHours(date.getHours() - 3);
    }

    const dia = String(date.getDate()).padStart(2, '0');
    const mes = String(date.getMonth() + 1).padStart(2, '0');
    const ano = date.getFullYear();

    if (to === 'server') {
        return `${ano}-${mes}-${dia}`;
    }

    return `${dia}/${mes}/${ano}`;
}



getAllUsersList();
getEvents();
createEvent();
