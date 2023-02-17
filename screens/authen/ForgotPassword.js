import React, { useContext, useState }  from "react";
import {StyleSheet,View,Text,TextInput,Image,TouchableOpacity,Button } from 'react-native';
import { getDatabase, ref, set, push, onValue } from "firebase/database";
import {UserContext} from '../../Components/UserContext'
export const ForgotPassword=({navigation})=>{
    const {data}=useContext(UserContext);
    const [Email,setEmail]=useState('');
    const [newPassword,setnewPassword]=useState('');
    const [passwordAgain,setpasswordAgain]=useState('');
    const [datachangePassword,setdatachangePassword]=useState([])
    const [check,setcheck]=useState(true);
    const [checkpw,setcheckpw]=useState(true);
    const getPassword=()=>{
        for(var i=0;i<data.length;i++){
            if(Email != data[i].Email){
                setcheck(false);
            }else{
                console.log(data[i]);
                setdatachangePassword(data[i]);
                if(newPassword != passwordAgain){
                    setcheckpw(false);
                }else{
                set(ref(getDatabase(),"User/"+datachangePassword.User_id),{
                    User_id:data[i].User_id,
                    User_name:data[i].User_name,
                    Email:Email,
                    Password:newPassword,
                    Birth:data[i].Birth,
                    User_picture:data[i].User_picture,
                    Address:data[i].Address,
                    Phone_number:data[i].Phone_number,
                    Money:data[i].Money
                });
                setcheck(true);
                setcheckpw(true);
                break;
            }
            }   
        }
        console.log({check,checkpw,Email});
        if(checkpw == false){
            alert('mat khau khong khop')
        }
        console.log('------------------',datachangePassword);
    }
 return (
    <View style={styles.parent}>
            <View style={styles.box}></View>
            <Text style={styles.welcome}>Get Password</Text>
            <View >
                <TextInput style={styles.email} placeholder="Your Email" value={Email} onChangeText={setEmail} />
                <Image source={require('../../assets/User.png')}style={{ width: 25, height: 25, marginTop: -50,left:20,}} />
            </View>
            <View >
                <TextInput style={styles.email} placeholder="New Password"  value={newPassword} onChangeText={setnewPassword}/>
                <Image source={require('../../assets/Message.png')}style={{ width: 25, height: 25, marginTop: -50,left:20,marginBottom:20}} />
            </View>
            <View style={styles.password}>
                <TextInput style={styles.email} placeholder="Password Again " value={passwordAgain} onChangeText={setpasswordAgain}/>
                <Image source={require('../../assets/Password.png')}style={{ width: 25, height: 25, marginTop: -50,left:20,marginBottom:20}} />
            </View>
            <View style={styles.password}>
                <TextInput style={styles.email} placeholder="Password Again " value={passwordAgain} onChangeText={setpasswordAgain}/>
                <Image source={require('../../assets/Password.png')}style={{ width: 25, height: 25, marginTop: -50,left:20,marginBottom:20}} />
            </View>
            <TouchableOpacity >
            <View style={styles.btn_signin}>
                <Button title='Sign Up' color='#FF6E4E' onPress={getPassword}  />
            </View>
            </TouchableOpacity>
            <View style={{flexDirection:'row',marginTop:24}}>
                    <Text>Have an account?</Text>
                    <Text style={{color:'rgba(255, 110, 78, 1)',fontWeight:"700"}} onPress={()=>navigation.goBack()}>Sign In</Text>
                </View>
        </View>
    )
}

export default ForgotPassword
const styles=StyleSheet.create({
    parent: {
        display: "flex",
        alignItems: 'center',
        paddingTop: 50,
        
    },
    box: {
        backgroundColor: '#FF6E4E',
        width: 76,
        height: 76,
        borderRadius: 10
    },
    welcome: {
        color: "#223263",
        fontWeight: 'bold',
        fontSize: 16,
        marginTop: 24
    },
    continue: {
        fontWeight: "400",
        fontSize: 12,
        color: '#9098B1',
        marginTop: 16
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
        color: '#9098B1',
        borderRadius: 5
    },
    password: {
        marginTop: -18
    },
    btn_signin: {
        width: 343,
        height: 57,
        borderRadius: 5,
        marginTop: 70,
    },
    line: {
        backgroundColor: '#EBF0FF',
        width: 160,
        height: 1,
        flex: 1,
        margin: 10
    },
    login_gg: {
        width: 343,
        height: 38,
        borderWidth: 1,
        borderColor: 'rgba(235, 240, 255, 1)'
    },
})