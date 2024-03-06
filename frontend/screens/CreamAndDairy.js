import * as React from "react";
import { StyleSheet, View, Text, ScrollView, SafeAreaView } from "react-native";
import { Image } from "expo-image";
import { useNavigation } from "@react-navigation/native";
import { FontFamily, FontSize, Color } from "../GlobalStyle";
import Header from "../components/Header";
import SearchBar from "../components/SearchBar";

const CreamAndDairy = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <Text style={styles.locate}> Paris 18, changer d’adresse ? </Text>
      <SearchBar placeholder="Entrez l'article que vous recherchez..." />
      <Text style={styles.title}>Crèmerie et produits laitiers</Text>
      <ScrollView>
        <View style={styles.subcat}>
          <View style={styles.cards}>
            <Text style={styles.textCard}> Yaourts et fromages blancs</Text>
            <Image
              style={styles.iconCard}
              source={require("../assets/fondue.png")}
            />
          </View>

          <View style={styles.cards}>
            <Text style={styles.textCard}>Desserts et compotes</Text>
            <Image
              style={styles.iconCard}
              source={require("../assets/caramel.png")}
            />
          </View>

          <View style={styles.cards}>
            <Text style={styles.textCard}> Beurre et crèmes </Text>
            <Image
              style={styles.iconCard}
              source={require("../assets/butter.png")}
            />
          </View>

          <View style={styles.cards}>
            <Text style={styles.textCard}>Laits</Text>
            <Image
              style={styles.iconCard}
              source={require("../assets/milk.png")}
            />
          </View>

          <View style={styles.cards}>
            <Text style={styles.textCard}>Oeufs</Text>
            <Image
              style={styles.iconCard}
              source={require("../assets/egg.png")}
            />
          </View>

          <View style={styles.cards}>
            <Text style={styles.textCard}>Fromages</Text>
            <Image
              style={styles.iconCard}
              source={require("../assets/cheeseTrap.png")}
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

export default CreamAndDairy;
