document.addEventListener('DOMContentLoaded', () => {
    const sesionId = 1; // Reemplazar con el ID real dinámicamente si es posible
    cargarSesion(sesionId);
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
        alert('Hubo un error al cargar la sesión.');
    }
}

// Función para mostrar la información de la sesión
function mostrarSesion(sesion) {
    const sesionInfo = document.getElementById('sesion-info');
    sesionInfo.innerHTML = `
        <h2>${sesion.pelicula.nombre}</h2>
        <p>Fecha: ${new Date(sesion.fecha).toLocaleDateString()}</p>
        <p>Hora: ${sesion.hora}</p>
    `;
    mostrarPutacas(sesion.putacas);
}

// Función para mostrar las butacas como imágenes
function mostrarPutacas(putacas) {
    const container = document.getElementById('putacas-container');
    container.innerHTML = ''; // Limpiar el contenedor

    putacas.forEach(putaca => {
        const img = document.createElement('img');
        img.setAttribute('data-putaca-id', putaca.id); // Configurar ID de la butaca

        if (putaca.estado) {
            img.src = '../img/ocupado.PNG';
            img.alt = 'Putaca Ocupada';
            img.className = 'putaca-ocupada';
        } else {
            img.src = '../img/putaca.PNG';
            img.alt = 'Putaca Libre';
            img.className = 'putaca-libre';
            img.addEventListener('click', () => seleccionarPutaca(img));
        }

        container.appendChild(img);
    });
}

// Lista para almacenar las butacas seleccionadas por el usuario
let putacasSeleccionadas = [];

// Función para seleccionar una butaca
function seleccionarPutaca(img) {
    const putacaId = img.getAttribute('data-putaca-id');
    if (putacasSeleccionadas.includes(putacaId)) {
        putacasSeleccionadas = putacasSeleccionadas.filter(id => id !== putacaId);
        img.style.border = 'none';
    } else {
        putacasSeleccionadas.push(putacaId);
        img.style.border = '3px solid orange';
    }
}

// Función para reservar las butacas seleccionadas
document.getElementById('reservar-btn').addEventListener('click', reservarPutacas);

async function reservarPutacas() {
    const sesionId = 1; // Reemplazar con el ID real dinámicamente si es posible
    try {
        const response = await fetch(`https://localhost:7053/api/sesiones/${sesionId}/putacas`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(putacasSeleccionadas),
        });
        if (!response.ok) {
            throw new Error('Error al reservar las butacas');
        }
        alert('Putacas reservadas con éxito');
        cargarSesion(sesionId); // Recargar la sesión
    } catch (error) {
        console.error('Error:', error);
        alert('Hubo un error al reservar las butacas.');
    }
}
