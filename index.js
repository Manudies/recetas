import { recetas } from "./api.js"

//Creamos el buscador y llamamos a la API
const inputBusqueda = document.getElementById("input_buscador")
const boton = document.getElementById("boton_busqueda")
boton.addEventListener("click", async () => {
    try {
        const resultadoAPI = await recetas(inputBusqueda.value.trim());
        console.log(resultadoAPI)
        return AddRecetas(resultadoAPI.hits)
    } catch (error) {
        console.error(error);
    }
});

//Creamos los elementos necesarios para mostrar los datos
function AddRecetas(recetas) {
    const contenedorRecetas = document.querySelector(".recetas");
    contenedorRecetas.innerHTML = "";

    const pResultado = document.createElement("p");
    pResultado.setAttribute("class", "p_resultado");
    pResultado.setAttribute("id", "p_resultado");
    pResultado.innerText = "Aquí tienes algunas sugerencias";
    contenedorRecetas.appendChild(pResultado);

    if (Array.isArray(recetas)) {
        recetas.forEach((receta, index) => {
        // console.log(index)
        const contenedorReceta = document.createElement("div");
        contenedorReceta.setAttribute("class", "contenedorReceta");
        contenedorReceta.setAttribute("id", "contenedorReceta" + index);

        const nombre = document.createElement("h1");
        nombre.setAttribute("class", "nombre");
        nombre.setAttribute("id", "nombre" + index);
        console.log(receta.recipe.label);
        nombre.textContent = receta.recipe.label;

        // Añade más elementos y configura según sea necesario para cada receta

        contenedorReceta.appendChild(nombre);
        contenedorRecetas.appendChild(contenedorReceta);
    });
    } else {
        console.error("La variable 'recetas' no es un array.");
    }
    
    

}

