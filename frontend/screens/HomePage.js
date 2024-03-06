import * as React from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Pressable,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { Image } from "expo-image";
import { useNavigation } from "@react-navigation/native";
import { FontFamily, FontSize, Color } from "../GlobalStyle";
import Header from "../components/Header";
import SearchBar from "../components/SearchBar";
import { useSelector } from "react-redux";

const HomePage = () => {
  const navigation = useNavigation();
  const user = useSelector((state) => state.user);    
  const userAddress = (user.value && user.value.location) ? user.value.location.address : null; //Gotta check if the store updated before trying to display

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <TouchableOpacity onPress={()=> navigation.navigate("Start")}>
        <Text style={styles.locate}> {userAddress}, changer d’adresse ? </Text>
      </TouchableOpacity>
      <SearchBar placeholder="Entrez l'article que vous recherchez..." />
      <ScrollView>
        <View style={styles.subcat}>
          <Pressable
            onPress={() => navigation.navigate("MeatsAndFishes")}
            style={styles.cards}
          >
            <Text style={styles.textCard}>Viandes et poissons</Text>
            <Image
              style={styles.iconCard}
              source={require("../assets/meatLeg.png")}
            />
          </Pressable>

          <Pressable
            onPress={() => navigation.navigate("Drinks")}
            style={styles.cards}
          >
            <Text style={styles.textCard}>Boissons</Text>
            <Image
              style={styles.iconCard}
              source={require("../assets/water.png")}
            />
          </Pressable>

          <Pressable
            onPress={() => navigation.navigate("CreamAndDairy")}
            style={styles.cards}
          >
            <Text style={styles.textCard}> Produits laitiers </Text>
            <Image
              style={styles.iconCard}
              source={require("../assets/milk.png")}
            />
          </Pressable>

          <Pressable
            onPress={() => navigation.navigate("FrozenFoods")}
            style={styles.cards}
          >
            <Text style={styles.textCard}>Surgelés</Text>
            <Image
              style={styles.iconCard}
              source={require("../assets/ice.png")}
            />
          </Pressable>

          <Pressable
            onPress={() => navigation.navigate("SweetGrocery")}
            style={styles.cards}
          >
            <Text style={styles.textCard}>Epicerie sucrée</Text>
            <Image
              style={styles.iconCard}
              source={require("../assets/cupcake.png")}
            />
          </Pressable>

          <Pressable
            onPress={() => navigation.navigate("SaltyGrocery")}
            style={styles.cards}
          >
            <Text style={styles.textCard}>Epicerie salée</Text>
            <Image
              style={styles.iconCard}
              source={require("../assets/taco.png")}
            />
          </Pressable>

          <Pressable
            onPress={() => navigation.navigate("FruitsAndVegetables")}
            style={styles.cards}
          >
            <Text style={styles.textCard}>Fruits et légumes</Text>
            <Image
              style={styles.iconCard}
              source={require("../assets/tomato.png")}
            />
          </Pressable>

          <Pressable
            onPress={() => navigation.navigate("BreadAndPastries")}
            style={styles.cards}
          >
            <Text style={styles.textCard}>Pains et pâtisseries</Text>
            <Image
              style={styles.iconCard}
              source={require("../assets/bread.png")}
            />
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: "20%",
  },
  locate: {
    color: Color.darkslateblue_100,
    fontFamily: FontFamily.jostMedium,
    marginTop: 20,
    marginLeft: 27,
  },
  title: {
    fontSize: FontSize.size_5xl,
    fontWeight: "800",
    color: Color.darkslateblue_100,
    textAlign: "center",
    marginTop: 15,
  },
  subcat: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
  },
  cards: {
    backgroundColor: "#1162C7",
    width: "40%",
    marginTop: 40,
    borderRadius: 10,
    height: "18%",
    alignItems: "center",
  },
  textCard: {
    fontFamily: FontFamily.jostBold,
    fontSize: 16,
    color: "white",
    paddingTop: 40,
  },
  iconCard: {
    width: 50,
    height: 50,
    bottom: -5,
    left: 60,
  },
});

export default HomePage;
