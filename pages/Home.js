import { StyleSheet,
    Text,
    View,
    SafeAreaView,
    FlatList,
    TextInput,
    Image
    } from 'react-native';
import * as municipios from '../municios.json'
import { useDebugValue, useEffect, useState } from 'react';

export default function Home({ navigation }) {
    const [municipiosMostrados, setMunicipiosMostrados] = useState([]);
    const [municipiosListado, setMunicipioListado] = useState([]);
    const [municipiosAL, setMunicipioAL] = useState([]);

    useEffect(()=>{
        setMunicipioListado([])
        for(var num in municipios){
            if(municipios[num].Población !== undefined){
                municipiosListado.push({poblacion:municipios[num].Población,
                    latitude:municipios[num].Latitud, longitude:municipios[num].Longitud})
            }
        }
        setMunicipiosMostrados(municipiosListado)
        setMunicipioAL(municipiosListado)
    },[])

    function filtrarTexto(text){
        const municipiosFiltro = []
        for(var num in municipiosAL){
            if(JSON.stringify(municipiosAL[num].poblacion).includes(text)){
                municipiosFiltro.push(municipiosAL[num])
            }
        }
        setMunicipiosMostrados(municipiosFiltro);
    }

    function seeWeather(item){
        navigation.push('Weather',{poblacion : item.poblacion, latitude:item.latitude, longitude:item.longitude})
    }

    return (
    <SafeAreaView style={styles.container}>
        <View style={styles.buscador}>
            <TextInput  style={{ width: 200, height: 50 }} onChangeText={(text) => filtrarTexto(text)}
            placeholder='Buscar municipio...'></TextInput>
        </View>

        <FlatList
        data={municipiosMostrados}
        renderItem={({item}) => 
        <View style={styles.item}>
            <Text onPress={()=>seeWeather(item)} style={styles.title}>{item.poblacion}</Text>
        </View>}
        keyExtractor={item => item.id}
    />
    </SafeAreaView>
    );

}

const styles = StyleSheet.create({
    container: {
    flex: 1,
        backgroundColor: '#fff',
    
    },
    buscador:{
        alignItems:"center",
        margin: 10,
    },
    item:{
        margin: 5,
        padding:5,
        backgroundColor:"lightblue"
    },
    title:{
        fontSize:20
    }
});

