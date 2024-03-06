import * as React from "react"; //Import de React et de ses dépendances 
import { Image } from "expo-image";
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import Header from "../components/Header";
import SearchBar from "../components/SearchBar";
import { FontFamily, FontSize, Color, Border } from "../GlobalStyle";
import { SafeAreaView } from "react-native-safe-area-context";
import Constants from 'expo-constants';
import { useSelector } from "react-redux";


const ArchiveProduits = ({navigation}) => {
  
  const [productData, setProductData]= React.useState([]);
  const [isloading, setIsLoading] = React.useState(true);
  const user = useSelector((state) => state.user);    
  const userAddress = (user.value && user.value.location) ? user.value.location.address : null; 
  
    React.useEffect(() =>{
      (async()=>{  
        let expoAddress="";
        try {
            if (Constants.expoConfig.hostUri) {    //Get the host URI from the config            
              
                const regex = /^([\d.]+)(?::(\d+))?$/; //Extract every string made of numbers with an optional capture of numbers after ':' ((?::(\d+))?)
                const match = Constants.expoConfig.hostUri.match(regex); 

                if (match) {                  
                    expoAddress = match[1];//We match the host URI against the regex to extract the host only. Can also match the port at [2]
                }
            }
          } catch (error) {
            console.error('Error fetching Expo development URL:', error);
          }     
          
        const response= await fetch(`http://${expoAddress}:3000/products/list/sodas`)        
        const data = await response.json();
        setIsLoading(false)
        setProductData(data.produits);
      })();
    },[]);

    const products = productData.map((data, i) => {
      // console.log(data)
        return (
            <View style={styles.cell} key={i}>
                <Pressable             
                    style={styles.pressableBoxView}
                    onPress={()=>{navigation.navigate("ProductDetails",
                      {product_id: data._id,
                      urlImage: data.info.productImage}
                    )}}
                >
                    <View style={styles.pressableBox}>
                      <Image
                          style={styles.fullView}
                          contentFit="cover"                          
                          source={{uri: data.info.productImage}}
                      />
                    </View>
                </Pressable>
            </View>
        );
      });
    function createRows(items, itemsPerRow) { 
        const rows = [];
        for (let i = 0; i < items.length; i += itemsPerRow) {
          rows.push(items.slice(i, i + itemsPerRow)); 
        }
        return rows;
      }

      const productsRows = createRows(products, 3); //Crée des rangées d'articles à partir du tableau "products", avec 3 articles par rangée

  return (
    <SafeAreaView style={{flex: 1}}>
        <Header />
        <TouchableOpacity onPress={()=> navigation.navigate("Start")}>
          <Text style={styles.locate}> {userAddress}, changer d’adresse ? </Text>
        </TouchableOpacity>
        <SearchBar placeholder="Entrez l'article que vous recherchez..."/>
        <ScrollView style={styles.pressableBoxContainer}>
          {isloading && <ActivityIndicator/>}
          {productsRows.map((row, rowIndex) => ( //Parcourt chaque rangée d'articles dans "productsRows"
            <View style={styles.row} key={rowIndex}> 
              {row} 
            </View> 
          ))}
        </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
    title: {
      color: "#fff",
      fontFamily: FontFamily.jostBold,
      fontWeight: "700",
      fontSize: FontSize.size_lg,
      textAlign: "left",
      padding: "10%",
    },    
    row: {
      display: "flex",
      flexDirection: "row",
      flexWrap: "wrap",
    },
    locate: {
      color: Color.darkslateblue_100,
      fontFamily: FontFamily.jostMedium,
      marginTop: 20,
      marginLeft: 27,
    },
    pressableBox: {
      height: 175,
      backgroundColor: Color.royalblue,
      borderRadius: Border.br_xl,
      overflow: "hidden",
      width: 100,
      shadowOpacity: 1,
      elevation: 4,
      shadowRadius: 4,
      shadowOffset: {
        width: 0,
        height: 4,
      },
      shadowColor: "rgba(0, 0, 0, 0.25)",
    },
    pressableBoxContainer: {      
      marginBottom : "23%"
    },
    cell: {
      margin: 10,
      shadowRadius: 4,
      shadowOffset: {
        width: 0,
        height: 4,
      },
      shadowColor: "rgba(0, 0, 0, 0.25)",
    },
    pressableBoxView: {
      width: 100,
      height: 170,
    },

    fullView: {
        width: 100,
        height: 180
        
    }
});


export default ArchiveProduits;
