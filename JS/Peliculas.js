document.addEventListener("DOMContentLoaded", () => {
    const API_URL = "http://23.20.199.117/api";


    const gridContainer = document.querySelector('.cartelera__grid'); // Contenedor de la cuadrícula

    // Función para cargar películas desde la API
    const cargarPeliculas = async () => {
        try {
            // Realizar la solicitud al endpoint de películas
            const response = await fetch(`${API_URL}/Peliculas`);
            if (!response.ok) {
                throw new Error(`Error al obtener las películas: ${response.status}`);
            }

            const peliculas = await response.json();

            // Iterar sobre las películas y crear los elementos correspondientes
            peliculas.forEach(pelicula => {
                // Crear un contenedor para la película
                const peliculaElement = document.createElement('div');
                peliculaElement.classList.add('pelicula');

                // Crear el elemento de imagen
                const img = document.createElement('img');
                img.src = pelicula.imagen || "../img/default-poster.png"; // Imagen por defecto si no hay imagen
                img.alt = pelicula.titulo || "Sin título";
                img.classList.add('pelicula__portada');

                // Crear el elemento del título
                const titulo = document.createElement('h3');
                titulo.textContent = pelicula.titulo || "Sin título";
                titulo.classList.add('pelicula__titulo');

                // Agregar la imagen y el título al contenedor de la película
                peliculaElement.appendChild(img);
                peliculaElement.appendChild(titulo);

                // Agregar un evento click para redirigir a los detalles de la película
                peliculaElement.addEventListener('click', () => {
                    window.location.href = `../HTML/DetallesPelículas.html?id=${pelicula.id}`;
                });

                // Agregar el contenedor de la película al grid
                gridContainer.appendChild(peliculaElement);
            });
        } catch (error) {
            console.error("Error al cargar las películas:", error);
        }
    };

    // Llamar a la función para cargar las películas
    cargarPeliculas();
});
