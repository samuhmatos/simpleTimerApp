import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import { LinearGradient } from 'expo-linear-gradient';

import Timer from './components/timer'

export default function App() {
  console.disbleYellowBox = true;

  const [state, setState] = useState('select')
  const [seconds, setSeconds] = useState(1)
  const [minutes, setMinutes] = useState(0)

  const [alertSound, setAlertSound] = useState([
    {
      id:1,
      selected: true,
      sound:'alarme 1',
      file:require('./assets/alarme1.mp3')
    },
    {
      id:2,
      selected: false,
      sound:'alarme 2',
      file:require('./assets/alarme2.mp3')
    }
  ])

  var number = []
  for (var i = 1; i <= 60; i++) {
    number.push(i)
  }

  function getSound(id){
    let alertTemp = alertSound.map(function(sound){
      if(id != sound.id){
        sound.selected = false;
      }else{
        sound.selected = true;
      }
      return sound
    })
    setAlertSound(alertTemp);
  }
  
  if(state == 'select'){
    return (
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
        <Text style={{color:'white',fontSize:30}}>Selecione o seu tempo:</Text>
        <View style={{flexDirection:'row'}}>
          <Text style={{color:'white',marginTop:16}}>Min:</Text>
          <Picker style={{width:100,height:50, color:'white'}}
          selectedValue={minutes}
          onValueChange={(itemValue, itemIndex) =>
            setMinutes(itemValue)
          }>
            <Picker.Item label="0" value="0" />

            {
              number.map((val)=>{
                return(<Picker.Item label={val.toString()} value={val.toString()} />)
              })
            }
          </Picker>

          <Text style={{color:'white',marginTop:16}}>Seg:</Text>

          <Picker style={{width:100,height:50, color:'white'}}
          selectedValue={seconds}
          onValueChange={(itemValue, itemIndex) =>
            setSeconds(itemValue)
          }>
            {
              number.map((val)=>{
                return(<Picker.Item label={val.toString()} value={val.toString()} />)
              })
            }
          </Picker>
        </View>
        <View style={{flexDirection:'row'}}>
          {
            alertSound.map((val)=>{
              if(val.selected){
                return(
                  <TouchableOpacity onPress={()=>getSound(val.id)} style={styles.btn_choiceSelected}><Text style={{color:'white', textAlign:'center'}}>{val.sound}</Text></TouchableOpacity>
                )
              }else{
                return(
                  <TouchableOpacity onPress={()=>getSound(val.id)} style={styles.btn_choice}><Text style={{color:'white', textAlign:'center'}}>{val.sound}</Text></TouchableOpacity>
                )
              }
              
            })
          }
        </View>
        <TouchableOpacity onPress={() => setState('start')} style={styles.btnStart}><Text style={{color:'white',textAlign:'center', fontSize:20, lineHeight:75}}>Iniciar</Text></TouchableOpacity>
      </View>
    );
  }else if(state == 'start'){
    return (
      <Timer alert={alertSound} setState={setState} setMinutes={setMinutes} setSeconds={setSeconds} minutes={minutes} seconds={seconds}></Timer>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(56, 36, 166)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btn_choice :{
    width:100,
    padding:8,
    backgroundColor: 'rgb(14, 3, 74)',
    borderRadius:10,
    margin:10
  },
  btn_choiceSelected:{
    width:100,
    padding:8,
    backgroundColor: 'rgba(14, 3, 74,0.3)',
    borderRadius:10,
    margin:10,
    borderWidth:1,
    borderColor: 'white'
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
});
