import React, { useState, useEffect, createContext, useContext } from "react";
import { getDatabase, ref, set, push, onValue,remove } from "firebase/database";
import { UserContext } from "./UserContext";
// import { getFavorite } from './ProductService';
export const ProductContext = createContext();

export const ProductContextProvider = (props) => {
  const { children } = props;
  const { user_id,number,so,setso } = useContext(UserContext);
  const [Cart, setCart] = useState([]);
  const [Detail_cart, setDetail_cart] = useState([]);
  const [Detail_cart2, setDetail_cart2] = useState([]);
  const [CartID, setCartID] = useState("");
  const [dt_id,setdt_id]=useState('');
  const [product, setProduct] = useState([]);
  const [banner,setBanner]=useState([]);
  const[quantity,setQuantity2]=useState(0);
  // const [fva,setFva]=useState([]);
  const [number1,setNumber]=useState(0);
  const [dt_cart,setdt_cart]=useState([]);
  // const lay_detailCart=()=>{  
  //   var i=[];
  //   var a="c" +number1-1
  //   for(var i=0;i<thich2.length;i++){
  //     if(a==thich2[i].cart_id && thich2[i].Status =="false"){
  //       return i.push() Object.values(thich2[i].Product_id)
  //     }
  //   }
  // }
 

  if( Detail_cart2.length ==0){
    console.log('k')
  }else{
    var thich2=Object.values(Detail_cart2);
    var lay2=Object.values(thich2[number1-1].Product_id);
    
    // var lay2=[0,1,2,3,4]
     //console.log('object.value',thich2)
  }
  useEffect(() => {
    loaddataDetail_cart();  
    //  lay_detailCart();
    loaddataProdcut();
    cartget();
    showDetailCart();
    setNumber(so);
    loaddataBanner();
  }, [ number ==0 || Detail_cart2.length ==0 ?  null:lay2.length,number,number1,so]);
  //[favorite2.length ==0 || number ==0  ?null:lay.length,number,number1,] 

  
  


  const loaddataProdcut=()=>{
    onValue(ref(getDatabase(), "Products/"), (snapshot) => {
      setProduct(Object.values(snapshot.val()));
    });
  }
  const loaddataBanner=()=>{
    onValue(ref(getDatabase(), "Banner/"), (snapshot) => {
      setBanner(Object.values(snapshot.val()));
    });
  }
  const loaddataDetail_cart=()=>{
    onValue(ref(getDatabase(), "Detail_cart/"), (snapshot) => {
      setDetail_cart(Object.values(snapshot.val()));
      setDetail_cart2(snapshot.val());

    });
  }
  const cartget=async()=>{
    await onValue(ref(getDatabase(), "Cart/"), (snapshot) => {
      setCart(Object.values(snapshot.val()));

    });
  }
  // const fva1=async()=>{
  //   await onValue(ref(getDatabase(), "Favorite/"), (snapshot) => {
  //     setFavorite(Object.values(snapshot.val()));
  //     setFavorite2(snapshot.val());
  //   });
  // }
  const getCart2 = async (status) => {
    await cartget();
    var item = [];
    try {
      for (var i = 1; i <= Cart.length; i++) {
        if (user_id == Cart[i - 1].User_id) {
          setCartID(Cart[i - 1].Cart_id);
          break;
        }
      }
      for (var i = 1; i <= Detail_cart.length; i++) {
        if (CartID == Detail_cart[i - 1].cart_id && Detail_cart[i-1].Status ==status) {
          item.push({
            Product_id: Detail_cart[i - 1].Product_id,
            Innitiated_date: Detail_cart[i - 1].Innitiated_date,
            cart_id: Detail_cart[i - 1].cart_id,
            Price: Detail_cart[i - 1].Price,
            Quantity: Detail_cart[i - 1].Quantity,
            Status: Detail_cart[i - 1].Status,
            dt_id: Detail_cart[i - 1].dt_id,
          });
          
        }
      }
      return item;
    } catch (error) {
      console.log("onGeetProductForHomePage error", error);
    }
  };
  const getCart = async () => {
    await cartget();
    var item = [];
    try {
      for (var i = 1; i <= Cart.length; i++) {
        if (user_id == Cart[i - 1].User_id) {
          setCartID(Cart[i - 1].Cart_id);
          break;
        }
      }
      for (var i = 1; i <= Detail_cart.length; i++) {
        if (CartID == Detail_cart[i - 1].cart_id ) {
          item.push({
            Product_id: Detail_cart[i - 1].Product_id,
            Innitiated_date: Detail_cart[i - 1].Innitiated_date,
            cart_id: Detail_cart[i - 1].cart_id,
            Price: Detail_cart[i - 1].Price,
            Quantity: Detail_cart[i - 1].Quantity,
            Status: Detail_cart[i - 1].Status,
            dt_id: Detail_cart[i - 1].dt_id,
          });
          
        }
      }
      return item;
    } catch (error) {
      console.log("onGeetProductForHomePage error", error);
    }
  };
  const showDetailCart=async()=>{
    const res= await getCart();
    var item=[];
    for(var i=1;i<=res.length;i++){
      if(res[i-1].Status == 'false'){
        item=[res[i-1]];
        break;
      }
    }
  var newitem=[]
  var item2=[];
  item2=Object.values(item[0].Product_id)
  for(var i=1;i<=item2.length;i++){
    for(var j=1;j<=product.length;j++){
      if(product[j-1].Product_id == item2[i-1].id_pd ){
        newitem.push({Product_name:product[j-1].Product_name,price:item2[i-1].price,quantity:item2[i-1].Quantity,Product_picture:product[j-1].Product_picture,mainPrice:product[j-1].price,
        Product_id:product[j-1].Product_id,Category_id:product[j-1].Category,Description:product[j-1].Description,Import_Date:product[j-1].Import_Date,Sale:product[j-1].Sale,MainQuantity:product[j-1].Quantity
        })
        }else{ 
        }
      }
    }
    setdt_cart(newitem);
    return newitem;
 }
const lao=async()=>{
  const res= await getCart();
  var item=[];
   for(var i=1;i<=res.length;i++){
    if(res[i-1].Status == "false"){
      item=[res[i-1]];
      break;
    }
  }
  return item;
} 
  const getDetailCart=async(quantity,id_pd,price)=>{
const item=await lao();    
    var dt_id=item[0].dt_id+'/Product_id/'+id_pd;
    setdt_id(item[0].dt_id);
    set(ref(getDatabase(),'Detail_cart/'+dt_id),{
      Quantity:quantity,
      id_pd:id_pd,
      price:price
    })
    return item;
  }

  
  const getProductDetailCart = async (products) => {
    var item = [];
    for (var i = 1; i <= products.length; i++) {
      for (var j = 1; j <= product.length; j++) {
        if (products[i - 1].id_pd == product[j - 1].Product_id) {
          item.push(product[j - 1]);
        }
      }
    }
    return item;
    //get detail cart id , then get product id
  };

  const getProductBycate = async (cate_id) => {
    var item = [];
    for (var i = 1; i <= product.length; i++) {
      if (cate_id == product[i - 1].Category_id) {
        item.push(product[i - 1]);
      }
    }

    return item;
  };
  const getProductname = async (name) => {
    var item = [];
    for (var i = 1; i <= product.length; i++) {
      var ten=product[i - 1].Product_name;
      ten.toLowerCase;
      if (ten.includes(name)) {
        item.push(product[i - 1]);
      }
    }
    showDetailCart();
    return item;
  };
  const removeproduct =async (product_id) => {
    var a='dt'+number1+'/Product_id/'+product_id
    await remove(ref(getDatabase(), "Detail_cart/"+a), {});
    onValue(ref(getDatabase(), "Detail_cart/"), (snapshot) => {
      setCart(Object.values(snapshot.val()));
    });
    return true;
  };
  return (
    <ProductContext.Provider
      value={{
        getCart,
        user_id,
        getProductBycate,
        getProductDetailCart,getDetailCart,showDetailCart,dt_id,Detail_cart,getProductname,product,setDetail_cart2,dt_cart,getCart2,number1,setdt_cart,Detail_cart2,removeproduct,banner,setQuantity2
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};