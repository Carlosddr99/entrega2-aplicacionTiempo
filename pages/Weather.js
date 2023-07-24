import { useEffect, useState } from "react";
import { StyleSheet, View ,Button, Text, Image, FlatList} from "react-native"
import { Ionicons } from "@expo/vector-icons";

export default function  Weather({route, navigation}){
    const {poblacion, latitude, longitude} = route.params;
    const [tiempos, setTiempos] = useState([]);
    const [hours, setHorasProximas] = useState([]);
    const [dias, setDias] = useState([]);

    const openWeatherKey = '18cabda156f40da3bf4d7195b2f5228d';

    useEffect(()=>{
        navigation.setOptions({
            headerTitle: poblacion,
            headerRight:() => <Ionicons onPress={clickInfo} name="information-circle" size={24} color="black" />

        })
        const url = "https://api.openweathermap.org/data/2.5/forecast?appid="+openWeatherKey+"&lat="+latitude+"&lon="+longitude
        console.log(url)
        fetch(url)
        .then(response => response.json())
        .then(data => respuestaServidor(data));
    },[])

    function respuestaServidor(data){
        const horasProximas =[]
        const diasProximos = []
        const tiemposServidor = []
        const date = new Date();
        for(var num in data.list){
            tiemposServidor.push(data.list[num])
            const datelist = new Date(data.list[num].dt_txt.toString())
            if(datelist.getDate() === date.getDate()){
                horasProximas.push({hora: datelist.getHours(), icon: data.list[num]?.weather[0].icon, temp: data.list[num].main.temp});
            }else if(datelist.getHours()===12){
                diasProximos.push({icon: data.list[num].weather[0].icon,temp: data.list[num].main.temp, tiempo: data.list[num].weather[0].main,
                        date: datelist.getDate() +"-"+ (datelist.getMonth()+1)+ "-"+datelist.getFullYear()})
            }
        }
        setDias(diasProximos)
        setHorasProximas(horasProximas)
        setTiempos(tiemposServidor)
    }

    function clickInfo(){
        navigation.push('Informacion', {poblacion : poblacion, latitude : latitude, longitude : longitude})
    }



    return(
        <View style={{flex:1, backgroundColor:"#DDD8E6"}}>
            <View style= {styles.principal}>
                <Image source={{uri:'https://openweathermap.org/img/wn/'+tiempos[0]?.weather[0].icon+'@2x.png'}} style={{width: 125, height: 125}}/>
                <Text style={styles.text22}>{poblacion}</Text>
                <Text style={{fontSize:28}}>{(tiempos[0]?.main.temp-273).toFixed(1)} º </Text>
                <Text style={{fontSize:25}}>{tiempos[0]?.weather[0].main}</Text>
            </View>
            <View style={{marginTop:10}}>
                <Text style={styles.text22}>Proximas 24 horas</Text>
                <FlatList
                data={hours}
                horizontal={true}
                renderItem={({item}) => 
                        <View style={{margin:10, alignItems:"center"}}>
                            <Text style={{margin:5}}>{item.hora}</Text>
                            <Image source={{uri:'https://openweathermap.org/img/wn/'+item.icon+'@2x.png'}} style={{width: 75, height: 75}}/>
                            <Text style={{margin:5}}>{(item.temp  -273).toFixed(1) +"º" }</Text>
                        </View>}
                keyExtractor={hour => hours.indexOf(hour)}
                />
            </View>
            <View style={{marginTop:10}}>
                <Text style={styles.text22}>Proximas {dias.length} días</Text>
                <FlatList
                data={dias}
                renderItem={({item}) => 
                        <View style={styles.proximoDay}>
                            <Image source={{uri:'https://openweathermap.org/img/wn/'+item.icon+'@2x.png'}} style={{width: 75, height: 75}}/>
                            <Text style={{margin:15}}>{(item?.temp-273).toFixed(1)} º</Text>
                            <View style={{flexDirection:"column", margin:15, alignItems:"center"}}>
                                <Text>{item?.date}</Text>
                                <Text>{item?.tiempo}</Text>
                            </View>
                        </View>}
                keyExtractor={dia => dias.indexOf(dia)}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    principal:{
        alignItems:"center",
        justifyContent:"center"
    },
    text22:{
        fontSize:22
    },
    proximoDay:{
        display:"flex",
        flexDirection: 'row',
    }
});