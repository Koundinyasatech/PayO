import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    ActivityIndicator
} from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import LinearGradient from "react-native-linear-gradient";
import Icon from "react-native-vector-icons/Feather";
import api from "../../api/axios";
import styles from "./TransactionDetailStyles";
import { Share } from "react-native";
import RNFS from "react-native-fs";

export default function TransactionDetailScreen({ navigation }) {
    const route = useRoute();
    // const navigation = useNavigation();


    // ✅ get transactionId from previous screen
    const { transaction_id } = route.params || {};

    const [transaction, setTransaction] = useState(null);
    const [loading, setLoading] = useState(true);
    console.log(transaction_id, "check8")

    // ✅ API CALL
    useEffect(() => {
        const fetchTransaction = async () => {
            try {
                const res = await api.get(`/api/wallet/transactionById/${transaction_id}`);
                setTransaction(res.data);
            } catch (err) {
                console.log("Transaction API error:", err?.response || err.message);
            } finally {
                setLoading(false);
            }
        };

        if (transaction_id) {
            fetchTransaction();
        }
    }, [transaction_id]);



    const handleSendAgain = () => {
        if (!transaction) return;

        navigation.navigate("Main", {
            screen: "Send",
            params: {
                address: transaction.wallet,
                amount: transaction.amount,
            },
        });
    };

    const handleHistory = () => {
        navigation.navigate("Transactions");
    };

    const handleDownload = async () => {
        if (!transaction) return;

        try {
            const receipt = `
Transaction Receipt

To: ${transaction.name}
Amount: ${transaction.amount} PAYO
Transaction ID: ${transaction.id}
Wallet: ${transaction.wallet}
        `;

            const path = `${RNFS.DownloadDirectoryPath}/receipt_${transaction.id}.txt`;

            await RNFS.writeFile(path, receipt, "utf8");

            alert("Receipt saved to Downloads!");
        } catch (err) {
            console.log("Download error:", err);
            alert("Failed to download receipt");
        }
    };



    const handleShare = async () => {
        if (!transaction) return;

        try {
            const message = `
📄 Transaction Receipt

👤 To: ${transaction.name}
💰 Amount: ${transaction.amount} PAYO
🆔 Transaction ID: ${transaction.id}
🏦 Wallet: ${transaction.wallet}
        `;

            await Share.share({
                message,
            });
        } catch (err) {
            console.log("Share error:", err);
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
            {/* <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Icon name="arrow-left" size={22} color="#fff" />
                </TouchableOpacity>
                <Text style={styles.headerText}>Transaction Details</Text>
            </View> */}

            <View style={styles.header}>
  <TouchableOpacity
    style={styles.backBtn}
    onPress={() => navigation.goBack()}
  >
    <Icon name="arrow-left" size={22} color="#fff" />
  </TouchableOpacity>

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

                <TouchableOpacity style={styles.actionItem} onPress={handleSendAgain}>
                    <View style={styles.circle}>
                        <Icon name="arrow-up-right" size={18} color="#000" />
                    </View>
                    <Text style={styles.actionText}>Send again</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.actionItem} onPress={handleShare}>
                    <View style={styles.circle}>
                        <Icon name="share-2" size={18} color="#000" />
                    </View>
                    <Text style={styles.actionText}>Share Receipt</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.actionItem} onPress={handleHistory}>
                    <View style={styles.circle}>
                        <Icon name="clock" size={18} color="#000" />
                    </View>
                    <Text style={styles.actionText}>History</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.actionItem} onPress={handleDownload}>
                    <View style={styles.circle}>
                        <Icon name="download" size={18} color="#000" />
                    </View>
                    <Text style={styles.actionText}>Download</Text>
                </TouchableOpacity>

            </View>

        </LinearGradient>
    );
}