import { useEffect, useState } from "react";
import { SafeAreaView, Text, StyleSheet, View } from "react-native";
import * as municipios from '../municios.json';
import MapView from 'react-native-maps';
import React from 'react';
import { Ionicons } from "@expo/vector-icons";

export default function  Informacion({route, navigation}){
    const {poblacion, longitude, latitude} = route.params;
    const [municipio, setMunicipio] = useState([]);


    useEffect(()=>{
        for(var num in municipios){
            if(municipios[num].Población === poblacion){
                setMunicipio(municipios[num])
            }
        }
    },[])
    

    return(
        <SafeAreaView style={styles.container}>
            <View style={styles.datosMunicipio}>
                <Text style={styles.poblacion}>{poblacion}</Text>
                <Text style={styles.provincia}>{municipio.Provincia}</Text>
                <Text style={styles.comunidad}>{municipio.Comunidad}</Text>
            </View>
            <MapView
                style={styles.map}
                initialRegion={{
                latitude: parseFloat(latitude.replace(",",".")),
                longitude:  parseFloat(longitude.replace(",",".")),
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,}
                }
                zoomEnabled={false}
            >     
            </MapView>
            <Text style={{...styles.habitantes, margin:10}}>Población total : {municipio.Habitantes}</Text>
            <View style={styles.iconHabitante}>
                <Ionicons name="man" size={20}/>
                <Text style={styles.habitantes}>{municipio.Hombres}</Text>
            </View>
            <View style={styles.iconHabitante}>
                <Ionicons name="woman" size={20}/>
                <Text style={styles.habitantes}>{municipio.Mujeres}</Text>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    
    },
    iconHabitante:{
        margin:10,
        flexDirection: 'row'
    },
    datosMunicipio:{
        alignItems: "center",   
    },
    mapcontainer:{
        flex:5,
    },
    map:{
        height:470,
        width:500
    },
    poblacion:{
        fontSize:35,
        margin: 5,
    },
    provincia:{
        fontSize:25,
        margin: 5
    },
    comunidad:{
        fontSize:20,
        margin: 5
    },
    habitantes:{
        fontSize:18,
    }
});

