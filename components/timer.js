import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import { LinearGradient } from 'expo-linear-gradient';
import { Audio} from 'expo-av'

export default function Timer(props){

    var done = false;

    useEffect(() => {

        const timer = setInterval(() => {
            props.setSeconds(props.seconds-1)

            if(props.seconds <= 0) {
                if(props.minutes > 0 ){
                    props.setMinutes(props.minutes-1)
                    props.setSeconds(59)
                }else{
                    if(!done) {
                        done = true;
                        props.setState('select');
                        props.setMinutes(0)
                        props.setSeconds(1)
                        playSound()
                    }
                }
            }
        },1000)

        return () => clearInterval(timer)
    })
    async function playSound(){
        const soundObject = new Audio.Sound();
        try {
            var alarme;
            props.alert.map(function(val){
                if(val.selected){
                    alarme = val.file;
                }
            })
            
            await soundObject.loadAsync(alarme);
            await soundObject.playAsync();
            // Your sound is playing!
 
            // Don't forget to unload the sound from memory
            // when you are done using the Sound object
            //await soundObject.unloadAsync();
        } catch (error) {
        // An error occurred!
            console.log(error)
        }
    }
    function reset(){

        props.setState('select');
        props.setMinutes(0)
        props.setSeconds(1)
    }

    function formartNumber(number){
        var finalNumber = "";
        if(number < 10){
            finalNumber = "0"+number;
        }else{
            finalNumber = number;
        }
        return finalNumber
    }
    var seconds = formartNumber(props.seconds)
    var minutes = formartNumber(props.minutes)
    

    return(
        <View style={styles.container}>
            <StatusBar style="auto"/>

            <LinearGradient
            // Background Linear Gradient
            colors={['rgba(0,0,0,0.8)', 'transparent']}
            style={{
              position:'absolute',
              left:0,
              right:0,
              top:0,
              height:400
            }}
            />
            <View style={{flexDirection:'row'}}>
                <Text style={styles.textTimer}>{minutes} : </Text>
                <Text style={styles.textTimer}>{seconds}</Text>
            </View>

            <TouchableOpacity onPress={() => reset()} style={styles.btnStart}><Text style={{color:'white',textAlign:'center', fontSize:20, lineHeight:75}}>Resetar</Text></TouchableOpacity>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgb(56, 36, 166)',
    },
    textTimer:{
        color:'white',
        fontSize:40
    },
    btnStart:{
      width: 100,
      height:100,
      padding:10,
      borderRadius: 50,
      marginTop:30,
      backgroundColor:'rgb(38, 2, 232)',
      borderWidth:2,
      borderColor:'white'
    }
})