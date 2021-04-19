import styled from 'styled-components/native';


export const Container = styled.SafeAreaView`
    backgroundColor: #0085CC;
    flex: 1;
    alignItems: center;

`;

export const LocationArea = styled.View`
    backgroundColor: #F0F0FF;
    height: 60px;
    width: 85%;
    borderRadius: 30px;
    flexDirection: row;
    alignItems: center;
    paddingLeft: 20px;
    paddingRight: 20px;
    marginTop: 30px;
`;

export const LocationInput = styled.TextInput`

    flex: 1;
    fontSize: 16px;
    color: #000;

`;

export const LocaitonFinder = styled.TouchableOpacity`
    width: 24px;
    height: 24px;
`;


export const ButtonArea = styled.TouchableOpacity`
    width: 30%;
    marginTop: 20px;
    height: 5%;
    justifyContent: center;
    alignItems: center;
    backgroundColor:  #F0F0FF;
    flexDirection: row;
    borderRadius: 20px;

`;

export const ButtonText = styled.Text`
    fontSize: 15px;
    color: #000;
`;








