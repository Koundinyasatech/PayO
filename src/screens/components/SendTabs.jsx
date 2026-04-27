import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

export default function SendTabs({ activeTab, setActiveTab }) {
  return (
    <View style={styles.container}>
      
      {/* SCAN */}
      <TouchableOpacity
        style={[styles.tab, activeTab === "scan" && styles.activeTab]}
        onPress={() => setActiveTab("scan")}
      >
        <Text style={activeTab === "scan" ? styles.activeText : styles.text}>
          Scan QR
        </Text>
      </TouchableOpacity>

      {/* ADDRESS */}
      <TouchableOpacity
        style={[styles.tab, activeTab === "address" && styles.activeTab]}
        onPress={() => setActiveTab("address")}
      >
        <Text style={activeTab === "address" ? styles.activeText : styles.text}>
          Enter Address
        </Text>
      </TouchableOpacity>

      {/* RECENTS */}
      <TouchableOpacity
        style={[styles.tab, activeTab === "recents" && styles.activeTab]}
        onPress={() => setActiveTab("recents")}
      >
        <Text style={activeTab === "recents" ? styles.activeText : styles.text}>
          Recents
        </Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "rgba(255,255,255,0.08)", // soft glass
    borderRadius: 16,
    padding: 5,
    marginHorizontal: 28,   // ✅ center spacing
    marginTop: 15,
  },

  tab: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    borderRadius: 12,
  },

  activeTab: {
    backgroundColor: "#fff",
    borderRadius: 12,
    elevation: 4, // Android shadow
  },

  text: {
    color: "#d1d5db", // soft white
    fontSize: 13,
  },

  activeText: {
    color: "#000",
    fontWeight: "600",
    fontSize: 13,
  },
});