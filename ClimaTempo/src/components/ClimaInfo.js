import React,{ useState, useEffect} from 'react';
import styled from 'styled-components/native';

const ClimaView = styled.View`

    marginTop: 50px;
    width: 85%;
    height: 250px;
    alignItems: center;
    borderWidth: 2px;
    borderColor:  #FFF;
    padding: 10px;
    borderRadius: 20px;

`;

const TitleClimaView = styled.View`

    justifyContent:space-between; 
    marginTop: 10px;
    width: 95%;
    height: 50px;
    flexDirection: row;

`;

const TitleText = styled.Text`
    fontSize: 25px; 
    fontWeight: bold;
    color: #000;
    justifyContent: center; 
    alignItems: center;
`;

const EnderecoClimaView = styled.View`

    justifyContent:center; 
    marginTop: 10px;
    width: 100%;
    height: 50px;
    flexDirection: row;

`;

const EnderecoText = styled.Text`
    fontSize: 20px; 
    fontWeight: bold;
    color: #000;
    justifyContent: center; 
    alignItems: center;
`;

const BodyClimaView = styled.View`

    justifyContent:space-between; 
    marginTop: 10px;
    width: 95%;
    height: 100px;
    flexDirection: row;

`;

const BodyClimaRightView = styled.View`

    width: 40%;
    height: 100%;
    justifyContent: center; 
    alignItems: center;

`;
const BodyClimaLefttView = styled.View`

    width: 40%;
    height: 100%;
    justifyContent: center; 
    alignItems: center;
`;

const ClimaImage = styled.Image`
    
`;
const TemperaturaText = styled.Text`

    fontSize: 25px;
    fontWeight: bold;
    color: #000;
`;

export default ({date, time, temp, img ,endereco}) => {


    const [imgClima, setImageClima] = useState(require('../assets/Sun.png'));

    const formatImage = () => {
        
        if (img == "clear sky"){

            setImageClima(require('../assets/Sun.png'))

        }else if (img == "few clouds" ) {

            setImageClima(require('../assets/SunCloud.png'))

        }else if (img == "scattered clouds" || img == "broken clouds"){

            setImageClima(require('../assets/Cloudy.png'))

        }else if (img == "shower rain" || img == "rain" ){
            setImageClima(require('../assets/Rain.png'))
            
        }else if (img == "thunderstorm"){
            setImageClima(require('../assets/RainStorm.png'))

        }else if (img == "snow"){
            setImageClima(require('../assets/Snowy.png'))
        }else {
            setImageClima(require('../assets/NoFile.png'))
        }
        
        
        
    }


    useEffect(() => {
        formatImage();
    }, []);

    return (
            <ClimaView>
                <TitleClimaView>
                    <TitleText>{date}</TitleText>
                    <TitleText >{time}</TitleText>

                </TitleClimaView>

                <EnderecoClimaView>
                    <EnderecoText>{endereco}</EnderecoText>

                </EnderecoClimaView>
                <BodyClimaView>

                    <BodyClimaLefttView>
                        <TemperaturaText>{String(temp).slice(0,2)}°</TemperaturaText>
                    </BodyClimaLefttView>

                    <BodyClimaRightView>
                        <ClimaImage source={imgClima} resizeMode="contain"/>
                    </BodyClimaRightView>


                </BodyClimaView>

            </ClimaView>
    );

}