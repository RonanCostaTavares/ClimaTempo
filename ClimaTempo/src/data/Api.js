const BASE_API = 'https://api.openweathermap.org/data/2.5/weather?';

const API_KEY = '0c939c0d9ec9951b585257b4a31ce585';


export default {

    getClimaByLocation: async (lat, long) => {
        console.log(`${BASE_API}lat=${lat}&lon=${long}&appid=${API_KEY}`);
        
        const req = await fetch(`${BASE_API}lat=${lat}&lon=${long}&units=metric&appid=${API_KEY}`, {
            method: 'GET',
            headers: {
                Accept: '*/*',
                
            }
        });

        const json = await req.json();
        return json;

    },

    getClimaByZip: async (zipCode) => {
        console.log(`${BASE_API}zip=${zipCode},br&appid=${API_KEY}`);
        
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