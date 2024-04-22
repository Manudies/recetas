import {myKey, myID} from "./apikey.js";

async function recetas(busqueda){
    const url = new URL(`https://api.edamam.com/api/recipes/v2?type=public&q=${busqueda}&app_id=${myID}&app_key=${myKey}`)
    console.log(url)
    try {
        const response = await fetch(url.toString());
        const data = await response.json();
        console.log(data);
    }
    catch (error) {
        console.error(error);
    }
}

export{recetas};
  
    // // addEvents(event.items);
    // return event.items