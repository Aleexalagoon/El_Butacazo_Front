
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
  
  
  function mostrarSesion(sesion) {
    const sesionInfo = document.getElementById('sesion-info');
    sesionInfo.innerHTML = `
      <h2>${sesion.pelicula.nombre}</h2>
      <p>Fecha: ${new Date().toLocaleDateString()}</p>
      <p>Hora: ${sesion.hora}</p>
    `;
    mostrarPutacas(sesion.putacas);
  }
  
 
  function mostrarPutacas(putacas) {
    const container = document.getElementById('putacas-container');
    container.innerHTML = ''; 
    putacas.forEach(putaca => {
      const button = document.createElement('button');
      button.textContent = `Fila ${putaca.fila}, Columna ${putaca.columna}`;
      button.className = putaca.estado ? 'putaca ocupada' : 'putaca disponible';
      button.disabled = putaca.estado; 
      button.onclick = () => seleccionarPutaca(putaca.id);
      container.appendChild(button);
    });
  }
  
  
  let putacasSeleccionadas = [];
  
  
  function seleccionarPutaca(putacaId) {
    if (!putacasSeleccionadas.includes(putacaId)) {
      putacasSeleccionadas.push(putacaId);
      const button = document.querySelector(`button[putaca-id="${putacaId}"]`);
      if (button) {
        button.classList.add('seleccionada');
      }
    }
  }
  
  
  document.getElementById('reservar-btn').addEventListener('click', reservarPutacas);
  
  async function reservarPutacas() {
    const sesionId = 1;
    try {
      const response = await fetch(`https://localhost:7053/api/sesiones/${sesionId}/butacas`, {
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
      
      cargarSesion(sesionId);
    } catch (error) {
      console.error('Error:', error);
    }
  }
  
  
  cargarSesion(1); 
  