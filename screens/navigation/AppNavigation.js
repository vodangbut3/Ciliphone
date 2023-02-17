import React,{useContext,useState,useEffect} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer,DarkTheme,DefaultTheme } from '@react-navigation/native';
import AuthenNavigation from './AuthenNavigation';
import ProductNavigation from './ProductNavigation';
import { UserContext } from '../../Components/UserContext';
import Login from '../authen/Login';
import Sign_up from '../authen/Sign_up'
import Detailsproduct from "../product/Detailsproduct";
import HomeStack from "../product/HomeStack";
import { EventRegister } from 'react-native-event-listeners';
import theme from '../theme/theme';
import themeContext from '../theme/themeContext';

export default function AppNavigation  (props)  {
    const LoggedIn =true;
    const {isLoggedIn} = useContext(UserContext);
    const [darkmode,setDarkMode]=useState(false);
    useEffect(()=>{
      const listener=EventRegister.addEventListener('ChangeTheme',(data)=>{
        setDarkMode(data)
      })
      return()=>{
        EventRegister.removeAllListeners(listener)
      }
    },[darkmode])
    return (
        <themeContext.Provider value={darkmode===true ?theme.dark:theme.light}>
        <NavigationContainer independent={true} theme={darkmode ===true?DarkTheme:DefaultTheme}>
            {
                isLoggedIn == true ? 
                <ProductNavigation />:
                <AuthenNavigation />
                
                  
                
            }
        </NavigationContainer>
        </themeContext.Provider>
        
       


        )
}
