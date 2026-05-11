import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
  StatusBar,
} from 'react-native';

export default function SendPinScreen({ route, navigation }) {
  const { amount, name, address, sender, senderData } = route.params;
  console.log(senderData, "0005")

  const [pin, setPin] = useState('');

  const handlePress = (val) => {
    if (val === 'back') {
      setPin(pin.slice(0, -1));
    } else if (val === 'submit') {
      handleSubmit();
    } else {
      if (pin.length < 4) {
        setPin(pin + val);
      }
    }
  };

  const handleSubmit = () => {
    if (pin.length !== 4) {
      alert('Enter 4 digit PIN');
      return;
    }

    // ✅ FIXED HERE
    navigation.navigate('loading', {
      amount,
      name,
      toAddress: address,
      pin,
    });
  };

  const Key = ({ num, letters, onPress }) => {
    return (
      <TouchableOpacity
        style={styles.key}
        onPress={() => onPress(num)}
      >
        <Text style={styles.keyText}>{num}</Text>

        {letters ? (
          <Text style={styles.keyLetters}>{letters}</Text>
        ) : null}
      </TouchableOpacity>
    );
  };

  const renderBoxes = () => {
    return [...Array(4)].map((_, i) => (
      <View key={i} style={styles.box}>
        <Text style={styles.dot}>{pin[i] ? '*' : ''}</Text>
      </View>
    ));
  };


  const handleDelete = () => {
    setPin((prev) => prev.slice(0, -1));
  };

  return (
    <View style={styles.container}>

      <Text style={styles.cancel} onPress={() => navigation.navigate("Main")}>Cancel</Text>

      <View style={styles.card}>
        {/* FROM SECTION */}
        <View style={styles.section}>
          <Text style={styles.small}>From wallet</Text>
          <Text style={styles.name}>{sender?.name || senderData?.name}</Text>
          <Text style={styles.wallet}>{sender?.wallet || senderData?.walletAddress}</Text>
        </View>

        {/* TO SECTION */}
        <View style={styles.toSection}>
          <View style={styles.rowBetween}>
            <Text style={styles.small}>To wallet</Text>
            <Text style={styles.amount}>{amount} PAYO</Text>
          </View>

          <Text style={styles.name}>{name}</Text>
          <Text style={styles.address}>{address}</Text>
        </View>
      </View>

      <Text style={styles.title}>ENTER 4-DIGIT TRANSACTION PIN</Text>

      <View style={styles.pinRow}>{renderBoxes()}</View>

      <View style={styles.warning}>
        <Text style={styles.warningText}>
          ⚠ You are sending {amount} payo from your account
        </Text>
      </View>



      <View style={styles.keypad}>

        {/* ROW 1 */}
        <View style={styles.row}>
          <Key num="1" onPress={handlePress} />
          <Key num="2" letters="ABC" onPress={handlePress} />
          <Key num="3" letters="DEF" onPress={handlePress} />
        </View>

        {/* ROW 2 */}
        <View style={styles.row}>
          <Key num="4" letters="GHI" onPress={handlePress} />
          <Key num="5" letters="JKL" onPress={handlePress} />
          <Key num="6" letters="MNO" onPress={handlePress} />
        </View>

        {/* ROW 3 */}
        <View style={styles.row}>
          <Key num="7" letters="PQRS" onPress={handlePress} />
          <Key num="8" letters="TUV" onPress={handlePress} />
          <Key num="9" letters="WXYZ" onPress={handlePress} />
        </View>

        {/* ROW 4 */}
        <View style={styles.row}>
          <Key num="0" onPress={handlePress} />

          <Key num="×" onPress={handleDelete} />

          <TouchableOpacity
            style={styles.submitKey}
            onPress={handleSubmit}
          >
            <Text style={styles.submitKeyText}>Submit</Text>
          </TouchableOpacity>
        </View>


      </View>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#eee', padding: 20, paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0 },
  cancel: { marginBottom: 10, color: '#444' },

  card: {
    borderRadius: 12,
    overflow: 'hidden', // important for section backgrounds
    marginBottom: 20,
  },

  section: {
    backgroundColor: '#fff',
    padding: 15,
  },

  toSection: {
    backgroundColor: '#dcd6f7',
    padding: 15,
  },

  small: {
    color: '#777',
    fontSize: 12,
  },

  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  amount: {
    fontWeight: '700',
    color: '#3c8c5a', // greenish like screenshot
  },

  name: {
    fontWeight: '600',
    marginTop: 5,
    textTransform: "capitalize"
  },

  wallet: {
    fontWeight: '600',
    color: '#000',
  },

  address: {
    color: '#777',
    fontSize: 12,
  },

  title: { textAlign: 'center', marginBottom: 15 },

  pinRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },

  box: {
    width: 50,
    height: 50,
    backgroundColor: '#fff',
    marginHorizontal: 8,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },

  dot: { fontSize: 24 },

  warning: {
    backgroundColor: '#fff3cd',
    padding: 10,
    borderRadius: 8,
    marginBottom: 20,
  },

  warningText: { textAlign: 'center' },

  keypad: {
    marginTop: 10,
    width: "70%",   // smaller width
    alignSelf: "center",
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15, // smaller vertical spacing
  },

  key: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#F2F2F2",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },

  keyLetters: {
    fontSize: 9,
    color: "#555",
    marginTop: 2,
    fontWeight: "500",
  },

  emptyKey: {
    width: 55,
    height: 55,
  },

  keyText: {
    fontSize: 18,  // smaller text
    fontWeight: "600",
  },
  submitRow: {
    marginTop: 25,
    alignItems: "center",
  },

  submitButton: {
    backgroundColor: "#22C55E",
    width: "70%",
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: "center",
    elevation: 3,
  },

  submitText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },

  submitKey: {
  width: 60,
  height: 60,
  borderRadius: 14,
  backgroundColor: "#1E8E3E",
  justifyContent: "center",
  alignItems: "center",
  elevation: 3,
},

submitKeyText: {
  color: "#fff",
  fontSize: 11,
  fontWeight: "600",
},

});