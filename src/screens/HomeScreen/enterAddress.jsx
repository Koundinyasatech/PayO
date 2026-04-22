// import React, { useState, useEffect } from "react";
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
// } from "react-native";

// import styles from "./enterAddressStyling";
// import { useRoute } from "@react-navigation/native";
// import api from "../../api/axios";

// export default function EnterAddressScreen({ navigation }) {
//   const route = useRoute();

//   const [address, setAddress] = useState("");
//   const [amount, setAmount] = useState("");
//   const [receiverData, setReceiverData] = useState(null);
//   const [loading, setLoading] = useState(false);

//   /* ✅ NEW STATE */
//   const [balance, setBalance] = useState(null);

//   useEffect(() => {
//     if (route.params?.address) setAddress(route.params.address);
//   }, [route.params]);

//   // 🔥 FETCH USER (UNCHANGED)
//   useEffect(() => {
//     const fetchUser = async () => {
//       if (!address || address.length < 5) {
//         setReceiverData(null);
//         return;
//       }

//       try {
//         setLoading(true);
//         const res = await api.get(`/api/wallet/user/${address}`);
//         setReceiverData(res.data);
//       } catch {
//         setReceiverData(null);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchUser();
//   }, [address]);

//   /* 🔥 NEW: FETCH BALANCE */
//   useEffect(() => {
//     const fetchBalance = async () => {
//       try {
//         const res = await api.get("/api/wallet/balance");
//         setBalance(res.data.balance);
//       } catch (err) {
//         console.log("Balance error:", err.response?.data || err.message);
//       }
//     };

//     fetchBalance();
//   }, []);

//   // 🔥 PREVIEW TRANSFER (UNCHANGED)
//   const handleNext = async () => {
//     if (!address || !receiverData) {
//       alert("Enter valid wallet address");
//       return;
//     }

//     try {
//       const res = await api.post("/api/wallet/transfer/preview", {
//         toAddress: address,
//         amount: amount || 100,
//       });

//       navigation.navigate("review", {
//         receiver: { name: res.data.receiverName },
//         address: res.data.address,
//         amount: res.data.amount,
//       });
//     } catch (err) {
//       alert(err.response?.data?.message || "Error");
//     }
//   };

//   return (
//     // <LinearGradient
//     //   colors={["#6A00F4", "#1A0033"]}
//     //   style={{ flex: 1 }}
//     // >
//       <SafeAreaView style={styles.container}>

//         {/* ADDRESS */}
//         <Text style={styles.label}>Recipient Wallet Address</Text>
//         <TextInput
//           placeholder="0.00"
//           placeholderTextColor="#aaa"
//           value={amount}
//           onChangeText={setAmount}
//           style={styles.amountInput}
//           keyboardType="numeric"
//         />
//         <Text style={styles.token}>PAYO</Text>
//       </View>

//       {/* QUICK BUTTONS */}
//       <View style={styles.quickRow}>
//         {[100, 300, 500, 700].map((val) => (
//           <TouchableOpacity
//             key={val}
//             style={styles.quickBtn}
//             onPress={() => setAmount(val.toString())}
//           >
//             <Text style={styles.quickText}>{val}</Text>
//           </TouchableOpacity>
//         ))}
//       </View>

//       {/* BALANCE (UPDATED) */}
//       <View style={styles.balanceBox}>
//         <Text style={styles.balanceText}>Available balance</Text>
//         <Text style={styles.balanceAmount}>
//           {balance !== null ? `${balance.toLocaleString()} PAYO` : "Loading..."}
//         </Text>
//       </View>

//       {/* BUTTON */}
//       <TouchableOpacity style={styles.button} onPress={handleNext}>
//         <Text style={styles.buttonText}>Review and send</Text>
//       </TouchableOpacity>

//         {/* BALANCE */}
//         <View style={styles.balanceBox}>
//           <Text style={styles.balanceText}>Available balance</Text>
//           <Text style={styles.balanceAmount}>8,420.50 PAYO</Text>
//         </View>

//         {/* BUTTON */}
//         <TouchableOpacity style={styles.button} onPress={handleNext}>
//           <Text style={styles.buttonText}>Review and send</Text>
//         </TouchableOpacity>

//       </SafeAreaView>
//     // </LinearGradient>
//   );
// }


import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import LinearGradient from "react-native-linear-gradient";

import styles from "./enterAddressStyling";
import { useRoute } from "@react-navigation/native";
import api from "../../api/axios";

export default function EnterAddressScreen({ navigation }) {
  const route = useRoute();

  const [activeTab, setActiveTab] = useState("address");
  const [address, setAddress] = useState("");
  const [amount, setAmount] = useState("");
  const [receiverData, setReceiverData] = useState(null);
  const [loading, setLoading] = useState(false);
   const[avaliable,setAvaliable] =useState("");

  useEffect(() => {
    if (route.params?.address) setAddress(route.params.address);
    if (route.params?.tab) setActiveTab(route.params.tab);
  }, [route.params]);

  // 🔥 FETCH USER
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

 


  // 🔥 PREVIEW TRANSFER
const handleNext = async () => {
  if (!address || !receiverData?.walletAddress) {
    alert("Enter valid wallet address");
    return;
  }

  try {
    const res = await api.post("/api/wallet/transfer/preview", {
      toAddress: address,
      amount: amount,
    });

    console.log("PREVIEW RESPONSE 👉", res.data);

    navigation.navigate("review", {
      receiver: { name: res.data.receiverName },
      address: res.data.toAddress || address,
      amount: res.data.amount,
    });

  } catch (err) {
    console.log("ERROR 👉", err.response || err);
    // alert(err.response?.data?.message || "Error");
  }
};

   useEffect(() => {
  const fetchBalance = async () => {
    try {
      const response = await api.get('/api/wallet/balance'); // ✅ await هنا

      console.log(response.data, "997"); // now you'll see real data

      // adjust based on API
      setAvaliable(response?.data?.balance || "0");

    } catch (error) {
      console.log("Error fetching balance:", error);
    }
  };

  fetchBalance();
}, []);

  return (
    // <LinearGradient
    //   colors={["#6A00F4", "#1A0033"]}
    //   style={{ flex: 1 }}
    // >
      <SafeAreaView style={styles.container}>

        {/* ADDRESS */}
        <Text style={styles.label}>Recipient Wallet Address</Text>
        <TextInput
          placeholder="PXY21209E..."
          placeholderTextColor="#aaa"
          value={address}
          onChangeText={setAddress}
          style={styles.input}
        />

        {/* USER NAME */}
        {loading ? (
          <Text style={styles.infoText}>Checking...</Text>
        ) : receiverData ? (
          <Text style={styles.successText}>{receiverData.name}</Text>
        ) : address.length > 5 ? (
          <Text style={styles.errorText}>User not found</Text>
        ) : null}

        {/* TOKENS */}
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

        {/* QUICK BUTTONS */}
        <View style={styles.quickRow}>
          {[100, 300, 500, 700].map((val) => (
            <TouchableOpacity
              key={val}
              style={styles.quickBtn}
              onPress={() => setAmount(val.toString())}
            >
              <Text style={styles.quickText}>{val}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* BALANCE */}
        <View style={styles.balanceBox}>
          <Text style={styles.balanceText}>Available balance</Text>
          <Text style={styles.balanceAmount}>{avaliable}</Text>
        </View>

        {/* BUTTON */}
        <TouchableOpacity style={styles.button} onPress={handleNext}>
          <Text style={styles.buttonText}>Review and send</Text>
        </TouchableOpacity>

      </SafeAreaView>
    // </LinearGradient>
  );
}