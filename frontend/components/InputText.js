import { StyleSheet, Text, View, TextInput } from "react-native";
import React from "react";

export default function InputText({ placeholder }) {
  return (
    <View style={styles.container}>
      <View style={styles.containerInput}>
        <TextInput style={styles.font} placeholder={placeholder} />
      </View>
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
    alignItems: "center",
    width: "86%",
    flexDirection: "row",
    backgroundColor: "#E8F2FF",
    borderRadius: 25,
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
});
