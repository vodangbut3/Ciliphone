
import React, { useState, useEffect,useContext,createContext } from "react";
import { Text, StyleSheet, View, TextInput, Button, Image,TouchableOpacity } from "react-native";
import CheckBox from "expo-checkbox";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { NavigationContainer } from "@react-navigation/native";
import ProductNavigation from "../navigation/ProductNavigation";
import { getDatabase, ref, set, push, onValue } from "firebase/database";
import { UserContext } from "../../Components/UserContext";
import { ProductContext } from "../../Components/ProductContext";
export const LoginContext =createContext();

export const Login = ({ navigation }) => {
    const [Username, setUsername] = useState('');
    const [Password, setPassword] = useState('');
    const [data, setData] = useState([]);
   
    const {login} =useContext(UserContext);
    const Login = async() => {
      var today=new Date();
      var date = today.getDate()+'/'+(today.getMonth()+1)+'/'+today.getFullYear();
        const res =await login(Username,Password,date);
        if(res ==true){
            console.log('dang nhap thanh cong');
        }else{
            console.log('dang nhap that bai');
            console.log(res);
        }
    }
    return (
        <View style={styles.parent}>
            <View style={styles.box}></View>
            <Text style={styles.welcome}>Welcome to CiliPhone</Text>
            <Text style={styles.continue}>Sign in to continue</Text>
            <View >
                <TextInput style={styles.email} placeholder="Your Email" value={Username} onChangeText={setUsername}/>
                <Icon name={"email-outline"} style={{ fontSize: 26, position: "absolute", left: 20, bottom: 19 }} />
            </View>
            <View style={styles.password}>
                <TextInput style={styles.email} placeholder="Password" secureTextEntry={true}  value={Password} onChangeText={setPassword} />
                <Icon name={"lock-outline"} style={{ fontSize: 26, position: "absolute", left: 20, bottom: 19 }} />
            </View>
            <View style={styles.rm_password}>
                <CheckBox style={styles.checkbox} />
                <Text style={styles.text_rm}>Remember Password</Text>
            </View>
            <View style={styles.btn_signin}>
                <Button title='Sign In' color='#FF6E4E' onPress={Login} />
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', margin: 5 }}>
                <View style={styles.line}></View>
                <Text style={{ color: '#9098B1', paddingLeft: 5 }}>OR</Text>
                <View style={styles.line}></View>
            </View>
            <View style={styles.login_gg}>
                <Button
                    color='rgba(235, 240, 255, 1)'
                    title="Sign with Google"
                    titleStyle={{ fontWeight: "700", color: 'black' }} />
                <Image source={require('../../assets/Google.png')} style={{ width: 25, height: 25, marginTop: -30 }} />
            </View>
            <View style={styles.login_gg}>
                <Button
                    color='rgba(235, 240, 255, 1)'
                    title="Sign with facebook"
                    titleStyle={{ fontWeight: "700", color: 'black' }} />
                <Image source={require('../../assets/Facebook.png')} style={{ width: 25, height: 25, marginTop: -30 }} />
            </View>
            <TouchableOpacity onPress={()=>navigation.navigate('ForgotPassword')}>
            <Text style={{ color: 'rgba(255, 110, 78, 1)', fontWeight: "700", fontSize: 15, marginTop: 13 }}>Forgot Password</Text>
            </TouchableOpacity>
            <View style={{ flexDirection: 'row', marginTop: 13 }}>
                <Text>Don't have an account?</Text>
                <Text style={{ color: 'rgba(255, 110, 78, 1)', fontWeight: "700" }} onPress={() => navigation.navigate('Register')}>Register</Text>
            </View>
        </View>
    );


}

    
    
    







export default Login;

const styles = StyleSheet.create({
  parent: {
    display: "flex",
    alignItems: "center",
    paddingTop: 50,
  },
  box: {
    backgroundColor: "#FF6E4E",
    width: 76,
    height: 76,
    borderRadius: 10,
  },
  welcome: {
    color: "#223263",
    fontWeight: "bold",
    fontSize: 16,
    marginTop: 24,
  },
  continue: {
    fontWeight: "400",
    fontSize: 12,
    color: "#9098B1",
    marginTop: 16,
  },
  email: {
    value: { Text },
    margin: 12,
    borderWidth: 1,
    width: 343,
    height: 48,
    marginTop: 28,
    paddingLeft: 35,
    fontSize: 14,
    fontWeight: "400",
    color: "#9098B1",
    borderRadius: 5,
  },
  password: {
    marginTop: -18,
  },
  rm_password: {
    width: 343,
    height: 48,
    flexDirection: "row",
    left: -85,
    justifyContent: "center",
    alignItems: "center",
  },
  checkbox: {
    width: 24,
    height: 24,
  },
  text_rm: {
    paddingLeft: 10,
    color: "#9098B1",
  },
  btn_signin: {
    width: 343,
    height: 57,
    borderRadius: 5,
    marginTop: 10,
  },
  line: {
    backgroundColor: "#EBF0FF",
    width: 160,
    height: 1,
    flex: 1,
    margin: 10,
  },
  login_gg: {
    width: 343,
    height: 38,
    borderWidth: 1,
    borderColor: "rgba(235, 240, 255, 1)",
  },
});
