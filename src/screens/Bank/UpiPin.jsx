import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { useRoute } from "@react-navigation/native";
import styles from "./styles";
import api from "../../api/axios";
 
export default function UpiPin({ navigation }) {
 
  const route = useRoute();
 
  const {
    accountHolderName,
    mobileNumber,
    bankName,
    accountNumber,
    confirmAccountNumber,
    ifscCode
  } = route.params;
 
  const [upiPin, setUpiPin] = useState("");
  const [confirmUpiPin, setConfirmUpiPin] = useState("");
 
  const handleSubmit = async () => {
 
    if (!upiPin || !confirmUpiPin) {
      alert("Enter UPI PIN");
      return;
    }
 
    if (upiPin !== confirmUpiPin) {
      alert("UPI PIN does not match");
      return;
    }
 
    try {
      await api.post("/api/wallet/add-bank", {
        accountHolderName,
        mobileNumber,
        bankName,
        accountNumber,
        confirmAccountNumber,
        ifscCode
      });
 
      navigation.navigate("SuccessScreen");
 
    } catch (err) {
      console.log(err?.response || err.message);
      alert("Error adding bank");
    }
  };
 
  return (
<View style={styles.container}>
<Text style={styles.header}>Add Bank Details (3/3)</Text>
 
      <TextInput
        placeholder="Enter UPI PIN"
        secureTextEntry
        style={styles.input}
        value={upiPin}
        onChangeText={setUpiPin}
        keyboardType="numeric"
      />
 
      <TextInput
        placeholder="Confirm UPI PIN"
        secureTextEntry
        style={styles.input}
        value={confirmUpiPin}
        onChangeText={setConfirmUpiPin}
        keyboardType="numeric"
      />
 
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
<Text style={styles.buttonText}>Save & Continue</Text>
</TouchableOpacity>
</View>
  );
}