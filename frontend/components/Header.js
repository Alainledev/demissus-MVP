import { StyleSheet, View, Text, Pressable, Image } from "react-native";
import { FontFamily, FontSize, Color, Border } from "../GlobalStyle";
import { MaterialIcons } from "@expo/vector-icons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useNavigation } from "@react-navigation/native";

function Header() {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Pressable onPress={() => navigation.goBack()}>
        <MaterialIcons name="keyboard-backspace" size={24} color="white" />
      </Pressable>
      <Image
        style={styles.logo}
        contentFit="cover"
        source={require("../assets/logosmall.png")}
      />
      <Pressable onPress={() => navigation.navigate("Cart")}>
        <FontAwesome name="shopping-cart" size={24} color="white" />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "20%",
    backgroundColor: Color.darkslateblue_100,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingTop: 30,
  },
  logo: {
    width: "40%",
    height: "50%",
  },
});

export default Header;
