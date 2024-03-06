import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Image,
} from "react-native";
import React from "react";
import SearchBar from "../components/SearchBar";
import Header from "../components/Header";

export default function MyProfile({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <Text style={styles.font}>Paris 18, changer d'adresse ?</Text>
      <SearchBar placeholder="Entrez l'article que vous recherchez..." />

      <Text style={styles.title}>Mon compte</Text>
      <View style={styles.containerCards}>
        <TouchableOpacity
          onPress={() => navigation.navigate("InfoUsers")}
          style={styles.button}
          activeOpacity={0.8}
        >
          <Text style={styles.textButton}>Mes informations</Text>
          <Image
            style={styles.icon}
            contentFit="cover"
            source={require("../assets/happyFace.png")}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("ArticlesUsers")}
          style={styles.button}
          activeOpacity={0.8}
        >
          <Image
            style={styles.icon}
            contentFit="cover"
            source={require("../assets/heart.png")}
          />
          <Text style={styles.textButton}>Mes articles</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  font: {
    color: "#062954",
    marginTop: 20,
    marginLeft: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    marginTop: 20,
  },
  containerCards: {
    alignItems: "center",
    gap: 20,
  },
  button: {
    width: "80%",
    height: "25%",
    backgroundColor: "#FFCB6B",
    borderRadius: 25,
    paddingHorizontal: 10,
    paddingVertical: 10,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "#062954",
    fontWeight: "bold",
  },
});
