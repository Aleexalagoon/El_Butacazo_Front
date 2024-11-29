document.addEventListener("DOMContentLoaded", () => {
    const API_URL = "https://localhost:7053/api"; // Cambia si usas otro puerto
    const params = new URLSearchParams(window.location.search);
    const peliculaId = params.get("id"); // Obtiene el ID de la película desde la URL

    if (!peliculaId) {
        alert("No se encontró el ID de la película en la URL.");
        window.location.href = "../HTML/index.html"; // Redirige al índice si no hay ID
        return;
    }

    // Elementos del DOM
    const peliculaTitulo = document.getElementById("peliculaTitulo");
    const peliculaImagen = document.getElementById("peliculaImagen");
    const peliculaDescripcion = document.getElementById("peliculaDescripcion");
    const peliculaGenero = document.getElementById("peliculaGenero");
    const peliculaDirector = document.getElementById("peliculaDirector");
    const peliculaDuracion = document.getElementById("peliculaDuracion");
    const peliculaEstreno = document.getElementById("peliculaEstreno");
    const reservarBtn = document.getElementById("reservar-btn");

    // Función para cargar los detalles de la película
    const cargarDetallePelicula = async () => {
        try {
            const response = await fetch(`${API_URL}/Peliculas/${peliculaId}`);
            if (!response.ok) {
                throw new Error(`Error al obtener los detalles de la película (HTTP ${response.status}).`);
            }

            const pelicula = await response.json();

            // Actualizar los elementos del DOM con los datos de la película
            peliculaTitulo.textContent = pelicula.titulo || "Título no disponible";
            peliculaImagen.src = pelicula.imagen || "../img/default-poster.png";
            peliculaImagen.alt = pelicula.titulo || "Poster de la película";
            peliculaDescripcion.textContent = pelicula.descripcion || "Descripción no disponible";
            peliculaGenero.textContent = pelicula.genero || "Género no disponible";
            peliculaDirector.textContent = pelicula.director || "Director no disponible";
            peliculaDuracion.textContent = pelicula.duracion || "Duración no disponible";
            peliculaEstreno.textContent = pelicula.estreno
                ? new Date(pelicula.estreno).toLocaleDateString()
                : "Fecha de estreno no disponible";
        } catch (error) {
            console.error("Error al cargar los detalles de la película:", error);
            alert("Hubo un error al cargar los detalles de la película.");
        }
    };

    // Evento para el botón "Reservar"
    if (reservarBtn) {
        reservarBtn.addEventListener("click", (event) => {
            event.preventDefault(); // Evitar comportamiento predeterminado
            window.location.href = `../HTML/CompraEntradas.html?id=${peliculaId}`;
        });
    } else {
        console.error('Error: No se encontró el botón con ID "reservar-btn".');
    }

    // Ejecutar la función para cargar los detalles
    cargarDetallePelicula();
});
