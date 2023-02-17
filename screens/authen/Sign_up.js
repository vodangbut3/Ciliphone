import React,{useContext, useState,useEffect} from "react";
import { Text, StyleSheet, TextInput, Button, Image,View,TouchableOpacity } from "react-native";
import { getDatabase, ref, set , push,onValue } from "firebase/database";
import {UserContext} from '../../Components/UserContext'
import { ProductContext } from "../../Components/ProductContext";
import CheckBox from "@react-native-community/checkbox";

function Sign_up(props) {
    const {navigation}=props;
    const [Username,setUsername]=useState('');
    const [UserEmail,setUserEmail]=useState('');
    const [checkValidEmail,setcheckValidEmail]=useState(false);
    const [UserPassword,setUserPassword]=useState('');
    const [data,setdata]=useState([]);
    const[check,setCheck]=useState(false);
    const[check2,setCheck2]=useState(false);
    const {user_idud,cart_ud,user_id}=useContext(UserContext);
   const {Detail_cart}=useContext(ProductContext)
    var a=0;


   useEffect(()=>{
    onValue(ref(getDatabase(), "User"), (snapshot) => {
        setdata(Object.values(snapshot.val()));
      });
    },[]);
    const handleCheckEmail=(text)=>{
      let re=/\S+@\S+\.\S+/;
      let regex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
      setUserEmail(text);
      if(re.test(text)|| regex.test(text)|| text ==''){
        setcheckValidEmail(false)
      }else{
        setcheckValidEmail(true)
      }
    }
    const Check=(text)=>{
      setUsername(text);
      if(text==''){
        setCheck(true)
      }else{
        setCheck(false)}
    }
    const Check2=(text)=>{
      setUserPassword(text);
      if(text==''){
        setCheck2(true)
      }else{
        setCheck2(false)}
    }
const Sign_up = () =>{
    a=data.length+1;
    var b='us'+a;
    set(ref(getDatabase(),"User/"+b),{
        User_id:b,
        User_name:Username,
        Email:UserEmail,
        Password:UserPassword,
        Birth:"null",
        User_picture:"null",
        Address:"null",
        Phone_number:"null",
        Money:"null"

    });
    var c='c'+a
    set(ref(getDatabase(),"Cart/"+c),{
       Cart_id:c,
       Total_price:'2000',
       User_id:b,
       all_productID:{c},
    });
    var d='fv'+a
    set(ref(getDatabase(),"Favorite/"+d),{
      Favorite_id:d,
      Product_id:{d},
      User_id:b
    })
    var t=Detail_cart.length+1
    set(ref(getDatabase(),'Detail_cart/dt'+t),{
        Innitiated_date:'',
        Price:5000,
        Product_id:{a},
        Quantity:0,
        Status:'false',
        cart_id:c,
        dt_id:'dt'+t
    })
}

    return (
        <View style={styles.parent}>
            <View style={styles.box}></View>
            <Text style={styles.welcome}>Let's Get Started</Text>
            <Text style={styles.continue}>Create an new account</Text>
            <View >
                <TextInput style={styles.email} placeholder="Full Name" value={Username} onChangeText={(text)=>Check(text)} />
                <Image source={require('../../assets/User.png')}style={{ width: 25, height: 25, marginTop: -50,left:20,}} />
                {check ?<Text style={{alignSelf:'flex-end',right:20,color:'red',fontWeight:'bold',bottom:-20}}>Cannot be left blank</Text>:<Text></Text>}

            </View>
            <View >
                <TextInput style={styles.email} placeholder="Your Email" value={UserEmail}  onChangeText={(text)=>handleCheckEmail(text)} />
                <Image source={require('../../assets/Message.png')}style={{ width: 25, height: 25, marginTop: -50,left:20,marginBottom:20}} />
                {checkValidEmail ?<Text style={{alignSelf:'flex-end',right:20,color:'red',fontWeight:'bold'}}>Wrong format email</Text>:<Text></Text>}
            </View>
            <View style={styles.password}>
                <TextInput style={styles.email} placeholder="Password" value={UserPassword} secureTextEntry={true}   onChangeText={(text)=>Check2(text)}/>
                <Image source={require('../../assets/Password.png')}style={{ width: 25, height: 25, marginTop: -50,left:20,marginBottom:20}}/>
                {check2 ?<Text style={{alignSelf:'flex-end',right:20,color:'red',fontWeight:'bold',bottom:-20}}>Cannot be left blank</Text>:<Text></Text>}
            </View>
            <TouchableOpacity >
            <View style={styles.btn_signin}>
                <Button title='Sign Up' color='#FF6E4E' onPress={Sign_up} />
            </View>
            </TouchableOpacity>
            <View style={{flexDirection:'row',marginTop:24}}>
                    <Text>Have an account?</Text>
                    <Text style={{color:'rgba(255, 110, 78, 1)',fontWeight:"700"}} onPress={()=>navigation.goBack()}>Sign In</Text>
                </View>
        </View>
    );
}

export default Sign_up;

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
  btn_signin: {
    width: 343,
    height: 57,
    borderRadius: 5,
    marginTop: 70,
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
