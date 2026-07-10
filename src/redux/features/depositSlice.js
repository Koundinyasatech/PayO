import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// 1. Initial State matching the 3 UI screens
const initialState = {
  // Screen 1: User Inputs
  amount: 0,
  currency: 'INR',
  paymentMethod: null, // e.g., 'UPI' | 'BANK_TRANSFER' | 'CARD'
  
  // Screen 2: Rates & Live Data (fetched via API)
  cryptoRate: 0,        // e.g., 70.12 INR per PAYO
  expectedCrypto: 0,    // e.g., 14.265 PAYO
  processingFee: 0,
  promoCode: '',
  rewardsEarned: 0,
  
  // Screen 3: Final Payment Setup
  upiId: '',
  qrCodeUrl: '',
  paymentStatus: 'IDLE', // 'IDLE' | 'PENDING' | 'SUCCESS' | 'FAILED'
  
  // System Status
  loading: false,
  error: null,
};

// 2. Async Thunk for API Calls (e.g., getting current exchange rates)
export const fetchConversionRates = createAsyncThunk(
  'deposit/fetchConversionRates',
  async ({ amount, paymentMethod }, { rejectWithValue }) => {
    try {
      // Replace this mock with your actual API endpoint:
      // const response = await axios.post('/api/v1/deposit/calculate', { amount, paymentMethod });
      // return response.data;
      
      // Simulating a fast network delay
      await new Promise((resolve) => setTimeout(resolve, 600));

      return {
        cryptoRate: 70.12,
        expectedCrypto: amount / 70.12, 
        processingFee: 0.00,
        upiId: 'payo@upi',
        qrCodeUrl: 'https://api.qrserver.com/v1/create-qr-code/?data=upi://pay',
      };
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch conversion rates');
    }
  }
);

// 3. Slice Definition
const depositSlice = createSlice({
  name: 'deposit',
  initialState,
  reducers: {
    // Screen 1 updates
    setAmount: (state, action) => {
      state.amount = action.payload;
    },
    setPaymentMethod: (state, action) => {
      state.paymentMethod = action.payload;
    },
    // Screen 2 updates
    applyPromoCode: (state, action) => {
      state.promoCode = action.payload;
      state.rewardsEarned = 10; // Simple flat bonus logic example
    },
    // Screen 3 updates
    updatePaymentStatus: (state, action) => {
      state.paymentStatus = action.payload;
    },
    // Reset flow entirely back to clean slate on completion/cancel
    resetDepositFlow: () => initialState,
  },
  
  // Handle asynchronous lifecycle state changes
  extraReducers: (builder) => {
    builder
      .addCase(fetchConversionRates.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchConversionRates.fulfilled, (state, action) => {
        state.loading = false;
        state.cryptoRate = action.payload.cryptoRate;
        state.expectedCrypto = action.payload.expectedCrypto;
        state.processingFee = action.payload.processingFee;
        state.upiId = action.payload.upiId;
        state.qrCodeUrl = action.payload.qrCodeUrl;
      })
      .addCase(fetchConversionRates.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// Export sync actions
export const { 
  setAmount, 
  setPaymentMethod, 
  applyPromoCode, 
  updatePaymentStatus, 
  resetDepositFlow 
} = depositSlice.actions;

// Export default reducer for store integration
export default depositSlice.reducer;