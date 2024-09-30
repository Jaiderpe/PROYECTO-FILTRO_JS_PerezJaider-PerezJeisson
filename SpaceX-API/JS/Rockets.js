document.addEventListener("DOMContentLoaded", () => {
    const ROCKETS_API_URL = 'https://api.spacexdata.com/v4/rockets';
    const rocketList = document.getElementById('rocket-list');
    const rocketImage = document.getElementById('rocket-img'); // Imagen del cohete
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
  
    let rockets = [];
    let currentRocketIndex = 0;
  
    // Función para mostrar el cohete actual
    const showRocket = (index) => {
      rocketList.innerHTML = ''; // Limpiar contenido anterior
      const rocket = rockets[index];
  
      // Mostrar la información del cohete
      const rocketItem = document.createElement('div');
      rocketItem.classList.add('rocket-item');
  
      rocketItem.innerHTML = `
        <h3>${rocket.name}</h3>
        <p><strong>Altura:</strong> ${rocket.height.meters} metros</p>
        <p><strong>Diámetro:</strong> ${rocket.diameter.meters} metros</p>
        <p><strong>Masa:</strong> ${rocket.mass.kg} kg</p>
        <p><strong>Descripción:</strong> ${rocket.description}</p>
      `;
  
      rocketList.appendChild(rocketItem);
  
      // Mostrar la imagen del cohete
      if (rocket.flickr_images.length > 0) {
        rocketImage.src = rocket.flickr_images[0]; // Usar la primera imagen
      } else {
        rocketImage.src = ''; // Si no hay imagen, dejar en blanco
      }
  
      // Habilitar o deshabilitar los botones según el índice
      prevBtn.disabled = index === 0;
      nextBtn.disabled = index === rockets.length - 1;
    };
  
    // Función para obtener los cohetes de la API
    const getRockets = async () => {
      try {
        const response = await fetch(ROCKETS_API_URL);
        rockets = await response.json();
        showRocket(currentRocketIndex); // Mostrar el primer cohete al cargar la página
      } catch (error) {
        console.error('Error fetching rockets:', error);
        rocketList.innerHTML = '<p>Error al cargar los cohetes.</p>';
      }
    };
  
    // Evento para el botón "Siguiente"
    nextBtn.addEventListener('click', () => {
      if (currentRocketIndex < rockets.length - 1) {
        currentRocketIndex++;
        showRocket(currentRocketIndex);
      }
    });
  
    // Evento para el botón "Retroceder"
    prevBtn.addEventListener('click', () => {
      if (currentRocketIndex > 0) {
        currentRocketIndex--;
        showRocket(currentRocketIndex);
      }
    });
  
    // Llamar la función para obtener los cohetes
    getRockets();
  });
  