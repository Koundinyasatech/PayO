// import React, { useEffect, useState } from 'react';
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   StyleSheet,
//   FlatList,
//   ActivityIndicator,
// } from 'react-native';

// import { SafeAreaView } from 'react-native-safe-area-context';
// import LinearGradient from 'react-native-linear-gradient';
// import api from '../../api/axios';
// import Icon from 'react-native-vector-icons/Feather';

// import {
//   widthPercentageToDP as wp,
//   heightPercentageToDP as hp,
// } from 'react-native-responsive-screen';

// import { moderateScale } from 'react-native-size-matters';

// export default function NotificationScreen({
//   navigation,
// }) {
//   const [activeTab, setActiveTab] =
//     useState('Today');

//   const [data, setData] = useState([]);

//   const [loading, setLoading] =
//     useState(true);

//   useEffect(() => {
//     fetchNotifications();
//   }, []);

//   const fetchNotifications =
//     async () => {
//       try {
//         const res =
//           await api.get(
//             '/api/notifications/notifications',
//           );

//         setData(res.data);
//       } catch (err) {
//         console.log(
//           'API ERROR:',
//           err,
//         );
//       } finally {
//         setLoading(false);
//       }
//     };

//   const filterData = () => {
//     const now = new Date();

//     return data.filter((item) => {
//       const itemDate =
//         new Date(item.date);

//       if (activeTab === 'Today') {
//         return (
//           itemDate.toDateString() ===
//           now.toDateString()
//         );
//       }

//       if (
//         activeTab === 'This Week'
//       ) {
//         const weekAgo =
//           new Date();

//         weekAgo.setDate(
//           now.getDate() - 7,
//         );

//         return itemDate >= weekAgo;
//       }

//       if (
//         activeTab === 'Earlier'
//       ) {
//         const weekAgo =
//           new Date();

//         weekAgo.setDate(
//           now.getDate() - 7,
//         );

//         return itemDate < weekAgo;
//       }

//       return true;
//     });
//   };

//   const removeItem = (id) => {
//     setData((prev) =>
//       prev.filter(
//         (item) =>
//           item.id !== id,
//       ),
//     );
//   };

//   const renderItem = ({
//     item,
//   }) => (
//     <View style={styles.card}>
//       <View style={styles.row}>
//         <View style={styles.left}>
//           <View style={styles.dot} />

//           <View
//             style={
//               styles.textBlock
//             }>
//             <Text
//               style={
//                 styles.title
//               }
//               numberOfLines={
//                 2
//               }>
//               {item.title}
//             </Text>

//             <Text
//               style={
//                 styles.subtitle
//               }
//               numberOfLines={
//                 3
//               }>
//               {item.message}
//             </Text>
//           </View>
//         </View>

//         <View
//           style={
//             styles.right
//           }>
//           <Text
//             style={
//               styles.time
//             }>
//             {item.time}
//           </Text>

//           <TouchableOpacity
//             onPress={() =>
//               removeItem(
//                 item.id,
//               )
//             }>
//             <Text
//               style={
//                 styles.close
//               }>
//               ×
//             </Text>
//           </TouchableOpacity>
//         </View>
//       </View>
//     </View>
//   );

//   return (
//     <LinearGradient
//       colors={[
//         '#6a11cb',
//         '#3a0ca3',
//       ]}
//       style={styles.gradient}>
//       <SafeAreaView
//         style={
//           styles.container
//         }
//         edges={[
//           'top',
//           'bottom',
//         ]}>
//         <View
//           style={styles.header}>
//           <TouchableOpacity
//             onPress={() =>
//               navigation.goBack()
//             }>
//             <Icon
//               name="chevron-left"
//               size={moderateScale(
//                 28,
//               )}
//               color="#ffffff"
//             />
//           </TouchableOpacity>

//           <Text
//             style={
//               styles.headerTitle
//             }>
//             Notifications
//           </Text>

//           <TouchableOpacity>
//             <Text
//               style={
//                 styles.mark
//               }>
//               Mark all
//             </Text>
//           </TouchableOpacity>
//         </View>

//         <View style={styles.tabs}>
//           {[
//             'Today',
//             'This Week',
//             'Earlier',
//           ].map((tab) => (
//             <TouchableOpacity
//               key={tab}
//               style={[
//                 styles.tabBtn,
//                 activeTab ===
//                   tab &&
//                   styles.activeTab,
//               ]}
//               onPress={() =>
//                 setActiveTab(
//                   tab,
//                 )
//               }>
//               <Text
//                 style={[
//                   styles.tabText,
//                   activeTab ===
//                     tab &&
//                     styles.activeText,
//                 ]}>
//                 {tab}
//               </Text>
//             </TouchableOpacity>
//           ))}
//         </View>

//         {loading ? (
//           <ActivityIndicator
//             size="large"
//             color="#fff"
//             style={{
//               marginTop:
//                 hp('3%'),
//             }}
//           />
//         ) : (
//           <FlatList
//             data={filterData()}
//             keyExtractor={(
//               item,
//             ) =>
//               item?.id?.toString()
//             }
//             renderItem={
//               renderItem
//             }
//             showsVerticalScrollIndicator={
//               false
//             }
//             contentContainerStyle={{
//               paddingTop:
//                 hp('2%'),
//               paddingBottom:
//                 hp('4%'),
//             }}
//           />
//         )}
//       </SafeAreaView>
//     </LinearGradient>
//   );
// }

// const styles =
//   StyleSheet.create({
//     gradient: {
//       flex: 1,
//     },

//     container: {
//       flex: 1,
//       paddingHorizontal:
//         wp('4%'),
//     },

//     header: {
//       flexDirection:
//         'row',
//       justifyContent:
//         'space-between',
//       alignItems:
//         'center',
//       minHeight:
//         hp('7%'),
//     },

//     headerTitle: {
//       color: '#fff',
//       fontSize:
//         moderateScale(
//           18,
//         ),
//       fontWeight:
//         'bold',
//       flex: 1,
//       textAlign:
//         'center',
//       marginHorizontal:
//         wp('2%'),
//     },

//     mark: {
//       color: '#ccc',
//       fontSize:
//         moderateScale(
//           11,
//         ),
//     },

//     tabs: {
//       flexDirection:
//         'row',
//       backgroundColor:
//         '#4c1d95',
//       borderRadius:
//         moderateScale(
//           10,
//         ),
//       marginTop:
//         hp('2%'),
//       overflow:
//         'hidden',
//     },

//     tabBtn: {
//       flex: 1,
//       paddingVertical:
//         hp('1.5%'),
//       alignItems:
//         'center',
//     },

//     activeTab: {
//       backgroundColor:
//         '#fff',
//     },

//     tabText: {
//       color: '#fff',
//       fontSize:
//         moderateScale(
//           11,
//         ),
//       textAlign:
//         'center',
//     },

//     activeText: {
//       color: '#000',
//       fontWeight:
//         '600',
//     },

//     card: {
//       backgroundColor:
//         '#7b2ff7',
//       padding:
//         wp('4%'),
//       borderRadius:
//         moderateScale(
//           14,
//         ),
//       marginBottom:
//         hp('1.5%'),
//     },

//     row: {
//       flexDirection:
//         'row',
//       justifyContent:
//         'space-between',
//     },

//     left: {
//       flexDirection:
//         'row',
//       flex: 1,
//       paddingRight:
//         wp('3%'),
//     },

//     textBlock: {
//       flex: 1,
//     },

//     right: {
//       alignItems:
//         'flex-end',
//       justifyContent:
//         'space-between',
//       minWidth:
//         wp('12%'),
//     },

//     dot: {
//       width:
//         moderateScale(
//           8,
//         ),
//       height:
//         moderateScale(
//           8,
//         ),
//       backgroundColor:
//         '#fff',
//       borderRadius:
//         moderateScale(
//           4,
//         ),
//       marginRight:
//         wp('3%'),
//       marginTop:
//         hp('0.7%'),
//     },

//     title: {
//       color: '#fff',
//       fontWeight:
//         'bold',
//       fontSize:
//         moderateScale(
//           14,
//         ),
//     },

//     subtitle: {
//       color: '#ddd',
//       fontSize:
//         moderateScale(
//           12,
//         ),
//       marginTop:
//         hp('0.3%'),
//     },

//     time: {
//       color: '#ccc',
//       fontSize:
//         moderateScale(
//           10,
//         ),
//     },

//     close: {
//       color: '#fff',
//       fontSize:
//         moderateScale(
//           18,
//         ),
//     },
//   });




import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';
import api from '../../api/axios';
import Icon from 'react-native-vector-icons/Feather';

// 1. Importing the responsive utilities
import {
  scale,
  verticalScale,
  moderateScale,
} from '../../utils/responsive';

// 2. Importing your theme file
import { theme } from '../../MainTheme/theme';

export default function NotificationScreen({ navigation }) {
  const [activeTab, setActiveTab] = useState('Today');
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      const res = await api.get('/api/notifications/notifications');
      setData(res.data);
    } catch (err) {
      console.log('API ERROR:', err);
    } finally {
      setLoading(false);
    }
  };

  const filterData = () => {
    const now = new Date();

    return data.filter((item) => {
      const itemDate = new Date(item.date);

      if (activeTab === 'Today') {
        return itemDate.toDateString() === now.toDateString();
      }

      if (activeTab === 'This Week') {
        const weekAgo = new Date();
        weekAgo.setDate(now.getDate() - 7);
        return itemDate >= weekAgo;
      }

      if (activeTab === 'Earlier') {
        const weekAgo = new Date();
        weekAgo.setDate(now.getDate() - 7);
        return itemDate < weekAgo;
      }

      return true;
    });
  };

  const removeItem = (id) => {
    setData((prev) => prev.filter((item) => item.id !== id));
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <View style={styles.titleRow}>
          <View style={styles.dot} />
          <Text style={styles.title} numberOfLines={1}>
            {item.title}
          </Text>
        </View>

        <View style={styles.actionRow}>
          <Text style={styles.time}>{item.time}</Text>
          <TouchableOpacity
            style={styles.closeBtn}
            onPress={() => removeItem(item.id)}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Icon name="x" size={moderateScale(16)} color={theme.colors.textMain} />
          </TouchableOpacity>
        </View>
      </View>

      <Text style={styles.subtitle} numberOfLines={3}>
        {item.message}
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
      <View style={styles.container}>
        
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Icon
                name="chevron-left"
                size={moderateScale(28)}
                color={theme.colors.textMain}
              />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Notifications</Text>
          </View>

          <TouchableOpacity>
            <Text style={styles.mark}>Mark all as read</Text>
          </TouchableOpacity>
        </View>

        {/* Tabs */}
        <View style={styles.tabs}>
          {['Today', 'This Week', 'Earlier'].map((tab) => (
            <TouchableOpacity
              key={tab}
              style={[
                styles.tabBtn,
                activeTab === tab && styles.activeTab,
              ]}
              onPress={() => setActiveTab(tab)}
              activeOpacity={0.8}
            >
              <Text
                style={[
                  styles.tabText,
                  activeTab === tab && styles.activeText,
                ]}
              >
                {tab}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* List Content */}
        {loading ? (
          <ActivityIndicator
            size="large"
            color={theme.colors.primaryBlue}
            style={styles.loader}
          />
        ) : (
          <FlatList
            data={filterData()}
            keyExtractor={(item) => item?.id?.toString()}
            renderItem={renderItem}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.listContent}
          />
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: theme.colors.bgApp, // Clean white background
  },

  container: {
    flex: 1,
    paddingHorizontal: scale(16),
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    minHeight: verticalScale(50),
    marginTop: verticalScale(10),
  },

  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  headerTitle: {
    color: theme.colors.textMain,
    fontSize: moderateScale(20),
    fontWeight: theme.typography.weight.semibold || '600',
    marginLeft: scale(8),
  },

  mark: {
    color: theme.colors.textMain,
    fontSize: moderateScale(13),
    fontWeight: theme.typography.weight.medium || '500',
  },

  tabs: {
    flexDirection: 'row',
    backgroundColor: theme.colors.primaryBlue, // Blue pill container
    borderRadius: theme.borderRadius.md || 12,
    marginTop: verticalScale(16),
    marginBottom: verticalScale(16),
    padding: scale(4),
  },

  tabBtn: {
    flex: 1,
    paddingVertical: verticalScale(10),
    alignItems: 'center',
    borderRadius: theme.borderRadius.sm || 8,
  },

  activeTab: {
    backgroundColor: '#ffffff', // White active tab
    ...theme.shadows.sm,
  },

  tabText: {
    color: '#ffffff', // White text for inactive
    fontSize: moderateScale(13),
    fontWeight: theme.typography.weight.medium || '500',
  },

  activeText: {
    color: theme.colors.textMain, // Dark text for active
    fontWeight: theme.typography.weight.semibold || '600',
  },

  loader: {
    marginTop: verticalScale(40),
  },

  listContent: {
    paddingTop: verticalScale(8),
    paddingBottom: verticalScale(40),
  },

  card: {
    backgroundColor: '#f0f9ff', // Very light blue background matches image
    padding: scale(16),
    borderRadius: theme.borderRadius.md || 12,
    marginBottom: verticalScale(12),
    borderWidth: 1,
    borderColor: '#bae6fd', // Subtle blue border
    ...theme.shadows.sm,
  },

  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: verticalScale(8),
  },

  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    paddingRight: scale(12),
  },

  dot: {
    width: scale(4),
    height: scale(4),
    backgroundColor: theme.colors.textMain, // Dark bullet dot
    borderRadius: scale(2),
    marginRight: scale(8),
  },

  title: {
    color: theme.colors.textMain,
    fontWeight: theme.typography.weight.medium || '500',
    fontSize: moderateScale(16),
  },

  actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  time: {
    color: theme.colors.primaryBlue, // Blue timestamps
    fontSize: moderateScale(12),
    fontWeight: theme.typography.weight.medium || '500',
    marginRight: scale(12),
  },

  closeBtn: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  subtitle: {
    color: theme.colors.textMain,
    fontSize: moderateScale(13),
    paddingLeft: scale(12), // Aligns with the title (offsetting the dot)
    marginTop: verticalScale(4),
  },
});