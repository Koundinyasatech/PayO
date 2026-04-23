import React, { useState, useEffect } from "react";

import {

  View,

  Text,

  TextInput,

  TouchableOpacity,

} from "react-native";

import styles from "./enterAddressStyling";

import { useRoute } from "@react-navigation/native";

import api from "../../api/axios";

export default function EnterAddressScreen({ navigation }) {

  const route = useRoute();

  const [address, setAddress] = useState("");

  const [amount, setAmount] = useState("");

  const [receiverData, setReceiverData] = useState(null);

  const [loading, setLoading] = useState(false);

  const [balance, setBalance] = useState(null);

  useEffect(() => {

    if (route.params?.address) setAddress(route.params.address);

  }, [route.params]);

  // 🔥 FETCH RECEIVER USER

  useEffect(() => {

    const fetchUser = async () => {

      if (!address || address.length < 5) {

        setReceiverData(null);

        return;

      }

      try {

        setLoading(true);

        const res = await api.get(`/api/wallet/user/${address}`);

        setReceiverData(res.data);

      } catch {

        setReceiverData(null);

      } finally {

        setLoading(false);

      }

    };

    fetchUser();

  }, [address]);

  // 🔥 FETCH BALANCE

  useEffect(() => {

    const fetchBalance = async () => {

      try {

        const res = await api.get("/api/wallet/balance");

        setBalance(res.data.balance);

      } catch (err) {

        console.log("Balance error:", err.response?.data || err.message);

      }

    };

    fetchBalance();

  }, []);

  // 🔥 PREVIEW TRANSFER (FIXED)

  const handleNext = async () => {

    if (!address || !receiverData) {

      alert("Enter valid wallet address");

      return;

    }

    try {

      const res = await api.post("/api/wallet/transfer/preview", {

        toAddress: address,

        amount: amount || 100,

      });

      console.log("PREVIEW RESPONSE:", res.data); // DEBUG

      navigation.navigate("review", {

        receiver: res.data.receiver,

        sender: res.data.sender,

        amount: res.data.amount,

        address: res.data.address,

      });

    } catch (err) {

      console.log("ERROR:", err.response?.data || err.message);

      alert(err.response?.data?.message || "Error");

    }

  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Recipient Wallet Address</Text>
      <TextInput

        placeholder="PXY21209E..."

        placeholderTextColor="#aaa"

        value={address}

        onChangeText={setAddress}

        style={styles.input}

      />

      {loading ? (
        <Text style={styles.infoText}>Checking...</Text>

      ) : receiverData ? (
        <Text style={styles.successText}>{receiverData.name}</Text>

      ) : address.length > 5 ? (
        <Text style={styles.errorText}>User not found</Text>

      ) : null}

      <Text style={styles.label}>Tokens</Text>
      <View style={styles.amountRow}>
        <TextInput

          placeholder="0.00"

          placeholderTextColor="#aaa"

          value={amount}

          onChangeText={setAmount}

          style={styles.amountInput}

          keyboardType="numeric"

        />
        <Text style={styles.token}>PAYO</Text>
      </View>

      <View style={styles.balanceBox}>
        <Text style={styles.balanceText}>Available balance</Text>
        <Text style={styles.balanceAmount}>

          {balance !== null ? `${balance} PAYO` : "Loading..."}
        </Text>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleNext}>
        <Text style={styles.buttonText}>Review and send</Text>
      </TouchableOpacity>
    </View>

  );

}
