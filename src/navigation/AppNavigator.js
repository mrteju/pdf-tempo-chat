import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import PDFScreen from '../screens/PDFScreen';
import PDFInputScreen from '../screens/PDFInputScreen';
import IntroScreen from '../screens/IntroScreen';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="IntroScreen" component={IntroScreen} />
        <Stack.Screen name="PDFInputScreen" component={PDFInputScreen} />
        <Stack.Screen name="PDF" component={PDFScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
