import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  FlatList,
  Dimensions,
  Pressable,
  ScrollView,
} from "react-native";
import { getDatabase, ref, onValue, onChildAdded } from "firebase/database";
import React, {
  useState,
  useEffect,
  useContext,
  Animated,
  createContext,
} from "react";
import { UserContext } from "../../Components/UserContext";
import { ProductContext, } from "../../Components/ProductContext";
import { createStackNavigator } from '@react-navigation/stack';
import  Home  from "./Home";

import Detailsproduct from "./Detailsproduct";
const Stack = createStackNavigator();

export const HomeStack = ({ navigation, routes }) => {
  
return(
<Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Home " component={Home} />
    <Stack.Screen name="Detailsproduct" component={Detailsproduct}/>
  </Stack.Navigator>
)

};

export default HomeStack;
const styles = StyleSheet.create({
  
});

