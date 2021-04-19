
const BASE_API = 'https://api.bigdatacloud.net/data/reverse-geocode-client?';

/*Api open source com alguns dados de endereços  que utilizei para trasnformas as coordenadas dada pelo
Geolocation em um endereço real.*/

export default {

    getEndereco: async (lat, long) => {
        
        const req = await fetch(`${BASE_API}latitude=${lat}&longitude=${long}&localityLanguage=pt`, {
            method: 'GET',
            headers: {
                Accept: '*/*',
                
            }
        });

        const json = await req.json();
        return json;

    },


};