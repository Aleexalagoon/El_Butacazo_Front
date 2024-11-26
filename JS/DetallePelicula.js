document.addEventListener("DOMContentLoaded", () => {
    const API_URL = "https://localhost:7053/api"; // Cambia el puerto si es necesario

    // Obtener el parámetro `id` de la URL
    const urlParams = new URLSearchParams(window.location.search);
    const peliculaId = parseInt(urlParams.get("id"));
    localStorage.setItem('prueba', peliculaId)

    // Validar si el `id` es válido
    if (!peliculaId || isNaN(peliculaId)) {
        mostrarError("El ID de la película no es válido o no se proporcionó.");
        return;
    }

    // Elementos del DOM
    const peliculaImagen = document.getElementById("peliculaImagen");
    const peliculaGenero = document.getElementById("peliculaGenero");
    const peliculaDirector = document.getElementById("peliculaDirector");
    const peliculaDuracion = document.getElementById("peliculaDuracion");
    const peliculaFechaEstreno = document.getElementById("peliculaEstreno");
    const funcionesContainer = document.getElementById("funcionesContainer");

    // Mostrar mensaje de error en el DOM
    function mostrarError(mensaje) {
        const errorContainer = document.createElement("p");
        errorContainer.textContent = mensaje;
        errorContainer.style.color = "red";
        funcionesContainer.appendChild(errorContainer);
    }

    // Cargar detalles de la película
    const cargarDetallePelicula = async () => {
        try {
            const response = await fetch(`${API_URL}/Peliculas/${peliculaId}`);
            if (!response.ok) {
                throw new Error(`Error al obtener los detalles de la película (HTTP ${response.status}).`);
            }

            const pelicula = await response.json();

            // Actualizar elementos del DOM con los datos de la película
            peliculaImagen.src = pelicula.imagen || "../img/default-poster.png";
            peliculaTitulo.textContent = pelicula.titulo || "Título no disponible";
            peliculaGenero.textContent = pelicula.genero || "Género no disponible";
            peliculaDirector.textContent = pelicula.director || "Director no disponible";
            peliculaDuracion.textContent = pelicula.duracion || "Duración no disponible";
            peliculaFechaEstreno.textContent = pelicula.estreno
                ? new Date(pelicula.estreno).toLocaleDateString()
                : "Fecha de estreno no disponible";

            // Cargar funciones asociadas a la película
            cargarFuncionesPelicula();
        } catch (error) {
            console.error("Error al cargar los detalles de la película:", error);
            mostrarError("No se pudieron cargar los detalles de la película.");
        }
    };

    // Cargar funciones asociadas a la película
    const cargarFuncionesPelicula = async () => {
        try {
            const response = await fetch(`${API_URL}/Funcion/pelicula/${peliculaId}`);
            if (!response.ok) {
                throw new Error(`Error al obtener las funciones de la película (HTTP ${response.status}).`);
            }

            const funciones = await response.json();

            // Limpiar contenedor de funciones
            funcionesContainer.innerHTML = "";

            if (funciones.length === 0) {
                funcionesContainer.textContent = "No hay funciones disponibles para esta película.";
                return;
            }

            // Mostrar funciones en el DOM
            funciones.forEach((funcion) => {
                const funcionElement = document.createElement("p");
                funcionElement.textContent = `${funcion.dia} - ${funcion.horaFormatted} - Sala ${funcion.sala}`;
                funcionesContainer.appendChild(funcionElement);
            });
        } catch (error) {
            console.error("Error al cargar las funciones de la película:", error);
            mostrarError("No se pudieron cargar las funciones de la película.");
        }
    };

    // Ejecutar la carga de datos
    cargarDetallePelicula();
});
