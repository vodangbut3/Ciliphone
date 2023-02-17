
import React, { useContext, useEffect, useRef, useState } from "react";
import { StyleSheet, View, Text, FlatList, Image, TouchableOpacity, Pressable, Animated, ToastAndroid } from "react-native";
import { ProductContext } from "../../Components/ProductContext";
import { getDatabase, ref, set, push, onValue } from "firebase/database";
import { UserContext } from "../../Components/UserContext";
import themeContext from "../theme/themeContext";
export const Cart = () => {
  const theme=useContext(themeContext);
    var fadeAnim = useRef(new Animated.Value(1)).current;
    const [data, setData] = useState([]);
    const [quantity, setQuantity] = useState(1);
    const { showDetailCart, dt_id, Detail_cart2, dt_cart, Detail_cart, setQuantity2, setdt_cart,removeproduct } = useContext(ProductContext)
    const { number, dt,initiatedDay } = useContext(UserContext)
    const [data2, setData2] = useState([]);
    const [refreshing, setRefreshing] = useState(false);
    const [isSelected, setSelection] = useState(false);
    const [priceTong, setpriceTong] = useState(0);
    const [q, setq] = useState(0);
    var priceTong2 = 0;
    var quantityTong = 0;
    const show = async () => {
        setData(await showDetailCart());
    }
    useEffect(() => {
        show();
        data2.push({ Quantity: 100, price: -1, id_pd: 0 })
    }, []);
    const onRefresh = () => {
        setRefreshing(true);

        setRefreshing(false);
    };

    const downItem = (item, a, b, c, d, f) => {
        var check = -1;
        var v = 0;
        for (var i = 1; i <= data2.length; i++) {
            if (i - 1 == 0) {
                continue;
            } else {
                if (c == data2[i - 1].id_pd) {
                    if (f == "-") {
                        if (data2[i - 1].Quantity - 1 == 0) {
                            ToastAndroid.show("Quantity cannot lower one", ToastAndroid.SHORT);
                        } else {
                            dt_cart.map(e => {
                                if (item.Product_id == e.Product_id) {
                                    return {
                                        ...e,
                                        quantity: e.quantity--
                                    }
                                }
                                return {
                                    ...e,
                                    quantity: e.quantity
                                }
                            })
                            data2[i - 1].price -= parseFloat(d);
                            data2[i - 1].Quantity -= 1;
                            setQuantity2(data2[i - 1].Quantity)
                            
                        }
                    } else {
                        dt_cart.map(e => {
                            if (item.Product_id == e.Product_id) {
                                return {
                                    ...e,
                                    quantity: e.quantity++
                                }
                            }
                            return {
                                ...e,
                                quantity: e.quantity
                            }
                        })
                        data2[i - 1].price =parseFloat(d) *data2[i - 1].Quantity
                        data2[i - 1].price += parseFloat(d);
                        data2[i - 1].Quantity += 1;
                        setQuantity2(data2[i - 1].Quantity)

                    }
                    break;
                } else {
                    check = -1;
                }
            }

        }
        for (var i = 1; i <= data2.length; i++) {
            if (i - 1 == 0) {
                continue;
            } else {
                v += data2[i - 1].price
                quantityTong += data2[i - 1].Quantity;
                setq(quantityTong)
            }
        }
        priceTong2 = v;
        setpriceTong(v);
    }
    const saveCart = () => {
        var b = dt_id;
        set(ref(getDatabase(), 'Detail_cart/' + b), {
            Status: 'false',
            Innitiated_date: '20/02/2002',
            Price: 200,
            Quantity: 2,
            cart_id: 'c' + number,
            dt_id: dt_id
        })
        for (var i = 1; i <= data2.length; i++) {
            var a = dt_id + '/Product_id/' + data2[i - 1].id_pd;
            set(ref(getDatabase(), 'Detail_cart/' + a), {
                Quantity: data2[i - 1].Quantity,
                id_pd: data2[i - 1].id_pd,
                price: data2[i - 1].price
            })
        }
        setData([]);
        onRefresh();
    }
    const vonglap = () => {
        for (var i = 2; i <= data2.length + 1; i++) {
            var a = "dt" + (parseFloat(Detail_cart.length) + 1) + '/Product_id/' + data2[i - 1].id_pd;
            set(ref(getDatabase(), 'Detail_cart/' + a), {
                Quantity: data2[i - 1].Quantity,
                id_pd: data2[i - 1].id_pd,
                price: data2[i - 1].price
            });                                                                                             
        }
        setData2([]);
    }
    const settproduct=()=>{
        console.log('>>>>>>>>>>>>>',data2);
        for(var j=0;j<data2.length;j++){
            for(var i=0;i<dt_cart.length;i++){
                if(data2[j].id_pd==dt_cart[i].Product_id){
                    set(ref(getDatabase(), "Products/" + data2[j].id_pd), {
                        Category_id: dt_cart[i].Category_id,
                        Description: dt_cart[i].Description,
                        Import_Date: dt_cart[i].Import_Date,
                        Product_id: data2[j].id_pd,
                        Product_name: dt_cart[i].Product_name,
                        Product_picture:dt_cart[i].Product_picture,
                        Quantity: parseInt(dt_cart[i].MainQuantity)-data2[j].Quantity,
                        Sale: dt_cart[i].Sale,
                        price: dt_cart[i].mainPrice,
                      });
                }
            }

        }
    }
    const addCart = async () => {
        setpriceTong(0)
        var b = dt;
        set(ref(getDatabase(), 'Detail_cart/' + b), {
            Innitiated_date: initiatedDay,
            Price: 0,
            Product_id: { a: 'a' },
            Quantity: 0,
            Status: 'false',
            cart_id: 'c' + number,
            dt_id: dt
        })
        var z = 'dt' + (parseFloat(Detail_cart.length) + 1)
        set(ref(getDatabase(), 'Detail_cart/' + z), {
            Status: 'Process',
            Innitiated_date: initiatedDay,
            Price: priceTong,
            Quantity: q,
            dt_id: z,
            cart_id: 'c' + number,
        });
        // settproduct();
        vonglap();
        onRefresh();
    }
    const xoa = async (product_id) => {
        const res = await removeproduct(product_id)
        if (res == true) {
            ToastAndroid.show('Deleted success', ToastAndroid.SHORT);
        }
    }
    const itemrender = ({ item, index }) => {
        const addItem = (a, b, c, d, e) => {
            var check = -1;
            var v = priceTong;
            if(dt_cart[0].id_pd ==-2){
                setData2([]);
                data2.push({ Quantity: 100, price: -100, id_pd: 0 })
            }
            for (var i = 1; i <= data2.length; i++) {
                if (i - 1 == 0) {
                    continue;
                } else if (c == data2[i - 1].id_pd) {
                    
                    check = i - 1;
                    break;
                } else {
                    check = -1;
                }
            }
            if (check == -1 && e == true) {
                data2.push({
                    Quantity: a,
                    price: parseFloat(b),
                    id_pd: c
                });
                v += parseFloat(b) * a;
                setpriceTong(v)
            } else {
                v -= parseFloat(b) * data2[check].Quantity;
                 setpriceTong(v)
                data2.splice(check, 1)
            }
        }
        const onvalueChange = async (item, index, a, b, c, d) => {
            const newData = dt_cart.map(e => {
                if (item.Product_id == e.Product_id) {
                    return {
                        ...e,
                        selected: !e.selected
                    }
                }
                return {
                    ...e,
                    selected: e.selected
                }
            })
            setdt_cart(newData);
            addItem(a, b, c, d, newData[index].selected)
        }
        return (
            <View style={{ flexDirection: 'row', alignItems: 'center', height: 200, width: 330, backgroundColor: "white", borderWidth: 1, borderColor: 'white', marginBottom: 10, shadowColor: "#000", opacity: item.selected ? 1 : 0.5, padding: 10, border: 10 }}>
                <View>
                    <Pressable >
                        <Image source={{ uri: item.Product_picture }} style={{ width: 120, height: 140 }} />
                    </Pressable>
                </View>
                <View style={{ left: 30 }}>
                    <View>
                        <Text style={{ fontWeight: '500', fontSize: 15, color: 'black' }}>{item.Product_name}</Text>
                        <Text style={{ fontWeight: '500', fontSize: 15, color: 'black' }}>${item.mainPrice}</Text>
                    </View>
                    <TouchableOpacity onPress={() => xoa(item.Product_id)}>
                        <Image source={require('../../assets/delete.png')} style={{ width: 25, height: 25, left: 50, top: -35,alignSelf:'flex-end' }} />
                        </TouchableOpacity>
                    <TouchableOpacity onPress={() => onvalueChange(item, index, item.quantity, item.price, item.Product_id, item.mainPrice)}>
                        <View style={{ width: 25, height: 25, alignSelf: 'flex-end', borderColor: 'red', borderWidth: 2, borderRadius: 5, left: 50, top: -25 }}>
                            {
                                item.selected ?
                                    <Image source={require('../../assets/check.png')} style={{ width: 16, height: 16 }} /> : <Image source={require('../../assets/check.png')} style={{ width: 16, height: 16, alignSelf: 'flex-end', left: 60, top: -55, display: 'none' }} />
                            }

                        </View>
                    </TouchableOpacity>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', left: -30, padding: 10, width: 100 }}>
                        <TouchableOpacity style={{ width: 30, height: 30, backgroundColor: 'red', right: -80, top: 50, borderRadius: 5, alignItems: 'center', justifyContent: 'center' }} onPress={() => downItem(item, item.quantity, item.price, item.Product_id, item.mainPrice, "-")}>
                            <View style={{ width: 10, height: 3, backgroundColor: 'white' }} />
                        </TouchableOpacity>
                        <Text style={{ right: -90, fontSize: 20, fontWeight: "600", bottom: -50 }}>{item.quantity}</Text>
                        <TouchableOpacity style={{ width: 30, height: 30, backgroundColor: 'green', right: -100, top: 50, borderRadius: 5, alignItems: 'center', justifyContent: 'center' }} onPress={() => downItem(item, item.quantity, item.price, item.Product_id, item.mainPrice, "+")}>
                            <Image source={require('../../assets/images/plus.png')} style={{ width: 12, height: 12, }} />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }
    return (
        <View style={[styles.container,{backgroundColor:theme.background}]}>
            <Text style={{ alignSelf: 'center', fontSize: 25, fontWeight: '700', alignSelf: 'flex-start', color: 'orange' }}>Cart</Text>
            <FlatList
                data={dt_cart}
                refreshing={refreshing}
                onRefresh={onRefresh}
                keyExtractor={item => `key-${item.Product_id}`}
                renderItem={itemrender}
            />
            <View>
                <TouchableOpacity style={styles.btnAddtoCart} onPress={addCart}>
                    <Text style={styles.btnATC_text}>Buy</Text>
                    <Text style={styles.btnATC_text}>${priceTong}</Text>
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
        backgroundColor: '#f6f6f4',
        padding: 30,
        shadowColor: "#000",
    },
    btnAddtoCart: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: 300,
        height: 54,
        backgroundColor: '#FF6E4E',
        borderRadius: 10,
        marginHorizontal: 20,
        bottom: 5
    },
    btnATC_text: {
        fontSize: 20,
        fontWeight: '700',
        color: '#FFFFFF',
        margin: 10
    },
})