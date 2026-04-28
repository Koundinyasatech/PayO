import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import styles from "./styles";

export default function AddBankHome({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add Bank Account</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("AccountDetails")}
      >
        <Text style={styles.buttonText}>Add New Bank Account</Text>
      </TouchableOpacity>
    </View>
  );
}