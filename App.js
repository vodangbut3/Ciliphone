import { StatusBar } from "expo-status-bar";
import React, { useContext } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { app } from "./Components/FirebaseConfig";
import { getDatabase, ref, set, push } from "firebase/database";
import { NavigationContainer } from "@react-navigation/native";
import AuthenNavigation from "./screens/navigation/AuthenNavigation";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ProductNavigation from "./screens/navigation/ProductNavigation";
import { UserContext } from "./Components/UserContext";
import { UserContextProvider } from "./Components/UserContext";
import { ProductContextProvider } from "./Components/ProductContext";
import AppNavigation from "./screens/navigation/AppNavigation";
import Login from "./screens/authen/Login";
import HomeStack from "./screens/product/HomeStack";
import Sign_up from "./screens/authen/Sign_up";
import Detailsproduct from "./screens/product/Detailsproduct";
import Cart from "./screens/Cart";
import Favorite from "./screens/product/Favorite";
const Stack = createNativeStackNavigator();
export default function App() {
  return (

    // <NavigationContainer independent={true}>
    //   <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Login">
    //     <Stack.Screen name='Login' component={Login} />
    //     <Stack.Screen name='HomeStack' component={HomeStack} />
    //     <Stack.Screen name='Signup' component={Sign_up} />
    //     <Stack.Screen name='Detailsproduct' component={Detailsproduct} />
    //   </Stack.Navigator>
    // </NavigationContainer>



    <UserContextProvider>
      <ProductContextProvider>
     <AppNavigation/>
      </ProductContextProvider>
    </UserContextProvider>
    
 
  
  )





}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
