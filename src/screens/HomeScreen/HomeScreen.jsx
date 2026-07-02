// // HomeScreen.jsx

// import React, { useState, useCallback } from 'react';
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   ScrollView,
//   Image,
//   StatusBar,
//   Dimensions,
// } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import styles from './homeStyling';
// import api from '../../api/axios';
// import Header from '../components/header';
// import Icon from 'react-native-vector-icons/Feather';
// import { useFocusEffect } from '@react-navigation/native';
// import { LineChart } from 'react-native-chart-kit';
// import MarketCardComponent from '../Market/marketCard';
// import AdvancedMarketCard from '../Market/marketCard';

// const screenWidth = Dimensions.get('window').width;

// export default function HomeScreen({ navigation }) {
//   const [balanceVisible, setBalanceVisible] = useState(false);
//   const [transactionsList, setTransactionsList] = useState([]);
//   const [showAll] = useState(false);
//   const [visibleCount] = useState(10);
//   const [currentPage] = useState(1);

//   const [avaliable, setAvaliable] = useState('');
//   const [totalBalance, setTotalBalance] = useState('');
//   const [expertCoins, setExpertCoins] = useState([]);
//   const [marketCharts, setMarketCharts] = useState({});

//   const itemsPerPage = 5;

//   const displayedTransactions = showAll
//     ? transactionsList.slice(0, visibleCount)
//     : transactionsList.slice(
//         (currentPage - 1) * itemsPerPage,
//         currentPage * itemsPerPage,
//       );

//   const totalPages = Math.ceil(
//     transactionsList.length / itemsPerPage,
//   );

//   const getVisiblePages = () => {
//     let pages = [];
//     const visibleCountPages = 5;

//     let startPage = currentPage - 2;
//     let endPage = currentPage + 2;

//     if (startPage < 1) {
//       startPage = 1;
//       endPage = visibleCountPages;
//     }

//     if (endPage > totalPages) {
//       endPage = totalPages;
//       startPage = totalPages - visibleCountPages + 1;

//       if (startPage < 1) {
//         startPage = 1;
//       }
//     }

//     for (let i = startPage; i <= endPage; i++) {
//       pages.push(i);
//     }

//     return pages;
//   };

//   const fetchTotalBalance = async () => {
//     try {
//       const res = await api.get('/api/wallet/income-outcome');
//       setTotalBalance(res?.data || []);
//     } catch (err) {
//       console.log(err.message);
//     }
//   };

//   const fetchTransactions = async () => {
//     try {
//       const res = await api.get('/api/wallet/transaction-list');
//       const transactions = res?.data?.transactions || [];

//       const filteredTransactions = transactions.filter(
//         (item) =>
//           !(
//             item?.status === 'failed' &&
//             item?.type === 'received'
//           ),
//       );

//       setTransactionsList(filteredTransactions);
//     } catch (err) {
//       console.log(err.message);
//     }
//   };

//   const fetchBalance = async () => {
//     try {
//       const response = await api.get('/api/wallet/balance');
//       setAvaliable(response?.data?.balance || '0');
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const fetchExpertCoins = async () => {
//     try {
//       // const res = await fetch(
//       //   'http://payo-app.duckdns.org:3001/api/market/overview',
//       // );
//         const res = await api.get('/api/market/overview');

//     console.log(res.data, 'data');

//     setExpertCoins(res?.data?.data?.slice(0, 50));

//       // const result = await res.json();
//       // setExpertCoins(result?.data?.slice(0, 50) || []);
//     } catch (error) {
//       console.log(error);
//     }
//   };

// useFocusEffect(
//   useCallback(() => {
//     fetchBalance();
//     fetchTotalBalance();
//     fetchExpertCoins();

//     // auto refresh every 1 second
//     const interval = setInterval(() => {
//       fetchExpertCoins();
//     }, 1000);

//     return () => clearInterval(interval);
//   }, []),
// );

//   return (
//     <SafeAreaView style={styles.container}>
//       <StatusBar
//         backgroundColor="#3B0A6B"
//         barStyle="light-content"
//       />

//       <Header type="default" />

//       <ScrollView
//         showsVerticalScrollIndicator={false}
//         contentContainerStyle={styles.scrollContent}>
//         <View style={styles.cardContainer}>
//           <View style={styles.card}>
//             <View style={styles.topRightCurve} />
//             <View style={styles.bottomLeftCurve} />

//             <View>
//               <Text style={styles.balanceLabel}>
//                 Total Balance
//               </Text>

//               <View style={styles.balanceRow}>
//                 <Text style={styles.balanceAmount}>
//                   {balanceVisible
//                     ? `${avaliable}`
//                     : '* * * *'}
//                 </Text>

//                 <Text style={styles.payoLabel}>
//                   PAYO
//                 </Text>
//               </View>
//             </View>

//             <View style={styles.cardRight}>
//               <TouchableOpacity
//                 onPress={() =>
//                   setBalanceVisible(!balanceVisible)
//                 }>
//                 <Icon
//                   name={balanceVisible ? 'eye' : 'eye-off'}
//                   size={20}
//                   color="#fff"
//                 />
//               </TouchableOpacity>

//               <TouchableOpacity
//                 style={styles.walletRow}
//                 onPress={() =>
//                   navigation.navigate('Wallets')
//                 }>
//                 <Text style={styles.walletText}>
//                   My Wallet
//                 </Text>

//                 <View style={styles.arrowCircle}>
//                   <Icon
//                     name="arrow-right"
//                     size={16}
//                     color="#000"
//                   />
//                 </View>
//               </TouchableOpacity>
//             </View>

//             <TouchableOpacity
//               style={styles.addBankButton}
//               onPress={() =>
//                 navigation.navigate('AddBankHome')
//               }>
//               <Icon
//                 name="plus-circle"
//                 size={18}
//                 color="#000"
//                 style={styles.bankIcon}
//               />

//               <Text style={styles.addBankText}>
//                 Add Bank
//               </Text>
//             </TouchableOpacity>
//           </View>
//         </View>

//         <View style={styles.actionsContainer}>
//           <View style={styles.actions}>
//             <TouchableOpacity
//               style={styles.button}
//               onPress={() =>
//                 navigation.navigate('SendScreen', {
//                   tab: 'scan',
//                 })
//               }>
//               <View style={styles.iconCircle}>
//                 <Icon
//                   name="arrow-up-right"
//                   size={16}
//                   color="#fff"
//                 />
//               </View>
//               <Text style={styles.label}>Send</Text>
//             </TouchableOpacity>

//             <View style={styles.connector} />

//             <TouchableOpacity
//               style={styles.button}
//               onPress={() =>
//                 navigation.navigate('Receive')
//               }>
//               <View style={styles.iconCircle}>
//                 <Icon
//                   name="arrow-down-left"
//                   size={16}
//                   color="#fff"
//                 />
//               </View>
//               <Text style={styles.label}>Receive</Text>
//             </TouchableOpacity>

//             <View style={styles.connector} />

//             <TouchableOpacity
//               style={styles.button}
//               onPress={() =>
//                 navigation.navigate('ReferEarn')
//               }>
//               <View style={styles.iconCircle}>
//                 <Icon
//                   name="arrow-up-right"
//                   size={16}
//                   color="#fff"
//                 />
//               </View>
//               <Text style={styles.label}>Refer</Text>
//             </TouchableOpacity>
//           </View>
//         </View>

//         <View style={styles.statsContainer}>
//           <View style={styles.statsCard}>
//             <View style={styles.statItem}>
//               <Icon
//                 name="arrow-down"
//                 size={24}
//                 color="#53D258"
//               />
//               <View style={styles.textBlock}>
//                 <Text style={styles.statLabel}>
//                   Income
//                 </Text>
//                 <View style={styles.amountRow}>
//                   <Text style={styles.statValue}>
//                     {totalBalance?.income}
//                   </Text>
//                   <Text style={styles.unit}>
//                     PAYO
//                   </Text>
//                 </View>
//               </View>
//             </View>

//             <View style={styles.divider} />

//             <View style={styles.statItem}>
//               <Icon
//                 name="arrow-up"
//                 size={24}
//                 color="#FF6B6B"
//               />
//               <View style={styles.textBlock}>
//                 <Text style={styles.statLabel}>
//                   Outcome
//                 </Text>
//                 <View style={styles.amountRow}>
//                   <Text style={styles.statValue}>
//                     {totalBalance?.outcome}
//                   </Text>
//                   <Text style={styles.unit}>
//                     PAYO
//                   </Text>
//                 </View>
//               </View>
//             </View>
//           </View>
//         </View>

//         <View style={styles.expertContainer}>
//           <View style={styles.expertHeader}>
//             <Text style={styles.expertTitle}>
//               Expert Picks
//             </Text>

//             <TouchableOpacity
//               onPress={() =>
//                 navigation.navigate('MarketScreen')
//               }>
//               <Text style={styles.viewAllText}>
//                 View All
//               </Text>
//             </TouchableOpacity>
//           </View>

//           <ScrollView
//             horizontal
//             showsHorizontalScrollIndicator={false}
//             contentContainerStyle={{
//               paddingRight: 20,
//             }}>
//             {expertCoins.map((coin, index) => {
//               const isLong =
//                 coin?.priceChangePercentage24h >= 0;

//               return (
//                 <TouchableOpacity
//                   key={index}
//                   style={styles.expertCard}
//                   activeOpacity={0.8}
//                   onPress={() =>
//                     navigation.navigate(
//                       'CoinDetailsScreen',
//                       { coin },
//                     )
//                   }>
//                   <View style={styles.expertTopRow}>
//                     <View style={styles.coinInfo}>
//                       <Image
//                         source={{
//                           uri:
//                             coin?.image ||
//                             'https://cdn-icons-png.flaticon.com/512/825/825508.png',
//                         }}
//                         style={styles.coinImage}
//                       />
//                       <Text style={styles.coinSymbol}>
//                         {coin.symbol?.toUpperCase()}
//                       </Text>
//                     </View>

//                     <View
//                       style={[
//                         styles.badge,
//                         isLong
//                           ? styles.longBadge
//                           : styles.shortBadge,
//                       ]}>
//                       <Text style={styles.badgeText}>
//                         {isLong
//                           ? 'Long 5x'
//                           : 'Short 5x'}
//                       </Text>
//                     </View>
//                   </View>

//                   <Text style={styles.entryLabel}>
//                     Entry
//                   </Text>

//                   <Text style={styles.entryPrice}>
//                     ${coin.price?.toLocaleString()}
//                   </Text>

//                   <View style={styles.profitBox}>
//                     <Text style={styles.profitText}>
//                       {(
//   coin.priceChangePercentage24h || 0
// ).toFixed(2)}
//                       % Expected profit
//                     </Text>
//                   </View>
//                 </TouchableOpacity>
//               );
//             })}
//           </ScrollView>
//         </View>

//         {/* <View
//           style={[
//             styles.marketCardsContainer,
//             { marginBottom: 30 },
//           ]}>
//           {expertCoins?.slice(0, 1).map(
//             (coin, index) => {
//               const isNegative =
//                 coin?.priceChangePercentage24h < 0;

//               const graphData = [
//                 coin.price + 1200,
//                 coin.price + 900,
//                 coin.price + 700,
//                 coin.price + 300,
//                 coin.price - 100,
//                 coin.price + 200,
//                 coin.price - 400,
//                 coin.price - 250,
//               ];

//               return (
//                 <View
//                   key={index}
//                   style={styles.marketCard}>
//                   <View style={styles.marketHeader}>
//                     <View
//                       style={styles.marketCoinRow}>
//                       <Image
//                         source={{
//                           uri:
//                             coin.image ||
//                             'https://cdn-icons-png.flaticon.com/512/825/825508.png',
//                         }}
//                         style={
//                           styles.marketCoinImage
//                         }
//                       />

//                       <View>
//                         <Text
//                           style={
//                             styles.marketCoinName
//                           }>
//                           {coin.name}
//                         </Text>

//                         <Text
//                           style={
//                             styles.marketCoinSymbol
//                           }>
//                           {coin.symbol?.toUpperCase()}
//                         </Text>
//                       </View>
//                     </View>

//                     <View
//                       style={[
//                         styles.marketBadge,
//                         {
//                           backgroundColor:
//                             isNegative
//                               ? '#FFE5EA'
//                               : '#E7FFF1',
//                         },
//                       ]}>
//                       <Text
//                         style={{
//                           color: isNegative
//                             ? '#FF4D6D'
//                             : '#00C853',
//                           fontWeight: '700',
//                         }}>
//                         {isNegative
//                           ? 'Bearish'
//                           : 'Bullish'}
//                       </Text>
//                     </View>
//                   </View>

//                   <View style={styles.priceSection}>
//                     <Text style={styles.marketPrice}>
//                       $
//                       {coin?.price?.toLocaleString()}
//                     </Text>

//                     <Text
//                       style={[
//                         styles.marketChange,
//                         {
//                           color: isNegative
//                             ? '#FF4D6D'
//                             : '#00C853',
//                         },
//                       ]}>
//                       {isNegative ? '▼' : '▲'}{' '}
//                       {Math.abs(
//                         coin.priceChangePercentage24h ||
//                           0,
//                       ).toFixed(2)}
//                       %
//                     </Text>
//                   </View>

//                   <LineChart
//                     data={{
//                       datasets: [
//                         {
//                           data: graphData,
//                         },
//                       ],
//                     }}
//                     width={screenWidth * 0.78}
//                     height={100}
//                     withDots={false}
//                     withInnerLines={false}
//                     withOuterLines={false}
//                     withHorizontalLabels={false}
//                     withVerticalLabels={false}
//                     withShadow={false}
//                     transparent
//                     bezier
//                     chartConfig={{
//                       backgroundGradientFrom:
//                         '#fff',
//                       backgroundGradientTo:
//                         '#fff',
//                       decimalPlaces: 0,
//                       color: () =>
//                         isNegative
//                           ? '#FF4D6D'
//                           : '#00C853',
//                       strokeWidth: 3,
//                       propsForBackgroundLines: {
//                         stroke: 'transparent',
//                       },
//                     }}
//                     style={styles.chartStyle}
//                   />
//                 </View>
//               );
//             },
//           )}
//         </View> */}
// <View style={[styles.marketCardsContainer, { marginBottom: 30 }]}>
//   {expertCoins?.slice(0, 1).map((coin, index) => (
//     <AdvancedMarketCard
//       key={index}
//       coin={coin}
//       onPress={() => navigation.navigate('CoinDetailsScreen', { coin })}
//     />
//   ))}
// </View>
//       </ScrollView>
//     </SafeAreaView>
//   );
// }


//banner at top
import React, { useState, useCallback, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  StatusBar,
  Dimensions,
  FlatList,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from './homeStyling';
import api from '../../api/axios';
import Header from '../components/header';
import Icon from 'react-native-vector-icons/Feather';
import { useFocusEffect } from '@react-navigation/native';
import { LineChart } from 'react-native-chart-kit';
import MarketCardComponent from '../Market/marketCard';
import AdvancedMarketCard from '../Market/marketCard';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Linking } from 'react-native';


const screenWidth = Dimensions.get('window').width;

export default function HomeScreen({ navigation }) {
  const [balanceVisible, setBalanceVisible] = useState(false);
  const [transactionsList, setTransactionsList] = useState([]);
  const [showAll] = useState(false);
  const [visibleCount] = useState(10);
  const [currentPage] = useState(1);

  const [avaliable, setAvaliable] = useState('');
  const [totalBalance, setTotalBalance] = useState('');
  const [expertCoins, setExpertCoins] = useState([]);
  const [marketNews, setMarketNews] = useState([]);
  const [marketCharts, setMarketCharts] = useState({});

  const itemsPerPage = 5;


  const displayedTransactions = showAll
    ? transactionsList.slice(0, visibleCount)
    : transactionsList.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage,
    );

  const totalPages = Math.ceil(
    transactionsList.length / itemsPerPage,
  );

  // --- Banner Carousel Implementation Start ---
  const flatListRef = useRef(null);
  const [activeBanner, setActiveBanner] = useState(0);
  const bannerData = [
    { id: '1', image: require('../../../assets/images/banner1.png') },
    { id: '2', image: require('../../../assets/images/banner2.png') },
    { id: '3', image: require('../../../assets/images/banner3.png') },
    { id: '4', image: require('../../../assets/images/banner4.png') },
    { id: '5', image: require('../../../assets/images/banner5.png') },
    { id: '6', image: require('../../../assets/images/banner6.png') },
    { id: '7', image: require('../../../assets/images/banner7.png') },
    { id: '8', image: require('../../../assets/images/banner8.png') },
    { id: '9', image: require('../../../assets/images/banner9.png') },
    { id: '10', image: require('../../../assets/images/banner10.png') },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveBanner((prev) => {
        const nextIndex = (prev + 1) % bannerData.length;
        flatListRef.current?.scrollToIndex({
          index: nextIndex,
          animated: true,
        });
        return nextIndex;
      });
    }, 5000); // 5 seconds timer

    return () => clearInterval(interval);
  }, []);

  const onViewableItemsChanged = useRef(({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setActiveBanner(viewableItems[0].index);
    }
  }).current;

  const viewabilityConfig = useRef({
    itemVisiblePercentThreshold: 50,
  }).current;
  // --- Banner Carousel Implementation End ---

  const getVisiblePages = () => {
    let pages = [];
    const visibleCountPages = 5;

    let startPage = currentPage - 2;
    let endPage = currentPage + 2;

    if (startPage < 1) {
      startPage = 1;
      endPage = visibleCountPages;
    }

    if (endPage > totalPages) {
      endPage = totalPages;
      startPage = totalPages - visibleCountPages + 1;

      if (startPage < 1) {
        startPage = 1;
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return pages;
  };

  const fetchTotalBalance = async () => {
    try {
      const res = await api.get('/api/wallet/income-outcome');
      setTotalBalance(res?.data || []);
    } catch (err) {
      console.log(err.message);
    }
  };

  const fetchTransactions = async () => {
    try {
      const res = await api.get('/api/wallet/transaction-list');
      const transactions = res?.data?.transactions || [];

      const filteredTransactions = transactions.filter(
        (item) =>
          !(
            item?.status === 'failed' &&
            item?.type === 'received'
          ),
      );

      setTransactionsList(filteredTransactions);
    } catch (err) {
      console.log(err.message);
    }
  };

  const fetchBalance = async () => {
    try {
      const response = await api.get('/api/wallet/balance');
      setAvaliable(response?.data?.balance || '0');
    } catch (error) {
      console.log(error);
    }
  };

  const fetchExpertCoins = async () => {
    try {
      // const res = await fetch(
      //   'http://payo-app.duckdns.org:3001/api/market/overview',
      // );
      const res = await api.get('/api/market/overview');



      setExpertCoins(res?.data?.data?.slice(0, 50));

      // const result = await res.json();
      // setExpertCoins(result?.data?.slice(0, 50) || []);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchMarketNews = async () => {
    try {
      // const res = await fetch(
      //   'http://localhost:3001/api/news/crypto-news',
      // );
      const res = await api.get('/api/news/crypto-news');

      console.log(res.data, 'data');

      setMarketNews(res?.data?.data?.slice(0, 10));

      // const result = await res.json();
      // setMarketNews(result?.data?.slice(0, 50) || []);
    } catch (error) {
      console.log(error);
    }
  };

 const formatDate = date => {
  const d = new Date(date);

  const formattedDate = d.toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    timeZone: 'Asia/Kolkata',
  });

  const formattedTime = d.toLocaleTimeString('en-IN', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
    timeZone: 'Asia/Kolkata',
  });

  return `${formattedDate} • ${formattedTime}`;
};
  useFocusEffect(
    useCallback(() => {
      fetchBalance();
      fetchTotalBalance();
      fetchExpertCoins();
      fetchMarketNews();

      // // auto refresh every 1 second
      // const interval = setInterval(() => {
      //   fetchExpertCoins();
      // }, 1000);

      // return () => clearInterval(interval);

    }, []),
  );
  console.log(marketNews, "0909")

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        backgroundColor="#3B0A6B"
        barStyle="light-content"
      />

      <Header type="default" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}>
        
        {/* --- BANNER CAROUSEL UI START (Moved to Top) --- */}
        <View style={{ marginTop: 15, marginBottom: 0 }}>
          <FlatList
            ref={flatListRef}
            data={bannerData}
            keyExtractor={(item) => item.id}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onViewableItemsChanged={onViewableItemsChanged}
            viewabilityConfig={viewabilityConfig}
            getItemLayout={(data, index) => ({
              length: screenWidth,
              offset: screenWidth * index,
              index,
            })}
            renderItem={({ item }) => (
              <View style={{ width: screenWidth, paddingHorizontal: 20 }}>
                <Image
                  source={item.image}
                  style={{
                    width: '100%',
                    height: 130,
                    borderRadius: 16,
                    resizeMode: 'stretch',
                  }}
                />
              </View>
            )}
          />
          {/* Pagination Dots */}
          <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 12 }}>
            {bannerData.map((_, index) => (
              <View
                key={index}
                style={{
                  width: activeBanner === index ? 24 : 8,
                  height: 8,
                  borderRadius: 4,
                  backgroundColor: activeBanner === index ? '#1356db' : '#D3D3D3',
                  marginHorizontal: 4,
                }}
              />
            ))}
          </View>
        </View>
        {/* --- BANNER CAROUSEL UI END --- */}

        <View style={styles.cardContainer}>
          
          <View style={styles.card}>
         
            <View style={styles.topRightCurve} />
            <View style={styles.bottomLeftCurve} />

            <View>
              <Text style={styles.balanceLabel}>
                Total Balance
              </Text>

              <View style={styles.balanceRow}>
                <Text style={styles.balanceAmount}>
                  {balanceVisible
                    ? `${avaliable}`
                    : '* * * *'}
                </Text>

                <Text style={styles.payoLabel}>
                  PAYO
                </Text>
              </View>
            </View>

            <View style={styles.cardRight}>
              <TouchableOpacity
                onPress={() =>
                  setBalanceVisible(!balanceVisible)
                }>
                <Icon
                  name={balanceVisible ? 'eye' : 'eye-off'}
                  size={20}
                  color="#fff"
                />
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.walletRow}
                onPress={() =>
                  navigation.navigate('Wallets')
                }>
                <Text style={styles.walletText}>
                  My Wallet
                </Text>

                <View style={styles.arrowCircle}>
                  <Icon
                    name="arrow-right"
                    size={16}
                    color="#000"
                  />
                </View>
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={styles.addBankButton}
              onPress={() =>
                navigation.navigate('AddBankHome')
              }>
              <Icon
                name="plus-circle"
                size={18}
                color="#000"
                style={styles.bankIcon}
              />

              <Text style={styles.addBankText}>
                Add Bank
              </Text>
            </TouchableOpacity>
          </View>
        </View>

       <View>
         <View style={styles.actionsContainer}>

                    <View style={styles.actionHeader}>
           <Text style={styles.actionTitle}>
 ⚡ Quick Actions
</Text>

          </View>
          <View style={styles.actions}>
            <TouchableOpacity
              style={styles.button}
              onPress={() =>
                navigation.navigate('SendScreen', {
                  tab: 'scan',
                })
              }>
              <View style={styles.iconCircle}>
                <Icon
                  name="arrow-up-right"
                  size={16}
                  color="#fff"
                />
              </View>
              <Text style={styles.label}>Send</Text>
            </TouchableOpacity>

            <View style={styles.connector} />

            <TouchableOpacity
              style={styles.button}
              onPress={() =>
                navigation.navigate('Receive')
              }>
              <View style={styles.iconCircle}>
                <Icon
                  name="arrow-down-left"
                  size={16}
                  color="#fff"
                />
              </View>
              <Text style={styles.label}>Receive</Text>
            </TouchableOpacity>

            <View style={styles.connector} />

            <TouchableOpacity
              style={styles.button}
              onPress={() =>
                navigation.navigate('ReferEarn')
              }>
              <View style={styles.iconCircle}>
                <Icon
                  name="arrow-up-right"
                  size={16}
                  color="#fff"
                />
              </View>
              <Text style={styles.label}>Refer</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* <View style={styles.statsContainer}>
          <View style={styles.statsCard}>
            <View style={styles.statItem}>
              <Icon
                name="arrow-down"
                size={24}
                color="#53D258"
              />
              <View style={styles.textBlock}>
                <Text style={styles.statLabel}>
                  Income
                </Text>
                <View style={styles.amountRow}>
                  <Text style={styles.statValue}>
                    {totalBalance?.income}
                  </Text>
                  <Text style={styles.unit}>
                    PAYO
                  </Text>
                </View>
              </View>
            </View>

            <View style={styles.divider} />

            <View style={styles.statItem}>
              <Icon
                name="arrow-up"
                size={24}
                color="#FF6B6B"
              />
              <View style={styles.textBlock}>
                <Text style={styles.statLabel}>
                  Outcome
                </Text>
                <View style={styles.amountRow}>
                  <Text style={styles.statValue}>
                    {totalBalance?.outcome}
                  </Text>
                  <Text style={styles.unit}>
                    PAYO
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View> */}
       </View>


       {/* <View style={styles.quickSummaryCard}>

  <View style={styles.actionHeader}>
    <Text style={styles.actionTitle}>⚡ Quick Actions</Text>
  </View>

 
 <View style={styles.actions}>

  <TouchableOpacity
    style={styles.actionButton}
    onPress={() =>
      navigation.navigate('SendScreen', { tab: 'scan' })
    }>
    <View style={styles.actionIcon}>
      <Icon
        name="arrow-up-right"
        size={18}
        color="#fff"
      />
    </View>

    <Text style={styles.actionText}>Send</Text>
  </TouchableOpacity>

  <View style={styles.actionConnector} />

  <TouchableOpacity
    style={styles.actionButton}
    onPress={() => navigation.navigate('Receive')}>
    <View style={styles.actionIcon}>
      <Icon
        name="arrow-down-left"
        size={18}
        color="#fff"
      />
    </View>

    <Text style={styles.actionText}>Receive</Text>
  </TouchableOpacity>

  <View style={styles.actionConnector} />

  <TouchableOpacity
    style={styles.actionButton}
    onPress={() => navigation.navigate('ReferEarn')}>
    <View style={styles.actionIcon}>
      <Icon
        name="arrow-up-right"
        size={18}
        color="#fff"
      />
    </View>

    <Text style={styles.actionText}>Refer</Text>
  </TouchableOpacity>

</View>


  <View style={styles.summaryDivider} />

 
  <View style={styles.summaryRow}>

    <View style={styles.summaryItem}>
      <View style={styles.summaryIconGreen}>
        <Icon
          name="arrow-down"
          size={22}
          color="#53D258"
        />
      </View>

      <View>
        <Text style={styles.summaryLabel}>
          Income
        </Text>

        <View style={styles.amountRow}>
          <Text style={styles.summaryValue}>
            {totalBalance?.income || 0}
          </Text>

          <Text style={styles.summaryUnit}>
            PAYO
          </Text>
        </View>
      </View>
    </View>

    <View style={styles.verticalDivider} />

    <View style={styles.summaryItem}>
      <View style={styles.summaryIconRed}>
        <Icon
          name="arrow-up"
          size={22}
          color="#FF6B6B"
        />
      </View>

      <View>
        <Text style={styles.summaryLabel}>
          Outcome
        </Text>

        <View style={styles.amountRow}>
          <Text style={styles.summaryValue}>
            {totalBalance?.outcome || 0}
          </Text>

          <Text style={styles.summaryUnit}>
            PAYO
          </Text>
        </View>
      </View>
    </View>

  </View>

</View> */}

        <View style={styles.expertContainer}>
          <View style={styles.expertHeader}>
           <Text style={styles.expertTitle}>
  📈   Expert Picks
</Text>

            <TouchableOpacity
              onPress={() =>
                navigation.navigate('MarketScreen')
              }>
              <Text style={styles.viewAllText}>
                View All
              </Text>
            </TouchableOpacity>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              paddingRight: 20,
            }}>
            {expertCoins.map((coin, index) => {
              const isLong =
                coin?.priceChangePercentage24h >= 0;

              return (
                <TouchableOpacity
                  key={index}
                  style={styles.expertCard}
                  activeOpacity={0.8}
                  onPress={() =>
                    navigation.navigate(
                      'CoinDetailsScreen',
                      { coin },
                    )
                  }>
                  <View style={styles.expertTopRow}>
                    <View style={styles.coinInfo}>
                      <Image
                        source={{
                          uri:
                            coin?.image ||
                            'https://cdn-icons-png.flaticon.com/512/825/825508.png',
                        }}
                        style={styles.coinImage}
                      />
                      <Text style={styles.coinSymbol}>
                        {coin.symbol?.toUpperCase()}
                      </Text>
                    </View>

                    <View
                      style={[
                        styles.badge,
                        isLong
                          ? styles.longBadge
                          : styles.shortBadge,
                      ]}>
                      <Text style={styles.badgeText}>
                        {isLong
                          ? 'Long 5x'
                          : 'Short 5x'}
                      </Text>
                    </View>
                  </View>

                  <Text style={styles.entryLabel}>
                    Entry
                  </Text>

                  <Text style={styles.entryPrice}>
                    ${coin.price?.toLocaleString()}
                  </Text>

                  <View style={styles.profitBox}>
                    <Text style={styles.profitText}>
                      {(
                        coin.priceChangePercentage24h || 0
                      ).toFixed(2)}
                      % Expected profit
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>

        {/* <View
          style={[
            styles.marketCardsContainer,
            { marginBottom: 30 },
          ]}>
          {expertCoins?.slice(0, 1).map(
            (coin, index) => {
              const isNegative =
                coin?.priceChangePercentage24h < 0;

              const graphData = [
                coin.price + 1200,
                coin.price + 900,
                coin.price + 700,
                coin.price + 300,
                coin.price - 100,
                coin.price + 200,
                coin.price - 400,
                coin.price - 250,
              ];

              return (
                <View
                  key={index}
                  style={styles.marketCard}>
                  <View style={styles.marketHeader}>
                    <View
                      style={styles.marketCoinRow}>
                      <Image
                        source={{
                          uri:
                            coin.image ||
                            'https://cdn-icons-png.flaticon.com/512/825/825508.png',
                        }}
                        style={
                          styles.marketCoinImage
                        }
                      />

                      <View>
                        <Text
                          style={
                            styles.marketCoinName
                          }>
                          {coin.name}
                        </Text>

                        <Text
                          style={
                            styles.marketCoinSymbol
                          }>
                          {coin.symbol?.toUpperCase()}
                        </Text>
                      </View>
                    </View>

                    <View
                      style={[
                        styles.marketBadge,
                        {
                          backgroundColor:
                            isNegative
                              ? '#FFE5EA'
                              : '#E7FFF1',
                        },
                      ]}>
                      <Text
                        style={{
                          color: isNegative
                            ? '#FF4D6D'
                            : '#00C853',
                          fontWeight: '700',
                        }}>
                        {isNegative
                          ? 'Bearish'
                          : 'Bullish'}
                      </Text>
                    </View>
                  </View>

                  <View style={styles.priceSection}>
                    <Text style={styles.marketPrice}>
                      $
                      {coin?.price?.toLocaleString()}
                    </Text>

                    <Text
                      style={[
                        styles.marketChange,
                        {
                          color: isNegative
                            ? '#FF4D6D'
                            : '#00C853',
                        },
                      ]}>
                      {isNegative ? '▼' : '▲'}{' '}
                      {Math.abs(
                        coin.priceChangePercentage24h ||
                          0,
                      ).toFixed(2)}
                      %
                    </Text>
                  </View>

                  <LineChart
                    data={{
                      datasets: [
                        {
                          data: graphData,
                        },
                      ],
                    }}
                    width={screenWidth * 0.78}
                    height={100}
                    withDots={false}
                    withInnerLines={false}
                    withOuterLines={false}
                    withHorizontalLabels={false}
                    withVerticalLabels={false}
                    withShadow={false}
                    transparent
                    bezier
                    chartConfig={{
                      backgroundGradientFrom:
                        '#fff',
                      backgroundGradientTo:
                        '#fff',
                      decimalPlaces: 0,
                      color: () =>
                        isNegative
                          ? '#FF4D6D'
                          : '#00C853',
                      strokeWidth: 3,
                      propsForBackgroundLines: {
                        stroke: 'transparent',
                      },
                    }}
                    style={styles.chartStyle}
                  />
                </View>
              );
            },
          )}
        </View> */}

        {/* ////////////////////////////////////////////////////////////////////

<View style={[styles.marketCardsContainer, { marginBottom: 30 }]}>
  {expertCoins?.slice(0, 1).map((coin, index) => (
    <AdvancedMarketCard
      key={index}
      coin={coin}
      onPress={() => navigation.navigate('CoinDetailsScreen', { coin })}
    />
  ))}
</View>

///////////////////////////////////////////////////////////////////////////////// */}

        <View style={styles.newsContainer}>
          <View style={styles.newsHeader}>
            <Text style={styles.newsTitle}>📰   Crypto News</Text>

            <TouchableOpacity
              onPress={() =>
                navigation.navigate('NewsScreen', {
                  news: marketNews,
                })
              }>
              <Text style={styles.viewAllText}>View All</Text>
            </TouchableOpacity>
          </View>

          {marketNews.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.newsCard}
              activeOpacity={0.8}
              onPress={() =>
                Linking.openURL(item.url)
              }>
              <View style={styles.newsLeft}>
                <Text style={styles.newsSource}>
                  {item.source}
                </Text>

                <Text
                  style={styles.newsHeadline}
                  numberOfLines={2}>
                  {item.title}
                </Text>

                <Text style={styles.newsDate}>
                  {formatDate(item.publishedAt)}
                </Text>
              </View>

              <Image
                source={{
                  uri:
                    item.image || "",
                    // 'https://cdn-icons-png.flaticon.com/512/833/833472.png',
                }}
                style={styles.newsImage}
              />
            </TouchableOpacity>
          ))}
        </View>


      </ScrollView>
    </SafeAreaView>
  );
}



//banner at next to income/outcome
// import React, { useState, useCallback, useRef, useEffect } from 'react';
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   ScrollView,
//   Image,
//   StatusBar,
//   Dimensions,
//   FlatList,
// } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import styles from './homeStyling';
// import api from '../../api/axios';
// import Header from '../components/header';
// import Icon from 'react-native-vector-icons/Feather';
// import { useFocusEffect } from '@react-navigation/native';
// import { LineChart } from 'react-native-chart-kit';
// import MarketCardComponent from '../Market/marketCard';
// import AdvancedMarketCard from '../Market/marketCard';

// const screenWidth = Dimensions.get('window').width;

// export default function HomeScreen({ navigation }) {
//   const [balanceVisible, setBalanceVisible] = useState(false);
//   const [transactionsList, setTransactionsList] = useState([]);
//   const [showAll] = useState(false);
//   const [visibleCount] = useState(10);
//   const [currentPage] = useState(1);

//   const [avaliable, setAvaliable] = useState('');
//   const [totalBalance, setTotalBalance] = useState('');
//   const [expertCoins, setExpertCoins] = useState([]);
//   const [marketCharts, setMarketCharts] = useState({});

//   const itemsPerPage = 5;

//   const displayedTransactions = showAll
//     ? transactionsList.slice(0, visibleCount)
//     : transactionsList.slice(
//         (currentPage - 1) * itemsPerPage,
//         currentPage * itemsPerPage,
//       );

//   const totalPages = Math.ceil(
//     transactionsList.length / itemsPerPage,
//   );

//   // --- Banner Carousel Implementation Start ---
//   const flatListRef = useRef(null);
//   const [activeBanner, setActiveBanner] = useState(0);

//   // Updated to use local images from src/assets/images
//   // Adjust the '../../' path if your HomeScreen is nested differently
//   const bannerData = [
//     { id: '1', image: require('../../../assets/images/banner1.png') },
//     { id: '2', image: require('../../../assets/images/banner2.png') },
//     { id: '3', image: require('../../../assets/images/banner3.png') },
//     { id: '4', image: require('../../../assets/images/banner4.png') },
//     { id: '5', image: require('../../../assets/images/banner5.png') },
//     { id: '6', image: require('../../../assets/images/banner6.png') },
//     { id: '7', image: require('../../../assets/images/banner7.png') },
//     { id: '8', image: require('../../../assets/images/banner8.png') },
//     { id: '9', image: require('../../../assets/images/banner9.png') },
//     { id: '10', image: require('../../../assets/images/banner10.png') },
//   ];

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setActiveBanner((prev) => {
//         const nextIndex = (prev + 1) % bannerData.length;
//         flatListRef.current?.scrollToIndex({
//           index: nextIndex,
//           animated: true,
//         });
//         return nextIndex;
//       });
//     }, 5000); // 5 seconds timer

//     return () => clearInterval(interval);
//   }, []);

//   const onViewableItemsChanged = useRef(({ viewableItems }) => {
//     if (viewableItems.length > 0) {
//       setActiveBanner(viewableItems[0].index);
//     }
//   }).current;

//   const viewabilityConfig = useRef({
//     itemVisiblePercentThreshold: 50,
//   }).current;
//   // --- Banner Carousel Implementation End ---

//   const getVisiblePages = () => {
//     let pages = [];
//     const visibleCountPages = 5;

//     let startPage = currentPage - 2;
//     let endPage = currentPage + 2;

//     if (startPage < 1) {
//       startPage = 1;
//       endPage = visibleCountPages;
//     }

//     if (endPage > totalPages) {
//       endPage = totalPages;
//       startPage = totalPages - visibleCountPages + 1;

//       if (startPage < 1) {
//         startPage = 1;
//       }
//     }

//     for (let i = startPage; i <= endPage; i++) {
//       pages.push(i);
//     }

//     return pages;
//   };

//   const fetchTotalBalance = async () => {
//     try {
//       const res = await api.get('/api/wallet/income-outcome');
//       setTotalBalance(res?.data || []);
//     } catch (err) {
//       console.log(err.message);
//     }
//   };

//   const fetchTransactions = async () => {
//     try {
//       const res = await api.get('/api/wallet/transaction-list');
//       const transactions = res?.data?.transactions || [];

//       const filteredTransactions = transactions.filter(
//         (item) =>
//           !(
//             item?.status === 'failed' &&
//             item?.type === 'received'
//           ),
//       );

//       setTransactionsList(filteredTransactions);
//     } catch (err) {
//       console.log(err.message);
//     }
//   };

//   const fetchBalance = async () => {
//     try {
//       const response = await api.get('/api/wallet/balance');
//       setAvaliable(response?.data?.balance || '0');
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const fetchExpertCoins = async () => {
//     try {
//         const res = await api.get('/api/market/overview');
//     console.log(res.data, 'data');
//     setExpertCoins(res?.data?.data?.slice(0, 50));
//     } catch (error) {
//       console.log(error);
//     }
//   };

// useFocusEffect(
//   useCallback(() => {
//     fetchBalance();
//     fetchTotalBalance();
//     fetchExpertCoins();

//     // auto refresh every 1 second
//     const interval = setInterval(() => {
//       fetchExpertCoins();
//     }, 1000);

//     return () => clearInterval(interval);
//   }, []),
// );

//   return (
//     <SafeAreaView style={styles.container}>
//       <StatusBar
//         backgroundColor="#3B0A6B"
//         barStyle="light-content"
//       />

//       <Header type="default" />

//       <ScrollView
//         showsVerticalScrollIndicator={false}
//         contentContainerStyle={styles.scrollContent}>
//         <View style={styles.cardContainer}>
//           <View style={styles.card}>
//             <View style={styles.topRightCurve} />
//             <View style={styles.bottomLeftCurve} />

//             <View>
//               <Text style={styles.balanceLabel}>
//                 Total Balance
//               </Text>

//               <View style={styles.balanceRow}>
//                 <Text style={styles.balanceAmount}>
//                   {balanceVisible
//                     ? `${avaliable}`
//                     : '* * * *'}
//                 </Text>

//                 <Text style={styles.payoLabel}>
//                   PAYO
//                 </Text>
//               </View>
//             </View>

//             <View style={styles.cardRight}>
//               <TouchableOpacity
//                 onPress={() =>
//                   setBalanceVisible(!balanceVisible)
//                 }>
//                 <Icon
//                   name={balanceVisible ? 'eye' : 'eye-off'}
//                   size={20}
//                   color="#fff"
//                 />
//               </TouchableOpacity>

//               <TouchableOpacity
//                 style={styles.walletRow}
//                 onPress={() =>
//                   navigation.navigate('Wallets')
//                 }>
//                 <Text style={styles.walletText}>
//                   My Wallet
//                 </Text>

//                 <View style={styles.arrowCircle}>
//                   <Icon
//                     name="arrow-right"
//                     size={16}
//                     color="#000"
//                   />
//                 </View>
//               </TouchableOpacity>
//             </View>

//             <TouchableOpacity
//               style={styles.addBankButton}
//               onPress={() =>
//                 navigation.navigate('AddBankHome')
//               }>
//               <Icon
//                 name="plus-circle"
//                 size={18}
//                 color="#000"
//                 style={styles.bankIcon}
//               />

//               <Text style={styles.addBankText}>
//                 Add Bank
//               </Text>
//             </TouchableOpacity>
//           </View>
//         </View>

//         <View style={styles.actionsContainer}>
//           <View style={styles.actions}>
//             <TouchableOpacity
//               style={styles.button}
//               onPress={() =>
//                 navigation.navigate('SendScreen', {
//                   tab: 'scan',
//                 })
//               }>
//               <View style={styles.iconCircle}>
//                 <Icon
//                   name="arrow-up-right"
//                   size={16}
//                   color="#fff"
//                 />
//               </View>
//               <Text style={styles.label}>Send</Text>
//             </TouchableOpacity>

//             <View style={styles.connector} />

//             <TouchableOpacity
//               style={styles.button}
//               onPress={() =>
//                 navigation.navigate('Receive')
//               }>
//               <View style={styles.iconCircle}>
//                 <Icon
//                   name="arrow-down-left"
//                   size={16}
//                   color="#fff"
//                 />
//               </View>
//               <Text style={styles.label}>Receive</Text>
//             </TouchableOpacity>

//             <View style={styles.connector} />

//             <TouchableOpacity
//               style={styles.button}
//               onPress={() =>
//                 navigation.navigate('ReferEarn')
//               }>
//               <View style={styles.iconCircle}>
//                 <Icon
//                   name="arrow-up-right"
//                   size={16}
//                   color="#fff"
//                 />
//               </View>
//               <Text style={styles.label}>Refer</Text>
//             </TouchableOpacity>
//           </View>
//         </View>

//         <View style={styles.statsContainer}>
//           <View style={styles.statsCard}>
//             <View style={styles.statItem}>
//               <Icon
//                 name="arrow-down"
//                 size={24}
//                 color="#53D258"
//               />
//               <View style={styles.textBlock}>
//                 <Text style={styles.statLabel}>
//                   Income
//                 </Text>
//                 <View style={styles.amountRow}>
//                   <Text style={styles.statValue}>
//                     {totalBalance?.income}
//                   </Text>
//                   <Text style={styles.unit}>
//                     PAYO
//                   </Text>
//                 </View>
//               </View>
//             </View>

//             <View style={styles.divider} />

//             <View style={styles.statItem}>
//               <Icon
//                 name="arrow-up"
//                 size={24}
//                 color="#FF6B6B"
//               />
//               <View style={styles.textBlock}>
//                 <Text style={styles.statLabel}>
//                   Outcome
//                 </Text>
//                 <View style={styles.amountRow}>
//                   <Text style={styles.statValue}>
//                     {totalBalance?.outcome}
//                   </Text>
//                   <Text style={styles.unit}>
//                     PAYO
//                   </Text>
//                 </View>
//               </View>
//             </View>
//           </View>
//         </View>

//         {/* --- BANNER CAROUSEL UI START --- */}
//         {/* Decreased the gap below the banner by setting marginBottom to 0 (was previously marginVertical 15) */}
//         <View style={{ marginTop: 20, marginBottom: -10 }}>
//           <FlatList
//             ref={flatListRef}
//             data={bannerData}
//             keyExtractor={(item) => item.id}
//             horizontal
//             pagingEnabled
//             showsHorizontalScrollIndicator={false}
//             onViewableItemsChanged={onViewableItemsChanged}
//             viewabilityConfig={viewabilityConfig}
//             getItemLayout={(data, index) => ({
//               length: screenWidth,
//               offset: screenWidth * index,
//               index,
//             })}
//             renderItem={({ item }) => (
//               <View style={{ width: screenWidth, paddingHorizontal: 20 }}>
//                 <Image
//                   source={item.image}
//                   style={{
//                     width: '100%',
//                     height: 130, /* Slightly reduced height to match banner ratios better */
//                     borderRadius: 16,
//                     resizeMode: 'stretch', /* Forces the image to fit exact width/height bounds without cropping */
//                   }}
//                 />
//               </View>
//             )}
//           />
//           {/* Pagination Dots */}
//           <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 12 }}>
//             {bannerData.map((_, index) => (
//               <View
//                 key={index}
//                 style={{
//                   width: activeBanner === index ? 24 : 8,
//                   height: 8,
//                   borderRadius: 4,
//                   backgroundColor: activeBanner === index ? '#1356db' : '#D3D3D3',
//                   marginHorizontal: 4,
//                 }}
//               />
//             ))}
//           </View>
//         </View>
//         {/* --- BANNER CAROUSEL UI END --- */}

//         <View style={styles.expertContainer}>
//           <View style={styles.expertHeader}>
//             <Text style={styles.expertTitle}>
//               Expert Picks
//             </Text>

//             <TouchableOpacity
//               onPress={() =>
//                 navigation.navigate('MarketScreen')
//               }>
//               <Text style={styles.viewAllText}>
//                 View All
//               </Text>
//             </TouchableOpacity>
//           </View>

//           <ScrollView
//             horizontal
//             showsHorizontalScrollIndicator={false}
//             contentContainerStyle={{
//               paddingRight: 20,
//             }}>
//             {expertCoins.map((coin, index) => {
//               const isLong =
//                 coin?.priceChangePercentage24h >= 0;

//               return (
//                 <TouchableOpacity
//                   key={index}
//                   style={styles.expertCard}
//                   activeOpacity={0.8}
//                   onPress={() =>
//                     navigation.navigate(
//                       'CoinDetailsScreen',
//                       { coin },
//                     )
//                   }>
//                   <View style={styles.expertTopRow}>
//                     <View style={styles.coinInfo}>
//                       <Image
//                         source={{
//                           uri:
//                             coin?.image ||
//                             'https://cdn-icons-png.flaticon.com/512/825/825508.png',
//                         }}
//                         style={styles.coinImage}
//                       />
//                       <Text style={styles.coinSymbol}>
//                         {coin.symbol?.toUpperCase()}
//                       </Text>
//                     </View>

//                     <View
//                       style={[
//                         styles.badge,
//                         isLong
//                           ? styles.longBadge
//                           : styles.shortBadge,
//                       ]}>
//                       <Text style={styles.badgeText}>
//                         {isLong
//                           ? 'Long 5x'
//                           : 'Short 5x'}
//                       </Text>
//                     </View>
//                   </View>

//                   <Text style={styles.entryLabel}>
//                     Entry
//                   </Text>

//                   <Text style={styles.entryPrice}>
//                     ${coin.price?.toLocaleString()}
//                   </Text>

//                   <View style={styles.profitBox}>
//                     <Text style={styles.profitText}>
//                       {(
//                         coin.priceChangePercentage24h || 0
//                       ).toFixed(2)}
//                       % Expected profit
//                     </Text>
//                   </View>
//                 </TouchableOpacity>
//               );
//             })}
//           </ScrollView>
//         </View>

//         <View style={[styles.marketCardsContainer, { marginBottom: 30 }]}>
//           {expertCoins?.slice(0, 1).map((coin, index) => (
//             <AdvancedMarketCard
//               key={index}
//               coin={coin}
//               onPress={() => navigation.navigate('CoinDetailsScreen', { coin })}
//             />
//           ))}
//         </View>
//       </ScrollView>
//     </SafeAreaView>
//   );
// }

