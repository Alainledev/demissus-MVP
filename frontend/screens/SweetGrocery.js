import * as React from "react";
import { StyleSheet, View, Text, ScrollView, SafeAreaView } from "react-native";
import { Image } from "expo-image";
import { useNavigation } from "@react-navigation/native";
import { FontFamily, FontSize, Color } from "../GlobalStyle";
import Header from "../components/Header";
import SearchBar from "../components/SearchBar";

const SweetGrocery = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <Text style={styles.locate}> Paris 18, changer d’adresse ? </Text>
      <SearchBar placeholder="Entrez l'article que vous recherchez..." />
      <Text style={styles.title}>Epicerie sucrée</Text>
      <ScrollView>
        <View style={styles.subcat}>
          <View style={styles.cards}>
            <Text style={styles.textCard}> Boissons chaudes</Text>
            <Image
              style={styles.iconCard}
              source={require("../assets/coffee.png")}
            />
          </View>

          <View style={styles.cards}>
            <Text style={styles.textCard}>Petit déjeuner</Text>
            <Image
              style={styles.iconCard}
              source={require("../assets/croissant.png")}
            />
          </View>

          <View style={styles.cards}>
            <Text style={styles.textCard}> Biscuits </Text>
            <Image
              style={styles.iconCard}
              source={require("../assets/cookie.png")}
            />
          </View>

          <View style={styles.cards}>
            <Text style={styles.textCard}>Gâteaux moelleux</Text>
            <Image
              style={styles.iconCard}
              source={require("../assets/sliceCake.png")}
            />
          </View>

          <View style={styles.cards}>
            <Text style={styles.textCard}>Bonbons</Text>
            <Image
              style={styles.iconCard}
              source={require("../assets/sweet.png")}
            />
          </View>

          <View style={styles.cards}>
            <Text style={styles.textCard}>Anniversaire</Text>
            <Image
              style={styles.iconCard}
              source={require("../assets/birthdayCake.png")}
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

export default SweetGrocery;
