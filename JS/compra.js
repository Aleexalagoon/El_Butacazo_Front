document.addEventListener("DOMContentLoaded", async () => {
    const API_URL = "https://localhost:7053/api";

    // Función para obtener el ID de la película desde la URL
    const obtenerIdPeliculaDesdeURL = () => {
        const params = new URLSearchParams(window.location.search);
        return params.get("id");
    };

    // Función principal para cargar los datos de la película
    const cargarPeliculaSeleccionada = async () => {
        const peliculaId = obtenerIdPeliculaDesdeURL();

        if (!peliculaId || isNaN(peliculaId)) {
            alert("ID de película no válido. Redirigiendo...");
            window.location.href = "index.html"; // Redirigir a la página principal
            return;
        }

        try {
            // Obtener datos de la película desde la API
            const response = await fetch(`${API_URL}/Peliculas/${peliculaId}`);
            if (!response.ok) {
                throw new Error("Error al obtener los detalles de la película.");
            }

            const pelicula = await response.json();
            console.log("Datos de la película desde la API:", pelicula);

            // Actualizar la página con los datos de la película
            document.querySelector(".compra__titulo").textContent = pelicula.titulo || "Título no disponible";
            document.querySelector(".compra__sala").textContent = `Sala: ${pelicula.sala || "No asignada"}`;
            document.querySelector(".compra__precio-valor").textContent = `0.00€`; // Precio inicial

        } catch (error) {
            console.error("Error al cargar los datos de la película:", error);
            alert("Error al cargar los detalles de la película.");
        }
    };

    const agregarLogicaEntradas = () => {
        const inputCantidad = document.querySelector(".compra__input");
        const botonMenos = document.querySelector(".compra__boton-menos");
        const botonMas = document.querySelector(".compra__boton-mas");
        const botonContinuar = document.querySelector(".compra__boton-continuar");
        const botonVolver = document.querySelector(".compra__boton-volver");
        const precioTotal = document.querySelector(".compra__precio-valor");
        const maxEntradas = 10;
        const precioPorEntrada = 5; // Precio fijo por entrada

        // Función para actualizar la cantidad de entradas y el precio total
        const actualizarCantidad = (cambio) => {
            const cantidadActual = parseInt(inputCantidad.value, 10) || 0;
            const nuevaCantidad = cantidadActual + cambio;
            if (nuevaCantidad >= 0 && nuevaCantidad <= maxEntradas) {
                inputCantidad.value = nuevaCantidad;
                // Actualizar el precio total
                precioTotal.textContent = `${(nuevaCantidad * precioPorEntrada).toFixed(2)}€`;
            }
        };

        // Eventos para botones de cantidad
        botonMenos.addEventListener("click", () => actualizarCantidad(-1));
        botonMas.addEventListener("click", () => actualizarCantidad(1));

        // Evento para el botón "Continuar"
        botonContinuar.addEventListener("click", () => {
            const cantidadEntradas = parseInt(inputCantidad.value, 10) || 0;
            if (cantidadEntradas > 0) {
                // Aquí rediriges a la página de selección de butacas con los datos seleccionados
                window.location.href = `Putacas.html?id=${obtenerIdPeliculaDesdeURL()}&cantidad=${cantidadEntradas}&precio=${(cantidadEntradas * precioPorEntrada).toFixed(2)}`;
            } else {
                alert("Por favor, seleccione al menos una entrada.");
            }
        });

        // Evento para el botón "Volver"
        botonVolver.addEventListener("click", () => {
            window.history.back(); // Regresa a la página anterior
        });
    };

    // Cargar la película seleccionada desde la API
    cargarPeliculaSeleccionada();

    // Agregar lógica para entradas
    agregarLogicaEntradas();
});
