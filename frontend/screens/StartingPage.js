import * as React from "react";
import { Image } from "expo-image";
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  TextInput,
  Platform,
  KeyboardAvoidingView,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";


import { FontFamily, FontSize, Color, Border } from "../GlobalStyle";
import { FontAwesome5 } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import * as Location from 'expo-location';
import { addUserPosition } from "../reducers/users";

const StartingPage = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [address, setAddress] = React.useState("");
  const user= useSelector((state)=>state.user)
  

  React.useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status === 'granted') {
        
        const location= await Location.getCurrentPositionAsync({});     
        // console.log('loooooooc',location)     
        fetch(`https://api-adresse.data.gouv.fr/reverse/?lon=${location.coords.longitude}&lat=${location.coords.latitude}`)
        .then((response) => response.json())
        .then((data) => {   
          // console.log('daaaaaata',data)           
          const cityBestPrediction = data.features[0];
          const locationData = {
            address: cityBestPrediction.properties.label,
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
          };              
          dispatch(addUserPosition(locationData));
        });
        navigation.navigate("TabNavigator");
      }
      })();  
  }, []);

  const locateUser = () => {
    if (address && address != "") {
      fetch(`https://api-adresse.data.gouv.fr/search/?q=${address}`)
        .then((response) => response.json())
        .then((data) => {
          const cityBestPrediction = data.features[0];
          const locationData = {
            address: address,
            latitude: cityBestPrediction.geometry.coordinates[1],
            longitude: cityBestPrediction.geometry.coordinates[0],
          };
          
          dispatch(addUserPosition(locationData));
        });
        navigation.navigate("TabNavigator");
      }else{
        Alert.alert("You must type an address to continue");
      }
  };


  return (
    <KeyboardAvoidingView
      style={styles.startingPage}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <Image
        style={styles.logo}
        source={require("../assets/logo.png")}
      />
      <Text style={[styles.slogan]}> Tirons les prix vers le bas </Text>
      <Text style={styles.accroche}>Marre de comparer les prix autour de chez vous? Nous le faisons pour vous !</Text>

      <Image
        style={styles.homeImage}
        contentFit="cover"
        source={require("../assets/Bruno.png")}
      />

      <Text style={styles.charlieHebdoBruno}> Charlie Hebdo: Bruno le Maire, Ministre de l'Économie </Text>
      <View style={styles.inputField}>
        <TextInput
          style={styles.entrezVotreAdresse}
          placeholder="Entrez votre adresse postale pour commencer..."
          onChangeText={(value) => {
            setAddress(value);
          }}
        ></TextInput>

        <Pressable
          style={styles.iconSearchLocation}
          onPress={() => locateUser()}
        >
          <FontAwesome5 name="search-location" size={24} color="black" />
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  startingPage: {
    backgroundColor: Color.darkslateblue_100,
    flex: 1,
    height: "100%",
    alignItems: "center",
  },
  logo: {
    marginTop : "10%",
    width: '70%',
    height: '10%',
  },
  accroche: {
    fontSize: FontSize.size_5xl,
    color: Color.aliceblue,
    // minHeight: "10%",
    textAlign: "center",
    fontFamily: FontFamily.jostBold,
    fontWeight: "700",
    marginBottom: '2%',
    marginTop: '2%',
  },
  slogan: {
    fontSize: 12,
    color: Color.sandybrown,
    width: "90%",
    letterSpacing: 5,
    textAlign: "center",
    fontFamily: FontFamily.jostBold,
    fontWeight: "700",
  },
  homeImage: {
    width: "60%",
    height: "30%",
    borderRadius: 15,
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
  },
  entrezVotreAdresse: {
    fontSize: FontSize.size_xs,
    fontWeight: "500",
    fontFamily: FontFamily.jostMedium,
    color: "#000",
    width: "80%",
    borderRadius: Border.br_xl,
    backgroundColor: Color.aliceblue,
    height: 35,
  },
  iconSearchLocation: {
    height: 35,
    padding: 5,
  },
  charlieHebdoBruno: {
    fontSize: 8,
    fontFamily: FontFamily.jostRegular,
    color: 'white',
    height: 23,
    width: 206,
  },
});

export default StartingPage;
