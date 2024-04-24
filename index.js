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
        //Creamos contendor 2
        const contenedor2 = document.createElement("div");
        contenedor2.setAttribute("class", "contenedor2");
        contenedor2.setAttribute("id", "contenedor2");
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
        //Lista de Macronutrientes
        const macList = document.createElement("ul")
        macList.setAttribute("class", "macList");
        macList.setAttribute("id", "macList" + index);
        macList.innerText = "% diaria recomendada"
        //Grasa diaría recomenda %
        const fat = document.createElement("li");
        fat.setAttribute("class", "fat");
        fat.setAttribute("id", "fat" + index);
        fat.innerText = receta.recipe.totalDaily.FAT.label + " : " + (Number(receta.recipe.totalDaily.FAT.quantity).toFixed(2)+"%")
        //Carbohidratos diario recomendo %
        const carbo = document.createElement("li");
        carbo.setAttribute("class", "carbo");
        carbo.setAttribute("id", "carbo" + index);
        carbo.innerText = receta.recipe.totalDaily.CHOCDF.label + " : " + (Number(receta.recipe.totalDaily.CHOCDF.quantity).toFixed(2)+"%")
        //Carbohidratos diario recomendo %
        const prote = document.createElement("li");
        prote.setAttribute("class", "prote");
        prote.setAttribute("id", "prote" + index);
        prote.innerText = receta.recipe.totalDaily.PROCNT.label + " : " + (Number(receta.recipe.totalDaily.PROCNT.quantity).toFixed(2)+"%")
        //Alergias
        const alergias = document.createElement("p");
        alergias.setAttribute("class", "alergias");
        alergias.setAttribute("id", "alergias" + index);
        alergias.innerText = "Cuidao!!: " + receta.recipe.cautions
        // Añade más elementos y configura según sea necesario para cada receta

        //Metemos los elementos creados en el HTML
        contenedorRecetas.appendChild(contenedorReceta);
        contenedorReceta.appendChild(contenedor1)
        contenedorReceta.appendChild(contenedor2)
        contenedor1.appendChild(nombre);
        contenedor1.appendChild(foto);
        contenedor1.appendChild(salud)
        // contenedor2.appendChild(tituloMacList)
        contenedor2.appendChild(macList)
        macList.appendChild(fat)
        macList.appendChild(carbo)
        macList.appendChild(prote)
        contenedor2.appendChild(alergias)


    });
    } else {
        console.error("La variable 'recetas' no es un array.");
    }
    
    

}

