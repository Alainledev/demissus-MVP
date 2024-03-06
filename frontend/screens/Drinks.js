import * as React from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Pressable,
} from "react-native";
import { Image } from "expo-image";
import { useNavigation } from "@react-navigation/native";
import { FontFamily, FontSize, Color } from "../GlobalStyle";
import Header from "../components/Header";
import SearchBar from "../components/SearchBar";
import { useSelector } from "react-redux";

const Drinks = () => {
  const navigation = useNavigation();
  const user = useSelector((state) => state.user);    
  const userAddress = (user.value && user.value.location) ? user.value.location.address : null;

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <TouchableOpacity onPress={()=> navigation.navigate("Start")}>
          <Text style={styles.locate}> {userAddress}, changer d’adresse ? </Text>
        </TouchableOpacity>
      <SearchBar placeholder="Entrez l'article que vous recherchez..." />
      <Text style={styles.title}>Boissons</Text>
      <ScrollView>
        <View style={styles.subcat}>
          <View style={styles.cards}>
            <Pressable onPress={() => navigation.navigate("ArchiveProducts")}>
              <Text style={styles.textCard}>Boissons sucrées</Text>
              <Image
                style={styles.iconCard}
                source={require("../assets/juice.png")}
              />
            </Pressable>
          </View>

          <View style={styles.cards}>
            <Text style={styles.textCard}> Eaux et sirops</Text>
            <Image
              style={styles.iconCard}
              source={require("../assets/water.png")}
            />
          </View>

          <View style={styles.cards}>
            <Text style={styles.textCard}>Bières et cidres</Text>
            <Image
              style={styles.iconCard}
              source={require("../assets/beer.png")}
            />
          </View>

          <View style={styles.cards}>
            <Text style={styles.textCard}> Vins </Text>
            <Image
              style={styles.iconCard}
              source={require("../assets/wine.png")}
            />
          </View>

          <View style={styles.cards}>
            <Text style={styles.textCard}>Spiritueux</Text>
            <Image
              style={styles.iconCard}
              source={require("../assets/martini.png")}
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

export default Drinks;
