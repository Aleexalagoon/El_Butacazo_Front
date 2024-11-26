document.addEventListener("DOMContentLoaded", () => {
   
    const API_URL = "https://localhost:7053/api";

    const gridContainer = document.querySelector('.cartelera__grid');

 
    const cargarPeliculas = async () => {
        try {
            const response = await fetch(`https://localhost:7053/api/Peliculas`);
            if (!response.ok) {
                throw new Error("Error al obtener las películas.");
            }
            const peliculas = await response.json();

            peliculas.forEach(pelicula => {
              
                const peliculaElement = document.createElement('div');
                peliculaElement.classList.add('pelicula');

           
                const img = document.createElement('img');
                img.src = pelicula.imagen;
                img.alt = pelicula.titulo;
                img.classList.add('pelicula__portada');

           
                const titulo = document.createElement('h3');
                titulo.textContent = pelicula.titulo;
                titulo.classList.add('pelicula__titulo');

            
                peliculaElement.appendChild(img);
                peliculaElement.appendChild(titulo);

                peliculaElement.addEventListener('click', () => {
                  
                    window.location.href = `../HTML/DetallesPelículas.html?id=${pelicula.id}`;
                });

                gridContainer.appendChild(peliculaElement);
            });
        } catch (error) {
            console.error("Error al cargar las películas:", error);
        }
    };

    cargarPeliculas();
});
