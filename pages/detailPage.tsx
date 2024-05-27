import { StatusBar } from 'expo-status-bar';
import { Image,Button,ScrollView, StyleSheet, Text, View } from 'react-native';
import React, { useState, useEffect } from 'react';
import {NavigationContainer,useNavigation} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { useRoute } from "@react-navigation/native";
import { AppUtils } from '../utility/appUtils';
import { GlobalValue } from '../utility/globalVal';
import Dialog from "react-native-dialog";


export default function DetailProdPage({ route, navigation }:any) {
  let TAG:any='DetailProdPage'
  const {id,item_name,item_cat,item_desc,item_url_image,expiry_date}= route.params;
  let dataDetail:any;
  let ListData:any=[];

  const [visible, setVisible] = React.useState(false);

  const showDialog = () => setVisible(true);

  const hideDialog = () => setVisible(false);

    useEffect(() => {
      console.log(TAG + "DBG:PARSE DATA GET : " + JSON.stringify(route.params)) 
      GetLocalData()
      filterTestId(id);
   });

   const GetLocalData = () =>{
    AppUtils.getDataLocal(GlobalValue.DataStoreKey).then((result:any) => {
      try {
        let resultobj=JSON.stringify(result)
        let respObj = JSON.parse(resultobj);
        let secRespObj = JSON.parse(respObj);
        console.log("DETAIL_PAGE: DBG:GETDATALOCAL: " + JSON.stringify(secRespObj))
        ListData=secRespObj.itemList;
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    });
  }

  const filterTestId = (id:any) => {
    console.log("DBG:GET INDEX :" + JSON.stringify(id))
    let dataSearch=  ListData.filter((i:any) => i.id.includes(id))
}

//    const ImageCouter= () => {
//     if (item_url_image == "" || null) {
//         return <Image
//         style={{width: '100%',height: 300}}
//         source={require('../assets/default.png')}
//         />;
//     }
//      return  <Image
//             style={{width: '100%',height: 300}}
//             source={require(item_url_image)}
//      />; 
// }

    return (
      <View  style={{flex: 1}}>
        {/* <Text>Details Product Page</Text> */}
        <ScrollView style={{maxHeight:'100%'}}> 
          <View>
          <Image
        style={{width: '100%',height: 300}}
        source={require('../assets/default.png')}
        />
              <Text style={{fontSize:36, fontWeight:500 ,paddingTop:20,paddingLeft:10}}>
                {item_name}
              </Text>
              <Text style={{fontSize:15, fontWeight:100, paddingLeft:15}}>
                {item_cat}
              </Text>
              <Text style={{fontSize:12, fontWeight:100, padding:15, width:'100%'}}>
                {item_desc}
              </Text>
          </View>
        
            
        </ScrollView>
        <Button
          onPress={showDialog}
          title={"Update"}
          color='#ff8c00'
        />

        <Button
            // onPress={this.onPress.bind(this)}
            title={"Delete"}
            color='#8b0000'
        />

    {/* <View>
    <Dialog.Container visible={true}>
      <Dialog.Title>Account delete</Dialog.Title>
      <Dialog.Description>
        Do you want to delete this account? You cannot undo this action.
      </Dialog.Description>
      <Dialog.Button label="Cancel" onPress={hideDialog} />
      <Dialog.Button label="Confirm" onPress={hideDialog}/>
    </Dialog.Container>
    </View> */}
      </View>
      
    );
  }

  var styles = StyleSheet.create({

   
  });