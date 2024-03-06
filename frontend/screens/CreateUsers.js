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
import { useNavigation } from "@react-navigation/native";
import { FontFamily, FontSize, Color, Border } from "../GlobalStyle";

export default function CreateUsers() {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [signUpemail, setsignUpEmail] = useState("");
  const [signUppassword, setsignUpPassword] = useState("");
  const [signUpverifyPassword, setsignUpVerifyPassword] = useState("");

  const EMAIL_REGEX =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const handleRegister = async () => {
    if (!EMAIL_REGEX.test(signUpemail.trim().toLowerCase())) {
      Alert.alert("Erreur", "Le format de l'e-mail n'est pas valide.");
      return;
    }

    const response = await fetch("http://192.168.10.155:3000/users/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: signUpemail, password: signUppassword }),
    });

    // const data = await response.json();
    console.log("data", data);

    //if i take out this then it shows but then there is no data
    const data = await response.json();
    console.log("data", data);

    if (data.result) {
      dispatch(login({ email: signUpemail, token: data.token }));
      setsignUpEmail("");
      setsignUpPassword("");
      setsignUpVerifyPassword("");
      navigation.navigate("MyProfile");
    } else {
      Alert.alert(
        "Erreur",
        data.message || "Une erreur s'est produite lors de l'inscription."
      );
      return;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <Text style={styles.text}>
        Créez un compte rapidement pour enregistrer vos articles et partager
        votre liste de courses
      </Text>
      <TextInput
        style={styles.inputField}
        placeholder="Entrez votre adresse email..."
        textContentType="emailAddress"
        autoComplete="email"
        value={signUpemail}
        onChangeText={(e) => setsignUpEmail(e)}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.inputField}
        placeholder="Entrez votre mot de passe..."
        value={signUppassword}
        onChangeText={setsignUpPassword}
        secureTextEntry
      />
      <TextInput
        style={styles.inputField}
        placeholder="Veuillez vérifier votre mot de passe..."
        value={signUpverifyPassword}
        onChangeText={setsignUpVerifyPassword}
        secureTextEntry
      />
      <View style={styles.containerButton}>
        <TouchableOpacity
          onPress={handleRegister}
          style={styles.button}
          activeOpacity={0.8}
        >
          <Text style={styles.textButton}>S'inscrire</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.containerSingin}
          onPress={() => navigation.navigate("Login")}
        >
          <Text style={styles.textSingin}>
            Vous avez déjà un compte? Se connecter ici
          </Text>
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
    marginBottom: 20, // Add some margin to separate from the inputs.
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
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20, // Margin added to separate button from the "Vous avez déjà un compte? Se connecter ici" text.
  },
  buttonText: {
    color: "#062954",
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
    marginBottom: 20, // Added margin at the bottom for spacing between input fields.
    marginRight: 15,
    marginLeft: 15,
    paddingLeft: 20,
  },
  textSingin: {
    textAlign: "center",
    marginBottom: 50,
  },
});
