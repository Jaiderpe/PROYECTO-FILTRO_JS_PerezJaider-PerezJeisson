document.addEventListener("DOMContentLoaded", function() {
    fetch('https://api.spacexdata.com/v4/company')
        .then(response => response.json())
        .then(data => {
            const companyInfoDiv = document.getElementById('company-info');
            companyInfoDiv.innerHTML = `
                <h2>${data.name}</h2>
                <p><strong>Fundador:</strong> ${data.founder}</p>
                <p><strong>Año de Fundación:</strong> ${data.founded}</p>
                <p><strong>Número de Empleados:</strong> ${data.employees}</p>
                <p><strong>Vehículos:</strong> ${data.vehicles}</p>
                <p><strong>Sitios de Lanzamiento:</strong> ${data.launch_sites}</p>
                <p><strong>Resumen:</strong> ${data.summary}</p>
                <h3>Enlaces:</h3>
                <ul>
                    <li><a href="${data.links.website}" target="_blank">Sitio Web</a></li>
                    <li><a href="${data.links.flickr}" target="_blank">Flickr</a></li>
                    <li><a href="${data.links.twitter}" target="_blank">Twitter</a></li>
                    <li><a href="${data.links.elon_twitter}" target="_blank">Twitter de Elon Musk</a></li>
                </ul>
            `;
        })
        .catch(error => {
            console.error('Error al obtener los datos:', error);
        });
});
