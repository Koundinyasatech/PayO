import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
  ActivityIndicator,
  Alert
} from 'react-native';
import { createOrder, verifyPayment } from '../../api/walletApi';
import cashfreeService from '../../services/CashfreeService';
import styles from './AddMoneyModalStyles';

const AddMoneyModal = ({ visible, onClose, onPaymentSuccess }) => {
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);

  // Register and clean up Cashfree callbacks based on modal visibility
  useEffect(() => {
    if (visible) {
      cashfreeService.initialize(
        handleSuccessCallback,
        handleFailureCallback
      );
    }
    
    return () => {
      if (visible) {
        cashfreeService.removeListeners();
      }
    };
  }, [visible]);

  const handleSuccessCallback = async (orderId) => {
    try {
      // Once Cashfree confirms on the frontend, verify securely with your backend
      const verificationResponse = await verifyPayment(orderId);
      
      // Note: Adjust the condition below based on your actual API response structure
      if (verificationResponse && verificationResponse.status === 'SUCCESS') { 
         Alert.alert('Success', 'Money added to wallet successfully!');
         onPaymentSuccess(); 
         handleClose();
      } else {
         Alert.alert('Payment Pending', 'Your payment is being processed.');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to verify payment with the server.');
    } finally {
      setLoading(false);
    }
  };

  const handleFailureCallback = (error, orderId) => {
    Alert.alert('Payment Failed', error?.message || 'Something went wrong during payment.');
    setLoading(false);
  };

  const handleAddMoney = async () => {
    const numAmount = parseFloat(amount);
    
    if (!amount || isNaN(numAmount) || numAmount <= 0) {
      Alert.alert('Invalid Amount', 'Please enter a valid amount.');
      return;
    }

    setLoading(true);
    
    try {
      // 1. Create order securely from your backend
      const orderData = await createOrder(numAmount);

      // Assuming your backend returns these two required parameters
      const { orderId, paymentSessionId } = orderData;

      if (orderId && paymentSessionId) {
        // 2. Pass to Cashfree Service to open the Drop Checkout
        await cashfreeService.startPayment(orderId, paymentSessionId);
      } else {
        Alert.alert('Error', 'Invalid order data received from server.');
        setLoading(false);
      }
    } catch (error) {
      Alert.alert('Error', 'Could not initiate payment. Please try again.');
      setLoading(false);
    }
  };

  const handleClose = () => {
    setAmount('');
    setLoading(false);
    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={handleClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.title}>Add Money to Wallet</Text>

          <View style={styles.inputContainer}>
            <Text style={styles.currencySymbol}>₹</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter amount"
              keyboardType="numeric"
              value={amount}
              onChangeText={setAmount}
              editable={!loading}
            />
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.button, styles.cancelButton]}
              onPress={handleClose}
              disabled={loading}
            >
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button, styles.proceedButton]}
              onPress={handleAddMoney}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="#FFFFFF" />
              ) : (
                <Text style={styles.proceedButtonText}>Proceed</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default AddMoneyModal;