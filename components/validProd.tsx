import { StatusBar } from 'expo-status-bar';
import { FlatList, ScrollView, StyleSheet, Text, TouchableHighlight, View } from 'react-native';
import React, { useState, useEffect } from 'react';
import { SampleDataJson } from '../utility/dataJson';
import GridItem from './GridItem';
import { AppUtils } from '../utility/appUtils';
import { GlobalValue } from '../utility/globalVal';

export default function ValidProd(props:any) {
  let TAG='ValidProd'

    useEffect(() => {
      console.log("DBG:LIST ITEM:" + JSON.stringify(props))
   });


   const formatData = (data:any, numColumns:any) => {
    const numberOfFullRows = Math.floor(data.length / numColumns);
  
    let numberOfElementsLastRow = data.length - (numberOfFullRows * numColumns);
    while (numberOfElementsLastRow !== numColumns && numberOfElementsLastRow !== 0) {
      data.push({ key: `blank-${numberOfElementsLastRow}`, empty: true });
      numberOfElementsLastRow++;
    }
  
    return data;
  };


  /*--------------Go Previous Page -----------*/
  const goNextPage= () => {
    // console.log(TAG + "DBG:Go To previous Page :");
    // let storeData = {
    //   tid: tid,
    //   userRole: userRole,
    //   userId: userId,
    //   email: email,
    //   mobileno: mobileno,
    //   userPassword: userPassword,
    //   jwtAuth: jwtAuth,
    //   returnStatus: returnStatus,
    //   errorStatus: errorStatus,
    //   pageValue: pageValue,
    // };
  
    let storeData = {test:''}
    // set a key/value
    AppUtils.storeData(GlobalValue.DataStoreKey, JSON.stringify(storeData)).then((result) => {
        console.log(TAG + " DBG:GOTONEXTSCREEN :" + result);
        props.navigation.navigate('Detail' , { id: 5 })
      }
    );
  };


// console.log("DBG:LIST ITEM:" + data.itemList)
    return (
        <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        alwaysBounceVertical={true}
        // showsHorizontalScrollIndicator={false}
        // directionalLockEnabled={true}
        // alwaysBounceVertical={false}
        >
        {/* <Text>Valid Component</Text> */}
        {/* <StatusBar style="auto" /> */}
        
        <FlatList
        //  style={{
        //     margin:5,
        //     width: "100%"
        // }}
        // contentContainerStyle={{alignSelf: 'flex-start'}}
        // showsVerticalScrollIndicator={false}
        // showsHorizontalScrollIndicator={false}

        // ref={(ref) => { this.flatListRef = ref; }}
        style={{ width: '100%', margin: 10, backgroundColor: 'transparent', borderRadius: 5, alignSelf: 'center' }}
        // bounces={false}
       
            data={SampleDataJson.data.itemList}
            numColumns={ Math.ceil(SampleDataJson.data.itemList.length / 2)}
            keyExtractor={(item) => item.id}
            renderItem={({ index, item }) => (
              // <TouchableHighlight onPress={() => goNextPage()}>
                <GridItem 
                onPress={() => goNextPage()}
                //onPress={() => console.log("TEST KLIK")}
                title={item.item_name} 
                />
              // </TouchableHighlight>
                

        )} 
        />
      </ScrollView>
    );
  }



  const styles = StyleSheet.create({
    // App container
    container: {
      flex: 1,                            // Take up all screen
      backgroundColor: '#E91E63',         // Background color
    },
    // Tab content container
    content: {
      flex: 1,                            // Take up all available space
      justifyContent: 'center',           // Center vertically
      alignItems: 'center',               // Center horizontally
      backgroundColor: '#000',            // Darker background for content area
    },
    // Content text
    text: {
      marginHorizontal: 20,               // Add horizontal margin
      color: 'rgba(255, 255, 255, 0.75)', // Semi-transparent text
      textAlign: 'center',                // Center
      fontFamily: 'Avenir',
      fontSize: 18,
    },
    MovieContainerGrid:{
      flex: 1,
      flexDirection: 'row',
      padding: 10,
      justifyContent: 'center'
    },
    FlatlistStyles:{
      flexWrap: 'wrap'
    },
    poster:{
      width: 105,
      height: 150,
      margin:5
    }
    
  });