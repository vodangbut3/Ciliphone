import React,{useContext,useEffect,useState} from "react";
import { StyleSheet,View,Text, Image,Button,FlatList,} from "react-native";
import { UserContext } from "../../../Components/UserContext";
import { ProductContext } from "../../../Components/ProductContext";
import themeContext from "../../theme/themeContext";

const Canceld=()=>{
const [detail_pro, setDetail_pro] = useState([]);
const { user_id, getCart2, getProductDetailCart } = useContext(ProductContext); 
const theme=useContext(themeContext)


const [isShowModal, setisShowModal] = useState(false);

const [refreshing, setRefreshing] = useState(false);
const [data, setData] = useState([]);

useEffect(() => {
const loadData = async () => {
  const res = await getCart2("Canceled");
  setData(res);
  onRefresh();
};
loadData();
}, []);
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
      <View style={styles.row}>
        <View style={styles.btn_signin}>
          <Button
            title="Detail"
            color="#FF6E4E"
            onPress={() => getDetail_pro(item.Product_id)}
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

  console.log(item[0] + "^^^^^^^^^^^^");
  //const res = await getProductDetailCart(item);
  // setDetail_pro(res);
  //console.log(detail_pro);
};
    return(
      <View style={[styles.container,{backgroundColor:theme.background}]}>
        
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


export default Canceld;
const styles=StyleSheet.create({
    tab_View: {
        width: "100%",
        height: 50,
      },
      container: {
        width: "100%",
        padding: 20,
        height:'100%'
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
      

})