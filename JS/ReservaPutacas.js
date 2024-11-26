document.addEventListener('DOMContentLoaded', () => {
    // Función para cargar una sesión específica y mostrar sus butacas
    cargarSesion(1); // Reemplazar con el ID real de la sesión seleccionada
});

// Función para cargar una sesión específica y mostrar sus butacas
async function cargarSesion(sesionId) {
    try {
        const response = await fetch(`https://localhost:7053/api/sesiones/${sesionId}`);
        if (!response.ok) {
            throw new Error('Error al cargar la sesión');
        }
        const sesion = await response.json();
        mostrarSesion(sesion);
    } catch (error) {
        console.error('Error:', error);
    }
}

// Función para mostrar la información de la sesión
function mostrarSesion(sesion) {
    const sesionInfo = document.getElementById('sesion-info');
    sesionInfo.innerHTML = `
        <h2>${sesion.pelicula.nombre}</h2>
        <p>Fecha: ${new Date().toLocaleDateString()}</p>
        <p>Hora: ${sesion.hora}</p>
    `;
    mostrarPutacas(sesion.putacas);
}

// Función para mostrar las butacas como imágenes
function mostrarPutacas(putacas) {
    const container = document.getElementById('putacas-container');
    container.innerHTML = ''; // Limpiar el contenedor

    putacas.forEach(putaca => {
        // Crear un elemento de imagen para cada butaca
        const img = document.createElement('img');

        // Configurar la imagen según el estado de la butaca
        if (putaca.estado) {
            img.src = '../img/ocupado.PNG'; // Imagen para butaca ocupada
            img.alt = 'Putaca Ocupada';
            img.className = 'putaca-ocupada';
        } else {
            img.src = '../img/putaca.PNG'; // Imagen para butaca libre
            img.alt = 'Putaca Libre';
            img.className = 'putaca-libre';
            img.onclick = () => seleccionarPutaca(putaca.id); // Evento para seleccionar la butaca
        }

        // Añadir la imagen al contenedor
        container.appendChild(img);
    });
}

// Lista para almacenar las butacas seleccionadas por el usuario
let putacasSeleccionadas = [];

// Función para seleccionar una butaca
function seleccionarPutaca(img) {
    const putacaId = img.getAttribute('data-putaca-id');
    if (putacasSeleccionadas.includes(putacaId)) {
        // Si la butaca ya está seleccionada, deseleccionarla
        putacasSeleccionadas = putacasSeleccionadas.filter(id => id !== putacaId);
        img.style.border = 'none'; // Quitar el borde de selección
    } else {
        // Si la butaca no está seleccionada, seleccionarla
        putacasSeleccionadas.push(putacaId);
        img.style.border = '3px solid orange'; // Añadir un borde para indicar selección
    }
}

// Función para reservar las butacas seleccionadas
document.getElementById('reservar-btn').addEventListener('click', reservarPutacas);

async function reservarPutacas() {
    const sesionId = 1; // Reemplazar con el ID real de la sesión seleccionada
    try {
        const response = await fetch(`https://localhost:7053/api/sesiones/${sesionId}/putacas`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(putacasSeleccionadas),
        });
        if (!response.ok) {
            throw new Error('Error al reservar las putacas');
        }
        alert('Putacas reservadas con éxito');
        // Recargar la sesión para mostrar las butacas actualizadas
        cargarSesion(sesionId);
    } catch (error) {
        console.error('Error:', error);
    }
}