import { StatusBar } from "expo-status-bar";
import {
  TouchableOpacity,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Pressable,
} from "react-native";
import { getDatabase, ref, set, push, onValue } from "firebase/database";
import { UserContext } from "../../Components/UserContext";
import EditUserProfile from "../user/EditUserProfile";
import { createStackNavigator } from '@react-navigation/stack';
import React, { useContext, useState, useEffect } from "react";
const Stack = createStackNavigator();
import Profile from "./Profile";
import Favorite from "./Favorite";
const ProfileStack = ({ navigation }) => {
  return (

    <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="profile" component={Profile}/>
    <Stack.Screen name="Favorite" component={Favorite}/>
    <Stack.Screen name="EditUserProfile" component={EditUserProfile}/>
  </Stack.Navigator>
  );
};

export default ProfileStack;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
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
    paddingLeft: 31,
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
