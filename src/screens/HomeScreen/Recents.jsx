import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
} from "react-native";

import api from "../../api/axios";

export default function Recents({ navigation }) {
  const [recents, setRecents] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchRecents = async () => {
    try {
      setLoading(true);
      const res = await api.get("");
      setRecents(res.data);
    } catch (err) {
      console.log("Recents error:", err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecents();
  }, []);

  const formatTime = (timestamp) => {
    const now = new Date();
    const date = new Date(timestamp);
    const diff = (now - date) / (1000 * 60 * 60);

    if (diff < 1) return "Just now";
    if (diff < 24) return `${Math.floor(diff)} hours ago`;
    if (diff < 48) return "Yesterday";
    return date.toLocaleDateString();
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() =>
        navigation.navigate("enterAmount", {
          address: item.walletAddress,
          name: item.name,
        })
      }
    >
      <View style={styles.left}>
        <View style={styles.icon}>
          <Text style={{ fontSize: 12 }}>↗</Text>
        </View>

        <View>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.address}>{item.walletAddress}</Text>
        </View>
      </View>

      <Text style={styles.time}>{formatTime(item.createdAt)}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      
      <Text style={styles.section}>Recent Contacts</Text>

      {loading ? (
        <ActivityIndicator color="#fff" />
      ) : (
        <FlatList
          data={recents}
          keyExtractor={(item) => item._id}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
        />
      )}

    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
  },

  section: {
    color: "#fff",
    fontSize: 14,
    marginBottom: 12,
  },

  card: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#6A35C1",
    padding: 14,
    borderRadius: 12,
    marginBottom: 10,
  },

  left: {
    flexDirection: "row",
    alignItems: "center",
  },

  icon: {
    backgroundColor: "#7CFC00",
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },

  name: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 14,
  },

  address: {
    color: "#ccc",
    fontSize: 11,
  },

  time: {
    color: "#fff",
    fontSize: 12,
  },
});