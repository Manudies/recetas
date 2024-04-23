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
    //Limpiamos la Seccion de las recetas
    const secionRecetas = document.querySelector(".recetas");
    secionRecetas.innerHTML = "";
    //Agregamos párrafo de Sugerencias
    const pResultado = document.createElement("p");
    pResultado.setAttribute("class", "p_resultado");
    pResultado.setAttribute("id", "p_resultado");
    //Manejamos un input vacio
    console.log(recetas.length)
    if (recetas.length > 0){
        pResultado.innerText = "Aquí tienes algunas sugerencias";
    }
    else {
        pResultado.innerText = "Sin datos no hay receta";
    }
    //Creamos contenedor global de recetas
    const contenedorRecetas = document.createElement("div");
    contenedorRecetas.setAttribute("class", "contenedor_recetas");
    contenedorRecetas.setAttribute("id", "contenedor_recetas");
    //Agregamos los elementos creados
    secionRecetas.appendChild(pResultado);
    secionRecetas.appendChild(contenedorRecetas);

    if (Array.isArray(recetas)) {
        recetas.forEach((receta, index) => {
        //Ficha de individual de cada receta
        const contenedorReceta = document.createElement("div");
        contenedorReceta.setAttribute("class", "contenedorReceta");
        contenedorReceta.setAttribute("id", "contenedorReceta" + index);
        //Creamos contendor 1
        const contenedor1 = document.createElement("div");
        contenedor1.setAttribute("class", "contenedor1");
        contenedor1.setAttribute("id", "contenedor1");
        //Titulo
        const nombre = document.createElement("h1");
        nombre.setAttribute("class", "nombre");
        nombre.setAttribute("id", "nombre" + index);
        nombre.innerText = receta.recipe.label;
        //Imagen 
        const foto = document.createElement("img");
        foto.setAttribute("class", "foto");
        foto.setAttribute("id", "foto" + index);
        foto.setAttribute("src", receta.recipe.image)
        //Etiquetas de salud
        const salud = document.createElement("p");
        salud.setAttribute("class", "salud");
        salud.setAttribute("id", "salud" + index);
        salud.innerText = receta.recipe.healthLabels
        // Añade más elementos y configura según sea necesario para cada receta

        contenedorRecetas.appendChild(contenedorReceta);
        contenedorReceta.appendChild(contenedor1)
        contenedor1.appendChild(nombre);
        contenedor1.appendChild(foto);
        contenedor1.appendChild(salud)
    });
    } else {
        console.error("La variable 'recetas' no es un array.");
    }
    
    

}

