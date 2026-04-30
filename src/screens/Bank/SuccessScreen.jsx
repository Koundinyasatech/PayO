import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import styles from "./styles";

export default function SuccessScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.success}>Bank Added Successfully!</Text>

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Done</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("AccountDetails")}>
        <Text style={styles.link}>Add Another Bank</Text>
      </TouchableOpacity>
    </View>
  );
}