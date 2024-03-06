import * as React from "react";
import { StyleSheet, View, Text, ScrollView, SafeAreaView } from "react-native";
import { Image } from "expo-image";
import { useNavigation } from "@react-navigation/native";
import { FontFamily, FontSize, Color } from "../GlobalStyle";
import Header from "../components/Header";
import SearchBar from "../components/SearchBar";

const FrozenFoods = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <Text style={styles.locate}> Paris 18, changer d’adresse ? </Text>
      <SearchBar placeholder="Entrez l'article que vous recherchez..." />
      <Text style={styles.title}>Surgelés</Text>
      <ScrollView>
        <View style={styles.subcat}>
          <View style={styles.cards}>
            <Text style={styles.textCard}> Glaces et sorbets</Text>
            <Image
              style={styles.iconCard}
              source={require("../assets/icecream.png")}
            />
          </View>

          <View style={styles.cards}>
            <Text style={styles.textCard}>Frites et pommes de terre </Text>
            <Image
              style={styles.iconCard}
              source={require("../assets/chips.png")}
            />
          </View>

          <View style={styles.cards}>
            <Text style={styles.textCard}> Viandes </Text>
            <Image
              style={styles.iconCard}
              source={require("../assets/steak.png")}
            />
          </View>

          <View style={styles.cards}>
            <Text style={styles.textCard}>Pizzas, quiches et tartes</Text>
            <Image
              style={styles.iconCard}
              source={require("../assets/pizza.png")}
            />
          </View>

          <View style={styles.cards}>
            <Text style={styles.textCard}>Poissons et fruits de mer</Text>
            <Image
              style={styles.iconCard}
              source={require("../assets/shrimp.png")}
            />
          </View>
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
    backgroundColor: "#4692f0",
    width: "40%",
    marginTop: 40,
    borderRadius: 10,
    height: "23%",
    alignItems: "center",
  },
  textCard: {
    fontFamily: FontFamily.jostBold,
    fontSize: 16,
    color: "white",
    paddingTop: 40,
  },
  iconCard: {
    width: 55,
    height: 55,
    bottom: -5,
    left: 60,
  },
});

export default FrozenFoods;
