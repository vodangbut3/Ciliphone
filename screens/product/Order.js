import {
    StyleSheet,
    Text,
    View,
    Image,
    Button,
    TextInput,
    FlatList,
    Dimensions,
    useWindowDimensions,
    Pressable,
    Modal,
  } from "react-native";

  import { getDatabase, ref, onValue, onChildAdded } from "firebase/database";
  import React, {
    useState,
    useEffect,
    useContext,
    ScrollView,
    Animated,
  } from "react";

  import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
  import { NavigationContainer } from '@react-navigation/native';
  import Canceld from "./Order_page/Canceld";
  import Delevering from "./Order_page/Delevering";
  import Porgess from "./Order_page/Porgess";
  const Tap = createMaterialTopTabNavigator();

  const Order = (props) => {
  return(
  <View style={{width:'100%',height:'100%',top:40,}}>
    <View style={styles.orderBar}>
          <View style={styles.Icon}>
            <Image
              style={styles.Icon}
              resizeMode="cover"
              source={require("../../assets/images/backIcon.png")}
            />
          </View>
          <Text style={styles.TextOrderBar}> My order </Text>
        </View>
                <NavigationContainer independent={true}>
                        <Tap.Navigator style={{backgroundColor:'red'}}>
                            <Tap.Screen name='Delivered' component={Delevering} />
                            <Tap.Screen name='Process' component={Porgess}/>
                            <Tap.Screen name='Canceled' component={Canceld} />
                        </Tap.Navigator>
                    </NavigationContainer>
  </View>
  )
  };
  export default Order;
  const styles = StyleSheet.create({
    orderBar: {
      width: "100%",
      height: 50,
      textAlign: "center",
      flexDirection: "row",
      alignItems:'center',
      justifyContent: "center",
    },
    Icon:{
      right:50,
    },
    TextOrderBar: {
      fontSize: 18,
    },
  });
