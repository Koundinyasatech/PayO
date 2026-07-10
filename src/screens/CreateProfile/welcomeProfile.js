// import React, { useState } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   TouchableOpacity,
//   Image,
//   ScrollView,
//   StatusBar,
//   Platform,
// } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import Icon from 'react-native-vector-icons/Feather';
// import {
//   widthPercentageToDP as wp,
//   heightPercentageToDP as hp,
// } from 'react-native-responsive-screen';
// import { moderateScale } from 'react-native-size-matters';

// export default function DashboardScreen({ navigation }) {
//   const [showBalance, setShowBalance] = useState(true);

//   // Quick Action Grid Items
//   const quickActions = [
//     { id: 'send', title: 'Send', icon: require('../../../assets/images/Send Icon.png'), bg: '#EEF2FF' },
//     { id: 'scan', title: 'Scan QR', icon: require('../../../assets/images/Scan Icon.png'), bg: '#FFF1F2' },
//     { id: 'recharge', title: 'Recharge', icon: require('../../../assets/images/Recharge Icon.png'), bg: '#F0FDF4' },
//     { id: 'wallet', title: 'Wallet', icon: require('../../../assets/images/Wallet Icon.png'), bg: '#FDF4FF' },
//   ];

//   return (
//     <SafeAreaView style={styles.safeArea}>
//       <StatusBar backgroundColor="#FFFFFF" barStyle="dark-content" />

//       {/* STATIC TOP HEADER */}
//       <View style={styles.header}>
//         <View style={styles.headerLeft}>
//           <Image
//             source={require('../../../assets/images/LogoContainer.png')}
//             style={styles.logoImage}
//             resizeMode="contain"
//           />
//         </View>
//         <View style={styles.headerRight}>
//           <TouchableOpacity style={styles.iconCircle}>
//             <Icon name="bell" size={moderateScale(18)} color="#374151" />
//           </TouchableOpacity>
//           <TouchableOpacity style={[styles.iconCircle, styles.profileCircle]}>
//             <Icon name="user" size={moderateScale(18)} color="#FFFFFF" />
//           </TouchableOpacity>
//         </View>
//       </View>

//       {/* SCROLLABLE MAIN CONTENT */}
//       <ScrollView
//         contentContainerStyle={styles.scrollContent}
//         showsVerticalScrollIndicator={false}
//       >
//         {/* WALLET BALANCE CARD */}
//         <View style={styles.balanceCard}>
//           <View style={styles.balanceHeader}>
//             <View style={styles.balanceTitleRow}>
//               <Icon name="wallet" size={moderateScale(16)} color="#6B7280" style={{ marginRight: wp('1.5%') }} />
//               <Text style={styles.balanceLabel}>Total Wallet Balance</Text>
//             </View>
//             <TouchableOpacity onPress={() => setShowBalance(!showBalance)}>
//               <Icon name={showBalance ? "eye" : "eye-off"} size={moderateScale(18)} color="#4B5563" />
//             </TouchableOpacity>
//           </View>
//           <Text style={styles.balanceAmount}>
//             {showBalance ? '₦250,000.00' : '••••••••'}
//           </Text>
//         </View>

//         {/* QUICK ACTIONS SECTION */}
//         <Text style={styles.sectionTitle}>Quick Actions</Text>
//         <View style={styles.gridContainer}>
//           {quickActions.map((action) => (
//             <TouchableOpacity
//               key={action.id}
//               style={styles.gridCard}
//               onPress={() => {
//                 if (action.id === 'send') navigation.navigate('TransactionPin');
//               }}
//             >
//               <View style={[styles.iconContainer, { backgroundColor: action.bg }]}>
//                 <Image source={action.icon} style={styles.actionIcon} resizeMode="contain" />
//               </View>
//               <Text style={styles.actionTitle}>{action.title}</Text>
//             </TouchableOpacity>
//           ))}
//         </View>

//         {/* PROMOTIONAL REFERRAL BANNER */}
//         <TouchableOpacity style={styles.promoBanner}>
//           <View style={styles.promoTextContainer}>
//             <Text style={styles.promoTitle}>Invite Friends & Earn</Text>
//             <Text style={styles.promoSubtitle}>Get ₦500 reward for every friend that signs up and transacts.</Text>
//             <View style={styles.inviteBadge}>
//               <Text style={styles.inviteBadgeText}>Invite Now</Text>
//               <Icon name="arrow-right" size={moderateScale(12)} color="#FFFFFF" />
//             </View>
//           </View>
//           <Image
//             source={require('../../../assets/images/Reward Icon.png')}
//             style={styles.promoImage}
//             resizeMode="contain"
//           />
//         </TouchableOpacity>
//       </ScrollView>

//       {/* FIXED BOTTOM NAVIGATION BAR */}
//       <View style={styles.bottomNav}>
//         <TouchableOpacity style={styles.navItem}>
//           <Icon name="home" size={moderateScale(20)} color="#2563EB" />
//           <Text style={[styles.navText, styles.navTextActive]}>Home</Text>
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.navItem}>
//           <Icon name="repeat" size={moderateScale(20)} color="#9CA3AF" />
//           <Text style={styles.navText}>History</Text>
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.navItem}>
//           <Icon name="credit-card" size={moderateScale(20)} color="#9CA3AF" />
//           <Text style={styles.navText}>Cards</Text>
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.navItem}>
//           <Icon name="settings" size={moderateScale(20)} color="#9CA3AF" />
//           <Text style={styles.navText}>Settings</Text>
//         </TouchableOpacity>
//       </View>
//     </SafeAreaView>

//     // <>
    
//     // </>
//   );
// }

// const styles = StyleSheet.create({
//   safeArea: {
//     flex: 1,
//     backgroundColor: '#F9FAFB',
//   },
//   header: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     paddingHorizontal: wp('5%'),
//     paddingTop: Platform.OS === 'android' ? hp('1.5%') : hp('0.5%'),
//     paddingBottom: hp('1.5%'),
//     backgroundColor: '#FFFFFF',
//     borderBottomWidth: 1,
//     borderColor: '#F3F4F6',
//   },
//   headerLeft: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   logoImage: {
//     width: wp('28%'),
//     height: hp('4.5%'),
//   },
//   headerRight: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     gap: wp('3%'),
//   },
//   iconCircle: {
//     width: moderateScale(36),
//     height: moderateScale(36),
//     borderRadius: moderateScale(18),
//     backgroundColor: '#F3F4F6',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   profileCircle: {
//     backgroundColor: '#2563EB',
//   },
//   scrollContent: {
//     paddingHorizontal: wp('5%'),
//     paddingTop: hp('2.5%'),
//     paddingBottom: hp('12%'), // Space avoiding overlap with bottom tab navbar
//   },
//   balanceCard: {
//     backgroundColor: '#FFFFFF',
//     borderRadius: moderateScale(16),
//     padding: moderateScale(18),
//     borderWidth: 1,
//     borderColor: '#E5E7EB',
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.04,
//     shadowRadius: 4,
//     elevation: 2,
//     marginBottom: hp('3%'),
//   },
//   balanceHeader: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: hp('1%'),
//   },
//   balanceTitleRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   balanceLabel: {
//     fontSize: moderateScale(13),
//     color: '#6B7280',
//     fontWeight: '500',
//   },
//   balanceAmount: {
//     fontSize: moderateScale(24),
//     fontWeight: '700',
//     color: '#111827',
//   },
//   sectionTitle: {
//     fontSize: moderateScale(16),
//     fontWeight: '700',
//     color: '#111827',
//     marginBottom: hp('2%'),
//   },
//   gridContainer: {
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     justifyContent: 'space-between',
//     gap: hp('2%'),
//     marginBottom: hp('3.5%'),
//   },
//   gridCard: {
//     backgroundColor: '#FFFFFF',
//     width: wp('42.5%'),
//     borderRadius: moderateScale(16),
//     padding: moderateScale(16),
//     alignItems: 'center',
//     borderWidth: 1,
//     borderColor: '#E5E7EB',
//   },
//   iconContainer: {
//     width: moderateScale(48),
//     height: moderateScale(48),
//     borderRadius: moderateScale(12),
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginBottom: hp('1.2%'),
//   },
//   actionIcon: {
//     width: '55%',
//     height: '55%',
//   },
//   actionTitle: {
//     fontSize: moderateScale(13),
//     fontWeight: '600',
//     color: '#374151',
//   },
//   promoBanner: {
//     backgroundColor: '#EFF6FF',
//     borderWidth: 1,
//     borderColor: '#DBEAFE',
//     borderRadius: moderateScale(16),
//     padding: moderateScale(16),
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//   },
//   promoTextContainer: {
//     flex: 1,
//     paddingRight: wp('2%'),
//   },
//   promoTitle: {
//     fontSize: moderateScale(15),
//     fontWeight: '700',
//     color: '#1E40AF',
//     marginBottom: hp('0.4%'),
//   },
//   promoSubtitle: {
//     fontSize: moderateScale(11.5),
//     color: '#3B82F6',
//     lineHeight: moderateScale(16),
//     marginBottom: hp('1.5%'),
//   },
//   inviteBadge: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#2563EB',
//     alignSelf: 'flex-start',
//     paddingHorizontal: wp('3.5%'),
//     paddingVertical: hp('0.6%'),
//     borderRadius: moderateScale(20),
//     gap: wp('1%'),
//   },
//   inviteBadgeText: {
//     color: '#FFFFFF',
//     fontSize: moderateScale(11),
//     fontWeight: '600',
//   },
//   promoImage: {
//     width: moderateScale(70),
//     height: moderateScale(70),
//   },
//   bottomNav: {
//     position: 'absolute',
//     bottom: 0,
//     left: 0,
//     right: 0,
//     height: hp('8.5%'),
//     backgroundColor: '#FFFFFF',
//     flexDirection: 'row',
//     borderTopWidth: 1,
//     borderColor: '#E5E7EB',
//     paddingBottom: Platform.OS === 'ios' ? hp('1.5%') : 0,
//   },
//   navItem: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   navText: {
//     fontSize: moderateScale(10),
//     color: '#9CA3AF',
//     fontWeight: '500',
//     marginTop: hp('0.4%'),
//   },
//   navTextActive: {
//     color: '#2563EB',
//     fontWeight: '600',
//   },
// });


import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  StatusBar,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Feather';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { moderateScale } from 'react-native-size-matters';

export default function DashboardScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar backgroundColor="#F9FBF9" barStyle="dark-content" />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* PAYO BRAND LOGO SECTION */}
        <View style={styles.logoContainer}>
          <Image
            source={require('../../../assets/images/LogoContainer.png')}
            style={styles.logoImage}
            resizeMode="contain"
          />
        </View>

        {/* CELEBRATION HERO HERO IMAGE */}
        <View style={styles.heroContainer}>
          <Image
            source={require('../../../assets/images/Header Image (2).png')}
            style={styles.heroImage}
            resizeMode="contain"
          />
        </View>

        {/* WELCOME HEADERS */}
        <Text style={styles.welcomeTitle}>
          Welcome to <Text style={styles.brandAccent}>PAYO !</Text>
        </Text>
        
        <Text style={styles.welcomeSubtitle}>
          Your account has been created successfully and your wallet is ready to use.
        </Text>

        {/* THREE VALUE PROPOSITION CARDS */}
        <View style={styles.featuresRow}>
          {/* Card 1: Instant Payments */}
          <View style={styles.featureCard}>
            <View style={styles.featureIconWrapper}>
              <Image 
                source={require('../../../assets/images/Wallet Icon.png')} 
                style={styles.featureIcon} 
                resizeMode="contain" 
              />
            </View>
            <Text style={styles.featureTitle}>Instant Payments</Text>
            <Text style={styles.featureDesc}>Send & receive money in seconds</Text>
          </View>

          {/* Card 2: Bank Grade Security */}
          <View style={styles.featureCard}>
            <View style={styles.featureIconWrapper}>
              <Image 
                source={require('../../../assets/images/shield-check (1).png')} 
                style={styles.featureIcon} 
                resizeMode="contain" 
              />
            </View>
            <Text style={styles.featureTitle}>Bank Grade Security</Text>
            <Text style={styles.featureDesc}>Your money and data are 100% secure</Text>
          </View>

          {/* Card 3: Exciting Rewards */}
          <View style={styles.featureCard}>
            <View style={styles.featureIconWrapper}>
              <Image 
                source={require('../../../assets/images/Reward Icon.png')} 
                style={styles.featureIcon} 
                resizeMode="contain" 
              />
            </View>
            <Text style={styles.featureTitle}>Exciting Rewards</Text>
            <Text style={styles.featureDesc}>Earn rewards on every transaction</Text>
          </View>
        </View>

        {/* PRIMARY CTA EXPLORE BUTTON */}
        <TouchableOpacity 
          style={styles.exploreButton}
          onPress={() => navigation.navigate('Main')}
        >
          <Text style={styles.exploreButtonText}>Start Exploring PAYO</Text>
          <Icon name="arrow-right" size={moderateScale(16)} color="#FFFFFF" style={styles.buttonArrow} />
        </TouchableOpacity>

        {/* ACTION OVERVIEW CARD PANEL */}
        <View style={styles.actionPanelCard}>
          <Text style={styles.panelTitle}>What you can do now</Text>
          
          <View style={styles.actionsGridRow}>
            {/* Action 1: Scan & Pay */}
            <TouchableOpacity style={styles.actionGridItem}>
              <Image 
                source={require('../../../assets/images/Scan Icon.png')} 
                style={styles.panelActionIcon} 
                resizeMode="contain" 
              />
              <Text style={styles.panelActionLabel}>Scan & Pay</Text>
            </TouchableOpacity>

            <View style={styles.verticalDivider} />

            {/* Action 2: Send Money */}
            <TouchableOpacity style={styles.actionGridItem}>
              <Image 
                source={require('../../../assets/images/Send Icon.png')} 
                style={styles.panelActionIcon} 
                resizeMode="contain" 
              />
              <Text style={styles.panelActionLabel}>Send Money</Text>
            </TouchableOpacity>

            <View style={styles.verticalDivider} />

            {/* Action 3: Receive Money */}
            <TouchableOpacity style={styles.actionGridItem}>
              <Image 
                source={require('../../../assets/images/Create Account Icon Background.png')} 
                style={styles.panelActionIcon} 
                resizeMode="contain" 
              />
              <Text style={styles.panelActionLabel}>Receive Money</Text>
            </TouchableOpacity>

            <View style={styles.verticalDivider} />

            {/* Action 4: Recharge & Bills */}
            <TouchableOpacity style={styles.actionGridItem}>
              <Image 
                source={require('../../../assets/images/Recharge Icon.png')} 
                style={styles.panelActionIcon} 
                resizeMode="contain" 
              />
              <Text style={styles.panelActionLabel}>Recharge & Bills</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* TRUST SECURE FOOTER BADGE */}
        <View style={styles.securityFooterBadge}>
          <Image 
            source={require('../../../assets/images/Security Icon.png')} 
            style={styles.footerShieldIcon} 
            resizeMode="contain" 
          />
          <View style={styles.footerTextContent}>
            <Text style={styles.footerSecureTitle}>Your Account is protected</Text>
            <Text style={styles.footerSecureSubtitle}>We'll keep your money safe</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fffffff7',
  },
  scrollContent: {
    paddingHorizontal: wp('5%'),
    paddingTop: hp('2%'),
    paddingBottom: hp('4%'),
  },
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    // marginTop: hp('1%'),
    // marginBottom: hp('1.5%'),
  },
  logoImage: {
    width: wp('40%'),
    height: hp('5%'),
  },
  heroContainer: {
    width: wp('90%'),
    height: hp('25%'),
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginVertical: hp('1%'),
  },
  heroImage: {
    width: '87%',
    height: '80%',
  },
  welcomeTitle: {
    textAlign: 'center',
    fontSize: moderateScale(24),
    fontWeight: '700',
    color: '#05070D',
    // marginTop: hp('1%'),
  },
  brandAccent: {
    color: '#6366F1',
  },
  welcomeSubtitle: {
    textAlign: 'center',
    color: '#414141',
    fontSize: moderateScale(13.5),
    lineHeight: moderateScale(20),
    paddingHorizontal: wp('6%'),
    marginTop: hp('1%'),
    marginBottom: hp('2%'),
  },
  featuresRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: hp('2%'),
    gap: wp('2%'),
  },
  featureCard: {
    flex: 1,
    backgroundColor: '#F3F4F6',
    borderRadius: moderateScale(16),
    paddingVertical: hp('1%'),
    paddingHorizontal: wp('2%'),
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  featureIconWrapper: {
    width: moderateScale(30),
    height: moderateScale(30),
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: hp('1%'),
  },
  featureIcon: {
    width: '90%',
    height: '90%',
  },
  featureTitle: {
    fontSize: moderateScale(11),
    fontWeight: '600',
    
    color: '#414141',
    textAlign: 'center',
    marginBottom: hp('0.5%'),
  },
  featureDesc: {
    fontSize: moderateScale(9),
    color: '#414141',
    textAlign: 'center',
    lineHeight: moderateScale(12),
  },
  exploreButton: {
    flexDirection: 'row',
    backgroundColor: '#4F46E5',
    height: hp('6.5%'),
    borderRadius: moderateScale(12),
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: hp('3.5%'),
    position: 'relative',
    shadowColor: '#4F46E5',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 4,
  },
  exploreButtonText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: moderateScale(15),
  },
  buttonArrow: {
    position: 'absolute',
    right: wp('5%'),
  },
  actionPanelCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: moderateScale(14),
    paddingVertical: hp('2%'),
    paddingHorizontal: wp('3%'),
    borderWidth: 1,
    borderColor: '#E5E7EB',
    marginBottom: hp('3.5%'),
  },
  panelTitle: {
    fontSize: moderateScale(12.5),
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: hp('2%'),
    marginLeft: wp('1%'),
  },
  actionsGridRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  actionGridItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  panelActionIcon: {
    width: moderateScale(26),
    height: moderateScale(26),
    marginBottom: hp('0.8%'),
  },
  panelActionLabel: {
    fontSize: moderateScale(10),
    fontWeight: '600',
    color: '#4B5563',
    textAlign: 'center',
  },
  verticalDivider: {
    width: 1,
    height: hp('4.5%'),
    backgroundColor: '#E5E7EB',
  },
  securityFooterBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    // backgroundColor: '#F3F4F6',
    borderRadius: moderateScale(24),
    paddingVertical: hp('0.8%'),
    paddingHorizontal: wp('5%'),
    gap: wp('3%'),
  },
  footerShieldIcon: {
    width: moderateScale(30),
    height: moderateScale(30),
  },
  footerTextContent: {
    flexDirection: 'column',
  },
  footerSecureTitle: {
    fontSize: moderateScale(11),
    fontWeight: '700',
    color: '#374151',
  },
  footerSecureSubtitle: {
    fontSize: moderateScale(10),
    color: '#6B7280',
    fontWeight: '500',
  },
});