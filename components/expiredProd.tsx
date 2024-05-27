import { StatusBar } from 'expo-status-bar';
import { FlatList, ScrollView, StyleSheet, Text, View } from 'react-native';
import React, { useState, useEffect } from 'react';
import { SampleDataJson } from '../utility/dataJson';
import GridItem from './GridItem';

export default function ExpiredProd() {

    useEffect(() => {
      
   });

    return (
     
          <ScrollView
          horizontal={true}
        showsHorizontalScrollIndicator={false}
        alwaysBounceVertical={true}
          >
        {/* <Text>Valid Component</Text> */}
        {/* <StatusBar style="auto" /> */}
        
        <FlatList 
                style={{ width: '100%', margin: 10, backgroundColor: 'transparent', borderRadius: 5, alignSelf: 'center' }}

            data={SampleDataJson.data.itemList}
            
            numColumns={ Math.ceil(SampleDataJson.data.itemList.length / 2)}
            keyExtractor={(item) => item.id}
            renderItem={({ index, item }) => (
                <GridItem title={item.item_name} />

        )} 
        />
      </ScrollView>
     
    );
  }