import React,{useEffect,useContext} from "react";
import { StyleSheet, Text, View, Image, ScrollView } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
const Stack = createStackNavigator();
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
const Tab = createBottomTabNavigator();


import HomeStack from '../product/HomeStack'; 
import MarkerStack from '../product/MarkerStack';
import ProfileStack from '../product/ProfileStack';
import BellStack from '../product/BellStack';
import Detailsproduct from '../product/Detailsproduct';
import Order from '../product/Order';
import EditUserProfile from '../user/EditUserProfile';
import Favorite from "../product/Favorite";

const ProductNavigation = () => {
    
    return (
        <Tab.Navigator   
        screenOptions={({route,}) =>({headerShown: false,
            tabBarIcon:() =>{
                    if (route.name == 'HomeStack') {
                        return <Image style={styles.icon} source={require('../../assets/images/homeVector.png')} />
                    } else if (route.name == 'MarkerStack') {
                        return <Image style={styles.icon} source={require('../../assets/shopping-cart.png')} />
                    }  else if (route.name == 'Favorite') {
                        return <Image style={styles.icon} source={require('../../assets/lover.png')} />
                    }else if (route.name == 'ProfileStack') {
                        return <Image style={styles.icon} source={require('../../assets/images/userVector.png')} />
                    }else if (route.name == 'Order') {
                        return <Image style={styles.icon} source={require('../../assets/images/sent.png')} />
                    }
                },
            tabBarLabel:({focused}) =>{
                if(route.name =='HomeStack' && focused){
                    return <Image style={styles.dot} source={require('../../assets/images/dot.png')}/>
                } else if(route.name =='MarkerStack' && focused){
                    return <Image  style={styles.dot}  source={require('../../assets/images/dot.png')}/>
                } else if(route.name =='Favorite' && focused){
                    return <Image  style={styles.dot} source={require('../../assets/images/dot.png')}/>
                } else if(route.name =='ProfileStack' && focused){
                    return <Image  style={styles.dot} source={require('../../assets/images/dot.png')}/>
                } else if(route.name =='Order' && focused){
                    return <Image  style={styles.dot} source={require('../../assets/images/dot.png')}/>
                }
                return null;
            }
        })}
    >

            <Tab.Screen name="HomeStack" component={HomeStack} />
            <Tab.Screen name="MarkerStack" component={MarkerStack}/>
            <Tab.Screen name="Favorite" component={Favorite}/>
            <Tab.Screen name="ProfileStack" component={ProfileStack}/>
            <Tab.Screen name="Order" component={Order}/>
        </Tab.Navigator>
    
        )
    
    
}

export default ProductNavigation

const styles = StyleSheet.create({
  icon: {
    width: 24,
    height: 24,
  },
  dot: {
    width: 4,
    height: 4,
  },
});
