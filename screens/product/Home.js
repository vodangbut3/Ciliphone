import React, { useState, useEffect, useContext, } from "react";
import { StyleSheet, Text, View, Image, TextInput, FlatList, Dimensions, Pressable, ScrollView, SafeAreaView ,Button} from "react-native";
import { getDatabase, ref, onValue, onChildAdded } from "firebase/database";
import { UserContext } from "../../Components/UserContext";
import { ProductContext, } from "../../Components/ProductContext";
import themeContext from "../theme/themeContext";
import Pages from "./Pages";
export const Home = ({ navigation }) => {
  const theme=useContext(themeContext);
  const numColumns = 2;
  const [data2, setData2] = useState([]);
  const [name, setName] = useState('');
  const [selected, setSelected] = React.useState(new Map());
  const onSelect = React.useCallback(
    id => {
      const newSelected = new Map(selected);
      newSelected.set(id, !selected.get(id));

      setSelected(newSelected);
    },
    [selected],
  );
  const [Category, setCategory] = useState([]);
  const { getProductBycate, getProductname,banner } = useContext(ProductContext);
  const { addFavorite } = useContext(UserContext);

  const [refreshing, setRefreshing] = useState(false);
  const [data, setData] = useState([]);
  const [currentPage,setcurrentPage]=useState(1)
  const [postperPage,setpostoerPage]=useState(2)
  useEffect(() => {
    onValue(ref(getDatabase(), "Products/"), (snapshot) => {
      setData(Object.values(snapshot.val()));
      setData2(Object.values(snapshot.val()));
    });
    onValue(ref(getDatabase(), "Category/"), (snapshot) => {
      setCategory(Object.values(snapshot.val()));
    });

  }, []);
  const getProductByCategory = async (cate_id) => {
    setData2([]);
    if (cate_id == 0) {
      setData2(data);
    } else {
      const res = await getProductBycate(cate_id);
      setData2(res);
    }
    onRefresh();
  };
  const getProductByName = async () => {
    setData2([]);
    name.toLowerCase;
    console.log(name);
    if (name == null) {
      setData2(data);
    } else {
      const res = await getProductname(name);
      setData2(res);
    }
    onRefresh();
  };
  const addFavo = async (pd) => {
    addFavorite(pd);
  };
  const bannerdata = [
    { image: require("../../assets/images/banner1.png") },
    { image: require("../../assets/images/banner1.png") },
    { image: require("../../assets/images/banner1.png") },
  ]
  const renderItem = ({ item }) => {
    const { Product_name, price, Product_id, data, Sale, Product_picture } = item;
    return (
      <View style={styles.itemcontainer}>
         <View style={styles.imageItem}>
          <Pressable onPress={() => navigation.navigate('Detailsproduct', { id: Product_id, data: item })}>
            <Image
              resizeMode="cover"
              style={{ width: 127, height: 125 }}
              source={{
                uri: item.Product_picture
              }}
            />
            {
              item.Sale == 0 ? null : <View><Image source={require('../../assets/sale.png')} style={{ width: 50, height: 50, top: -126, left: -18, transform: [{ rotateZ: '-145deg' }] }}></Image><Text style={styles.sale}>{item.Sale}%</Text></View>
            }
          </Pressable>
        </View>
         <View style={{ flexDirection: "row", left: -8 }}>
          <View style={{ flexDirection: "column", left: 8, top: -25 }}>
            <Text style={{ fontWeight: "700", fontSize: 16, color: "#010035" }}>
              ${price}{" "}
            </Text>
            <Text
              style={{
                width: 100,
                fontWeight: "400",
                fontSize: 13,
                color: "#010035",
              }}
            >
              {Product_name}{" "}
            </Text>
          </View>
          <View style={{ flexDirection: "column", left: -8, top: -25 }}>
            <Pressable onPress={() => addFavo(Product_id)}>
              <Image
                resizeMode="cover"
                style={{ width: 20, height: 20 }}
                source={require("../../assets/lover.png")}
              />
            </Pressable>
          </View>
        </View> 
      </View>
    );
  };
  const renderItem2 = ({ item }) => {
    if (item == null) {
      return <Text>Nothing</Text>;
    } else {
      const { Category_image, Category_name, Category_id } = item;
      return (
        <Pressable onPress={() => getProductByCategory(Category_id)}>
          <View style={styles.Category}>
            <View style={styles.CategoryImage}>
              <Image
                style={styles.Imagecon}
                resizeMode="cover"
                source={{ uri: Category_image }}
              />
            </View>
            <Text>{Category_name}</Text>
          </View>
        </Pressable>
      );
    }
  };
  const onreach=()=>{
    alert('dfjslkdfjs')
  }
  const onRefresh = () => {
    setRefreshing(true);

    setRefreshing(false);
  };
  const lastpostIndex=currentPage*postperPage;
  const firstPostIndex=lastpostIndex-postperPage;
  const currentPost= data2.slice(firstPostIndex,lastpostIndex)
  return (
    <View style={[styles.container,{backgroundColor:theme.background}]}>
      <View style={styles.rowTitle}>
        <Text style={styles.textTitle}>Select Category</Text>
        <View style={styles.IconContainer}>
          <Image
            style={styles.Icon}
            resizeMode="cover"
            source={require("../../assets/images/shopping_bag.png")}
          />
          <Image
            style={styles.Icon}
            resizeMode="cover"
            source={require("../../assets/images/bellVector.png")}
          />
        </View>
      </View>
      <View style={{ flexDirection: 'row' }}>
        <TextInput style={{ width: 300, height: 30, backgroundColor: 'white', top: 10, borderRadius: 20, shadowColor: "#000", shadowOffset: { width: 0, height: 6, }, shadowOpacity: 0.39, shadowRadius: 8.30, elevation: 13, paddingLeft: 10, }} value={name} onChangeText={setName} placeholder="Tim san pham o day" />
        <Pressable onPress={getProductByName}>
          <Image source={require('../../assets/images/search.png')} style={{ width: 25, height: 25, top: 13, left: 15 }} />
        </Pressable>
      </View>
      <View style={styles.IconCategory}>
          <FlatList
            data={Category}
            renderItem={renderItem2}
            horizontal
            keyExtractor={(item) => Math.random()}
            refreshing={refreshing}
          />
        </View> 
    
        <View style={styles.banner}>
          <FlatList
            data={banner}
            horizontal
            showsHorizontalScrollIndicator
            pagingEnabled
            bounces={false}
            renderItem={({ item, index }) => (
              <Image
                resizeMode="cover"
                source={{uri:item.banner_image}}
                style={{width:370,height:200,borderRadius:20}}
              ></Image>
            )}
          />
        </View>
      <View style={{height:335}}>
        <FlatList
        data={currentPost}
        renderItem={renderItem}
        keyExtractor={(item) => Math.random()}
        refreshing={refreshing}
        numColumns={numColumns}
        onRefresh={onRefresh}
        />
         <Pages totalPost={data2.length} postPerPage={postperPage} setCurrentPage={setcurrentPage}/> 
      </View>
    </View>
 );
}
export default Home
const styles = StyleSheet.create({
  Category: {
    alignItems: "center",
    flexDirection: "column",
    marginLeft: 30,
    justifyContent: "center",
    width: 50,
    height: 100,
  },
  CategoryImage: {
    width: 50,
    height: 50,
    borderRadius: 20,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  Imagecon: {
    width: 20,
    height: 30,
  },
  rowTitle: {
    width: "100%",
    heigh: 40,
    flexDirection: "row",
  },
  itemcontainer: {
    flexDirection: "column",
    backgroundColor: 'white',
    borderColor: 'white',
    flexGrow: 1,
    borderWidth: 1,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.30,
    shadowRadius: 4.65,
    elevation: 8,
    margin: 10,
    marginTop: 20,
    alignItems: "center",
  },

  banner: {
    width: 370,
    height: 140,
    alignItems: "center",
    justifyContent: "center",
    left: -12,
  },
  imageItem: {
    width: 150,
    height: 160,
    alignItems: "center",
  },
  textInput: {
    width: "90%",
    height: 40,
    borderColor: "cyan",
    borderRadius: 30,
    borderWidth: 1,
  },
  searchIcon: {
    width: 24,
    height: 24,
    left: 20,
  },
  iconContainer: {
    position: "absolute",
    right: 48,
    top: 8,
  },
  searchrow: {
    flexDirection: "row",

    width: "100%",
    height: 50,
    paddingHorizontal: 40,
    position: "relative",
  },
  Category: {
    alignItems: "center",
    flexDirection: "column",
    marginLeft: 30,
    justifyContent: "center",
    width: 50,
    height: 70,
  },
  CategoryImage: {
    width: 50,
    height: 50,
    borderRadius: 20,
    borderColor: "grey",
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  Imagecon: {
    width: 20,
    height: 30,
  },
  IconCategory: {
    marginTop: 20,
    flexDirection: "row",
    width: "100%",
    height: 100,
  },
  textTitle: {
    fontSize: 20,
    color: "red",
  },
  Icon: {
    width: 32,
    height: 30,
    marginLeft: 20,
  },
  IconContainer: {
    width: 80,
    height: 33,
    alignItems: "flex-end",
    marginLeft: 100,
    flexDirection: "row",
  },
  container: {
    flexGrow: 1,
    backgroundColor: "#f6f6f4",
    padding: 24,
    marginTop: 50,
  },
  sale: {
    position: 'absolute',
    left: -11,
    fontSize: 18,
    top: -115
  }
})