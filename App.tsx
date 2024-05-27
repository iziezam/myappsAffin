import { StatusBar } from 'expo-status-bar';
import { Button, ScrollView, StyleSheet, Text, View } from 'react-native';
import { AppUtils } from './utility/appUtils';
import { GlobalValue } from './utility/globalVal';
import React, { useState, useEffect } from 'react';
import { SampleDataJson } from './utility/dataJson';

import {NavigationContainer,useNavigation} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import DetailProdPage from './pages/detailPage';
import HomePage from './pages/homePage';
import ValidProd from './components/validProd';
const Stack = createNativeStackNavigator();


export default function App() {
  let TAG='MAINPAGEAPPS';
  let DataJson:any;
  useEffect(() => {
    StoreLocalData(SampleDataJson.data);
 });
  const StoreLocalData =(data:any) => {
    // set a key/value
    AppUtils.storeData(GlobalValue.DataStoreKey, JSON.stringify(data)).then((result:any) => {
      console.log("DBG:STOREDATALOCAL: " + JSON.stringify(result))
      if(result = '1'){
        console.log("DBG:STOREDATALOCAL: SUCCESS");
      }else{
        console.log("DBG:STOREDATALOCAL: FAIL");
      }
    
      }
    );
  };

  return (
    <NavigationContainer>
    <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName='Home'>
     <Stack.Screen name="Home" component={HomePage} />
      <Stack.Screen name="Detail" 
      component={DetailProdPage} 
      options={{
        headerShown:true,
        headerTransparent: true,
        headerTitle: ''
       }}
      />
    </Stack.Navigator>
  </NavigationContainer>
  );
}
