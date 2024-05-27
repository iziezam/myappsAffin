import React from "react";
import { Image,Pressable, StyleSheet, Text, View, Platform } from "react-native";
import { AppUtils } from "../utility/appUtils";
import { GlobalValue } from "../utility/globalVal";

const GridItem = (props:any) => {
    let TAG='GridItem';
   
    return (
    <View style={[style.gridItem, { backgroundColor: props.color }]}>
         <Pressable
                style={style.button}
                android_ripple={{ color: '#ccc' }}
                onPress={props.onPress}
                >
            <View style={[style.innerContainer]} >
                <Image
                        style={style.image}
                        source={require('../assets/default.png')}
                />
                <Text style={style.textStyling}>{props.title}</Text>
            </View>
        </Pressable>
    </View>
    )
}

export default GridItem;

const style = StyleSheet.create({
    image:{
        width: 100,
        height: 100,
        borderColor: 'white',
        borderWidth: 2,
        borderRadius: 75
      },
    textStyling: {
            fontSize: 20,
            fontStyle: 'italic',
            color: 'black'
    },
    innerContainer: {
            flex: 1,
            padding: 16,
            justifyContent: 'center',
            alignItems: 'center'

    },
    button: {
            flex: 1
    },
    gridItem: {
        flex: 1,
        margin: 5,
        height: 150,
        width: 150,
        padding:10,
        backgroundColor: 'white',
        borderRadius: 10,
        elevation: 4,
        shadowColor: 'black',
        shadowOpacity: 0.25,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 8,
        
        overflow: Platform.OS === 'android' ? 'hidden' : 'visible'
    }
    
})