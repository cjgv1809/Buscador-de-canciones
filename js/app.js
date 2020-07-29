import { API } from "./api.js";
import * as UI from "./interfaz.js";

UI.formularioBuscar.addEventListener("submit", (e) => {
  e.preventDefault();

  // Obtener datos del formulario
  const artista = document.querySelector("#artista").value,
    cancion = document.querySelector("#cancion").value;

  if (artista === "" || cancion === "") {
    // El usuario deja los campos vacios, mostrar error
    UI.divMensajes.innerHTML = "Error... Todos los campos son obligatorios";
    UI.divMensajes.classList.add("error");
    setTimeout(() => {
      UI.divMensajes.innerHTML = "";
      UI.divMensajes.classList.remove("error");
    }, 3000);
  } else {
    // El formulario está completo, realizar la consulta a la api
    const api = new API(artista, cancion);
    api.consultarAPI().then((data) => {
      if (data.respuesta.lyrics) {
        // Cancion sí existe
        UI.spinner.style.display = "block";
        setTimeout(() => {
          UI.spinner.style.display = "none";
          const letra = data.respuesta.lyrics;
          UI.divResultado.innerHTML = letra;
          UI.divResultado.style.border = "1px solid #ffe0f7";
          UI.divResultado.style.backgroundColor = "#511845";
          UI.divResultado.style.boxShadow = "0 0 10px #efa8e4 inset";
        }, 3000);
      } else {
        // Canción inexistente
        UI.spinner.style.display = "block";
        setTimeout(() => {
          UI.divMensajes.innerHTML = "La canción no existe, intente de nuevo";
          UI.divMensajes.classList.add("error");
          UI.formularioBuscar.reset();
        }, 3000);
        setTimeout(() => {
          UI.spinner.style.display = "none";
          setTimeout(() => {
            UI.divMensajes.innerHTML = "";
            UI.divMensajes.classList.remove("error");
            UI.formularioBuscar.reset();
          }, 4000);
        }, 3000);
      }
    });
  }
});
