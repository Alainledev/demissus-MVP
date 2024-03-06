import {
  StyleSheet,
  Text,
  View,
  TextInput,
  onChangeText,
  FlatList,
  ActivityIndicator,
  Pressable,
} from "react-native";
import React from "react";
import { FontAwesome } from "@expo/vector-icons";
import { useState } from "react";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import Constants from "expo-constants";

//Constants est un module fourni par Expo qui permet d'accéder à diverses informations liées à l'environnement d'exécution de l'application. 

export default function SearchBar({ placeholder }) {
  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();

  const handleSearch = async () => {
    if (searchText === "") return;

    setLoading(true);

    let expoAddress = "";
    try {
      if (Constants.expoConfig.hostUri) {
        const regex = /^([\d.]+)(?::(\d+))?$/;
        const match = Constants.expoConfig.hostUri.match(regex);

        if (match) {
          // console.log("match",match)
          expoAddress = match[1];
        }
      }
    } catch (error) {
      console.error("Error fetching Expo development URL:", error);
    }

    const response = await axios.get(
      `http://${expoAddress}:3000/products/search/${searchText}`
    );
    // console.log('search', response)
    setSearchText('')
    setSearchResults(response.data.produits);
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.containerInput}>
        <TextInput
          value={searchText}
          onChangeText={(value) => setSearchText(value)}
          style={styles.font}
          placeholder={placeholder}
        />
        <FontAwesome
          onPress={() => handleSearch()}
          name="search"
          size={20}
          color="#062954"
        />

      </View>
      {loading ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          data={searchResults}
          renderItem={({ item }) => (
            // console.log(item, "item"),
            <Pressable
              style={styles.containerItem}
              onPress={() =>{
                setSearchResults([]) ;
                navigation.navigate("ProductDetails", {
                  product_id: item._id,
                  urlImage: item.info.productImage,
                })
              }}
            >
              <Text style={styles.item}>
                {(item.name, item.info.description)}
              </Text>
            </Pressable>
          )}
          keyExtractor={(item) => item.id}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  font: {
    color: "#062954",
  },
  container: {
    alignItems: "center",
    paddingTop: 20,
  },
  containerInput: {
    width: "86%",
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#E8F2FF",
    borderRadius: 25,
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  item: {
    color: "#062954",
    padding: 10,
    width: "90%",
    borderRadius: 25,
    paddingHorizontal: 10,
    paddingVertical: 10,
    paddingBottom: 10,
    borderBottomColor: "#062954",
    borderBottomWidth: 1,
    fontSize: 12,
  },
  containerItem: {
    flexDirection: "row",
    marginLeft: 4,
  },
});
