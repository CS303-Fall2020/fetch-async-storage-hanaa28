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
  AsyncStorage
} from "react-native";
import Header from "../components/header";
import TodoItem from "../components/todoItem";
import AddTodo from "../components/addTodo";

export default function Home({ navigation },props) {
  const [todos, setTodos] = useState([]);
useEffect(async () => {
const response = await fetch("https://jsonplaceholder.typicode.com/todos?userId=1")
const data = await response.json();
const item= data;
setTodos(item)
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
        <Header />
        <View style={styles.contant}>
          <AddTodo submitHandler={submitHandler} />
          <View style={styles.list}>
            <FlatList
              data={todos}
              renderItem={({ item }) => (
                <View> 
                <TodoItem item={item}
                 pressHandler={pressHandler} 
                 pressHandler1={pressHandler1}
                  pressHandler2={pressHandler2}
                  edit={edit}  />
             </View> )}
            />
          </View>
        </View>
        <Button title='go to review' onPress={pressHandler1} />
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

  }
});
