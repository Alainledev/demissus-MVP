import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Alert,
  TextInput,
} from "react-native";
import Header from "../components/Header";
import { useDispatch } from "react-redux";
import { login } from "../reducers/users";
import { FontFamily, FontSize, Color, Border } from "../GlobalStyle";

export default function Login({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const handleConnection = () => {
    fetch("http://192.168.10.155:3000/users/signin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: email, password: password }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          dispatch(login({ email: email, token: data.token }));
          setEmail("");
          setPassword("");
          navigation.navigate("MyProfile");
        } else {
          Alert.alert(
            "Error",
            "Échec de la connexion. Veuillez vérifier vos informations d'identification."
          );
        }
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <Text style={styles.text}>
        Connectez-vous pour accéder à votre profil et partager votre liste de
        courses.
      </Text>
      <TextInput
        style={styles.inputField}
        placeholder="Adresse email..."
        textContentType="emailAddress"
        autoCompleteType="email"
        value={email}
        onChangeText={(e) => setEmail(e)}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.inputField}
        placeholder="Mot de passe..."
        value={password}
        onChangeText={(e) => setPassword(e)}
        secureTextEntry
      />

      <View style={styles.containerButton}>
        <TouchableOpacity
          onPress={handleConnection}
          style={styles.button}
          activeOpacity={0.8}
        >
          <Text style={styles.textButton}>Se Connecter</Text>
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
    color: Color.goldenorange,
    fontSize: 21,
    padding: 28,
    textAlign: "center",
    marginBottom: 20,
  },
  containerButton: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30,
  },
  button: {
    width: "50%",
    backgroundColor: Color.goldenorange,
    borderRadius: 25,
    paddingHorizontal: 10,
    paddingVertical: 10,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  buttonText: {
    color: Color.darkslateblue_100,
  },
  inputField: {
    borderRadius: 11,
    backgroundColor: Color.aliceblue,
    shadowColor: "rgba(0, 0, 0, 0.25)",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowRadius: 4,
    elevation: 4,
    shadowOpacity: 1,
    height: 45,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "nowrap",
    marginBottom: 20,
    marginRight: 10,
    marginLeft: 10,
    paddingLeft: 10,
  },
});
