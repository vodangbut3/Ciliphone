import {TouchableOpacity, Image,SafeAreaView,StyleSheet,Text,View,Pressable,Switch} from "react-native";
import { EventRegister } from 'react-native-event-listeners';
import { UserContext } from "../../Components/UserContext";
import React, { useContext, useState, useEffect } from "react";
import themeContext from "../theme/themeContext";
const Profile = ({ navigation }) => {
  const [data, setData] = useState([]);
  const { user_id, user_money, user_image, user_name, getUser,setisLoggedIn } =useContext(UserContext);
  const theme=useContext(themeContext);
  console.log(theme.background)
  useEffect(() => {
    
  }, []);
  const logout=()=>{
    setisLoggedIn(false)
  }
  const [isdark,setisdark]=useState(false);
  return(
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
          <View style={[styles.container,{backgroundColor:theme.background}]}>
            <View style={styles.user}>
             <Pressable onPress={() => navigation.navigate("EditUserProfile",user_image)}>
                 <Image
                  style={{ width: 142, height: 142, borderRadius: 75 }}
                  resizeMode="cover"
                  source={{
                    uri: user_image,
                  }}
                ></Image>
              </Pressable>
              <View style={styles.userInfo}>
                <View>
                  <Text style={styles.userName}>{user_name}</Text>
                </View>
                <View>
                  <Text style={styles.userMoney}>{user_money}</Text>
                </View>
                <TouchableOpacity style={styles.userRecharge}>
                  <Text style={styles.userRechargeText}>Recharge</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.funtion}>
               <View style={styles.mode}>
                {/* <Image
                  style={styles.modeIcon}
                  source={require("../../assets/dark-mode.png")}
                ></Image> */}
               <Switch value={isdark} onValueChange={(val)=>{setisdark(val);EventRegister.emit('ChangeTheme',val)}} style={{left:-5}}/>
                <View>
                  <Text style={styles.modeText}>Dark mode</Text>
                </View>
                <Image style={styles.modeSwitch}></Image>
              </View> 

              <View style={styles.notifications}>
                <Image
                  style={styles.notificationsIcon}
                  source={require("../../assets/notification.png")}
                ></Image>
                <View>
                  <Text style={styles.notificationsText}>Notifications</Text>
                </View>
                <Image style={styles.notificationsSwitch}></Image>
              </View>
              <View style={styles.favorite}>
              <Pressable onPress={()=>navigation.navigate('Favorite')}>
                <Image
                  style={styles.favoriteIcon}
                  source={require("../../assets/lover.png")}
                ></Image>
              </Pressable>
                <View>
                  <Text style={styles.favoriteText}>Favorite</Text>
                </View>
              </View>
              <View style={styles.history}>
                <Image
                  style={styles.historyIcon}
                  source={require("../../assets/history.png")}
                ></Image>
                <View>
                  <Text style={styles.historyText}>History</Text>
                </View>
              </View>
              <View style={styles.changePassword}>
                <Image
    style={styles.changePasswordIcon}
                  source={require("../../assets/passwordcopy.png")}
                ></Image>
                <View>
                  <Text style={styles.changePasswordText}>Change Password</Text>
                </View>
              </View>
                <Pressable onPress={()=>{setisLoggedIn(false)}}>
              <View style={styles.logout}>
                <Image
                  style={styles.logoutIcon}
                  source={require("../../assets/logout.png")}
                ></Image>
                <View>
                  <Text style={styles.logoutText}>Logout</Text>
                </View>
              </View>
                </Pressable>
            </View>
          </View>
        </SafeAreaView> 
  );
}
export default Profile;
const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor:'#fff',
      padding: 20,
    },
    user: {
      height: 142,
      width: "100%",
      flexDirection: "row",
      marginTop: 48,
      //backgroundColor: 'red'
    },
    userImg: {
      height: 142,
      width: 142,
      borderRadius: 75,
    },
    userInfo: {
      height: "100%",
      width: "100%",
      flexDirection: "column",
      paddingLeft: 80,
      justifyContent: "center",
    },
    userName: {
      fontSize: 24,
    },
    userMoney: {
      fontSize: 20,
      paddingBottom: 28,
      padding: 14,
    },
    userRecharge: {
      backgroundColor: "orange",
      borderRadius: 28,
      height: 47,
      width: 127,
      justifyContent: "center",
      alignItems: "center",
    },
    userRechargeText: {
      fontSize: 20,
    },
    funtion: {
      color: "#fff",
      width: "100%",
      marginTop: 31,
      //backgroundColor: 'blue'
    },
    language: {
      flexDirection: "row",
      padding: 25,
      left: -25,
    },
    languageIcon: {},
    languageText: {
      fontSize: 20,
      paddingLeft: 31,
    },
    languageSelect: {},
    mode: {
      flexDirection: "row",
      padding: 25,
      left: -25,
    },
    modeIcon: {},
    modeText: {
      fontSize: 20,
      paddingLeft: 10,
      top:10
    },
    modeSwitch: {},
    notifications: {
      flexDirection: "row",
      padding: 25,
      left: -25,
    },
    notificationsIcon: {},
    notificationsText: {
      fontSize: 20,
      paddingLeft: 31,
    },
    notificationsSwitch: {},
    favorite: {
      flexDirection: "row",
      padding: 25,
      left: -25,
    },
    favoriteIcon: {},
    favoriteText: {
      fontSize: 20,
      paddingLeft: 31,
    },
    history: {
      flexDirection: "row",
      padding: 25,
      left: -25,
    },
    historyIcon: {},
    historyText: {
      fontSize: 20,
      paddingLeft: 31,
    },
    changePassword: {
      flexDirection: "row",
      padding: 25,
      left: -25,
    },
    changePasswordIcon: {},
    changePasswordText: {
      fontSize: 20,
      paddingLeft: 31,
    },
    support: {
      flexDirection: "row",
      padding: 25,
      left: -25,
    },
  supportIcon: {},
    supportText: {
      fontSize: 20,
      paddingLeft: 31,
    },
    logout: {
      flexDirection: "row",
      padding: 25,
      left: -25,
    },
    logoutIcon: {},
    logoutText: {
      fontSize: 20,
      paddingLeft: 31,
    },
  });
  