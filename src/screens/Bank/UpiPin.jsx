import React from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import styles from "./styles";

export default function UpiPin({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Add Bank Details (3/3)</Text>

      <TextInput placeholder="Enter UPI PIN" secureTextEntry style={styles.input} />
      <TextInput placeholder="Confirm UPI PIN" secureTextEntry style={styles.input} />

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("SuccessScreen")}
      >
        <Text style={styles.buttonText}>Save & Continue</Text>
      </TouchableOpacity>
    </View>
  );
}