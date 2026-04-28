import React from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import styles from "./styles";

export default function AccountNumber({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Add Bank Details (2/3)</Text>

      <TextInput placeholder="Account Number" style={styles.input} />
      <TextInput placeholder="Confirm Account Number" style={styles.input} />
      <TextInput placeholder="IFSC Code" style={styles.input} />

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("UpiPin")}
      >
        <Text style={styles.buttonText}>Continue</Text>
      </TouchableOpacity>
    </View>
  );
}