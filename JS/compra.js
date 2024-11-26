document.addEventListener("DOMContentLoaded", () => {
    const API_URL = "https://localhost:7053/api";

    const cargarPeliculaSeleccionada = async () => {
        // Obtener el ID de la película desde la URL
        const peliculaId = localStorage.getItem('prueba');

        if (!peliculaId) {
            alert("No se encontró una película seleccionada.");
            return;
        }

        try {
            // Fetch de los detalles de la película
            const response = await fetch(`${API_URL}/Peliculas/${peliculaId}`);
            if (!response.ok) {
                throw new Error("Error al obtener los detalles de la película.");
            }

            const pelicula = await response.json();

            // Actualizar los datos en la página
            document.querySelector(".compra__titulo").textContent = pelicula.titulo;
            document.querySelector(".compra__sala").textContent = `Sala: ${pelicula.sala}`;
            document.querySelector(".compra__precio-valor").textContent = `0.00€`; // Precio inicial

        } catch (error) {
            console.error("Error al cargar la película seleccionada:", error);
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
                // Aquí rediriges a la página de confirmación con los datos seleccionados
                window.location.href = `Putacas.html?id=${localStorage.getItem('prueba')}&cantidad=${cantidadEntradas}&precio=${(cantidadEntradas * precioPorEntrada).toFixed(2)}`;
            } else {
                alert("Por favor, seleccione al menos una entrada.");
            }
        });

        // Evento para el botón "Volver"
        botonVolver.addEventListener("click", () => {
            window.history.back(); // Regresa a la página anterior
        });
    };

    // Cargar la película seleccionada y agregar lógica de entradas
    cargarPeliculaSeleccionada();
    agregarLogicaEntradas();
});
