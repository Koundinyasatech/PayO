import React, { useState } from "react";

import { View, Text, TextInput, TouchableOpacity } from "react-native";

import { useRoute } from "@react-navigation/native";

import styles from "./styles";

export default function AccountNumber({ navigation }) {

  const route = useRoute();

  const { accountHolderName, mobileNumber, bankName } = route.params;

  const [accountNumber, setAccountNumber] = useState("");

  const [confirmAccountNumber, setConfirmAccountNumber] = useState("");

  const [ifscCode, setIfscCode] = useState("");

  const handleNext = () => {

    if (!accountNumber || !confirmAccountNumber || !ifscCode) {

      alert("Please fill all fields");

      return;

    }

    if (accountNumber !== confirmAccountNumber) {

      alert("Account numbers do not match");

      return;

    }

    navigation.navigate("UpiPin", {

      accountHolderName,

      mobileNumber,

      bankName,

      accountNumber,

      confirmAccountNumber,

      ifscCode

    });

  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Add Bank Details (2/3)</Text>

      <TextInput

        placeholder="Account Number"

        style={styles.input}

        value={accountNumber}

        onChangeText={setAccountNumber}

        keyboardType="numeric"

      />

      <TextInput

        placeholder="Confirm Account Number"

        style={styles.input}

        value={confirmAccountNumber}

        onChangeText={setConfirmAccountNumber}

        keyboardType="numeric"

      />

      <TextInput

        placeholder="IFSC Code"

        style={styles.input}

        value={ifscCode}

        onChangeText={setIfscCode}

        autoCapitalize="characters"

      />

      <TouchableOpacity style={styles.button} onPress={handleNext}>
        <Text style={styles.buttonText}>Continue</Text>
      </TouchableOpacity>
    </View>

  );

}
