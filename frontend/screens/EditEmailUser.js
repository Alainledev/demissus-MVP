import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import React from "react";
import Header from "../components/Header";
import InputText from "../components/InputText";

export default function EditEmailUser({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <Text style={styles.text}>
        Pour modifier {"\n"} votre adresse email {"\n"}
        c'est ici
      </Text>
      <TouchableOpacity>
        <InputText placeholder="Entrez vore adresse email actuelle..." />
      </TouchableOpacity>
      <TouchableOpacity>
        <InputText placeholder="Entrez vore nouvelle adresse email actuelle..." />
      </TouchableOpacity>

      <View style={styles.containerButton}>
        <TouchableOpacity
          onPress={() => navigation.navigate("MyProfile")}
          style={styles.button}
          activeOpacity={0.8}
        >
          <Text style={styles.textButton}>Validez</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    color: "#FFCB6B",
    fontSize: 21,
    padding: 28,
    textAlign: "center",
  },
  containerButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30,
  },
  button: {
    width: "50%",
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
  },
});
