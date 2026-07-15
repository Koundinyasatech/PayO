// // Header.js

// import React from 'react';
// import {
//   View,
//   TouchableOpacity,
//   Text,
// } from 'react-native';
// import Icon from 'react-native-vector-icons/Feather';
// import { useNavigation } from '@react-navigation/native';

// import {
//   widthPercentageToDP as wp,
//   heightPercentageToDP as hp,
// } from 'react-native-responsive-screen';

// import { moderateScale } from 'react-native-size-matters';
// import styles from '../HomeScreen/homeStyling';

// export default function Header({
//   type = 'default',
//   title,
//   id,
// }) {
//   const navigation = useNavigation();

//   return (
//     <View style={styles.header}>
//       {type === 'wallet' ? (
//         <View style={localStyles.walletBlock}>
//           <Text style={localStyles.walletTitle}>
//             {title || 'Wallet'}
//           </Text>

//           <Text style={styles.walletNumber}>
//             {id}
//           </Text>
//         </View>
//       ) : (
//         <View style={localStyles.emptyLeft} />
//       )}

//       <View style={styles.headerRight}>
//         <TouchableOpacity
//           activeOpacity={0.8}
//           style={localStyles.notificationBtn}
//           onPress={() =>
//             navigation.navigate('Notifications')
//           }>
//           <Icon
//             name="bell"
//             size={moderateScale(20)}
//             color="#fff"
//           />
//         </TouchableOpacity>

//         <TouchableOpacity
//           activeOpacity={0.8}
//           style={styles.profileIcon}
//           onPress={() =>
//             navigation.navigate('UserProfile')
//           }>
//           <Icon
//             name="user"
//             size={moderateScale(16)}
//             color="#000"
//           />
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// }

// const localStyles = {
//   walletBlock: {
//     justifyContent: 'center',
//   },

//   walletTitle: {
//     color: '#fff',
//     fontSize: moderateScale(17),
//     fontWeight: '700',
//     marginBottom: hp('0.3%'),
//   },

//   notificationBtn: {
//     padding: wp('1.2%'),
//   },

//   emptyLeft: {
//     width: wp('15%'),
//   },
// };
/////////////////////////////////////////////////////////////////////////////////////////////////////////////

// import React from 'react';
// import { View, Text, TouchableOpacity, Image } from 'react-native';
// import Icon from 'react-native-vector-icons/Feather';
// import styles from '../HomeScreen/homeStyling'; // Points to your existing styles configuration

// export default function Header({ 
 
//  }) {
//   return (
//     <View style={styles.header}>
//       {/* Left Menu Trigger */}
//       <TouchableOpacity style={styles.iconButton} onPress={onMenuPress} activeOpacity={0.7}>
//         <Icon name="menu" size={24} color="#1f2937" />
//       </TouchableOpacity>
      
//       {/* Brand Logo Alignment Zone */}
//       <Image 
//         source={require('../../../assets/images/LogoContainer.png')} 
//         style={styles.logo} 
//         resizeMode="contain" 
//       />
      
//       {/* Right Operations Cluster */}
//       <View style={styles.headerRight}>
//         {/* Notification Alert Target */}
//         <TouchableOpacity style={styles.iconButton} onPress={onNotificationPress} activeOpacity={0.7}>
//           <Image 
//             source={require('../../../assets/images/Icon (4).png')} 
//             style={styles.headerNotificationIcon} 
//             resizeMode="contain"
//           />
//           {notificationCount > 0 && (
//             <View style={styles.badge}>
//               <Text style={styles.badgeText}>{notificationCount}</Text>
//             </View>
//           )}
//         </TouchableOpacity>

//         {/* Profile Anchor View */}
//         <TouchableOpacity style={styles.profileIconContainer} onPress={onProfilePress} activeOpacity={0.7}>
//           <Image 
//             source={require('../../../assets/images/Profile Icon.png')} 
//             style={styles.headerProfileImg} 
//             resizeMode="contain"
//           />
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// }

///////////////////////////////////////////////////////////////////////////////////////////////////

import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Dimensions,
  TouchableWithoutFeedback,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import styles from '../HomeScreen/homeStyling'; 

const { width, height } = Dimensions.get('window');

export default function Header() {
  const navigation = useNavigation();
  const [sidebarVisible, setSidebarVisible] = useState(false);
  
  const notificationCount = 3; 

  const menuItems = [
    { label: 'Dashboard', icon: 'home', route: 'HomeScreen' },
    { label: 'Wallet', icon: 'credit-card', route: 'WalletScreen' },
    { label: 'Markets', icon: 'trending-up', route: 'MarketScreen' },
    { label: 'Portfolio', icon: 'bar-chart-2', route: 'PortfolioScreen' },
    { label: 'Transactions', icon: 'refresh-cw', route: 'TransactionsScreen' },
    { label: 'Rewards', icon: 'gift', route: 'RewardsScreen' },
    { label: 'Referrals', icon: 'users', route: 'ReferralsScreen' },
  ];

  const bottomMenuItems = [
    { label: 'Settings', icon: 'settings', route: 'SettingsScreen' },
    { label: 'Support', icon: 'help-circle', route: 'SupportScreen' },
    { label: 'Logout', icon: 'log-out', route: 'LoginScreen', isLogout: true },
  ];

  const handleNavigation = (routeName) => {
    setSidebarVisible(false);
    if (routeName) {
      navigation.navigate(routeName);
    }
  };

  return (
    <>
      <View style={styles.header}>
        {/* Left Menu Trigger */}
        <TouchableOpacity 
          style={styles.iconButton} 
          onPress={() => setSidebarVisible(true)} 
          activeOpacity={0.7}
        >
          <Icon name="menu" size={24} color="#1f2937" />
        </TouchableOpacity>
        
        {/* Brand Logo */}
        <Image 
          source={require('../../../assets/images/LogoContainer.png')} 
          style={styles.logo} 
          resizeMode="contain" 
        />
        
        {/* Right Operations Cluster */}
        <View style={styles.headerRight}>
          <TouchableOpacity 
            style={styles.iconButton} 
            onPress={() => navigation.navigate('Notifications')} 
            activeOpacity={0.7}
          >
            <Image 
              source={require('../../../assets/images/Icon (4).png')} 
              style={styles.headerNotificationIcon} 
              resizeMode="contain"
            />
            {notificationCount > 0 && (
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{notificationCount}</Text>
              </View>
            )}
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.profileIconContainer} 
            onPress={() => navigation.navigate('UserProfile')} 
            activeOpacity={0.7}
          >
            <Image 
              source={require('../../../assets/images/Profile Icon.png')} 
              style={styles.headerProfileImg} 
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* Inline Sidebar Overlay Drawer */}
      {sidebarVisible && (
        <View style={sidebarStyles.overlay}>
          {/* Absolute backdrop position catches taps anywhere outside the menu container */}
          <TouchableWithoutFeedback onPress={() => setSidebarVisible(false)}>
            <View style={sidebarStyles.backdropTouch} />
          </TouchableWithoutFeedback>

          {/* Drawer Body content Container */}
          <View style={sidebarStyles.drawerContainer}>
            <SafeAreaView style={sidebarStyles.safeAreaContainer}>
              
              {/* Profile Header Block */}
              <View style={sidebarStyles.profileHeader}>
                <View style={sidebarStyles.userInfoRow}>
                  <View style={sidebarStyles.avatarCircle}>
                    <Icon name="user" size={22} color="#2b5ce0" />
                  </View>
                  <View style={sidebarStyles.nameContainer}>
                    <Text style={sidebarStyles.usernameText}>Username 1</Text>
                    <Text style={sidebarStyles.payoIdText}>PAYO-9831</Text>
                  </View>
                </View>
                <TouchableOpacity onPress={() => setSidebarVisible(false)} style={sidebarStyles.closeBtn}>
                  <Icon name="x" size={20} color="#fff" />
                </TouchableOpacity>
              </View>

              {/* Main Scrolling Navigation Menu Rows */}
              <ScrollView 
                style={sidebarStyles.menuList}
                contentContainerStyle={sidebarStyles.scrollContent} // Added internal padding here
                showsVerticalScrollIndicator={false}
              >
                {menuItems?.map((item, index) => (
                  <TouchableOpacity
                    key={index}
                    style={sidebarStyles.menuItem}
                    onPress={() => handleNavigation(item.route)}
                  >
                    <View style={sidebarStyles.iconWrapper}>
                      <Icon name={item.icon} size={18} color="#2b5ce0" />
                    </View>
                    <Text style={sidebarStyles.menuItemLabel}>{item.label}</Text>
                  </TouchableOpacity>
                ))}

                <View style={sidebarStyles.horizontalDivider} />

                {/* Bottom Settings & Logout Area */}
                {bottomMenuItems.map((item, index) => (
                  <TouchableOpacity
                    key={index}
                    style={sidebarStyles.menuItem}
                    onPress={() => handleNavigation(item.route)}
                  >
                    <View style={[sidebarStyles.iconWrapper, item.isLogout && sidebarStyles.logoutIconWrapper]}>
                      <Icon name={item.icon} size={18} color={item.isLogout ? '#ef4444' : '#2b5ce0'} />
                    </View>
                    <Text style={[sidebarStyles.menuItemLabel, item.isLogout && sidebarStyles.logoutText]}>
                      {item.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>

            </SafeAreaView>
          </View>
        </View>
      )}
    </>
  );
}

const sidebarStyles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: width,
    height: height,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    zIndex: 1000, 
  },
  backdropTouch: {
    ...StyleSheet.absoluteFillObject, 
  },
  drawerContainer: {
    width: width * 0.76,
    height: '100%',
    backgroundColor: '#E5E7EB', 
  },
  safeAreaContainer: {
    flex: 1,
  },
  profileHeader: {
    backgroundColor: '#3B60C4', 
    paddingHorizontal: scale(16),
    paddingVertical: verticalScale(20),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  userInfoRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarCircle: {
    width: scale(40),
    height: scale(40),
    borderRadius: scale(20),
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  nameContainer: {
    marginLeft: scale(12),
  },
  usernameText: {
    color: '#fff',
    fontSize: moderateScale(15),
    fontWeight: '600',
  },
  payoIdText: {
    color: '#E0E7FF',
    fontSize: moderateScale(12),
    marginTop: verticalScale(1),
  },
  closeBtn: {
    padding: scale(4),
  },
  menuList: {
    flex: 1,
  },
  scrollContent: {
    paddingTop: verticalScale(16),
    paddingHorizontal: scale(16),
    paddingBottom: verticalScale(65), // Creates safety padding at the bottom of list items
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: verticalScale(12),
    marginBottom: verticalScale(4),
  },
  iconWrapper: {
    width: scale(32),
    height: scale(32),
    borderRadius: scale(16),
    backgroundColor: '#D1D5DB', 
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoutIconWrapper: {
    backgroundColor: '#FEE2E2',
  },
  menuItemLabel: {
    fontSize: moderateScale(14),
    fontWeight: '500',
    color: '#1F2937',
    marginLeft: scale(16),
  },
  logoutText: {
    color: '#ef4444',
  },
  horizontalDivider: {
    height: 1,
    backgroundColor: '#D1D5DB',
    marginVertical: verticalScale(16),
  },
});