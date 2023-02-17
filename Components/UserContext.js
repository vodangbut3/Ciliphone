import React, { useState, useEffect, createContext, } from 'react';
import { getDatabase, ref, set, push, onValue,remove } from "firebase/database";


export const UserContext = createContext();

export const UserContextProvider = ({props,children}) => {
  const [user_image, setUser_image] = useState("");
  const [user_money, setUser_money] = useState("");
  const[user_password,setuser_password]=useState('');
  const [address, setAddress] = useState("");
  const [Birth, setBirth] = useState("");
  const [email, setEmail] = useState("");
  const [Phone_number, setPhone_number] = useState("");
  const [password, setPassword] = useState("");
  const [favorite, setFavorite] = useState([]);
  const [favorite2, setFavorite2] = useState([]);
  const [product, setProduct] = useState([]);
  const [fva,setFva]=useState([]);
  const [initiatedDay,setinitiatedDay]=useState('');
  

  

  

    const [isLoggedIn, setisLoggedIn] = useState(false);
    const [number, setNumber] = useState(1);
    const [data, setData] = useState([]);
    const [rate,setrate]=useState('256');
    const [user_name,setUser_name]=useState('');
    const [user_id,setUser_id]=useState(0);
    const [user_idud,setUser_idud]=useState(0);
    const [cart_ud,setCart_ud]=useState(0);
    const [so,setso]=useState(1);
    const [dt,setDt]=useState('');
    var a =0;


    if(favorite2.length == 0 ){
      console.log('k')
    }else{
      var thich=Object.values(favorite2);
      var lay=Object.values(thich[number-1].Product_id)
      
    }
    useEffect(()=>{
        onValue(ref(getDatabase(), "User"), (snapshot) => {
            setData(Object.values(snapshot.val()));
          });
          a=data.length+1;
          setUser_idud('us'+a);
          setCart_ud('c'+a);
          fva1();
          showFavorite();
          loaddataProdcut();
        },[favorite2.length ==0 || number ==0  ?null:lay.length,number]);
    const login = async (email,password,day) => {
        setinitiatedDay(day);
        for (var i = 1; i <= data.length; i++) {
            if (email == data[i-1].Email && password == data[i-1].Password) {
              onValue(ref(getDatabase(), "Detail_cart"), (snapshot) => {
                Object.values(snapshot.val()).forEach((element) => {
                  var b="c"+i;
                 if(element.cart_id==b && element.Status =="false"){
                    setso(element.dt_id.slice(2));
                    setDt(element.dt_id)
                 }
                });
              });  
              setisLoggedIn(true);
                setUser_name(data[i-1].User_name);
                setUser_image(data[i-1].User_picture);
                setUser_money(data[i-1].Money);
                setAddress(data[i-1].Address);
                setBirth(data[i-1].Birth);
                setEmail(data[i-1].Email);
                setPhone_number(data[i-1].Phone_number);
                setPassword(data[i-1].password);
                setUser_id(data[i-1].User_id);
                setNumber(i);
                setuser_password(data[i-1].Password)
                return true;
            } else{
              console.log('that bai');
            }   
        }
}
const fva1=async()=>{
  await onValue(ref(getDatabase(), "Favorite/"), (snapshot) => {
    setFavorite(Object.values(snapshot.val()));
    setFavorite2(snapshot.val());
  });
}

const forrr=async()=>{
  var item={}
  if(favorite.length != 0){
    for (var i = 1; i <= favorite.length; i++) {
      if (favorite[i - 1].User_id == user_id) {
        item =await favorite[i - 1].Product_id;
        break;
      }
    }
  }
  return Object.values(item);
}
const loaddataProdcut=()=>{
  onValue(ref(getDatabase(), "Products/"), (snapshot) => {
    setProduct(Object.values(snapshot.val()));
  });
}
const showFavorite = async () => {
  setFavorite([]);
  await fva1();
  var item = [];
  const item2=await forrr();
  var newitem = [];
    for (var i = 1; i <= item2.length; i++) {
      for (var j = 1; j <= product.length; j++) {
        if (product[j - 1].Product_id == item2[i - 1].pd) {
          newitem.push(product[j - 1]);
        } else {
        }
      }
    }
    setFva(newitem);
    return newitem;
};
const addFavorite = async(product_id) => {
  console.log('add favorite')
  var string = "fv" + number + "/Product_id/" + product_id;
  set(ref(getDatabase(), "Favorite/" + string), {
    pd: product_id,
  });
  await onValue(ref(getDatabase(), "Favorite/"), (snapshot) => {
    setFavorite(Object.values(snapshot.val()));
  });
  //await showFavorite();
  const res=await forrr();
};
const getUser = (id) => {
    var item = [];
    for (var i = 1; i <= data.length; i++) {
      if (id == data[i - 1].User_id) {
        item.push({
          Address: data[i - 1].Address,
          Birth: data[i - 1].Birth,
          Email: data[i - 1].Email,
          Phone_number: data[i - 1].Phone_number,
          User_name: data[i - 1].User_name,
          User_picture: data[i - 1].User_picture,
        });

        break;
      }
    }
    return item;
  };
  const removeItem =async (product_id) => {
    var a='fv'+number+'/Product_id/'+product_id
    await remove(ref(getDatabase(), "Favorite/"+a), {});
    onValue(ref(getDatabase(), "Favorite/"), (snapshot) => {
      setFavorite(Object.values(snapshot.val()));
    });
  showFavorite();
    return true;
  };
  
  const UpdateUser = (name, birth, email, address, phone,avatar) => {
    set(ref(getDatabase(), "User/" + user_id), {
      Address: address,
      Birth: birth,
      Email: email,
      Money: user_money,
      Password: user_password,
      Phone_number: phone,
      User_id: user_id,
      User_name: name,
      User_picture:avatar,    
    });
    setUser_name(name);
    setBirth(birth);
    setEmail(email);
    setAddress(address);
    setPhone_number(phone);
    console.log('>>>>>>123',avatar);
    setUser_image(avatar);
    return true;
  };
  
    return (
        <UserContext.Provider
            value={{
                isLoggedIn,login,rate,setrate,user_name,data,user_idud,user_image,initiatedDay,
                user_money, getUser,address,Birth, email, Phone_number,UpdateUser,user_id,cart_ud,setisLoggedIn,number,fva1,addFavorite,showFavorite,removeItem,fva,favorite,so,dt,setso
            }}
        >
            {children}
        </UserContext.Provider>
    )

}