
import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import styles from './homeStyling';
import api from '../../api/axios';
import Header from '../components/header';
import Icon from 'react-native-vector-icons/Feather';

import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';

export default function HomeScreen({ navigation }) {

  const [balanceVisible, setBalanceVisible] = useState(false);
  const [transactionsList, setTransactionsList] = useState([]);

  // VIEW ALL + VIEW MORE
  const [showAll, setShowAll] = useState(false);
  const [visibleCount, setVisibleCount] = useState(10);

  // PAGINATION
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const [avaliable, setAvaliable] = useState("");
  const [totalBalance, setTotalBalance] = useState("");

  // DISPLAY LOGIC
  const displayedTransactions = showAll
    ? transactionsList.slice(0, visibleCount)
    : transactionsList.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
    );

  // PAGINATION
  const totalPages = Math.ceil(transactionsList.length / itemsPerPage);

  const getVisiblePages = () => {

    let pages = [];

    const visibleCountPages = 5;

    let startPage = currentPage - 2;
    let endPage = currentPage + 2;

    if (startPage < 1) {
      startPage = 1;
      endPage = visibleCountPages;
    }

    if (endPage > totalPages) {

      endPage = totalPages;
      startPage = totalPages - visibleCountPages + 1;

      if (startPage < 1) {
        startPage = 1;
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return pages;
  };

  const fetchTotalBalance = async () => {

    try {

      const res = await api.get('/api/wallet/income-outcome');

      setTotalBalance(res?.data || []);

    } catch (err) {

      console.log('Transaction error:', err.message);

    }
  };

  const fetchTransactions = async () => {

    try {

      const res = await api.get('/api/wallet/transaction-list');

      const transactions = res?.data?.transactions || [];

      const filteredTransactions = transactions?.filter(
        (item) => !(item?.status === 'failed' && item?.type === 'received')
      );

      setTransactionsList(filteredTransactions);

    } catch (err) {

      console.log('Transaction error:', err.message);

    }
  };

  const fetchBalance = async () => {

    try {

      const response = await api.get('/api/wallet/balance');

      setAvaliable(response?.data?.balance || "0");

    } catch (error) {

      console.log("Error fetching balance:", error);

    }
  };

  useFocusEffect(
    useCallback(() => {

      fetchBalance();
      fetchTransactions();
      fetchTotalBalance();

    }, [])
  );

  return (

    <View style={styles.container}>

      <Header />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 120 }}
      >

        {/* CARD */}
        <View style={styles.cardContainer}>

          <View style={styles.card}>

            <View style={styles.topRightCurve} />
            <View style={styles.bottomLeftCurve} />

            <View>

              <Text style={styles.balanceLabel}>
                Total Balance
              </Text>

              <View style={styles.balanceRow}>

                <Text style={styles.balanceAmount}>
                  {balanceVisible ? ` ${avaliable}` : '* * * * * *'}
                </Text>

                <Text style={styles.payoLabel}>
                  PAYO
                </Text>

              </View>

            </View>

            <View style={styles.cardRight}>

              <TouchableOpacity
                onPress={() => setBalanceVisible(!balanceVisible)}
              >
                <Icon
                  name={balanceVisible ? "eye" : "eye-off"}
                  size={18}
                  color="#fff"
                />
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.walletRow}
                onPress={() => navigation.navigate('Wallets')}
              >

                <Text style={styles.walletText}>
                  My Wallet
                </Text>

                <View style={styles.arrowCircle}>
                  <Icon name="arrow-right" size={14} color="#000" />
                </View>

              </TouchableOpacity>

            </View>

          </View>

        </View>

        {/* ACTIONS */}
        <View style={styles.actionsContainer}>

          <View style={styles.actions}>

            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate('SendScreen', { tab: 'scan' })}
            >

              <View style={styles.iconCircle}>
                <Icon name="arrow-up-right" size={14} color="#fff" />
              </View>

              <Text style={styles.label}>
                Send
              </Text>

            </TouchableOpacity>

            <View style={styles.connector} />

            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate('Receive')}
            >

              <View style={styles.iconCircle}>
                <Icon name="arrow-down-left" size={14} color="#fff" />
              </View>

              <Text style={styles.label}>
                Receive
              </Text>

            </TouchableOpacity>

            <View style={styles.connector} />

            <View style={styles.actionBlock}>

              <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate("ReferEarn")}
              >

                <View style={styles.iconCircle}>
                  <Icon name="arrow-up-right" size={14} color="#fff" />
                </View>

                <Text style={styles.label}>
                  Refer
                </Text>

              </TouchableOpacity>

            </View>

          </View>

        </View>

        {/* STATS */}
        <View style={styles.statsContainer}>

          <View style={styles.statsCard}>

            <View style={styles.statItem}>

              <Icon name="arrow-down" size={28} color="#53D258" />

              <View style={styles.textBlock}>

                <Text style={styles.statLabel}>
                  Income
                </Text>

                <View style={styles.amountRow}>

                  <Text style={styles.statValue}>
                    {totalBalance?.income}
                  </Text>

                  <Text style={styles.unit}>
                    PAYO
                  </Text>

                </View>

              </View>

            </View>

            <View style={styles.divider} />

            <View style={styles.statItem}>

              <Icon name="arrow-up" size={28} color="#FF6B6B" />

              <View style={styles.textBlock}>

                <Text style={styles.statLabel}>
                  Outcome
                </Text>

                <View style={styles.amountRow}>

                  <Text style={styles.statValue}>
                    {totalBalance?.outcome}
                  </Text>

                  <Text style={styles.unit}>
                    PAYO
                  </Text>

                </View>

              </View>

            </View>

          </View>

        </View>

        {/* TRANSACTION HEADER */}
        <View style={styles.transactionsHeader}>

          <Text style={styles.transactionsTitle}>
            Recent Transactions
          </Text>

          {/* SHOW ONLY IF MORE THAN 5 TRANSACTIONS */}
          {transactionsList.length > 5 && (

            <TouchableOpacity
              onPress={() => {

                if (showAll) {

                  setShowAll(false);
                  setVisibleCount(10);

                } else {

                  setShowAll(true);
                  setVisibleCount(10);

                }

              }}
            >

              <Text style={styles.viewAllText}>
                {showAll ? "Show Less ›" : "View All ›"}
              </Text>

            </TouchableOpacity>

          )}

        </View>

        {/* TRANSACTIONS */}
        {transactionsList?.length > 0 ? (

          <>

            <View
              style={[
                styles.transactionsList,
                {
                  minHeight: 300,
                },
              ]}
            >

              {displayedTransactions.map((transaction, index) => (

                <TouchableOpacity
                  key={index}
                  style={styles.transactionItem}
                  activeOpacity={0.7}
                  onPress={() =>
                    navigation.navigate("TransactionDetailScreen", {
                      transaction_id: transaction?.id,
                    })
                  }
                >

                  {/* LEFT */}
                  <View style={styles.transactionLeft}>

                    <View
                      style={[
                        styles.transactionAvatar,
                        {
                          backgroundColor:
                            transaction.status === "failed"
                              ? "#FEE2E2"
                              : transaction.amount > 0
                                ? "#56F27B"
                                : "#E5E7EB",
                        },
                      ]}
                    >

                      {transaction.status === "failed" ? (

                        <Icon name="alert-circle" size={18} color="red" />

                      ) : transaction.amount > 0 ? (

                        <Icon name="arrow-down" size={18} color="black" />

                      ) : (

                        <Icon name="arrow-up-right" size={18} color="black" />

                      )}

                    </View>

                    <View style={styles.transactionInfo}>

                      <Text style={styles.transactionName}>
                        {transaction.name}
                      </Text>

                      <Text style={styles.transactionTime}>
                        {new Date(transaction.createdAt).toLocaleString()}
                      </Text>

                    </View>

                  </View>

                  {/* RIGHT */}
                  <View style={styles.amountBlock}>

                    <View style={styles.amountRow}>

                      <Text
                        style={[
                          styles.transactionAmount,
                          transaction.amount > 0
                            ? styles.amountPositive
                            : styles.amountNegative,
                        ]}
                      >

                        {transaction.amount > 0 ? "+" : ""}
                        {transaction.amount}

                      </Text>

                    </View>

                    <Text
                      style={[
                        styles.statusText,
                        transaction.status === "failed" && { color: "red" },
                      ]}
                    >

                      {transaction.status === "failed"
                        ? "Failed"
                        : transaction.amount > 0
                          ? "Received"
                          : "Sent"}

                    </Text>

                  </View>

                </TouchableOpacity>

              ))}

            </View>

            {/* VIEW MORE BUTTON */}
            {showAll && visibleCount < transactionsList.length && (

              <TouchableOpacity
                onPress={() => setVisibleCount(visibleCount + 10)}
                style={{
                  backgroundColor: '#F5E98B',
                  alignSelf: 'center',
                  paddingHorizontal: 22,
                  paddingVertical: 10,
                  borderRadius: 25,
                  marginTop: 15,
                  marginBottom: 40,
                }}
              >

                <Text
                  style={{
                    color: '#000',
                    fontWeight: '700',
                    fontSize: 15,
                  }}
                >
                  View More
                </Text>

              </TouchableOpacity>

            )}

            {/* PAGINATION ONLY WHEN SHOW LESS */}
            {!showAll && totalPages > 1 ? (

              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: -105,
                  marginBottom: 55,
                }}
              >

                {currentPage > 1 && (

                  <TouchableOpacity
                    onPress={() => setCurrentPage(currentPage - 1)}
                    style={{
                      width: 34,
                      height: 34,
                      justifyContent: "center",
                      alignItems: "center",
                      marginRight: 6,
                    }}
                  >

                    <Text
                      style={{
                        color: "#fff",
                        fontSize: 26,
                        fontWeight: "300",
                      }}
                    >
                      ‹
                    </Text>

                  </TouchableOpacity>

                )}

                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >

                  {getVisiblePages().map((page) => (

                    <TouchableOpacity
                      key={page}
                      onPress={() => setCurrentPage(page)}
                      style={{
                        width: 36,
                        height: 36,
                        borderRadius: 10,
                        justifyContent: "center",
                        alignItems: "center",
                        backgroundColor:
                          currentPage === page
                            ? "#fff"
                            : "transparent",
                        marginHorizontal: 2,
                      }}
                    >

                      <Text
                        style={{
                          color:
                            currentPage === page
                              ? "#000"
                              : "#fff",
                          fontSize: 16,
                          fontWeight: "700",
                        }}
                      >
                        {page}
                      </Text>

                    </TouchableOpacity>

                  ))}

                </View>

                {currentPage < totalPages && (

                  <TouchableOpacity
                    onPress={() => setCurrentPage(currentPage + 1)}
                    style={{
                      width: 34,
                      height: 34,
                      justifyContent: "center",
                      alignItems: "center",
                      marginLeft: 6,
                    }}
                  >

                    <Text
                      style={{
                        color: "#fff",
                        fontSize: 26,
                        fontWeight: "300",
                      }}
                    >
                      ›
                    </Text>

                  </TouchableOpacity>

                )}

              </View>

            ) : null}

          </>

        ) : (

          <View style={{ alignItems: 'center', marginTop: 50 }}>

            <Icon name="file-text" size={60} color="#c4b5fd" />

            <Text
              style={{
                color: '#fff',
                fontSize: 18,
                fontWeight: '600',
                marginTop: 15,
              }}
            >
              No Transactions Found
            </Text>

            <Text
              style={{
                color: '#d1d5db',
                fontSize: 14,
                marginTop: 6,
              }}
            >
              Your transaction history will appear here
            </Text>

          </View>

        )}

      </ScrollView>

    </View>
  );
}

