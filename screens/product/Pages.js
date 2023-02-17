import React from 'react'
import { StyleSheet, Text, View,Button,Pressable } from "react-native";

const Pages = ({totalPost,postPerPage,setCurrentPage}) => {
  let pages=[];
  for(let i=1;i<=Math.ceil(totalPost/postPerPage);i++){
    pages.push(i)
  }
    return (
        <View style={styles.container}>
            {pages.map((page,index)=>{
                return <Pressable key={index} onPress={()=>setCurrentPage(page)} style={styles.button}><Text style={{color:'black'}}>{page+''}</Text></Pressable>
            })}
        </View>
          )
}

export default Pages
const styles=StyleSheet.create({
  container:{
    flexDirection:'row',
    paddingLeft:120,
  },
  button:{
    alignItems: 'center',
    justifyContent: 'center',
    width:40,
    height:30,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: '#D3D3D3',
    margin:5,
    shadowColor: "#000",
shadowOffset: {
	width: 0,
	height: 7,
},
shadowOpacity: 0.43,
shadowRadius: 9.51,

elevation: 15,
  }
})