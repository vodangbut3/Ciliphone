import React, { useContext, useEffect, useState, useRef } from "react";
import { StyleSheet, View, Text, Image, Button, FlatList, Modal, TouchableOpacity, Animated } from "react-native";
import { UserContext } from "../../../Components/UserContext";
import { ProductContext } from "../../../Components/ProductContext";
import themeContext from "../../theme/themeContext";
const ModalPoup = ({ visibale, children, item }) => {
  const [showModal, setShowModal] = useState(visibale);
  const scaleValue = useRef(new Animated.Value(0)).current;
  const toggleModal = () => {
    if (visibale) {
      setShowModal(true);
      Animated.spring(scaleValue, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true
      }).start();
    } else {
      setShowModal(false)
    }
  }
  useEffect(() => {
    toggleModal();
  }, [visibale])
  return (<Modal transparent visible={showModal}>
    <View style={styles.modalBackground}>
      <Animated.View style={[styles.modalContainer, { transform: [{ scale: scaleValue }] }]}>{children}
      </Animated.View>
    </View>
  </Modal>)
}
const Porgess = () => {
  const [detail_pro, setDetail_pro] = useState([]);
  const { getCart2, product,Detail_cart,number1 } = useContext(ProductContext);

  const theme = useContext(themeContext)
  const [visible, setVisible] = useState(false);
  const [isShowModal, setisShowModal] = useState(false);

  const [refreshing, setRefreshing] = useState(false);
  const [data, setData] = useState([]);
  const [item2, setItem] = useState([]);

  const renderItem2 = ({ item, index }) => {
    return (
      <View style={styles.favorite_shadow}>
        <Image source={{ uri: item.product_picture }} style={{ width: 80, height: 80, borderRadius: 10, alignSelf: 'center', padding: 10 }} />
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View style={{ flexDirection: 'column', width:120, top: -60 }}>
            <Text style={{ fontWeight: '700', fontSize: 20, color: 'black', alignSelf: 'center',justifyContent:'center',top:50 }}>{item.product_name}</Text>
            <Text style={{ fontSize: 15, color: 'black', top: 20, left: 20,top:60 }}>{item.product_description}</Text>
          </View>
          <View style={{ flexDirection: 'column', top: -80, left: -17 }}>
            <View>
            </View>
          </View>
        </View>
      </View>
    )
  }
  if( Detail_cart.length ==0){
    console.log('k')
  }else{
    var thich2=Object.values(Detail_cart);
    var lay2=thich2[3].Status;
    
    // var lay2=[0,1,2,3,4]
     //console.log('object.value',thich2)
  }
  console.log('lay2',lay2)
  useEffect(() => {
    const loadData = async () => {
      const res = await getCart2("Process");
      setData(res);
      onRefresh();
    };
    loadData();
  }, [lay2]);
  const laydulieu = (item) => {
    var arr = Object.values(item);
    var cur = [];
    for (var i = 0; i < arr.length; i++) {
      for (var j = 0; j < product.length; j++) {
        if (arr[i].id_pd == product[j].Product_id) {
          cur.push({
            product_name: product[j].Product_name,
            product_picture: product[j].Product_picture,
            product_description: product[j].Description
          });
        }
      }
    }
    setItem(cur);
  }
  const renderItem = ({ item }) => {
    const { Price, Status, Innitiated_date, Quantity, cart_id, Product_id } =
      item;
    return (
      <View style={styles.itemcontainer}>
        <View style={styles.row1}>
          <Text style={styles.textItem}>{cart_id} </Text>
          <Text style={styles.textItem2}> {Innitiated_date} </Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.textItem}>{Price} </Text>
          <Text style={styles.textItem2}>Total amount:{Quantity} </Text>
        </View>
        <ModalPoup visibale={visible} item={item2}>
          <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Innitiated date:{item.Innitiated_date}:</Text>
          <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Address:</Text>
          <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Phone:</Text>
          <View style={{ width: '100%', height: 400,alignItems:'center',justifyContent:'center' }}>
            <FlatList
              data={item2}
              renderItem={renderItem2}
              keyExtractor={(item) => Math.random()}
              refreshing={refreshing}
              showsVerticalScrollIndicator={false}
              onRefresh={onRefresh}
            />
          </View>
          <TouchableOpacity onPress={() => setVisible(false)} style={{ alignSelf: 'center', position: 'absolute', top: 20,right:20}}>
            <Text style={{ fontSize: 30, fontWeight: '500',color:'white'  }}>X</Text>
          </TouchableOpacity>
        </ModalPoup>
        <View style={styles.row}>
          <View style={styles.btn_signin}>
            <Button
              title="Detail"
              color="#FF6E4E"
              onPress={() => { getDetail_pro(item.Product_id), setVisible(true), laydulieu(item.Product_id) }}
            ></Button>
          </View>

          <Text style={styles.textStatus} params={Status}></Text>
        </View>
      </View>
    );
  };
  const onRefresh = () => {
    setRefreshing(true);

    setRefreshing(false);
  };
  const getDetail_pro = async (props) => {
    var item = [];
    item = Object.values(props);
  };
  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>

      <View>
        <View>
          <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={(item) => Math.random()}
            refreshing={refreshing}
            showsVerticalScrollIndicator={false}
            onRefresh={onRefresh}
          />
        </View>
      </View>
    </View>
  );


}


export default Porgess;
const styles = StyleSheet.create({
  tab_View: {
    width: "100%",
    height: 50,
  },
  container: {
    width: "100%",
    padding: 20,
    height: '100%'
  },
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 8,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: "90%",
    height: 200,
  },
  cancle: {
    borderBottomColor: "black",
    borderBottomWidth: 1,
    marginTop: 8,
  },
  textStatus: {
    fontSize: 15,
    color: "green",
    marginTop: 15,
    marginLeft: "40%",
  },
  btn_signin: {
    width: 100,
    height: 50,
    borderRadius: 5,
    marginTop: 10,
  },
  textItem: {
    fontSize: 15,
    color: "#9098B1",
  },
  textItem2: {
    fontSize: 15,
    color: "#9098B1",
    marginLeft: "50%",
  },
  row1: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderColor: "gray",
  },
  row: {
    flexDirection: "row",
    marginTop: 10,
  },
  itemcontainer: {
    flexDirection: "column",
    marginVertical: 24,
    paddingHorizontal: 24,
    flexGrow: 1,
    color: "white",
    marginTop: 10,
  },
  modalBackground: {
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1
  },
  modalContainer: {
    width: '95%',
    height: '80%',
    backgroundColor: 'rgb(180, 180, 180)',
    paddingHorizontal: 20,
    paddingVertical: 30,
    borderRadius: 20,
  },
  favorite_shadow: {
    flexDirection: 'row',
    width: 300,
    height: 110,
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


})