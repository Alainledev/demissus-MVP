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
import { useDispatch } from 'react-redux';
import { deleteUser } from '../reducers/users';
import { useNavigation } from "@react-navigation/native";
import { FontFamily, FontSize, Color, Border } from "../GlobalStyle";


export default function DeleteAccountUser({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleDeleteAccount = () => {
    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match!");
      return;
    }

    fetch('http://192.168.10.155:3000/users/deleteAccount', {
  method: 'DELETE',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    email,
    password,
  }),
})
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        Alert.alert("Success", "Account deleted successfully");
        navigation.navigate("CreateUsers.js");
      } else {
        Alert.alert("Error", data.message || "Failed to delete account.");
      }
    })
    .catch(error => {
      Alert.alert("Error", "There was an issue connecting to the server.");
    });
};


  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <Text style={styles.text}>
        Supprimer votre compte {"\n"} attention cette action {"\n"}
        sera inéluctable
      </Text>
      <TouchableOpacity>
        <TextInput 
        style={styles.inputField}
        placeholder="Entrez vore adresse mail..." />
      </TouchableOpacity>
      <TouchableOpacity>
        <TextInput 
        style={styles.inputField}
        placeholder="Entrez vore mot de passe..." />
      </TouchableOpacity>
      <TouchableOpacity>
        <TextInput 
        style={styles.inputField}
        placeholder="Veuillez vérifier votre mot de passe..." />
      </TouchableOpacity>
      <View style={styles.containerButton}>
        <TouchableOpacity
          onPress={handleDeleteAccount}
          style={styles.button}
          activeOpacity={0.8}
        >
          <Text style={styles.textButton}>Supprimer</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 28, // Moved padding from text style to container to give a consistent padding throughout.
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
});

