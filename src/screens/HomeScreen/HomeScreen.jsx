import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Platform,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Feather';

const transactions = [
  { id: '1', name: 'Priya Mehta', amount: '+1000.0' },
  { id: '2', name: 'Priya Mehta', amount: '-250.0' },
  { id: '3', name: 'Priya Mehta', amount: '-500.0' },
  { id: '4', name: 'Priya Mehta', amount: '+1000.0' },
];

export default function HomeScreen({ navigation }) {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar barStyle="light-content" backgroundColor="#6a11cb" />

      <LinearGradient colors={['#6a11cb', '#3a0ca3']} style={styles.container}>

        {/* HEADER */}
        <View style={styles.header}>
          <Icon name="menu" size={24} color="white" />
          <View style={styles.profile}>
            <Icon name="user" size={18} color="white" />
          </View>
        </View>

        {/* BALANCE CARD */}
        <View style={styles.balanceCard}>
          <Text style={styles.balanceTitle}>Total Balance</Text>

          <View style={styles.balanceRow}>
            <Text style={styles.balanceAmount}>*****</Text>
            <Text style={styles.payo}> PAYO</Text>
            <Icon name="eye-off" size={20} color="#ccc" style={styles.eyeIcon} />
          </View>

          <TouchableOpacity style={styles.walletRow}>
            <Text style={styles.walletText}>My Wallet</Text>
            <Icon name="arrow-right" size={18} color="black" />
          </TouchableOpacity>
        </View>

        {/* ACTION BUTTONS */}
        <View style={styles.actionsWrapper}>
          <ActionPill
            icon="arrow-up-right"
            text="Send"
            onPress={() => navigation.navigate('ScanQR')}
          />

          <View style={styles.connector} />

          <ActionPill
            icon="arrow-down-left"
            text="Receive"
            onPress={() => navigation.navigate('Receive')}
          />

          <View style={styles.connector} />

          {/* ✅ FIXED REFER BUTTON */}
          <ActionPill
            icon="user-plus"
            text="Refer"
            onPress={() => navigation.navigate('ReferEarn')}
          />
        </View>

        {/* TRANSACTIONS */}
        <View style={styles.transHeader}>
          <Text style={styles.transTitle}>Recent Transaction</Text>
          <Text style={styles.viewAll}>View All &gt;</Text>
        </View>

        <FlatList
          data={transactions}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 120 }}
          renderItem={({ item }) => (
            <View style={styles.transItem}>
              <View style={styles.avatar} />
              <View style={{ flex: 1 }}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.time}>Today 9:10 PM</Text>
              </View>
              <Text
                style={[
                  styles.amountText,
                  { color: item.amount.includes('+') ? '#00ff9f' : '#ff4d4d' },
                ]}
              >
                {item.amount}
              </Text>
            </View>
          )}
        />

      </LinearGradient>
    </SafeAreaView>
  );
}

/* ACTION BUTTON */
const ActionPill = ({ icon, text, onPress }) => (
  <TouchableOpacity onPress={onPress} style={{ flex: 1 }}>
    <LinearGradient
      colors={['#f6d365', '#fda085']}
      style={styles.actionPill}
    >
      <View style={styles.iconCircle}>
        <Icon name={icon} size={14} color="white" />
      </View>
      <Text style={styles.actionText}>{text}</Text>
    </LinearGradient>
  </TouchableOpacity>
);

/* STYLES (UNCHANGED) */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  profile: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#ffffff30',
    justifyContent: 'center',
    alignItems: 'center',
  },
  balanceCard: {
    backgroundColor: '#1f1f1f',
    padding: 20,
    borderRadius: 25,
  },
  balanceTitle: { color: '#ccc' },
  balanceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  balanceAmount: {
    color: 'white',
    fontSize: 28,
  },
  payo: {
    color: '#7CFCB2',
    marginLeft: 5,
  },
  eyeIcon: {
    position: 'absolute',
    right: 0,
  },
  walletRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 10,
  },
  walletText: { color: 'black' },
  actionsWrapper: {
    flexDirection: 'row',
    marginVertical: 20,
    alignItems: 'center',
  },
  connector: {
    width: 10,
    height: 2,
    backgroundColor: '#f6d365',
  },
  actionPill: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 12,
    borderRadius: 40,
  },
  iconCircle: {
    backgroundColor: 'black',
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 6,
  },
  actionText: {
    color: 'black',
    fontWeight: '600',
  },
  transHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  transTitle: { color: 'white' },
  viewAll: { color: '#ccc' },
  transItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#ccc',
    marginRight: 10,
  },
  name: { color: 'white' },
  time: {
    color: '#aaa',
    fontSize: 12,
  },
  amountText: {
    fontWeight: 'bold',
  },
});