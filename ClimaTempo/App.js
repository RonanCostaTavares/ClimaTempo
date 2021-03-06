import React from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';


import MainStack from './src/stacks/MainStack';

export default () => {

  return (

      <NavigationContainer>
        <MainStack />
      </NavigationContainer>

  );
}
