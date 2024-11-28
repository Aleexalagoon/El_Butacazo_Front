document.addEventListener('DOMContentLoaded', () => {
    // Obtener parámetros de la URL (sesión ID y cantidad de entradas)
    const params = new URLSearchParams(window.location.search);
    const sesionId = parseInt(params.get('id'), 10);
    const cantidadEntradas = parseInt(params.get('cantidad'), 10) || 0;

    if (cantidadEntradas > 0) {
        actualizarNumeroEntradas(cantidadEntradas);
        cargarSesion(sesionId); // Carga la sesión y muestra las butacas
    } else {
        alert("Error: Número de entradas no válido.");
        window.location.href = "index.html";
    }
});

// Lista para almacenar las butacas seleccionadas por el usuario
let putacasSeleccionadas = [];

// Número de entradas compradas por el usuario
let numeroEntradas = 1;

// Función para actualizar el número de entradas seleccionadas
function actualizarNumeroEntradas(nuevasEntradas) {
    numeroEntradas = nuevasEntradas;
    putacasSeleccionadas = []; // Reinicia las selecciones
    const imgs = document.querySelectorAll('.putaca-libre');
    imgs.forEach(img => (img.style.border = 'none')); // Limpia los estilos
    console.log(`Número de entradas actualizado: ${numeroEntradas}`);
}

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
        <p>Fecha: ${new Date().toLocaleDateString()}</p>
        <p>Hora: ${sesion.hora}</p>
    `;
    mostrarPutacas(sesion.putacas);
    mostrarPantalla();
}

// Función para mostrar la pantalla del cine
function mostrarPantalla() {
    const leyendaSection = document.querySelector('.leyenda');
    if (leyendaSection) {
        const pantalla = document.createElement('div');
        pantalla.className = 'pantalla-cine';
        pantalla.innerText = 'PANTALLA';
        pantalla.style.textAlign = 'center';
        pantalla.style.marginBottom = '40px';
        pantalla.style.marginTop = '40px';
        pantalla.style.fontWeight = 'bold';
        pantalla.style.fontSize = '1.5rem';
        pantalla.style.backgroundColor = '#d3d3d3';
        pantalla.style.height = '30px';
        pantalla.style.display = 'flex';
        pantalla.style.justifyContent = 'center';
        pantalla.style.alignItems = 'center';
        pantalla.style.borderRadius = '5px';
        leyendaSection.parentNode.insertBefore(pantalla, leyendaSection);
    }
}

// Función para mostrar las butacas como imagenes
function mostrarPutacas(putacas) {
    const container = document.getElementById('putacas-container');
    container.innerHTML = ''; 

    putacas.forEach(putaca => {
        const img = document.createElement('img');
        if (putaca.estado) {
            img.src = '../img/ocupado.png'; 
            img.alt = 'Butaca Ocupada';
            img.className = 'butaca-ocupada';
            img.style.width = '50%';
            img.style.height = 'auto';
            img.style.cursor = 'not-allowed'; 
        } else {
            img.src = '../img/putaca.PNG'; 
            img.alt = 'Butaca Libre';
            img.className = 'butaca-libre';
            img.style.width = '50%';
            img.style.height = 'auto';
            img.dataset.putacaId = putaca.id;
            img.addEventListener('click', seleccionarPutaca); 
        }
        container.appendChild(img);
    });
}

// Función para seleccionar una butaca
function seleccionarPutaca(event) {
    const img = event.target;
    const putacaId = img.getAttribute('data-putaca-id');

    // Validar si la butaca ya está seleccionada
    if (putacasSeleccionadas.includes(putacaId)) {
        // Desseleccionar butaca
        putacasSeleccionadas = putacasSeleccionadas.filter(id => id !== putacaId);
        img.style.border = 'none';
    } else {
        // Si se ha alcanzado el límite de selecciones sale esto
        if (putacasSeleccionadas.length >= numeroEntradas) {
            alert(`Solo puedes seleccionar ${numeroEntradas} butaca(s).`);
            return;
        }

        // Seleccionar butaca
        putacasSeleccionadas.push(putacaId);
        img.style.border = '3px solid orange';
    }

    console.log('Butacas seleccionadas:', putacasSeleccionadas);
}

// Función para que se guarden las butacas seleccionadas
document.getElementById('reservar-btn').addEventListener('click', reservarPutacas);

async function reservarPutacas() {
    const params = new URLSearchParams(window.location.search);
    const sesionId = parseInt(params.get('id'), 10);

    try {
        const response = await fetch(`https://localhost:7053/api/sesiones/${sesionId}/butacas`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(putacasSeleccionadas),
        });
        if (!response.ok) {
            throw new Error('Error al reservar las butacas');
        }
        alert('Butacas reservadas con éxito');
        window.location.href = '../HTML/ConfirmacionCompraPelicula.html';
    } catch (error) {
        console.error('Error:', error);
        alert('Problema al reservar las butacas');
    }
}

