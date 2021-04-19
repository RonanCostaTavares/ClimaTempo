import React, { useState , useEffect} from 'react';
import { Alert } from 'react-native';
import { request, PERMISSIONS } from 'react-native-permissions';
import Geolocation from '@react-native-community/geolocation';
import AsyncStorage from '@react-native-async-storage/async-storage';


import Api from '../../data/Api';
import ApiEndereco from '../../data/ApiAdress'

import { 
    Container,

    LocationArea,
    LocationInput,
    LocaitonFinder,

    ButtonArea,
    ButtonText,


} from './style';
      
import ClimaInfo from '../../components/ClimaInfo';
import Map from '../../assets/map-marker-radius.svg';


export default () => {

    const[locationText, setLocationText] = useState('');
    const[lat, setLat] = useState('');
    const[long, setLong] = useState('');
    const[endereco, setEndereco] = useState('');
    const[clima, setClima] = useState([]);
    const[date, setDate] = useState('');
    const[time, setTime] = useState('');
    const [viewCheck, setViewCheck] =  useState(false);
    

    // Funcão que faz requisição para api e pega o endereço
    const getEndereco = async (lat, long) => {

        let res = await ApiEndereco.getEndereco(lat, long);

        setEndereco(res.city + ", " + res.locality)

    }

    /* Função para pegar a data e hora que a pessoa atualiza ou quer saber o clima
        Faltou setar a timezone
    */
    const getDate = () => {
        var dateNow =  new Date();

        var date = dateNow.getUTCDate()
        var month = dateNow.getUTCMonth() + 1;
        var year = dateNow.getUTCFullYear();
        var hours = dateNow.getUTCHours();
        var minutes = dateNow.getUTCMinutes();

        setDate(date + "/" + ("0"+month).slice(-2) + "/" + year)
        setTime(hours + ":" + ("0"+minutes).slice(-2))

        setViewCheck(true);
     
    }

    // Função para ver se há permissão para extrair a localização
    const handleLocationFinder =  async (atualizar) => {
        

        let result = await request(
            Platform.OS === 'ios' ? 
                PERMISSIONS.IOS.LOCATION_WHEN_IN_USE
                :
                PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION
        );


        if(result != 'granted') {

            Platform.OS === 'ios' ? 
                PERMISSIONS.IOS.LOCATION_WHEN_IN_USE
                :
                PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION
            
        }else {

            Geolocation.getCurrentPosition((info)=>{

                if (atualizar && lat != '' && lat != null && long != '' && long != null) {

                    handleLocationSearch(lat,long);
                    getEndereco(lat,long)

                }else {

                    salvarCoords(info.coords.latitude,info.coords.longitude)

                    handleLocationSearch(info.coords.latitude,info.coords.longitude);
                    getEndereco(info.coords.latitude,info.coords.longitude)

                }

                setLat(info.coords.latitude)
                setLong(info.coords.longitude)
               
            })

        }

        

    }

    // Função que pega as informações climáticas , a partir da latitude e longitude
    const handleLocationSearch = async (lat, long) => {

        
        let res = await Api.getClimaByLocation(lat, long);

        setClima(res)
        getDate();

        

    }

    // Função que pega as informações climáticas , a partir do código postal
    const handleLocationSearchZip = async () => {

        let res = await Api.getClimaByZip(locationText);

        if (res.base){

            setClima(res)
            

        }else{

            Alert.alert("Ops", "Ocorreu um erro, utilize um zipcode dos EUA." );
        }

    }

    // Função que salva as ultimas coordenadaas obtidas e guarda no cash do telefone
    const salvarCoords = async (lat, long) => {
        await AsyncStorage.setItem('lat', String(lat))
        await AsyncStorage.setItem('long', String(long))

    }

    // Função que atualiza os dados.
    const handleAtualizar = () => {

        handleLocationFinder(true)
        
    }

    // Função que resgata do cash as ultimas coordenadas obtidas
    const pegarCoordsSalvas = async () => {

        var lat = await AsyncStorage.getItem('lat')
        var long = await AsyncStorage.getItem('long')

        setLat(lat)
        setLong(long)

        if(lat != null && long !=  null) {
            handleLocationFinder(true)
        }

        

    }

    useEffect(()=> {

        pegarCoordsSalvas()
        
    }, []);

    return (
        <Container>

                <LocationArea>
                    <LocationInput 
                        placeholder="Digite seu Cep sem o - "
                        placeholderTextColor="#000"
                        value={locationText}
                        onChangeText={t=>setLocationText(t)}
                        onEndEditing={handleLocationSearchZip}
                    
                    />
                    <LocaitonFinder onPress={() => handleLocationFinder(false)}>
                        <Map width="26" height="26" fill="#000"/>
                        
                    </LocaitonFinder>

                </LocationArea>

                {viewCheck && 
                
                    <ClimaInfo 
                        date = {date}
                        time = {time}
                        temp = {clima.main.temp}
                        endereco= {endereco}
                        img = {clima.weather[0].description}
                    />
                
                }
                
                {viewCheck &&
                    <ButtonArea onPress={handleAtualizar}>
                        <ButtonText>Atualizar </ButtonText>
                    </ButtonArea>
                    
                }

                

            
        </Container>
    );
}