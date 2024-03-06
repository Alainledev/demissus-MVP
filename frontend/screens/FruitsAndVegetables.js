import * as React from "react";
import { StyleSheet, View, Text, SafeAreaView } from "react-native";
import { Image } from "expo-image";
import { useNavigation } from "@react-navigation/native";
import { FontFamily, FontSize, Color } from "../GlobalStyle"
import Header from "../components/Header";
import SearchBar from "../components/SearchBar";

const FruitsAndVegetables = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
        <Header/>
        <Text style={styles.locate}> Paris 18, changer d’adresse ? </Text>
        <SearchBar placeholder="Entrez l'article que vous recherchez..." />
        <Text style={styles.title}>Fruits et légumes</Text>
        <View style={styles.subcat}>

          <View style={styles.cards}>
            <Text style={styles.textCard}> Fruits</Text>
            <Image
              style={styles.iconCard}
              source={require("../assets/apple.png")}
            />
          </View>

          <View style={styles.cards}>
            <Text style={styles.textCard}>Légumes</Text>
            <Image
              style={styles.iconCard}
              source={require("../assets/carrot.png")}
            />
          </View>

          <View style={styles.cards}>
            <Text style={styles.textCard}> Prêt à consommer </Text>
            <Image
              style={styles.iconCard}
              source={require("../assets/salad.png")}
            />
          </View>
            
          <View style={styles.cards}>
            <Text style={styles.textCard} >Fruits et secs et grains</Text>
            <Image
              style={styles.iconCard}
              source={require("../assets/peanut.png")}
            />
          </View>
        </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  locate: {
    color: Color.darkslateblue_100,
    fontFamily: FontFamily.jostMedium,
    marginTop : 20,
    marginLeft : 27,
  },
  title: {
    fontSize: FontSize.size_5xl,
    fontWeight: "800",
    color: Color.darkslateblue_100,
    textAlign : 'center',
    marginTop : 15
  },
  subcat : {
    flexDirection : "row",
    flexWrap : 'wrap',
    justifyContent : 'space-around',
  },
  cards : {
    backgroundColor : '#4692f0',
    width : '40%',
    marginTop : 40,
    borderRadius : 10,
    height : '35%',
    alignItems : 'center',
  },
  textCard: {
    fontFamily: FontFamily.jostBold,
    fontSize : 16,
    color : 'white',
    paddingTop : 40,
  },
  iconCard: {
    width: 55,
    height: 55,
    bottom : -5,
    left : 60,
  },
});

export default FruitsAndVegetables;
