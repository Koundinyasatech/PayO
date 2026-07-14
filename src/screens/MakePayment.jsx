// import React from 'react';
// import { View, Text, Image, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
// import Icon from 'react-native-vector-icons/Feather'; // Using Feather for the chevron-left icon
// import styles from './MakePaymentStyle';
// import { moderateScale } from '../../src/utils/responsive'; 

// const MakePayment = ({ navigation }) => {
//   return (
//     <SafeAreaView style={styles.safeArea}>
//       <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        
//         {/* Header */}
//         <View style={styles.header}>
//           <TouchableOpacity
//             style={styles.backButtonCircle}
//             onPress={() => navigation.goBack()}
//           >
//             <Icon name="chevron-left" size={moderateScale(24)} color="#285CE0" />
//           </TouchableOpacity>
//           <View style={styles.headerTextContainer}>
//             <Text style={styles.headerTitle}>Make Payment</Text>
//             <Text style={styles.headerSubtitle}>Complete your payment within the time</Text>
//           </View>
//           <TouchableOpacity style={styles.helpButton}>
//             <Image 
//               source={require('../../assets/images/Help Icon.png')}  
//               style={styles.iconSmall} 
//             />
//           </TouchableOpacity>
//         </View>

//         {/* Amount Card */}
//         <View style={styles.amountCard}>
//           <View style={styles.amountLeft}>
//             <Text style={styles.textMuted}>Amount to Pay</Text>
//             <Text style={styles.amountText}>₹1,000</Text>
//           </View>
//           <View style={styles.verticalDivider} />
//           <View style={styles.amountRight}>
//             <View>
//               <Text style={styles.textMuted}>You will receive (approx.)</Text>
//               <Text style={styles.cryptoText}>14.265 PAYO</Text>
//             </View>
//             <Image 
//               source={require('../../assets/images/Wallet image 12.png')} 
//               style={styles.walletIcon} 
//             />
//           </View>
//         </View>

//         {/* QR Code Section */}
//         <View style={styles.qrCard}>
//           <View style={styles.qrHeader}>
//             <Text style={styles.qrHeaderText}>Scan & Pay using any UPI App</Text>
//             <View style={styles.timerContainer}>
//               <Image source={require('../../assets/images/clock1.png')} style={styles.clockIcon} />
//               <Text style={styles.timerText}>09:58</Text>
//             </View>
//           </View>

//           {/* QR Code Assets */}
//           <View style={styles.qrWrapper}>
//             <Image 
//               source={require('../../assets/images/QR code image.png')} 
//               style={styles.qrImage} 
//             />
//             {/* Logo centered on QR code */}
//             <View style={styles.qrLogoCenter}>
//                <Image source={require('../../assets/images/Container.png')} style={styles.qrCenterIcon} />
//             </View>
//           </View>

//           <View style={styles.dividerContainer}>
//             <View style={styles.dividerLine} />
//             <Text style={styles.dividerText}>Or pay using UPI ID</Text>
//             <View style={styles.dividerLine} />
//           </View>

//           <View style={styles.upiInputContainer}>
//             <Text style={styles.upiIdText}>payo@upi</Text>
//             <TouchableOpacity style={styles.copyButton}>
//               <Text style={styles.copyButtonText}>Copy</Text>
//             </TouchableOpacity>
//           </View>

//           <View style={styles.secureBanner}>
//             <Image source={require('../../assets/images/shield-check12.png')} style={styles.shieldIcon} />
//             <View style={styles.secureTextContainer}>
//               <Text style={styles.secureTitle}>This is a secure UPI payment</Text>
//               <Text style={styles.secureSubtitle}>Your payment is protected.</Text>
//             </View>
//             <Image source={require('../../assets/images/Payment Method Image.png')} style={styles.upiLogoSmall} />
//           </View>
//         </View>

//         {/* Preferred UPI Apps */}
//         <Text style={styles.sectionTitle}>Open in your preferred UPI App</Text>
//         <View style={styles.appsGrid}>
//           <TouchableOpacity style={styles.appCard}>
//             <Image source={require('../../assets/images/Gpay Icon.png')} style={styles.appIcon} />
//             <Text style={styles.appName}>Google Pay</Text>
//           </TouchableOpacity>
//           <TouchableOpacity style={styles.appCard}>
//             <Image source={require('../../assets/images/PhonePe Icon.png')} style={styles.appIcon} />
//             <Text style={styles.appName}>PhonePe</Text>
//           </TouchableOpacity>
//           <TouchableOpacity style={styles.appCard}>
//             <Image source={require('../../assets/images/Paytm Icon.png')} style={styles.appIcon} />
//             <Text style={styles.appName}>Paytm</Text>
//           </TouchableOpacity>
//           <TouchableOpacity style={styles.appCard}>
//             <Image source={require('../../assets/images/Payment Icon.png')} style={styles.appIcon} />
//             <Text style={styles.appName}>BHIM</Text>
//           </TouchableOpacity>
//         </View>

//         {/* Info Banner */}
//         <View style={styles.infoBanner}>
//           <Image source={require('../../assets/images/Info Icon.png')} style={styles.infoIcon} />
//           <Text style={styles.infoText}>
//             After successful payment, you will be {"\n"}redirected back to the app automatically.
//           </Text>
//           {/* Ensure the file name perfectly matches your assets folder */}
//           <Image 
//             source={require('../../assets/images/Shield Security Icon.png')} 
//             style={styles.shieldWatermark} 
//           />
//         </View>

//         {/* Payment Complete Button */}
//         <TouchableOpacity style={styles.completeButton}>
//           <Image source={require('../../assets/images/Frame.png')} style={styles.checkIcon} />
//           <View>
//             <Text style={styles.completeButtonTitle}>Payment Complete</Text>
//             <Text style={styles.completeButtonSubtitle}>Check payment status</Text>
//           </View>
//         </TouchableOpacity>

//         {/* Footer */}
//         <View style={styles.footer}>
//           <Text style={styles.footerText}>Powered by</Text>
//           <Image source={require('../../assets/images/Payment Method Image.png')} style={styles.footerLogo} resizeMode="contain" />
//           <Image source={require('../../assets/images/Frame1.png')} style={styles.footerLogo} resizeMode="contain" />
//         </View>

//       </ScrollView>
//     </SafeAreaView>
//   );
// };

// export default MakePayment;



import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import Icon from 'react-native-vector-icons/Feather'; // Using Feather for the chevron-left icon
import styles from './MakePaymentStyle';
import { moderateScale } from '../../src/utils/responsive'; 

const MakePayment = ({ navigation }) => {
  // 1. Initialize timer state for 10 minutes (600 seconds)
  const [timeLeft, setTimeLeft] = useState(600);

  // 2. Set up the countdown effect
  useEffect(() => {
    // Stop the timer when it reaches 0
    if (timeLeft <= 0) return;

    // Decrease the timer by 1 every second
    const timerId = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    // Cleanup interval on unmount so it doesn't cause memory leaks
    return () => clearInterval(timerId);
  }, [timeLeft]);

  // 3. Helper function to format seconds into MM:SS
  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButtonCircle}
            onPress={() => navigation.goBack()}
          >
            <Icon name="chevron-left" size={moderateScale(24)} color="#285CE0" />
          </TouchableOpacity>
          <View style={styles.headerTextContainer}>
            <Text style={styles.headerTitle}>Make Payment</Text>
            <Text style={styles.headerSubtitle}>Complete your payment within the time</Text>
          </View>
          <TouchableOpacity style={styles.helpButton}>
            <Image 
              source={require('../../assets/images/Help Icon.png')}  
              style={styles.iconSmall} 
            />
          </TouchableOpacity>
        </View>

        {/* Amount Card */}
        <View style={styles.amountCard}>
          <View style={styles.amountLeft}>
            <Text style={styles.textMuted}>Amount to Pay</Text>
            <Text style={styles.amountText}>₹1,000</Text>
          </View>
          <View style={styles.verticalDivider} />
          <View style={styles.amountRight}>
            <View>
              <Text style={styles.textMuted}>You will receive (approx.)</Text>
              <Text style={styles.cryptoText}>14.265 PAYO</Text>
            </View>
            <Image 
              source={require('../../assets/images/Wallet image 12.png')} 
              style={styles.walletIcon} 
            />
          </View>
        </View>

        {/* QR Code Section */}
        <View style={styles.qrCard}>
          <View style={styles.qrHeader}>
            <Text style={styles.qrHeaderText}>Scan & Pay using any UPI App</Text>
            <View style={styles.timerContainer}>
              <Image source={require('../../assets/images/clock1.png')} style={styles.clockIcon} />
              {/* 4. Display the dynamically formatted time */}
              <Text style={styles.timerText}>{formatTime(timeLeft)}</Text>
            </View>
          </View>

          {/* QR Code Assets */}
          <View style={styles.qrWrapper}>
            <Image 
              source={require('../../assets/images/QR code image.png')} 
              style={styles.qrImage} 
            />
            {/* Logo centered on QR code */}
            <View style={styles.qrLogoCenter}>
               <Image source={require('../../assets/images/Container.png')} style={styles.qrCenterIcon} />
            </View>
          </View>

          <View style={styles.dividerContainer}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>Or pay using UPI ID</Text>
            <View style={styles.dividerLine} />
          </View>

          <View style={styles.upiInputContainer}>
            <Text style={styles.upiIdText}>payo@upi</Text>
            <TouchableOpacity style={styles.copyButton}>
              <Text style={styles.copyButtonText}>Copy</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.secureBanner}>
            <Image source={require('../../assets/images/shield-check12.png')} style={styles.shieldIcon} />
            <View style={styles.secureTextContainer}>
              <Text style={styles.secureTitle}>This is a secure UPI payment</Text>
              <Text style={styles.secureSubtitle}>Your payment is protected.</Text>
            </View>
            <Image source={require('../../assets/images/Payment Method Image.png')} style={styles.upiLogoSmall} />
          </View>
        </View>

        {/* Preferred UPI Apps */}
        <Text style={styles.sectionTitle}>Open in your preferred UPI App</Text>
        <View style={styles.appsGrid}>
          <TouchableOpacity style={styles.appCard}>
            <Image source={require('../../assets/images/Gpay Icon.png')} style={styles.appIcon} />
            <Text style={styles.appName}>Google Pay</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.appCard}>
            <Image source={require('../../assets/images/PhonePe Icon.png')} style={styles.appIcon} />
            <Text style={styles.appName}>PhonePe</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.appCard}>
            <Image source={require('../../assets/images/Paytm Icon.png')} style={styles.appIcon} />
            <Text style={styles.appName}>Paytm</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.appCard}>
            <Image source={require('../../assets/images/Payment Icon.png')} style={styles.appIcon} />
            <Text style={styles.appName}>BHIM</Text>
          </TouchableOpacity>
        </View>

        {/* Info Banner */}
        <View style={styles.infoBanner}>
          <Image source={require('../../assets/images/Info Icon.png')} style={styles.infoIcon} />
          <Text style={styles.infoText}>
            After successful payment, you will be {"\n"}redirected back to the app automatically.
          </Text>
          {/* Ensure the file name perfectly matches your assets folder */}
          <Image 
            source={require('../../assets/images/Shield Security Icon.png')} 
            style={styles.shieldWatermark} 
          />
        </View>

        {/* Payment Complete Button */}
        <TouchableOpacity style={styles.completeButton}>
          <Image source={require('../../assets/images/Frame.png')} style={styles.checkIcon} />
          <View>
            <Text style={styles.completeButtonTitle}>Payment Complete</Text>
            <Text style={styles.completeButtonSubtitle}>Check payment status</Text>
          </View>
        </TouchableOpacity>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>Powered by</Text>
          <Image source={require('../../assets/images/Payment Method Image.png')} style={styles.footerLogo} resizeMode="contain" />
          <Image source={require('../../assets/images/Frame1.png')} style={styles.footerLogo} resizeMode="contain" />
        </View>

      </ScrollView>
    </SafeAreaView>
  );
};

export default MakePayment;