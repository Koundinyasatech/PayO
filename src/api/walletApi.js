// import api from './axios';

// // Create Cashfree Order
// export const createOrder = async (amount) => {
//   const response = await api.post('/api/wallet/create-order', {
//     amount,
//   });

//   return response.data;
// };

// // Verify Payment
// export const verifyPayment = async (orderId) => {
//   const response = await api.post('/api/wallet/verify-payment', {
//     orderId,
//   });

//   return response.data;
// };

// // Wallet Balance
// export const getWalletBalance = async () => {
//   const response = await api.get('/api/wallet/balance');

//   return response.data;
// };

// // Wallet Transactions
// export const getTransactions = async () => {
//   const response = await api.get('/api/wallet/transactions');

//   return response.data;
// };



import api from './axios';

// Create Cashfree Order (Updated URL)
export const createOrder = async (amount) => {
  const response = await api.post('/api/cashfree/deposit/create-order', {
    amount,
  });

  return response.data;
};

// Verify Payment (Updated URL)
export const verifyPayment = async (orderId) => {
  const response = await api.post('/api/cashfree/deposit/verify', {
    orderId,
  });

  return response.data;
};

// Wallet Balance
export const getWalletBalance = async () => {
  const response = await api.get('/api/wallet/balance');

  return response.data;
};

// Wallet Transactions
export const getTransactions = async () => {
  const response = await api.get('/api/wallet/transactions');

  return response.data;
};