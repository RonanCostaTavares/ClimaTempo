const BASE_API = 'https://api.openweathermap.org/data/2.5/weather?';

const API_KEY = '0c939c0d9ec9951b585257b4a31ce585';


export default {

    // Chamada para retornar o clima de acordo com a latitude e longitude
    getClimaByLocation: async (lat, long) => {
        
        const req = await fetch(`${BASE_API}lat=${lat}&lon=${long}&units=metric&appid=${API_KEY}`, {
            method: 'GET',
            headers: {
                Accept: '*/*',
                
            }
        });

        const json = await req.json();
        return json;

    },

    /*Chamada para retornar o clima de acordo com o código postal, porém com está api podemos 
    apenas utilizar do USA , não encontrei doc para BR*/
    getClimaByZip: async (zipCode) => {
        
        const req = await fetch(`${BASE_API}zip=${zipCode},us&units=metric&appid=${API_KEY}`, {
            method: 'GET',
            headers: {
                Accept: '*/*',
                
            }
        });

        const json = await req.json();
        return json;

    },



};