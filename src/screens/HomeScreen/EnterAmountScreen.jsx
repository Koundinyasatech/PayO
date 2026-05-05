import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import api from '../../api/axios';
import { useRoute } from "@react-navigation/native";

export default function EnterAmountScreen({ navigation }) {
  const route = useRoute();

  // ✅ Safe params (works for both flows)
  const { name = "Unknown", address = "", amount: initialAmount = "" } = route.params || {};

  const [amount, setAmount] = useState(initialAmount);
  const [available, setAvailable] = useState("");

  // 🔥 Fetch balance
  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const response = await api.get('/api/wallet/balance');
        setAvailable(response?.data?.balance || "0");
      } catch (error) {
        console.log("Error fetching balance:", error);
      }
    };

    fetchBalance();
  }, []);

  return (
    <LinearGradient
      colors={["#6A00F4", "#1A0033"]}
      style={{ flex: 1 }}
    >
      <View style={styles.container}>

        {/* 🔙 Cancel Button */}
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.cancel}>Cancel</Text>
        </TouchableOpacity>

        {/* Title */}
        <Text style={styles.title}>Total Tokens Transfer Details</Text>

        {/* 💜 Amount Card */}
        <View style={styles.amountCard}>
          <View style={styles.amountRow}>
            <TextInput
              style={styles.amountInput}
              value={amount}
              onChangeText={(text) => {
                const cleaned = text.replace(/[^0-9]/g, '');
                setAmount(cleaned);
              }}
              keyboardType="numeric"
              placeholder="0.00"
              placeholderTextColor="#eee"
              cursorColor="#fff"
            />
            <Text style={styles.currency}> PAYO</Text>
          </View>
        </View>

        {/* User Details */}
        <Text style={styles.toText}>To - {name}</Text>
        <Text style={styles.address}>{address}</Text>

        {/* Quick Amount Buttons */}
        <View style={styles.row}>
          {['100', '300', '500', '700'].map((val) => (
            <TouchableOpacity
              key={val}
              style={styles.quickBtn}
              onPress={() => setAmount(val)}
            >
              <Text style={styles.quickText}>{val}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Balance */}
        <View style={styles.balanceBox}>
          <Text style={styles.balanceText}>Available balance</Text>
          <Text style={styles.balanceAmount}>{available}</Text>
        </View>

        {/* Continue Button */}
        <TouchableOpacity
          style={styles.continueBtn}
          onPress={() =>
            navigation.navigate('SendPin', {
              amount,
              name,
              address,
            })
          }
        >
          <Text style={styles.continueText}>Continue</Text>
        </TouchableOpacity>

      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },

  cancel: {
    color: '#fff',
    fontSize: 16,
    marginBottom: 20,
  },

  title: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
    marginBottom: 25,
  },

  amountCard: {
    backgroundColor: '#9B6DFF',
    borderRadius: 20,
    paddingVertical: 25,
    paddingHorizontal: 30,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    width: '80%',
    marginBottom: 30,
  },

  amountRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  amountInput: {
    fontSize: 36,
    color: '#fff',
    fontWeight: '700',
    textAlign: 'center',
  },

  currency: {
    fontSize: 16,
    color: '#00FFD1',
    marginLeft: 6,
    fontWeight: '600',
  },

  toText: {
    color: '#fff',
    textAlign: 'center',
    marginBottom: 5,
  },

  address: {
    color: '#ccc',
    textAlign: 'center',
    marginBottom: 30,
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
  },

  quickBtn: {
    backgroundColor: '#E5E5E5',
    paddingVertical: 10,
    borderRadius: 8,
    width: 60,
    alignItems: 'center',
  },

  quickText: {
    fontWeight: '500',
  },

  balanceBox: {
    backgroundColor: "#7B3FE4",
    borderRadius: 14,
    paddingVertical: 14,
    paddingHorizontal: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },

  balanceText: {
    color: "#ddd",
    fontSize: 12,
  },

  balanceAmount: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 14,
    textAlign: "right",
  },

  continueBtn: {
    backgroundColor: '#16A34A',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },

  continueText: {
    color: '#fff',
    fontWeight: '600',
  },
});