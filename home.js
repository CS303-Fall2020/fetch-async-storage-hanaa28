import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
 TouchableOpacity,
  Text,
  View,
  FlatList,
  Alert,
  TouchableWithoutFeedback,
  Keyboard,
  Button,
  RefreshControlComponent,
  AsyncStorage,
  ActivityIndicator
} from "react-native";
import Header from "../components/header";
import TodoItem from "../components/todoItem";
import AddTodo from "../components/addTodo";

export default function Home({ navigation },props) {
  const [todos, setTodos] = useState([]);
  const [loading,setLoading] = useState(true);
useEffect( () => {
fetch("https://jsonplaceholder.typicode.com/todos?userId=1")
.then((response) => response.json())
.then(response => {
  setTodos(response),
  setLoading(false)
})
.then((json)=> console.log(json))
.catch(e => {
console.error(e);
  
});
},[])

  const edit =(id, title) => {
    setTodos(prevTodos => {
      return prevTodos.filter(todo => {
        if ((todo.id !=id)==false){
          todo.title=title;

        }
 return true;
      })
    })
    navigation.navigate('Home');
  } 
  const onRefresh = async () =>{
    setLoading(!loading);
    return fetch ('https://jsonplaceholder.typicode.com/todos?userId=1')
    .then((response) => response.json())
    .then((resonseJson)=>{
      setTodos(resonseJson),
      setLoading(false)
    })
    .catch((error)=>{
      console.error(error);
  
    });
  };

  const pressHandler =id=> {
    setTodos(prevTodos => {
      return prevTodos.filter(todo => todo.id != id);
    });
  };
  const pressHandler1 =(item) => {
     navigation.navigate('ReviewDetails',{item,edit});
    // navigation.push('ReviewDetails');
  }
  const pressHandler2 = id => {
    setTodos(prevTodos =>{
      return prevTodos.filter(todo=>{
        if ((todo.id !=id) == false){
 todo.completed = !todo.completed;
        }
        return true;
      })
    })
  }

  const submitHandler = title => {
    if (title.length > 3) {
      setTodos(prevTodos => {
        return [{ title: title, id: Math.random().toString() ,completed:false}, 
          ...prevTodos];
      });
    } else {
      Alert.alert("OOPS!", "Todos must over 3 chars long", [
        { title: "Understood", onPress: () => console.log("alert closed") }
      ]);
    }
  };

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
        console.log("dismissed keyboard");
      }}
      
    >

      <View style={styles.container}>
   
        <View style={styles.contant}>
          <AddTodo submitHandler={submitHandler} />
          <View style={styles.list}>
            {(loading)?(
              <ActivityIndicator size ="large" color ="skyblue" />
            )
           :(
            <FlatList
              data={todos}
              renderItem={({ item }) => (
                <View> 
                <TodoItem item={item}
                 pressHandler={pressHandler} 
                 pressHandler1={pressHandler1}
                  pressHandler2={pressHandler2}
                  edit={edit}  />
             </View> )}  />)}
          </View>
        </View>
     <View style={styles.Hanaa}>
        <Button title='Refresh' onPress={onRefresh} color= 'black' color='black' hight ='120' width ='5' />
        </View>
      </View>
 
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  contant: {
    padding: 40,
     backgroundColor: "#fff",
    flex: 1
  },
  list: {
    marginTop: 28,
    flex: 1 
},
Hanaa:{
  marginBottom: 20,
  paddingHorizontal: 70,
  // paddingVertical: 6,
  borderBottomWidth: 1,
  borderBottomColor: '#ddd',
  borderStyle: 'dashed'
}
});
