import { StatusBar } from 'expo-status-bar';
import { Button, FlatList, ScrollView, StyleSheet, Text, View } from 'react-native';
import React, { useState, useEffect } from 'react';
import {NavigationContainer,useNavigation} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ValidProd from '../components/validProd';
import ExpiredProd from '../components/expiredProd';
import { AppUtils } from '../utility/appUtils';
import { GlobalValue } from '../utility/globalVal';
import { useRoute } from "@react-navigation/native";
import GridItem from '../components/GridItem';
import { SampleDataJson } from '../utility/dataJson';


export default function HomePage({ navigation}:any) {
    let TAG='HOMEPAGE';
    let ArrayValid:any=[];
    let ArrayExpired:any=[];
    let ListData:any=[];
    // const route = useRoute()
    useEffect(() => {
        GetLocalData();
   });
   const GetLocalData = () =>{
    AppUtils.getDataLocal(GlobalValue.DataStoreKey).then((result:any) => {
      try {
        let resultobj=JSON.stringify(result)
        let respObj = JSON.parse(resultobj);
        let secRespObj = JSON.parse(respObj);
        console.log("DBG:GETDATALOCAL: " + JSON.stringify(secRespObj))
        const current = Date.now();
        let ddta = new Date();

        if(secRespObj.itemList !=null){
          ListData=secRespObj.itemList;

          for (let i=0; i < ListData.length; i++) {
            // let dataless=ListData[i].expiry_date.setMonth(ddta.getMonth() - 30)

            let dateString = ListData[i].expiry_date;
            let dateresult = Date.parse(dateString);
            var currentdate = new Date(dateresult); 
            var datetime = "Last Sync: " + currentdate.getDate() + "/"
                            + (currentdate.getMonth()+1)  + "/" 
                            + currentdate.getFullYear() + " @ "  
                            + currentdate.getHours() + ":"  
                            + currentdate.getMinutes() + ":" 
                            + currentdate.getSeconds();

            let moth=(currentdate.getMonth()+1) ;
            let day=(currentdate.getDate()) ;

            console.log("DBG date result:" + datetime)
              if(new Date(current) > new Date(ListData[i].expiry_date) ){
                  ArrayExpired.push(ListData[i])
              }else{
                  ArrayValid.push(ListData[i])
              }
          }
          console.log("DBG:VALID LIST: " + JSON.stringify(ArrayValid));
          console.log("DBG:EXPIRED LIST: " + JSON.stringify(ArrayExpired));
        }else{
          console.log("DBG:LIST: NULL");
        }
      
  
      } catch (error) {
        console.error(" DBG :GET DATA LOCAL:Error fetching data:", error);
      }
    });
  }
  
  
   /*--------------Go Previous Page -----------*/
   const goNextPage= (data:any) => {
    // console.log(TAG + "DBG:Go To previous Page :");
    let ParseData = data;
    // set a key/value
    AppUtils.storeData(GlobalValue.DataStoreKey, JSON.stringify(ListData)).then((result) => {
        console.log(TAG + " DBG:GOTONEXTSCREEN :" + result);
        navigation.navigate('Detail' , ParseData)
      }
    );
  };

    return (
        <ScrollView style={{margin:20}}
            showsHorizontalScrollIndicator={false}
            >

      <Text style={{fontSize:20, fontWeight:500 ,padding:10 }}>Valid Item</Text>
      {/* <ValidProd navigation/> */}
      <View style={{height: 400}}>

      <ScrollView
        style={{height: 400}}
        horizontal={false}
        showsHorizontalScrollIndicator={false}
        alwaysBounceVertical={true}
        >
        <FlatList
            style={{ width: '100%', margin: 10, backgroundColor: 'transparent', borderRadius: 5, alignSelf: 'center' }}
            data={ArrayValid}
            numColumns={ 2}
            keyExtractor={(item) => item.id}
            renderItem={({ index, item }) => (
                    <GridItem 
                    onPress={() => goNextPage(item)}
                    title={item.item_name} 
                    />
        )} 
        />
      </ScrollView>
      </View>
      <Text style={{fontSize:20, fontWeight:500,padding:10  }}>Expired Item</Text>
      {/* <ExpiredProd></ExpiredProd> */}

      <View style={{height: 400}}>
      <ScrollView
          horizontal={false}
        showsHorizontalScrollIndicator={false}
        alwaysBounceVertical={true}
          >
        <FlatList 
            style={{ width: '100%', margin: 10, backgroundColor: 'transparent', borderRadius: 5, alignSelf: 'center' }}
            data={ArrayExpired}
            numColumns={ 2}
            keyExtractor={(item) => item.id}
            renderItem={({ index, item }) => (
                <GridItem 
                onPress={() => goNextPage(item)}
                title={item.item_name} />
        )} 
        />
      </ScrollView>
      </View>

    </ScrollView>
      
    );
  }