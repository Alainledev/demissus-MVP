import * as React from "react";
import { StyleSheet, View, Text, ScrollView, SafeAreaView } from "react-native";
import { Image } from "expo-image";
import { useNavigation } from "@react-navigation/native";
import { FontFamily, FontSize, Color } from "../GlobalStyle";
import Header from "../components/Header";
import SearchBar from "../components/SearchBar";

const SaltyGrocery = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <Text style={styles.locate}> Paris 18, changer d’adresse ? </Text>
      <SearchBar placeholder="Entrez l'article que vous recherchez..." />
      <Text style={styles.title}>Epicerie salée</Text>
      <ScrollView>
        <View style={styles.subcat}>
          <View style={styles.cards}>
            <Text style={styles.textCard}> Apéritifs et chips</Text>
            <Image
              style={styles.iconCard}
              source={require("../assets/chips.png")}
            />
          </View>

          <View style={styles.cards}>
            <Text style={styles.textCard}>Conserves/Bocaux</Text>
            <Image
              style={styles.iconCard}
              source={require("../assets/can.png")}
            />
          </View>

          <View style={styles.cards}>
            <Text style={styles.textCard}> Plats cuisinés </Text>
            <Image
              style={styles.iconCard}
              source={require("../assets/preparedFood.png")}
            />
          </View>

          <View style={styles.cards}>
            <Text style={styles.textCard}>Riz et pâtes</Text>
            <Image
              style={styles.iconCard}
              source={require("../assets/rice.png")}
            />
          </View>

          <View style={styles.cards}>
            <Text style={styles.textCard}>Condiments/Sauces</Text>
            <Image
              style={styles.iconCard}
              source={require("../assets/pepper.png")}
            />
          </View>

          <View style={styles.cards}>
            <Text style={styles.textCard}>Soupes et bouillons</Text>
            <Image
              style={styles.iconCard}
              source={require("../assets/soup.png")}
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

export default SaltyGrocery;
