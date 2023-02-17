import {TextInput,Image,SafeAreaView,StyleSheet,Text,View,Button,Pressable,TouchableOpacity,} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import React from "react";
import { UserContext } from "../../Components/UserContext";
import { useEffect, useState, useContext } from "react";  
import * as ImagePicker from 'expo-image-picker';
import { storage } from "../../Components/FirebaseConfig";
import {ref,uploadBytes}from 'firebase/storage'

  const EditUserProfile = (props) => {
    const { navigation } = props;
    const [image, setImage] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [transferred, setTransferred] = useState(0);
    const [name, setUser_name] = useState("");
    const [birth, setBirth] = useState("");
    const [Email, setEmail] = useState("");
    const [Address, setAddress] = useState("");
    const [Phone, setPhone] = useState("");
    const [checkValidEmail,setcheckValidEmail]=useState(false);
    const [checkPhone,setcheckPhone]=useState(false);
    const [check,setCheck]=useState(false);
    const [refreshing, setRefreshing] = useState(false);

    const pickImage = async () => {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All, 
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,   
      });
      console.log(result);
      if (!result.canceled) {
        setImage(result.assets[0].uri);
      }
    };
  

    const uploadImage = async () => {
     if(image ==null) return ;
     const imageRef=ref(storage,`imagesUser/5`);
     uploadBytes(imageRef,image[0].uri).then(()=>{
      console.log('upload than cong')
     })
    };


    const {
      user_id,
      user_money,
      user_image,
      user_name,
      getUser,
      address,
      Birth,
      email,
      Phone_number,
      UpdateUser,
      data,
    } = useContext(UserContext);
  
    const update = async () => {
      const res = await UpdateUser(name, birth, Email, Address, Phone,image);
      if (res == true) {
        console.log("chinh sua thanh cong");
      }
    };
    useEffect(() => {
      setUser_name(user_name);
      setBirth(Birth);
      setEmail(email);
      setAddress(address);
      setPhone(Phone_number);
    }, []);

    const checkten=(text)=>{
      setUser_name(text);
      if(text==''){
        setCheck(true)
      }else{setCheck(false)}
    }
    const handleCheckEmail=(text)=>{
      let re=/\S+@\S+\.\S+/;
      let regex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
      setEmail(text);
      if(re.test(text)|| regex.test(text)|| text ==''){
        setcheckValidEmail(false)
      }else{
        setcheckValidEmail(true)
      }
    }
    const checkPhoneleng=(text)=>{
      setPhone(text)
      if(text.length >11){
        setcheckPhone(true)
      }else{setcheckPhone(false)}
    }
    const onRefresh = () => {
      setRefreshing(true);

      setRefreshing(false);
  };
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
        <View style={styles.orderBar}>
          <Pressable onPress={()=>navigation.goBack()}>
            <View style={styles.Icon}>
              <Image
                style={styles.Icon}
                resizeMode="cover"
                source={require("../../assets/images/backIcon.png")}
              />
            </View>
          </Pressable>
          <Text style={styles.TextOrderBar}> My Profile </Text>
        </View>
        <View style={styles.container}>
          <View style={styles.userProfileImageContainer}>
            <TouchableOpacity onPress={pickImage}>
            {
              image ==null ?
              <Image
                style={styles.userProfileImage}
                source={{uri:user_image}}
                // source={{uri: image}}
              ></Image>:<Image
              style={styles.userProfileImage}
              source={{uri: image}}
            ></Image>
            }
            </TouchableOpacity>
            {/* { <Image  style={{width: 170 , height: 200}}/>} */}
            {!uploading ? <Button title='Upload Image' onPress={uploadImage} />: <ActivityIndicator size={'small'} color='black' />}
          </View>
          <View style={styles.EditContainer}>
            <View style={styles.NameEdit}>
              <TextInput
                style={styles.NameInput}
                value={name}
                onChangeText={(text)=>checkten(text)}
                />
                <Icon
                  name={"account-outline"}
                  style={{
                    fontSize: 24,
                    position: "absolute",
                    left: 24,
                    bottom: 24,
                  }}
                />
              </View>
                {check ? <Text style={{alignSelf:'flex-end',right:20,color:'red',fontWeight:'bold',bottom:5}}>Cannot be left blank</Text>:<Text></Text>}
              <View style={styles.BirthEdit}>
                <TextInput
                  style={styles.BirthInput}
                  onChangeText={setBirth}
                  value={birth}
                />
                <Icon
                  name={"calendar-account"}
                  style={{
                    fontSize: 24,
                    position: "absolute",
                    left: 24,
                    bottom: 30,
                  }}
                />
              </View>
              <View style={styles.EmailEdit}>
                <TextInput
                  style={styles.EmailInput}
                  onChangeText={(text)=>handleCheckEmail(text)}
                  value={Email}
                />
                <Icon
                  name={"email-outline"}
                  style={{
                    fontSize: 24,
                    position: "absolute",
                    left: 24,
                    bottom: 24,
                  }}
                />
              </View>
              {checkValidEmail ?<Text style={{alignSelf:'flex-end',right:20,color:'red',fontWeight:'bold'}}>Wrong format email</Text>:<Text></Text>}
              <View style={styles.AddressEdit}>
                <TextInput
                  style={styles.AddressInput}
                  onChangeText={setAddress}
                  value={Address}
                />
                <Icon
                  name={"home-outline"}
                  style={{
                    fontSize: 24,
                    position: "absolute",
                    left: 24,
                    bottom: 30,
                  }}
                />
              </View>
              <View style={styles.PhoneEdit}>
                <TextInput
                  style={styles.PhoneInput}
                  onChangeText={(text)=>checkPhoneleng(text)}
                  value={Phone}
                />
                <Icon
                  name={"phone-outline"}
                  style={{
                    fontSize: 24,
                    position: "absolute",
                    left: 24,
                    bottom: 24,
                  }}
                />
              </View>
              {checkPhone ?<Text style={{alignSelf:'flex-end',right:20,color:'red',fontWeight:'bold'}}>Must be 11 digits</Text>:<Text></Text>}
               
                <Button title="Save" color="orange" onPress={update}></Button>
            </View>
          </View>
        </SafeAreaView>
      );
    };
    
    export default EditUserProfile;
    
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff",
        padding: 20,
      },
      orderBar: {
        width: "100%",
        height: 50,
        textAlign: "center",
        flexDirection: "row",
        marginTop: 60,
        paddingLeft: 10,
      },
    
      TextOrderBar: {
        fontSize: 18,
        fontWeight:'bold',
        alignSelf: "center",
        marginLeft: "40%",
        marginBottom: 18,
      },
      userProfileImageContainer: {},
      userProfileImage: {
        height: 142,
        width: 142,
        borderRadius: 75,
      },
      NameInput: {
        value: { Text },
        margin: 12,
        borderWidth: 1,
        width: 343,
        height: 48,
        marginTop: 40,
        paddingLeft: 35,
        fontSize: 14,
        fontWeight: "400",color: "#9098B1",
        borderRadius: 5,
      },
      BirthInput: {
        value: { Text },
        margin: 12,
        borderWidth: 1,
        width: 343,
        height: 48,
        marginTop: 8,
        paddingLeft: 35,
        fontSize: 14,
        fontWeight: "400",
        color: "#9098B1",
        borderRadius: 5,
      },
      EmailInput: {
        value: { Text },
        margin: 12,
        borderWidth: 1,
        width: 343,
        height: 48,
        marginTop: 8,
        paddingLeft: 35,
        fontSize: 14,
        fontWeight: "400",
        color: "#9098B1",
        borderRadius: 5,
      },
      AddressInput: {
        value: { Text },
        margin: 12,
        borderWidth: 1,
        width: 343,
        height: 48,
        marginTop: 8,
        paddingLeft: 35,
        fontSize: 14,
        fontWeight: "400",
        color: "#9098B1",
        borderRadius: 5,
      },
      PhoneInput: {
        value: { Text },
        margin: 12,
        borderWidth: 1,
        width: 343,
        height: 48,
        marginTop: 8,
        paddingLeft: 35,
        fontSize: 14,
        fontWeight: "400",
        color: "#9098B1",
        borderRadius: 5,
      },
      btn_Save: {
        height: 57,
        width: 250,
        backgroundColor: "red",
        justifyContent: "center",
        alignItems: "center",
      },
      EditContainer:{
      
      },
      BirthEdit:{
        paddingBottom:10
      },
      AddressEdit:{
        paddingBottom:10,
      },
      Icon:{
        left:10,
        top:5
      }
    });

