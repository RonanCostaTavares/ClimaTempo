import React,{ useState , useEffect} from 'react';
import { request, PERMISSIONS } from 'react-native-permissions';
import { useNavigation } from '@react-navigation/native';

import { 
    
    Container,
    ImageCircule,
    TitleText,

} from './style';
      
export default () => {

    const navigation = useNavigation();

    const handleLocationFinder =  async () => {
        

        let result = await request(
            Platform.OS === 'ios' ? 
                PERMISSIONS.IOS.LOCATION_WHEN_IN_USE
                :
                PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION
        );

        
            setTimeout(() => {
            
                navigation.navigate("Home")
    
            }, 2000)
        

    }


    useEffect(() => {
    
        handleLocationFinder();

    }, []);

    return (
        <Container>
            <ImageCircule source={require('../../assets/logo_clima.png')}/>
            <TitleText>O Clima Onde Você Estiver</TitleText>
        </Container>
    );
}