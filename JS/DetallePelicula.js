detallepelicula.js

document.addEventListener("DOMContentLoaded", () => {
    const API_URL = "http://localhost:7053/api";

    const urlParams = new URLSearchParams(window.location.search);
    const peliculaId = parseInt(urlParams.get('id'));

    const peliculaImagen = document.getElementById('peliculaImagen');
    const peliculaTitulo = document.getElementById('peliculaTitulo');
    const peliculaGenero = document.querySelector('#peliculaGenero span');
    const peliculaDirector = document.querySelector('#peliculaDirector span');
    const peliculaDuracion = document.querySelector('#peliculaDuracion span');
    const peliculaFechaEstreno = document.querySelector('#peliculaFechaEstreno span');
    const funcionesContainer = document.getElementById('funcionesContainer');


    const cargarDetallePelicula = async () => {
        try {
            const response = await fetch(`http://localhost:7053/api/pelicula/${peliculaId}`);
            if (!response.ok) {
                throw new Error("Error al obtener los detalles de la película.");
            }
            const pelicula = await response.json();

            peliculaImagen.src = pelicula.imagen;
            peliculaImagen.alt = pelicula.nombre;
            peliculaTitulo.textContent = pelicula.nombre;
            peliculaGenero.textContent = pelicula.genero;
            peliculaDirector.textContent = pelicula.director;
            peliculaDuracion.textContent = pelicula.duracion;
            peliculaFechaEstreno.textContent = new Date(pelicula.fechaEstreno).toLocaleDateString();

          
            cargarFuncionesPelicula();
        } catch (error) {
            console.error("Error al cargar los detalles de la película:", error);
        }
    };

    const cargarFuncionesPelicula = async () => {
        try {
            const response = await fetch(`http://localhost:7053/api/Funcion/pelicula/${peliculaId}`);
            if (!response.ok) {
                throw new Error("Error al obtener las funciones de la película.");
            }
            const funciones = await response.json();

            funciones.forEach(funcion => {
                const funcionElement = document.createElement('p');
                funcionElement.textContent = `${funcion.dia} - ${funcion.horaFormatted} - Sala ${funcion.sala}`;
                funcionesContainer.appendChild(funcionElement);
            });
        } catch (error) {
            console.error("Error al cargar las funciones de la película:", error);
        }
    };

    cargarDetallePelicula();
});