import {useState, useEffect} from "react"
import { StyleSheet, View, Text, ScrollView, SafeAreaView, Pressable } from "react-native";
import { Image } from "expo-image";
import { FontSize, Color, Border } from "../GlobalStyle"
import Toast from "react-native-toast-message";
import Header from "../components/Header";
import Constants from 'expo-constants';
import { FontAwesome } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../reducers/users";


const ProductDetails = ({route, navigation}) => {
  const user = useSelector((state) => state.user.value)
  // console.log(user);
  const {product_id, urlImage}= route.params  
  const [productData, setProductData]= useState([]);
  const dispatch= useDispatch();
  
  useEffect(() =>{
    (async()=>{
        let expoAddress="";
        try {
          if (Constants.expoConfig.hostUri) {
              const regex = /^([\d.]+)(?::(\d+))?$/;
              const match = Constants.expoConfig.hostUri.match(regex);

              if (match) {
                  expoAddress = match[1];
              }
          }
        } catch (error) {
          console.error('Error fetching Expo development URL:', error);
        }
        const response= await fetch(`http://${expoAddress}:3000/products/getByUrl`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            urlImage
          })
        });  
        const data= await response.json();
        // console.log('daaaaaata',data)
        if (data.result){
          setProductData(data.produits);                
        }

    })();
    
  },[]);

  const productImageUri = productData.length > 0 ? productData[0].info.productImage : null;
  const productName = productData.length > 0 ? productData[0].name : null;
  const productDesc = productData.length > 0 ? productData[0].info.description : null;

  const storeListing = productData.sort((a,b)=>{
    return parseFloat(a.info.price.replace(/[€,]/g, '')) - parseFloat(b.info.price.replace(/[€,]/g, ''))
  }).map((data, i) => {
    let priceDisplay= data.info.price.includes('€')? data.info.price: data.info.price+'€';
      return (
        <View style={styles.cell} key={i}>    
            <View style={styles.storeListingRow}>
                <Image
                    style={styles.logoView}
                    contentFit="contain"                          
                    source={{uri: data.info.store.logoUrl}}
                />
                <View style={styles.contentText}>
                  <Text style={{fontSize: FontSize.size_xl}} >{data.info.store.name}</Text>
                  <Text>{priceDisplay}</Text>
                </View>
            </View>
        </View>
      );
    });
  return (
    <SafeAreaView style={styles.container}>
        <Header/>                
        <View style={styles.rowContainer}>
            <View style={styles.cell}>
                <Pressable style= {styles.favorite}>
                    <FontAwesome name="heart" size={32} color="#f7cc79" />
                </Pressable>
                <View style={styles.pressableBox}>
                <Image
                    style={styles.fullView}
                    contentFit="cover"
                    source={{uri: productImageUri}}
                />
                </View>                    
            </View>
            <View style={[styles.contentText, styles.cell]}>
                <Text style={{fontSize: FontSize.size_lg}}>{productName}</Text>
                <Text>{productDesc}</Text>
                <View style={{display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center"}}>
                  <Pressable
                  onPress={()=>{
                    // console.log("sending data to store", data)
                    dispatch(addToCart({productName: productName, productDesc: productDesc, productImage: productImageUri, quantity: 1}))
                    // console.log({productName: productName, productDesc: productDesc, productImage: productImageUri, quantity: 1});
                    Toast.show({
                      type: 'success',
                      text2: 'Product added successfully',
                      visibilityTime: 2000,
                      autoHide: true
                    });
                  }}
                  >
                    <Image
                      style={styles.cart}
                      contentFit="cover"
                      source={require("../assets/addCart.png")}
                    />
                  </Pressable>
                </View>
            </View>
        </View>
        <ScrollView style={styles.scroll}>
            {storeListing}
        </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  pressableBox: {
    height: 175,
    backgroundColor: Color.royalblue,
    borderRadius: Border.br_xl,
    overflow: "hidden",
  },
  rowContainer: {
    flexDirection: "row",
    marginTop: "2%",
  },
  cell: {
    margin: "3%",    
  },
  contentText:{
    width: "50%",
    alignItems : 'flex-start'    
  },
  favorite: {
    position: "absolute",    
    zIndex: 1
    },
  fullView: {
      width: 100,
      height: 180      
  },
  logoView:{
    width: '30%',
    height:'70%'
  },
  storeListingRow: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "nowrap",
  },
  scroll : {
    marginBottom : '20%'
  },
  cart : {
    width : 32,
    height : 32,
    marginTop : "80%"
  },
});

export default ProductDetails;
