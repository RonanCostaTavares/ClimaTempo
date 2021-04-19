import React, { useState , useEffect} from 'react';
import { Alert } from 'react-native';
import { request, PERMISSIONS } from 'react-native-permissions';
import Geolocation from '@react-native-community/geolocation';

import Api from '../../data/Api';

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
    const[coords, setCoords] = useState([]);
    const[clima, setClima] = useState([]);
    const[date, setDate] = useState('');
    const[time, setTime] = useState('');
    const [viewCheck, setViewCheck] =  useState(false);


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
                if (atualizar && coords != undefined && coords != null && coords != []) {

                    handleLocationSearch(coords.latitude,coords.longitude);

                }else {

                    handleLocationSearch(info.coords.latitude,info.coords.longitude);

                }
                setCoords(info.coords);

                handleLocationSearch(info.coords.latitude,info.coords.longitude);
                
            })

        }

        

    }

    const handleLocationSearch = async (lat, long) => {

        
        let res = await Api.getClimaByLocation(lat, long);

        setClima(res)
        getDate();

        

    }

    const handleLocationSearchZip = async () => {

        let res = await Api.getClimaByZip(locationText);

        if (res.base){

            setClima(res)
            

        }else{

            Alert.alert("Ops", "Ocorreu um erro, utilize um zipcode dos EUA." );
        }

    }


    const handleAtualizar = () => {

        
    }

    return (
        <Container>

                <LocationArea>
                    <LocationInput 
                        placeholder="Digite seu Cep sem o - xxxxxx"
                        placeholderTextColor="#000"
                        value={locationText}
                        onChangeText={t=>setLocationText(t)}
                        onEndEditing={handleLocationSearchZip}
                    
                    />
                    <LocaitonFinder onPress={handleLocationFinder(false)}>
                        <Map width="26" height="26" fill="#000"/>
                        
                    </LocaitonFinder>

                </LocationArea>

                {viewCheck && 
                
                    <ClimaInfo 
                        date = {date}
                        time = {time}
                        temp = {clima.main.temp}
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