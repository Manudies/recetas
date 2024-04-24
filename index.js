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
        //Creamos contendor 1_1
        const contenedor1_1 = document.createElement("div");
        contenedor1_1.setAttribute("class", "contenedor1_1");
        contenedor1_1.setAttribute("id", "contenedor1_1");
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
        salud.innerText = receta.recipe.healthLabels;
        //Lista de Macronutrientes
        const macList = document.createElement("ul")
        macList.setAttribute("class", "macList");
        macList.setAttribute("id", "macList" + index);
        // macList.innerText = "% diaria recomendada"
        //Grasa diaría recomenda %
        const fat = document.createElement("li");
        fat.setAttribute("class", "fat");
        fat.setAttribute("id", "fat" + index);
        fat.innerText = receta.recipe.totalNutrients.FAT.label + " " + (Number(receta.recipe.totalNutrients.FAT.quantity).toFixed(2) + receta.recipe.totalNutrients.FAT.unit)
        //Carbohidratos diario recomendo %
        const carbo = document.createElement("li");
        carbo.setAttribute("class", "carbo");
        carbo.setAttribute("id", "carbo" + index);
        carbo.innerText = receta.recipe.totalNutrients.CHOCDF.label + " " + (Number(receta.recipe.totalNutrients.CHOCDF.quantity).toFixed(2) + receta.recipe.totalNutrients.CHOCDF.unit)
        //Carbohidratos diario recomendo %
        const prote = document.createElement("li");
        prote.setAttribute("class", "prote");
        prote.setAttribute("id", "prote" + index);
        prote.innerText = receta.recipe.totalNutrients.PROCNT.label + " " + (Number(receta.recipe.totalNutrients.PROCNT.quantity).toFixed(2) + receta.recipe.totalNutrients.PROCNT.unit)
        //Alergias
        const divAlergias = document.createElement("div");
        divAlergias.setAttribute("class", "divalergias");
        const alergias = document.createElement("p");
        alergias.setAttribute("class", "alergias");
        alergias.setAttribute("id", "alergias" + index);
        alergias.innerText = "Alergias: \n" + receta.recipe.cautions
        //Huella de C02  
        const divIconos = document.createElement("div");
        divIconos.setAttribute("class", "diviconos");
        const huella = document.createElement("p");
        huella.setAttribute("class", "huella")
        huella.innerText = "Etiqueta CO2: " + receta.recipe.co2EmissionsClass
        //Favoritos
        const favoritos = document.createElement("button");
        favoritos.setAttribute("class", "favoritos ");
        favoritos.innerHTML = '<ion-icon name="heart-outline"></ion-icon>';
        //Mas información
        const masInfo = document.createElement("button");
        masInfo.setAttribute("class", "masInfo ");
        masInfo.setAttribute("id", "masInfo");
        masInfo.innerHTML = '<ion-icon name="arrow-forward-outline"></ion-icon>';
        
        //Metemos los elementos creados en el HTML
        contenedorRecetas.appendChild(contenedorReceta);
        contenedorReceta.appendChild(contenedor1);
        contenedorReceta.appendChild(contenedor2);
        contenedor1.appendChild(nombre);
        contenedor1.appendChild(contenedor1_1);
        contenedor1_1.appendChild(foto);
        contenedor1_1.appendChild(salud);
        contenedor2.appendChild(macList);
        macList.appendChild(fat);
        macList.appendChild(carbo);
        macList.appendChild(prote);
        contenedor2.appendChild(divAlergias);
        divAlergias.appendChild(alergias);
        contenedor2.appendChild(divIconos);
        divIconos.appendChild(huella);
        divIconos.appendChild(favoritos)
        divIconos.appendChild(masInfo)
        
        //Ponemos un listener en mas info para redigir a la receta
        const masInfoBoton = document.getElementById("masInfo")
        masInfoBoton.addEventListener("click", () => {
            window.open(receta.recipe.url, '_blank');
        });
        ///////////////////////////////TODO: QUitar de favoritos/////////////////////////////////
        // Función para manejar el clic en el ícono de corazón
        let favoritosClick = false;
        function handleFavoriteClick(rectafav) {
        // Verificar si el evento ya está en favoritos
        let favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];
        const index = favoritos.indexOf(rectafav);
        // Si no está en favoritos, agregarlo; de lo contrario, quitarlo
        if (index === -1) {
          favoritos.push(rectafav);
        } else {
          favoritos.splice(index, 1);
        }
        // Guardar los favoritos actualizados en el localStorage
        localStorage.setItem('favoritos', JSON.stringify(favoritos));
        }

        // En el bloque donde creas el elemento favoritos y agregas el evento click:
        favoritos.addEventListener("click", () => {
        // Obtener el ID del evento asociado a este elemento favoritos
        const rectafav = receta; // Reemplaza event.id con la propiedad adecuada que identifica el evento

        // Cambiar el ícono del corazón y manejar el estado de favoritos
        if (favoritosClick === false) {
        favoritos.innerHTML = '<ion-icon name="heart"></ion-icon>';
        handleFavoriteClick(rectafav);
        favoritosClick = true;
        } else {
        favoritos.innerHTML = '<ion-icon name="heart-outline"></ion-icon>';
        handleFavoriteClick(rectafav);
        favoritosClick = false;
      }
    });
    //////////////////////////////TODO:Solucionar problema de quitar de favoritos///////////////////////7

    });
    } else {
        console.error("La variable 'recetas' no es un array.");
    }
}


  
