import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Header from '../components/header';
 
// export default function EnterAmountScreen({ route, navigation }) {
//   const { name, address } = route.params;
 
//   const [amount, setAmount] = useState('300');
 
//   return (
//     <>
//       <Header/>
//     <LinearGradient colors={['#6A00F4', '#1A0033']} style={styles.container}>
    
 
//       <Text style={styles.cancel}>Cancel</Text>
 
//       <Text style={styles.title}>Total Tokens Transfer Details</Text>
 
//       <View style={styles.amountCard}>
//         <Text style={styles.amountText}>{amount}.00</Text>
//         <Text style={styles.currency}>PAYO</Text>
//       </View>
 
//       <Text style={styles.toText}>To - {name}</Text>
//       <Text style={styles.address}>{address}</Text>
 
//       <View style={styles.row}>
//         {['100', '300', '500', '700'].map((val) => (
//           <TouchableOpacity
//             key={val}
//             style={styles.quickBtn}
//             onPress={() => setAmount(val)}
//           >
//             <Text>{val}</Text>
//           </TouchableOpacity>
//         ))}
//       </View>
 
//       <TouchableOpacity
//         style={styles.continueBtn}
//         onPress={() =>
//           navigation.navigate('SendPin', {
//             amount,
//             name,
//             address,
//           })
//         }
//       >
//         <Text style={styles.continueText}>Continue</Text>
//       </TouchableOpacity>
 
//       <TextInput
//         style={styles.input}
//         value={amount}
//         onChangeText={setAmount}
//         keyboardType="numeric"
//       />
//     </LinearGradient>
//     </>
//   );
// }



// import React, { useState } from 'react';
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   TextInput,
//   StyleSheet,
// } from 'react-native';

export default function EnterAmountScreen({ navigation,name, address, setActiveTab }) {
  const [amount, setAmount] = useState('300');

  return (
    <View style={styles.container}>

      {/* 🔙 Cancel Button */}
      <TouchableOpacity onPress={() => setActiveTab('scan')}>
        <Text style={styles.cancel}>Cancel</Text>
      </TouchableOpacity>

      {/* Title */}
      <Text style={styles.title}>Total Tokens Transfer Details</Text>

      {/* 💜 Amount Card */}
      <View style={styles.amountCard}>
        <View style={styles.amountRow}>
          <TextInput
            style={styles.amountInput}
            value={amount}
            onChangeText={(text) => {
              const cleaned = text.replace(/[^0-9]/g, '');
              setAmount(cleaned);
            }}
            keyboardType="numeric"
            placeholder="0"
            placeholderTextColor="#eee"
            autoFocus
            cursorColor="#fff"
          />
          <Text style={styles.decimal}>.00</Text>
          <Text style={styles.currency}> PAYO</Text>
        </View>
      </View>

      {/* User Details */}
      <Text style={styles.toText}>To - {name}</Text>
      <Text style={styles.address}>{address}</Text>

      {/* Quick Amount Buttons */}
      <View style={styles.row}>
        {['100', '300', '500', '700'].map((val) => (
          <TouchableOpacity
            key={val}
            style={styles.quickBtn}
            onPress={() => setAmount(val)}
          >
            <Text style={styles.quickText}>{val}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Continue Button */}
      <TouchableOpacity
        style={styles.continueBtn}
        // onPress={() => setActiveTab('scan')}
                onPress={() =>
          navigation.navigate('SendPin', {
            amount,
            name,
            address,
          })
        }
      >
        <Text style={styles.continueText}>Continue</Text>
      </TouchableOpacity>

    </View>
  );
}
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },

  cancel: {
    color: '#fff',
    fontSize: 16,
    marginBottom: 20,
  },

  title: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
    marginBottom: 25,
  },

  amountCard: {
    backgroundColor: '#9B6DFF',
    borderRadius: 20,
    paddingVertical: 25,
    paddingHorizontal: 30,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    width: '80%',
    marginBottom: 30,
  },

  amountRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  amountInput: {
    fontSize: 36,
    color: '#fff',
    fontWeight: '700',
    minWidth: 60,
    textAlign: 'center',
  },

  decimal: {
    fontSize: 28,
    color: '#eee',
    marginLeft: 2,
  },

  currency: {
    fontSize: 16,
    color: '#00FFD1',
    marginLeft: 6,
    fontWeight: '600',
  },

  toText: {
    color: '#fff',
    textAlign: 'center',
    marginBottom: 5,
  },

  address: {
    color: '#ccc',
    textAlign: 'center',
    marginBottom: 30,
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
  },

  quickBtn: {
    backgroundColor: '#E5E5E5',
    paddingVertical: 10,
    borderRadius: 8,
    width: 60,
    alignItems: 'center',
  },

  quickText: {
    fontWeight: '500',
  },

  continueBtn: {
    backgroundColor: '#16A34A',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },

  continueText: {
    color: '#fff',
    fontWeight: '600',
  },
});