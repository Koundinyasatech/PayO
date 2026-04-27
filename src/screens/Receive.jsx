import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Share,
  ActivityIndicator,
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import Clipboard from "@react-native-clipboard/clipboard";
import api from "../api/axios";

const Receive = () => {
  const [qr, setQr] = useState(null);
  const [address, setAddress] = useState("");
  const [timer, setTimer] = useState(0);
  const [loading, setLoading] = useState(true);

  // ================= FETCH QR =================
  const fetchQr = async () => {
    try {
      setLoading(true);

      console.log("Calling API...");

      // ✅ Backend uses GET
      const res = await api.get("api/wallet/generate-address");
      const data = res.data;

      console.log("API RESPONSE:", data);

      // ✅ QR FIX (correct key: qr)
      const qrImage = data.qr?.startsWith("data:image")
        ? data.qr
        : `data:image/png;base64,${data.qr}`;

      setQr(qrImage);

      // ✅ ADDRESS FIX
      setAddress(data.address || "No Address");

      // ✅ TIMER FIX (expiresIn in seconds)
      setTimer(data.expiresIn || 900);

      setLoading(false);
    } catch (err) {
      console.log("QR ERROR:", err.response?.data || err.message);
      setQr(null);
      setAddress("");
      setTimer(0);
      setLoading(false);
    }
  };

  // ================= INITIAL LOAD =================
  useEffect(() => {
    fetchQr();
  }, []);

  // ================= TIMER =================
  useEffect(() => {
    if (timer <= 0) return;

    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timer]);

  // ================= AUTO REFRESH =================
  useEffect(() => {
    if (timer === 0 && !loading) {
      fetchQr();
    }
  }, [timer]);

  // ================= COPY =================
  const handleCopy = () => {
    Clipboard.setString(address);
  };

  // ================= SHARE =================
  const handleShare = async () => {
    try {
      await Share.share({
        message: address,
      });
    } catch (e) {
      console.log("Share error:", e);
    }
  };

  // ================= FORMAT TIMER =================
  const formatTime = () => {
    const m = Math.floor(timer / 60);
    const s = timer % 60;
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  return (
    <LinearGradient colors={["#6A0DAD", "#2E0854"]} style={styles.container}>
      <Text style={styles.title}>Receive Payo</Text>

      {/* ================= QR ================= */}
      <View style={styles.qrContainer}>
        {loading ? (
          <ActivityIndicator size="large" color="#6A0DAD" />
        ) : qr ? (
          <Image source={{ uri: qr }} style={styles.qrImage} />
        ) : (
          <Text style={styles.errorText}>Failed to load QR</Text>
        )}
      </View>

      {/* ================= ADDRESS ================= */}
      <View style={styles.addressBox}>
        <Text style={styles.label}>WALLET ADDRESS</Text>
        <Text style={styles.address}>
          {address || (loading ? "Loading..." : "Unavailable")}
        </Text>
      </View>

      {/* ================= BUTTONS ================= */}
      <View style={styles.row}>
        <TouchableOpacity style={styles.button} onPress={handleCopy}>
          <Text style={styles.buttonText}>Copy</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={handleShare}>
          <Text style={styles.buttonText}>Share</Text>
        </TouchableOpacity>
      </View>

      {/* ================= TIMER ================= */}
      <Text style={styles.timer}>
        {loading ? "Generating QR..." : `Expires in ${formatTime()}`}
      </Text>

      {/* ================= REGENERATE ================= */}
      <TouchableOpacity onPress={fetchQr} disabled={loading}>
        <Text style={styles.regenerate}>
          {loading ? "Generating..." : "Regenerate QR"}
        </Text>
      </TouchableOpacity>
    </LinearGradient>
  );
};

export default Receive;

// ================= STYLES =================
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 80,
    alignItems: "center",
  },
  title: {
    color: "#fff",
    fontSize: 20,
    marginBottom: 20,
    fontWeight: "600",
  },
  qrContainer: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 20,
    marginBottom: 20,
    width: 230,
    height: 230,
    justifyContent: "center",
    alignItems: "center",
  },
  qrImage: {
    width: 200,
    height: 200,
  },
  errorText: {
    color: "#999",
  },
  addressBox: {
    backgroundColor: "#7B2CBF",
    padding: 15,
    borderRadius: 10,
    width: "85%",
    marginBottom: 20,
  },
  label: {
    color: "#ccc",
    fontSize: 12,
  },
  address: {
    color: "#fff",
    fontSize: 12,
    marginTop: 5,
    fontWeight: "600",
  },
  row: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#9D4EDD",
    padding: 10,
    borderRadius: 8,
  },
  buttonText: {
    color: "#fff",
  },
  timer: {
    color: "#fff",
    marginBottom: 10,
  },
  regenerate: {
    color: "#ddd",
    textDecorationLine: "underline",
  },
});