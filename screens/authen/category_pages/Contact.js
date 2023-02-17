import React,{useContext, useState,useEffect} from 'react';
import { Text, StyleSheet, View, Image,TouchableOpacity, TextInput,ScrollView,FlatList } from "react-native";
import { getDatabase, ref, set , push,onValue,child } from "firebase/database";
import { UserContext } from '../../../Components/UserContext';
function Contact({route}) {
    const [dataProduct,setdataProduct]=useState([]);
    useEffect(() => {
        onValue(ref(getDatabase(),'Comment'),(snapshot)=>{
            setdataProduct(Object.values(snapshot.val()));
        });
    },[]);
    const [defaultRating,setdefaultRating] =useState(2);
    const [maxRating,setmaxRating]=useState([1,2,3,4,5])
    const [comment,setComment]=useState('');
    const {rate,user_name}=useContext(UserContext);
    var today=new Date();
    var date=today.getDate()+'-'+(today.getMonth()+1)+'-'+today.getFullYear()+' '+today.getHours()+'-'+today.getMinutes();
    const startImgFilled='https://raw.githubusercontent.com/tranhonghan/images/main/star_filled.png'
    const startImgCorner='https://raw.githubusercontent.com/tranhonghan/images/main/star_corner.png'

    const CustomRatingBar= () =>{
        return(
            <View style={styles.customRatingbar}>
                {
                    maxRating.map((item,key)=>{
                        return(
                            <Image
                            key={item}
                            style={styles.starImgStyle}
                            source={
                                item <= dataProduct[0].star ?{uri :startImgFilled}
                                :{uri:startImgCorner}
                            }
                            />
                            )
                        })
                    }
            </View>
        )
    }
   
    const postCommend=() =>{
        var a=dataProduct.length+1;
        push(ref(getDatabase(),"Comment/"),{
            Comment_id:'cm'+a,
            Content:comment,
            Innitiated_date:date,
            Product_id:route.params.data.Product_id,
            User_name:user_name,
            star:rate
        });  
    }
    return (
        <View style={styles.container}>
                <FlatList
                    data={dataProduct}
                    renderItem={({item,index})=>
                    (     
                <View style={styles.comment_style}>
                <View style={{width:80,height:70}}>
                    <View style={styles.avatar_round}>
                        <Image source={require('../../../assets/images/shopping_bag.png')} sytle={[{ width: 100, height: 20 }]} />
                    </View>
                    <Text style={{ fontWeight: '600', fontSize: 15, color: 'black' }}>{item.User_name}</Text>
                </View>
                <View style={{paddingLeft:15}}>
                    <View style={{flexDirection:'row'}}>
                    <Text>Chất lượng, hài lòng</Text>
                    <View style={{paddingLeft:20}}>
                    <View style={styles.customRatingbar}>
                {
                    maxRating.map((item,key)=>{
                        return(
                            <Image
                            key={item}
                            style={styles.starImgStyle}
                            source={
                                item <= item.star ?{uri :startImgFilled}
                                :{uri:startImgCorner}
                            }
                            />
                            )
                        })
                    }
                    </View>
            </View>
                    </View>
                    
                    <Text>2022-06-20 14:12</Text>
                    <Text style={{width:290}}>{item.Content}</Text>
                </View>
            </View>
                    )}
                />
            <View style={{width:'100%',height:40,bottom:-10,flexDirection:'row'}}>
            <TextInput style={styles.comment} placeholder="Your question about the product" value={comment} onChangeText={setComment} />
            <TouchableOpacity onPress={postCommend}>
                <Image source={require('../../../assets/images/right-arrow.png')} style={{width:30,height:30,right:50,alignSelf:'center'}}/>
            </TouchableOpacity>
            
            </View>
            
        </View>

    );
}

export default Contact;

const styles = StyleSheet.create({
    container: {
        padding: 10,
        alignItems: 'center',
        justifyContent:'center',
        backgroundColor:'white',
         width:'100%',
         height:227
    },
    avatar_round: {
        width: 50,
        height: 50,
        borderRadius: 30,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center'
    },
    comment_style:{
        flexDirection:'row',
        borderBottomWidth:1,
        paddingVertical:5
        //justifyContent:'center',
    },
    starImgStyle:{
        width:20,
        height:20,
        resizeMode:'cover'
    },
    customRatingbar:{
        justifyContent: 'center',
        flexDirection:'row',
    },
    comment:{
        width:'100%',
        borderWidth:0.6,
        borderColor:'white',
        backgroundColor:'white',
        borderRadius:2
    }
})