import React from 'react';
import { Text, StyleSheet,View,FlatList,TouchableOpacity} from "react-native";



const data = [
    {
        text:'kfjdlskfjlksjdl'
    },
    {
        text:'kfjdlskfjlksjdl'
    },
    {
        text:'kfjdlskfjlksjdl'
    },
]
function Shops(props){

    return(
    <View style={styles.container}>
        <Text style={{fontWeight:"700",fontSize:20,}}>Chain store Address:</Text>
        <FlatList
                    data={data}
                    vertical
                    renderItem={({ item, index }) =>
                    (
                        <View style={{ margin: 10, boxShadow: '0px 10px 20px rgba(55, 78, 136, 0.16)', borderRadius: 18 }}>
                            <Text style={{fontWeight:'500',fontSize:15,color:'gray'}}>{item.text}</Text>
                        </View>
                    )}
                />
                
    </View>
    );
}

export default Shops;

const styles = StyleSheet.create({
 container:{
    padding:15,
    backgroundColor:'white',
    width:'100%',
    height:'100%'
 },
 
})