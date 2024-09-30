document.addEventListener("DOMContentLoaded", function() {
    const eventsContainer = document.getElementById('events-container');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');

    let events = [];
    let currentPage = 1;
    const eventsPerPage = 5;

    // Función para obtener los eventos
    function fetchEvents() {
        fetch('https://api.spacexdata.com/v4/history')
            .then(response => response.json())
            .then(data => {
                events = data;
                displayEvents(currentPage);
                updateButtons();
            })
            .catch(error => {
                console.error('Error al obtener los eventos:', error);
            });
    }

    // Función para mostrar los eventos de la página actual
    function displayEvents(page) {
        eventsContainer.innerHTML = ''; // Limpiar contenedor

        const startIndex = (page - 1) * eventsPerPage;
        const endIndex = startIndex + eventsPerPage;
        const eventsToShow = events.slice(startIndex, endIndex);

        eventsToShow.forEach(event => {
            const eventDiv = document.createElement('div');
            eventDiv.className = 'event';
            eventDiv.innerHTML = `
                <h2>${event.title}</h2>
                <p><strong>Fecha:</strong> ${new Date(event.event_date_utc).toLocaleString()}</p>
                <p>${event.details}</p>
                ${event.links.article ? `<p><a href="${event.links.article}" target="_blank">Leer más</a></p>` : ''}
            `;
            eventsContainer.appendChild(eventDiv);
        });
    }

    // Actualizar el estado de los botones (deshabilitados o habilitados)
    function updateButtons() {
        prevBtn.disabled = currentPage === 1;
        nextBtn.disabled = currentPage === Math.ceil(events.length / eventsPerPage);
    }

    // Eventos para los botones de navegación
    prevBtn.addEventListener('click', function() {
        if (currentPage > 1) {
            currentPage--;
            displayEvents(currentPage);
            updateButtons();
        }
    });

    nextBtn.addEventListener('click', function() {
        if (currentPage < Math.ceil(events.length / eventsPerPage)) {
            currentPage++;
            displayEvents(currentPage);
            updateButtons();
        }
    });

    // Llamar a la función de obtener eventos al cargar la página
    fetchEvents();
});
