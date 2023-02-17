import React from "react";
import { StyleSheet, View, Text, FlatList, Image, TouchableOpacity } from "react-native";


export const Cart = () => {
    const data = [
        {
            image: 'https://firebasestorage.googleapis.com/v0/b/fa22datn.appspot.com/o/laptop.jpeg?alt=media&token=04d5fd06-74a6-469b-a13b-7394fbd136e2',
            name: 'Sam sung Galaxy',
            price: '12.00'
        },
        {
            image: 'https://firebasestorage.googleapis.com/v0/b/fa22datn.appspot.com/o/laptop.jpeg?alt=media&token=04d5fd06-74a6-469b-a13b-7394fbd136e2',
            name: 'Sam sung Galaxy',
            price: '12.00'
        },
        {
            image: 'https://firebasestorage.googleapis.com/v0/b/fa22datn.appspot.com/o/laptop.jpeg?alt=media&token=04d5fd06-74a6-469b-a13b-7394fbd136e2',
            name: 'Sam sung Galaxy',
            price: '12.00'
        },
    ]
    return (
        <View style={styles.container}>
            <FlatList
                data={data}
                renderItem={({ item, index }) => (
                    <View style={{ flexDirection: 'row', alignItems: 'center', height: 200, width: '100%' }}>
                        <View>
                            <Image source={{ uri: item.image }} style={{ width: 120, height: 140 }} />
                        </View>
                        <View style={{ left: 30 }}>
                            <View>
                            <Text style={{ fontWeight: '500', fontSize: 15, color: 'black' }}>{item.name}</Text>
                            <Text style={{ fontWeight: '500', fontSize: 15, color: 'black' }}>${item.price}</Text>                                
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', left: -30, padding: 10 }}>
                                <TouchableOpacity style={{ width: 30, height: 30, backgroundColor: 'red', right: -100, top: 60, borderRadius: 5, alignItems: 'center', justifyContent: 'center' }}>
                                    <View style={{ width: 10, height: 3, backgroundColor: 'white',bottom:-10 }} />
                                    <Text style={{left:35,fontSize:20,fontWeight:"600"}}>1</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={{ width: 30, height: 30, backgroundColor: 'green', right: -100, top: 60, borderRadius: 5, alignItems: 'center', justifyContent: 'center' }}>
                                    <Image source={require('../assets/images/plus.png')} style={{width:12,height:12 }}/>
                                </TouchableOpacity>
                            </View>
                                    
                        </View>

                    </View>
                )}
            />
            <View>
                <TouchableOpacity style={styles.btnAddtoCart}>
                    <Text style={styles.btnATC_text}>Add to Cart</Text>
                    <Text style={styles.btnATC_text}>$1,5000.00</Text>
                </TouchableOpacity>
            </View> 
        </View>
    )
}


export default Cart;
const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        backgroundColor: 'white',
        padding: 20
    },
    btnAddtoCart: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: 300,
        height: 54,
        backgroundColor: '#FF6E4E',
        borderRadius: 10,
        marginHorizontal: 40,
        bottom:5
    },
    btnATC_text: {
        fontSize: 20,
        fontWeight: '700',
        color: '#FFFFFF',
        margin: 10
    }
})