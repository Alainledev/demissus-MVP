import * as React from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Pressable,
  SafeAreaView
} from "react-native";
import { Image } from "expo-image";
import { useNavigation } from "@react-navigation/native";
import { FontFamily, FontSize, Color } from "../GlobalStyle";
import { useDispatch, useSelector } from "react-redux";

import { clearStore, incre, decre, removeFromCart } from "../reducers/users";
import Header from "../components/Header";
import SearchBar from "../components/SearchBar";

const Cart = ({ route, navigation }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value);

  // console.log("quantity2", user.cart);

  // React.useEffect(() => {
  //   return () => { 
  //       dispatch(clearStore())
  //       console.log('Unmount'); };
  //  }, []);

  const addQuantity = (i) => {
    dispatch(incre(i));
  };

  const lessQuantity = (i,item) => {
    if (user.cart[i].quantity >1) {
      dispatch(decre(i));
    } else {
      dispatch(removeFromCart(item.productName))  
    }
  };

  let items;

  if (user.cart.length < 0) {
    items = <Text>No cart items</Text>;
  } else {
    items = user.cart.map((item, i) => {
      // console.log('iteeem',item)
      ;
      return (
        <View style={styles.cards} key={i}>
          <View>
            <Image
              style={styles.itemPicture}
              source={{ uri: item.productImage }}
            />
          </View>
          <View>
            <Text style={styles.textItem}>{item.productName}</Text>
            <View style={styles.signs}>
              <Pressable onPress={() => addQuantity(i)}>
                <Text style={styles.plus}> + </Text>
              </Pressable>
              <Text style={styles.quantity}>    {item.quantity}   </Text>
              <Pressable onPress={() => lessQuantity(i,item)}>
                <Text style={styles.minus}> - </Text>
              </Pressable>
            </View>
          </View>
        </View>
      );
    });
  }

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <SearchBar placeholder="Entrez l'article que vous recherchez..." />
      <Text style={styles.title}>Liste de courses</Text>
      <ScrollView>{items}</ScrollView>
      <Pressable onPress={()=> navigation.navigate("Mapping")}>
        <Text style={styles.gotomap}>Où se trouve mon panier moyen le moins cher ? </Text>
      </Pressable>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: "20%",
  },
  title: {
    fontSize: FontSize.size_5xl,
    fontWeight: "800",
    color: Color.darkslateblue_100,
    textAlign: "center",
    marginTop: 15,
    marginBottom: 30,
  },
  cards: {
    flexDirection: "row",
  },
  textItem: {
    fontFamily: FontFamily.jostBold,
    fontSize: 16,
    color: "black",
    paddingTop: 5,
    marginLeft: 15,
  },
  itemPicture: {
    width: 85,
    height: 85,
    marginBottom: 25,
    borderRadius: 10,
  },
  signs: {
    flexDirection: "row",
    marginLeft: 7,
  },
  plus: {
    color: "green",
    fontSize: 30,
  },
  minus: {
    color: "red",
    fontSize: 30,
  },
  quantity : {
    alignSelf : 'center',
    fontSize : 18
  },
  gotomap : {
    fontStyle : "italic",
    fontSize : 16,
    margin : 15,
  },
});

export default Cart;
