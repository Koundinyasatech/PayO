import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import styles from './reviewDetailsStyling';
 
export default function ReviewDetails({ navigation, amount, receiver }) {
  const [saveRecent, setSaveRecent] = useState(false);
 
  return (
    <SafeAreaView style={styles.container}>
 
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('EnterAddress')}>
          <Text style={styles.cancel}>Cancel</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Review your Detail Transfer</Text>
        <View style={{ width: 50 }} />
      </View>
 
      {/* AVATAR */}
      <View style={styles.avatar}>
        <Text style={styles.avatarText}>EP</Text>
      </View>
 
      {/* AMOUNT */}
      <Text style={styles.label}>Total Tokens</Text>
      <Text style={styles.amount}>
        {amount || '300.00'} <Text style={styles.token}>PAYO</Text>
      </Text>
 
      {/* FROM */}
      <View style={styles.section}>
        <Text style={styles.smallLabel}>From</Text>
        <View style={styles.row}>
          <Text style={styles.name}>Jhon Thomas</Text>
          <Text style={styles.address}>PXY37488R</Text>
        </View>
      </View>
 
      {/* TO */}
      <View style={styles.section}>
        <Text style={styles.smallLabel}>To</Text>
        <View style={styles.row}>
          <Text style={styles.name}>Elena Petrova</Text>
          <Text style={styles.address}>
            {receiver || 'PXY21209E'}
          </Text>
        </View>
      </View>
 
      {/* SAVE TO RECENTS */}
      <View style={styles.toggleRow}>
        <Text style={styles.name}>Save to Recents</Text>
        <TouchableOpacity
          style={[
            styles.toggle,
            saveRecent && styles.toggleActive,
          ]}
          onPress={() => setSaveRecent(!saveRecent)}
        >
          <View
            style={[
              styles.toggleCircle,
              saveRecent && styles.toggleCircleActive,
            ]}
          />
        </TouchableOpacity>
      </View>
 
      {/* BUTTON */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('pinverify')}
      >
        <Text style={styles.buttonText}>Confirm and send</Text>
      </TouchableOpacity>
 
    </SafeAreaView>
  );
}
 