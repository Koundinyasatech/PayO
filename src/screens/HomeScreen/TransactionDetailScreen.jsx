import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    ActivityIndicator
} from "react-native";
import { useRoute } from "@react-navigation/native";
import LinearGradient from "react-native-linear-gradient";
import Icon from "react-native-vector-icons/Feather";
import api from "../../api/axios";
import styles from "./TransactionDetailStyles";

export default function TransactionDetailScreen() {
    const route = useRoute();

    // ✅ get transactionId from previous screen
    const { transaction_id } = route.params || {};

    const [transaction, setTransaction] = useState(null);
    const [loading, setLoading] = useState(true);

    // ✅ API CALL
    useEffect(() => {
        fetchTransaction();
    }, []);

    const fetchTransaction = async () => {
        try {
            const res = await api.get(`/api/wallet/transactionById/${transaction_id}`);
            // your backend returns { status, transaction }
            setTransaction(res.data);

        } catch (err) {
            console.log("Transaction API error:", err?.response || err.message);
        } finally {
            setLoading(false);
        }
    };

    // ✅ loading UI
    if (loading) {
        return (
            <LinearGradient colors={["#5B0FD1", "#14002B"]} style={styles.container}>
                <ActivityIndicator size="large" color="#fff" />
            </LinearGradient>
        );
    }

    return (
        <LinearGradient colors={["#5B0FD1", "#14002B"]} style={styles.container}>

            {/* HEADER */}
            <View style={styles.header}>
                <Icon name="arrow-left" size={22} color="#fff" />
                <Text style={styles.headerText}>Transaction Details</Text>
            </View>

            {/* PAID TO */}
            <View style={styles.section}>
                <Text style={styles.smallLabel}>Paid to</Text>

                <View style={styles.row}>
                    <View style={styles.userRow}>
                        <View style={styles.iconBox}>
                            <Icon name="arrow-up-right" size={14} color="#000" />
                        </View>

                        <Text style={styles.name}>
                            {transaction?.name || "Unknown"}
                        </Text>
                    </View>

                    <Text style={styles.amount}>
                        {transaction?.amount}{" "}
                        <Text style={styles.payo}>PAYO</Text>
                    </Text>
                </View>
            </View>

            <View style={styles.divider} />

            {/* PAYMENT DETAILS */}
            <View style={styles.section}>
                <View style={styles.paymentHeader}>
                    <Icon name="file-text" size={16} color="#ddd" />
                    <Text style={styles.paymentTitle}>Payment Details</Text>
                </View>

                <Text style={styles.label}>Paid Via</Text>
                <View style={styles.valueRow}>
                    <Text style={styles.value}>
                        Wallet: {transaction?.wallet}
                    </Text>
                    <Icon name="copy" size={16} color="#ccc" />
                </View>

                <Text style={styles.label}>Transaction ID</Text>
                <View style={styles.valueRow}>
                    <Text style={styles.value}>
                        {transaction?.id}
                    </Text>
                    <Icon name="copy" size={16} color="#ccc" />
                </View>
            </View>

            <View style={styles.divider} />

            {/* ACTIONS */}
            <View style={styles.actionsRow}>

                <View style={styles.actionItem}>
                    <View style={styles.circle}>
                        <Icon name="arrow-up-right" size={18} color="#000" />
                    </View>
                    <Text style={styles.actionText}>Send again</Text>
                </View>

                <View style={styles.actionItem}>
                    <View style={styles.circle}>
                        <Icon name="share-2" size={18} color="#000" />
                    </View>
                    <Text style={styles.actionText}>Share Receipt</Text>
                </View>

            </View>

        </LinearGradient>
    );
}