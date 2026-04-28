import React from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import styles from "./styles";

export default function AccountDetails({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Add Bank Details (1/3)</Text>

      <TextInput placeholder="Account Holder Name" style={styles.input} />
      <TextInput placeholder="Mobile Number" style={styles.input} />
      <TextInput placeholder="Bank Name" style={styles.input} />

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("AccountNumber")}
      >
        <Text style={styles.buttonText}>Continue</Text>
      </TouchableOpacity>
    </View>
  );
}