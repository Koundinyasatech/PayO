



// import {
//   CFPaymentGatewayService,
// } from 'react-native-cashfree-pg-sdk';

// import {
//   CFSession,
//   CFEnvironment,
//   CFDropCheckoutPayment,
//   CFThemeBuilder,
// } from 'cashfree-pg-api-contract';

// class CashfreeService {
//   constructor() {
//     this.successCallback = null;
//     this.failureCallback = null;
//   }

//   /**
//    * Register callbacks
//    */
//   initialize(onSuccess, onFailure) {
//     this.successCallback = onSuccess;
//     this.failureCallback = onFailure;

//     CFPaymentGatewayService.setCallback({
//       onVerify: orderId => {
//         console.log('Payment Success:', orderId);

//         if (this.successCallback) {
//           this.successCallback(orderId);
//         }
//       },

//       onError: (error, orderId) => {
//         console.log('Payment Failed:', error);

//         if (this.failureCallback) {
//           this.failureCallback(error, orderId);
//         }
//       },
//     });
//   }

//   /**
//    * Open Cashfree Checkout
//    */
//   async startPayment(orderId, paymentSessionId) {
//     try {
//       const session = new CFSession(
//         paymentSessionId,
//         orderId,
//         CFEnvironment.SANDBOX
//       );

//       const theme = new CFThemeBuilder()
//         .setNavigationBarBackgroundColor('#0F62FE')
//         .setNavigationBarTextColor('#FFFFFF')
//         .setButtonBackgroundColor('#0F62FE')
//         .setButtonTextColor('#FFFFFF')
//         .build();

//       const payment = new CFDropCheckoutPayment(
//         session,
//         theme
//       );

//       // ✅ CHANGE 8: Log right before doPayment is called
//       console.log('Starting payment with variables:');
//       console.log('orderId:', orderId);
//       console.log('paymentSessionId:', paymentSessionId);

//       CFPaymentGatewayService.doPayment(payment);

//     } catch (error) {
//       console.log('Cashfree SDK Error:', error);

//       if (this.failureCallback) {
//         this.failureCallback(error);
//       }
//     }
//   }

//   /**
//    * Remove callbacks
//    */
//   removeListeners() {
//     CFPaymentGatewayService.removeCallback();
//   }
// }

// export default new CashfreeService();




import {
  CFPaymentGatewayService,
} from 'react-native-cashfree-pg-sdk';

import {
  CFSession,
  CFEnvironment,
  CFDropCheckoutPayment,
  CFThemeBuilder,
  CFPaymentComponentBuilder, // <-- Added this
  CFPaymentModes             // <-- Added this
} from 'cashfree-pg-api-contract';

class CashfreeService {
  constructor() {
    this.successCallback = null;
    this.failureCallback = null;
  }

  /**
   * Register callbacks
   */
  initialize(onSuccess, onFailure) {
    this.successCallback = onSuccess;
    this.failureCallback = onFailure;

    CFPaymentGatewayService.setCallback({
      onVerify: orderId => {
        console.log('Payment Success:', orderId);

        if (this.successCallback) {
          this.successCallback(orderId);
        }
      },

      onError: (error, orderId) => {
        console.log('Payment Failed:', error);

        if (this.failureCallback) {
          this.failureCallback(error, orderId);
        }
      },
    });
  }

  /**
   * Open Cashfree Checkout
   */
  async startPayment(orderId, paymentSessionId) {
    try {
      const session = new CFSession(
        paymentSessionId,
        orderId,
        CFEnvironment.SANDBOX
      );

      // 1. Define the payment methods you want to allow
      const paymentModes = new CFPaymentComponentBuilder()
        .add(CFPaymentModes.CARD)
        .add(CFPaymentModes.UPI)
        .add(CFPaymentModes.NB)
        .add(CFPaymentModes.WALLET)
        .add(CFPaymentModes.PAY_LATER)
        .build();

      const theme = new CFThemeBuilder()
        .setNavigationBarBackgroundColor('#0F62FE')
        .setNavigationBarTextColor('#FFFFFF')
        .setButtonBackgroundColor('#0F62FE')
        .setButtonTextColor('#FFFFFF')
        .build();

      // 2. Pass ALL THREE arguments to the constructor
      const payment = new CFDropCheckoutPayment(
        session,
        paymentModes, // <--- Inserted the middle parameter
        theme
      );

      console.log('Starting payment with variables:');
      console.log('orderId:', orderId);
      console.log('paymentSessionId:', paymentSessionId);

      CFPaymentGatewayService.doPayment(payment);

    } catch (error) {
      console.log('Cashfree SDK Error:', error);

      if (this.failureCallback) {
        this.failureCallback(error);
      }
    }
  }

  /**
   * Remove callbacks
   */
  removeListeners() {
    CFPaymentGatewayService.removeCallback();
  }
}

export default new CashfreeService();