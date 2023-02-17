import React, { useContext, useState, useEffect } from "react";
import { StyleSheet, View, Text, FlatList, Image, TouchableOpacity, ToastAndroid } from "react-native";
import { getDatabase, ref, set, push, onValue } from "firebase/database";
import { ProductContext } from "../../Components/ProductContext";
import { UserContext } from "../../Components/UserContext";
import themeContext from "../theme/themeContext";
const Favorite = () => {
    const theme=useContext(themeContext);
    const [data, setData] = useState([]);
    const [refreshing, setRefreshing] = useState(false);
    const { getDetailCart,dt_cart } = useContext(ProductContext)
    const { user_id, showFavorite, fva, favorite, removeItem, addFavorite } = useContext(UserContext)

    const loadData = async () => {
        const res = await showFavorite();
        setData(res);
    };

    const onRefresh = () => {
        setRefreshing(true);

        setRefreshing(false);
    };

    useEffect(() => {
        showFavorite();
        loadData();
    }, [data.length]);

    const addtoCart = async (quantity, id_pd, price) => {
        for(var i=1;i<=dt_cart.length;i++){
            if(id_pd==dt_cart[i-1].Product_id){
                dt_cart[i-1].quantity++;
                console.log('>>Z>>',dt_cart[i-1].quantity)       
            }
        }
        await getDetailCart(quantity, id_pd, price);
        ToastAndroid.show("Add to Cart Success!", ToastAndroid.SHORT);
    }

    const xoa = async (product_id) => {
        const res = await removeItem(product_id)
        if (res == true) {
            ToastAndroid.show('Deleted success', ToastAndroid.SHORT);
            loadData();
            onRefresh();
        }
    }
    const renderItem = ({ item, index }) => {
        return (
            <View style={styles.favorite_shadow}>
                 <Image source={{ uri: item.Product_picture}} style={{ width: 170, height: 170, borderRadius: 10,alignSelf:'center',padding:10 }} />
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <View style={{ flexDirection: 'column', width: 100, top: -60 }}>
                        <Text style={{ fontWeight: '700', fontSize: 20, color: 'black', alignSelf: 'center' }}>{item.Product_name}</Text>
                        <Text style={{ fontWeight: '700', fontSize: 20, color: 'black', top: 20, left: 20 }}>${item.price}</Text>
                        </View>
                        <View style={{ flexDirection: 'column', top: -80, left: -17 }}>
                        <View>
                        <TouchableOpacity onPress={() => xoa(item.Product_id)}>
                        <Image source={require('../../assets/delete.png')} style={{ width: 25, height: 25, left: 50, top: 25 }} />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.btnAddtoCart} onPress={() => addtoCart(1, item.Product_id, item.price)}>
                        <Text style={styles.btnATC_text}>Add to Cart</Text>
                                    </TouchableOpacity>
                                </View>
                                </View>
                            </View> 
            </View>
        )
    }
    return (
        <View style={[styles.container,{backgroundColor:theme.background}]}>
            <View style={styles.header}>
                 <Text style={{ fontSize: 30, fontWeight: 'bold', left: -100, padding: 20 }}>Favorite</Text> 
            </View>
            <View  style={{width:'100%',height:'100%'}}>
            <FlatList
                data={fva}
                vertical
                onRefresh={onRefresh}
                refreshing={refreshing}
                renderItem={renderItem}
            />
            </View>
        </View>
    )
}



export default Favorite;
const styles = StyleSheet.create({
    container: {
         alignItems: 'center',
        marginTop: 30,
        backgroundColor: "#f6f6f4",
    },
    favorite_shadow: {
        flexDirection: 'row',
        left: 20,
        width: 350,
        height: 200,
        borderRadius: 20,
        borderColor: 'black',
       borderWidth: 1,
        backgroundColor: 'white',
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 10, },
        shadowOpacity: 1,
        shadowRadius: 20,
        elevation: 10,
        marginTop: 20
    },
    btnAddtoCart: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: 90,
        height: 30,
        backgroundColor: 'green',
        borderRadius: 5,
        bottom: -130
    },
    btnATC_text: {
        fontSize: 15,
        fontWeight: '700',
        color: '#FFFFFF',
    }
})