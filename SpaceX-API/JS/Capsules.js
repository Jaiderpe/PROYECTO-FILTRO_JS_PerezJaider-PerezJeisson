// script.js

const capsulesContainer = document.getElementById('capsules-container');
const prevButton = document.getElementById('prev-btn');
const nextButton = document.getElementById('next-btn');
const capsulesPerPage = 9; // Número de cápsulas a mostrar por página
let currentPage = 0; // Página actual
let capsules = [];

// Función para obtener las cápsulas desde la API
async function fetchCapsules() {
    const response = await fetch('https://api.spacexdata.com/v4/capsules');
    capsules = await response.json();
    renderCapsules();
}

// Función para renderizar las cápsulas en el contenedor
function renderCapsules() {
    capsulesContainer.innerHTML = ''; // Limpiar el contenedor
    const start = currentPage * capsulesPerPage;
    const end = start + capsulesPerPage;
    const currentCapsules = capsules.slice(start, end);

    currentCapsules.forEach(capsule => {
        const capsuleDiv = document.createElement('div');
        capsuleDiv.className = 'capsule';
        capsuleDiv.innerHTML = `
            <h2>${capsule.serial}</h2>
            <p><strong>Tipo:</strong> ${capsule.type}</p>
            <p><strong>Estado:</strong> ${capsule.status}</p>
            <p><strong>Reutilizaciones:</strong> ${capsule.reuse_count}</p>
            <p><strong>Última actualización:</strong> ${capsule.last_update}</p>
        `;
        capsulesContainer.appendChild(capsuleDiv);
    });

    updateNavigationButtons();
}

// Función para actualizar el estado de los botones de navegación
function updateNavigationButtons() {
    prevButton.disabled = currentPage === 0;
    nextButton.disabled = currentPage >= Math.ceil(capsules.length / capsulesPerPage) - 1;
}

// Manejo de eventos para los botones de navegación
prevButton.addEventListener('click', () => {
    if (currentPage > 0) {
        currentPage--;
        renderCapsules();
    }
});

nextButton.addEventListener('click', () => {
    if (currentPage < Math.ceil(capsules.length / capsulesPerPage) - 1) {
        currentPage++;
        renderCapsules();
    }
});

// Llamar a la función para obtener y mostrar las cápsulas
fetchCapsules();
