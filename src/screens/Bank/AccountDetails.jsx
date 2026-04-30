import React, { useState } from "react";

import { View, Text, TextInput, TouchableOpacity } from "react-native";

import styles from "./styles";

export default function AccountDetails({ navigation }) {

  const [accountHolderName, setAccountHolderName] = useState("");

  const [mobileNumber, setMobileNumber] = useState("");

  const [bankName, setBankName] = useState("");

  const handleNext = () => {

    if (!accountHolderName || !mobileNumber || !bankName) {

      alert("Please fill all fields");

      return;

    }

    navigation.navigate("AccountNumber", {

      accountHolderName,

      mobileNumber,

      bankName

    });

  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Add Bank Details (1/3)</Text>

      <TextInput

        placeholder="Account Holder Name"

        style={styles.input}

        value={accountHolderName}

        onChangeText={setAccountHolderName}

      />

      <TextInput

        placeholder="Mobile Number"

        style={styles.input}

        value={mobileNumber}

        onChangeText={setMobileNumber}

        keyboardType="phone-pad"

      />

      <TextInput

        placeholder="Bank Name"

        style={styles.input}

        value={bankName}

        onChangeText={setBankName}

      />

      <TouchableOpacity style={styles.button} onPress={handleNext}>
        <Text style={styles.buttonText}>Continue</Text>
      </TouchableOpacity>
    </View>

  );

}
