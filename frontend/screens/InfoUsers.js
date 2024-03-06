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

export default function InfoUsers({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <Text style={styles.font}>Paris 18, changer d'adresse ?</Text>
      <SearchBar placeholder="Entrez l'article que vous recherchez..." />
      <Text style={styles.title}>Mes informations</Text>
      <View style={styles.containerCards}>
        <TouchableOpacity
          onPress={() => navigation.navigate("EditEmailUser")}
          style={styles.button}
          activeOpacity={0.8}
        >
          <Text style={styles.textButton}>Modifier mon email</Text>
          <Image
            style={styles.icon}
            contentFit="cover"
            source={require("../assets/email.png")}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("EditPasswordUser")}
          style={styles.button}
          activeOpacity={0.8}
        >
          <Image
            style={styles.icon}
            contentFit="cover"
            source={require("../assets/password.png")}
          />
          <Text style={styles.textButton}>Modifier mon mot de passe</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("DeleteAccountUser")}
          style={styles.button}
          activeOpacity={0.8}
        >
          <Text style={styles.textButton}>Supprimer mon compte</Text>
          <Image
            style={styles.icon}
            contentFit="cover"
            source={require("../assets/trash.png")}
          />
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
    height: "20%",
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
