import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

export default function SendTabs({ activeTab, setActiveTab }) {
  return (
    <View style={styles.container}>
      
      <TouchableOpacity
        style={[styles.tab, activeTab === "scan" && styles.activeTab]}
        onPress={() => setActiveTab("scan")}
      >
        <Text style={activeTab === "scan" ? styles.activeText : styles.text}>
          Scan QR
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.tab, activeTab === "address" && styles.activeTab]}
        onPress={() => setActiveTab("address")}
      >
        <Text style={activeTab === "address" ? styles.activeText : styles.text}>
          Enter Address
        </Text>
      </TouchableOpacity>

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
    backgroundColor: "#5E2CA5",
    borderRadius: 12,
    padding: 4,
    marginVertical: 15,
  },

  tab: {
    flex: 1,
    alignItems: "center",
    padding: 10,
    borderRadius: 10,
  },

  activeTab: {
    backgroundColor: "#fff",
  },

  text: {
    color: "#fff",
  },

  activeText: {
    color: "#000",
    fontWeight: "600",
  },
});
