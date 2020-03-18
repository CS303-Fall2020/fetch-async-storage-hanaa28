import React, { useState } from "react";
import {
    StyleSheet,
    View,
    FlatList,
    Alert,
    TouchableWithoutFeedback,
    Keyboard,
    Button,
    AsyncStorage
  } from "react-native";
  
import TodoItem from "../components/todoItem";
import Home from "./home";
import { TextInput } from "react-native-gesture-handler";

  export default function ReviewDetails({navigation,route}) {
    const [title, setTitle] = useState("");


  const changeHandler = val => {
    setTitle(navigation.getParam('item').title+val)
  };
const f = navigation.getParam('edit');
const submitHandler = title =>{
    if (title.length > 3){
    //     todo = route.pagrams;t
    //     todo.text=text;
    //     navigation.setPagrams(todo);
       navigation.goBack();
     }
    else{
        Alert.alert("OOPS!", "Todos must over 3 chars long", [
            { title: "Understood", onPress: () => console.log("alert closed") }
        ]);}
}
// const pressHandler = () =>{
//     submitHandler(text );
// }  
    return (
          <View >
               <TextInput style={StyleSheet.details} placeholder="new details....."
           onChangeText ={changeHandler} defaultValue={ navigation.getParam('item'.title)}>
               </TextInput>

             <Button style={StyleSheet.Hanaa} onPress={() => f(navigation.getParam('item').id,title)} title='Done' color='black'/>
          </View>
      )
  }
  // padding: 16,
  // marginTop: 16,
  // borderColor: '#bbb',
  // borderWidth: 1,
  // // borderStyle: 'dashed',
  // borderRadius: 1,
  // flexDirection: 'row',
  //  justifyContent:'space-between'
  const stles= StyleSheet.create({
      details:{
        padding: 16,
        marginTop: 16,
        borderColor: '#bbb',
        borderWidth: 1,
        // borderStyle: 'dashed',
        borderRadius: 1,
        flexDirection: 'row',
         justifyContent:'space-between'
      },
      Hanaa:{
        padding: 16,
        marginTop: 16,
        borderColor: '#bbb',
        borderWidth: 1,
        // borderStyle: 'dashed',
        borderRadius: 1,
        flexDirection: 'row',
         justifyContent:'space-between'
      }
  })
