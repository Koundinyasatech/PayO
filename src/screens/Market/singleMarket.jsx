



// import React, { useState } from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   Image,
//   ScrollView,
//   TouchableOpacity,
// } from "react-native";

// import { SafeAreaView } from "react-native-safe-area-context";
// import { LineChart } from "react-native-chart-kit";

// import {
//   widthPercentageToDP as wp,
//   heightPercentageToDP as hp,
// } from "react-native-responsive-screen";

// import { moderateScale } from "react-native-size-matters";

// export default function CoinDetailsScreen() {

//   const [selectedTF, setSelectedTF] = useState("1D");

//   // dummy coin data
//   const coin = {
//     name: "Bitcoin",
//     symbol: "BTC/USDT",
//     image:
//       "https://assets.coingecko.com/coins/images/1/large/bitcoin.png",
//     price: 76717.27,
//     change: -0.74,
//     high24h: 77800,
//     low24h: 76051,
//     volume: "1.26B",
//   };

//   const isNegative = coin.change < 0;

//   const graphData = [
//     78000,
//     77000,
//     76000,
//     75500,
//     76800,
//     77400,
//     76500,
//     76700,
//   ];

//   return (
//     <SafeAreaView style={styles.container}>
//       <ScrollView showsVerticalScrollIndicator={false}>

//         {/* COIN HEADER */}
//         <View style={styles.header}>

//           <View style={styles.coinRow}>
//             <Image
//               source={{ uri: coin.image }}
//               style={styles.coinImage}
//             />

//             <View>
//               <Text style={styles.coinSymbol}>
//                 {coin.symbol}
//               </Text>

//               <Text style={styles.coinName}>
//                 {coin.name}
//               </Text>
//             </View>
//           </View>

//           <Text style={styles.price}>
//             ${coin.price.toLocaleString()}
//           </Text>

//           <Text
//             style={[
//               styles.change,
//               { color: isNegative ? "#FF4D6D" : "#00C853" },
//             ]}
//           >
//             {coin.change}%
//           </Text>

//         </View>

//         {/* MARKET STATS */}
//         <View style={styles.statsRow}>

//           <View>
//             <Text style={styles.statLabel}>
//               24h High
//             </Text>
//             <Text style={styles.statValue}>
//               {coin.high24h}
//             </Text>
//           </View>

//           <View>
//             <Text style={styles.statLabel}>
//               24h Low
//             </Text>
//             <Text style={styles.statValue}>
//               {coin.low24h}
//             </Text>
//           </View>

//           <View>
//             <Text style={styles.statLabel}>
//               24h Vol
//             </Text>
//             <Text style={styles.statValue}>
//               {coin.volume}
//             </Text>
//           </View>

//         </View>

//         {/* TIMEFRAME SELECTOR */}
//         <View style={styles.timeframeRow}>
//           {["1H", "4H", "1D", "1W", "1M"].map((tf) => (
//             <TouchableOpacity
//               key={tf}
//               onPress={() => setSelectedTF(tf)}
//               style={[
//                 styles.tfBtn,
//                 selectedTF === tf && styles.activeTF,
//               ]}
//             >
//               <Text
//                 style={[
//                   styles.tfText,
//                   selectedTF === tf && {
//                     color: "#FCD535",
//                   },
//                 ]}
//               >
//                 {tf}
//               </Text>
//             </TouchableOpacity>
//           ))}
//         </View>

//         {/* CHART */}
//         <LineChart
//           data={{
//             datasets: [{ data: graphData }],
//           }}
//           width={wp("92%")}
//           height={hp("30%")}
//           withDots={false}
//           withInnerLines={false}
//           withOuterLines={false}
//           withVerticalLabels={false}
//           withHorizontalLabels={false}
//           transparent
//           bezier
//           chartConfig={{
//             backgroundGradientFrom: "#0B0E11",
//             backgroundGradientTo: "#0B0E11",
//             color: () =>
//               isNegative ? "#FF4D6D" : "#00C853",
//             strokeWidth: 3,
//           }}
//           style={styles.chart}
//         />




//       </ScrollView>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({

//   container: {
//     flex: 1,
//     backgroundColor: "#0B0E11",
//     padding: wp("4%"),
//   },

//   header: {
//     marginBottom: hp("2%"),
//   },

//   coinRow: {
//     flexDirection: "row",
//     alignItems: "center",
//   },

//   coinImage: {
//     width: 40,
//     height: 40,
//     marginRight: 10,
//   },

//   coinSymbol: {
//     color: "#fff",
//     fontSize: 20,
//     fontWeight: "700",
//   },

//   coinName: {
//     color: "#aaa",
//   },

//   price: {
//     fontSize: 32,
//     color: "#00C853",
//     fontWeight: "700",
//     marginTop: 10,
//   },

//   change: {
//     fontSize: 16,
//   },

//   statsRow: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     marginTop: hp("2%"),
//   },

//   statLabel: {
//     color: "#888",
//   },

//   statValue: {
//     color: "#fff",
//     fontWeight: "700",
//   },

//   timeframeRow: {
//     flexDirection: "row",
//     marginTop: hp("2%"),
//   },

//   tfBtn: {
//     marginRight: 15,
//   },

//   tfText: {
//     color: "#888",
//   },

//   activeTF: {
//     borderBottomWidth: 2,
//     borderBottomColor: "#FCD535",
//   },

//   chart: {
//     marginTop: hp("2%"),
//   },

//   sourceCard: {
//     marginTop: hp("3%"),
//     backgroundColor: "#111",
//     padding: 15,
//     borderRadius: 12,
//   },

//   sourceTitle: {
//     color: "#FCD535",
//     fontWeight: "700",
//     marginBottom: 10,
//   },

//   sourceItem: {
//     color: "#ccc",
//     marginBottom: 5,
//   },

// });







// import React, { useState } from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   Image,
//   ScrollView,
//   TouchableOpacity,
// } from "react-native";

// import { SafeAreaView } from "react-native-safe-area-context";
// import {
//   widthPercentageToDP as wp,
//   heightPercentageToDP as hp,
// } from "react-native-responsive-screen";

// import {  CandlestickChart } from "react-native-wagmi-charts";

// import { LineChart } from "react-native-gifted-charts";
// import { Dimensions } from "react-native";

// const width = Dimensions.get("window").width;

// export default function CoinDetailsScreen() {

//   const [selectedTF, setSelectedTF] = useState("1D");
//   const [chartType, setChartType] = useState("line");

// //   const lineData = [
// //   { value: 76400 },
// //   { value: 76800 },
// //   { value: 76000 },
// //   { value: 77000 },
// //   { value: 76500 },
// //   { value: 77200 },
// //   { value: 76800 },
// // ];

//   const coin = {
//     name: "Bitcoin",
//     symbol: "BTC/USDT",
//     image: "https://assets.coingecko.com/coins/images/1/large/bitcoin.png",
//     price: 76717.27,
//     change: -0.74,
//     high24h: 77800,
//     low24h: 76051,
//     volume: "1.26B",
//     open: "74806",
//     prevClose: "75200",
//     dayRange: "74529 - 75244",
//   };


//   const chartData = [
//     { timestamp: 1716200000000, value: 76400 },
//     { timestamp: 1716203600000, value: 76600 },
//     { timestamp: 1716207200000, value: 77100 },
//     { timestamp: 1716210800000, value: 77500 },
//     { timestamp: 1716214400000, value: 77200 },
//     { timestamp: 1716218000000, value: 76800 },
//     { timestamp: 1716221600000, value: 77000 },
//   ];

//   const chartDataByTF = {
//   "1H": [
//     { value: 76400 },
//     { value: 76500 },
//     { value: 76300 },
//     { value: 76600 },
//     { value: 76700 },
//   ],

//   "4H": [
//     { value: 76000 },
//     { value: 76200 },
//     { value: 76500 },
//     { value: 76300 },
//     { value: 76800 },
//     { value: 77000 },
//   ],

//   "1D": [
//     { value: 75500 },
//     { value: 76000 },
//     { value: 76500 },
//     { value: 77000 },
//     { value: 76800 },
//     { value: 77200 },
//     { value: 76700 },
//   ],

//   "1W": [
//     { value: 74000 },
//     { value: 75000 },
//     { value: 76000 },
//     { value: 77000 },
//     { value: 76500 },
//     { value: 77500 },
//   ],

//   "1M": [
//     { value: 70000 },
//     { value: 72000 },
//     { value: 74000 },
//     { value: 76000 },
//     { value: 78000 },
//     { value: 77000 },
//   ],
// };

// const lineData = chartDataByTF[selectedTF];

//   const candleData = [
//   {
//     timestamp: 1716200000000,
//     open: 76000,
//     high: 77000,
//     low: 75500,
//     close: 76500, // green
//   },
//   {
//     timestamp: 1716203600000,
//     open: 76500,
//     high: 76800,
//     low: 75800,
//     close: 76000, // red
//   },
//   {
//     timestamp: 1716207200000,
//     open: 76000,
//     high: 77200,
//     low: 75900,
//     close: 77000, // green
//   },
//   {
//     timestamp: 1716210800000,
//     open: 77000,
//     high: 77400,
//     low: 76500,
//     close: 76800, // red
//   },
//   {
//     timestamp: 1716214400000,
//     open: 76800,
//     high: 77500,
//     low: 76600,
//     close: 77300, // green
//   },
// ];

// // const isProfit = chartData[chartData.length - 1].value > chartData[0].value;
// const isProfit =
//   lineData[lineData.length - 1].value > lineData[0].value;


//   const formatXAxis = (timestamp) => {
//     const date = new Date(timestamp);

//     if (selectedTF === "1H") {
//       return `${date.getHours()}:${date.getMinutes()}`;
//     }

//     if (selectedTF === "1D") {
//       return `${date.getHours()}h`;
//     }

//     if (selectedTF === "1W") {
//       return date.toLocaleDateString("en-US", { weekday: "short" });
//     }

//     if (selectedTF === "1M") {
//       return `${date.getDate()}/${date.getMonth() + 1}`;
//     }

//     return date.getHours();
//   };

//   const getYAxisValues = () => {
//     const values = chartData.map((d) => d.value);
//     const min = Math.min(...values);
//     const max = Math.max(...values);

//     const step = (max - min) / 4;

//     return [
//       min.toFixed(0),
//       (min + step).toFixed(0),
//       (min + step * 2).toFixed(0),
//       (min + step * 3).toFixed(0),
//       max.toFixed(0),
//     ];
//   };

//   const getSegmentedData = () => {
//   const segments = [];

//   for (let i = 1; i < chartData.length; i++) {
//     const prev = chartData[i - 1];
//     const curr = chartData[i];

//     segments.push({
//       data: [prev, curr],
//       color: curr.value >= prev.value ? "#00C853" : "#FF4D6D",
//     });
//   }

//   return segments;
// };

//   return (
//     <SafeAreaView style={styles.container}>
//       <ScrollView showsVerticalScrollIndicator={false}>

//         {/* HEADER */}
//         <View style={styles.headerRow}>
//           <View style={styles.coinRow}>
//             <Image source={{ uri: coin.image }} style={styles.coinImage} />

//             <View>
//               <Text style={styles.coinSymbol}>{coin.symbol}</Text>
//               <Text style={styles.coinName}>{coin.name}</Text>
//             </View>
//           </View>

//           <View style={styles.tradeButtons}>
//             <TouchableOpacity style={styles.buyBtn}>
//               <Text style={styles.tradeText}>Buy</Text>
//             </TouchableOpacity>

//             <TouchableOpacity style={styles.sellBtn}>
//               <Text style={styles.tradeText}>Sell</Text>
//             </TouchableOpacity>
//           </View>
//         </View>

//         {/* PRICE */}
//         <Text style={styles.price}>
//           ${coin.price.toLocaleString()}
//         </Text>

//         <Text
//           style={[
//             styles.change,
//             { color: coin.change < 0 ? "#FF4D6D" : "#00C853" },
//           ]}
//         >
//           {coin.change}%
//         </Text>

//         {/* MARKET STATS */}
//         <View style={styles.statsRow}>

//           <View>
//             <Text style={styles.statLabel}>24h High</Text>
//             <Text style={styles.statValue}>{coin.high24h}</Text>
//           </View>

//           <View>
//             <Text style={styles.statLabel}>24h Low</Text>
//             <Text style={styles.statValue}>{coin.low24h}</Text>
//           </View>

//           <View>
//             <Text style={styles.statLabel}>Volume</Text>
//             <Text style={styles.statValue}>{coin.volume}</Text>
//           </View>

//         </View>

//         {/* TIMEFRAME */}
//      <View style={{ flexDirection: "row", marginTop: 15 }}>
//   {["1H", "4H", "1D", "1W", "1M"].map((tf) => (
//     <TouchableOpacity
//       key={tf}
//       onPress={() => setSelectedTF(tf)}
//       style={{
//         marginRight: 10,
//         padding: 6,
//         backgroundColor: selectedTF === tf ? "#FCD535" : "#1F2937",
//         borderRadius: 6,
//       }}
//     >
//       <Text style={{ color: "#fff" }}>{tf}</Text>
//     </TouchableOpacity>
//   ))}
// </View>

//         {/* CHART TYPE BUTTONS */}
//         <View style={{ flexDirection: "row", marginTop: 10 }}>
//           <TouchableOpacity onPress={() => setChartType("line")}>
//             <Text style={{ color: "#fff", marginRight: 15 }}>Line</Text>
//           </TouchableOpacity>

//           <TouchableOpacity onPress={() => setChartType("candle")}>
//             <Text style={{ color: "#fff" }}>Candle</Text>
//           </TouchableOpacity>
//         </View>

//         <View style={{ flexDirection: "row", marginTop: 20 }}>

//           {/* Y AXIS */}
      

//           {/* CHART */}
//           <View style={{ flex: 1 }}>

//             {chartType === "line" ? (

//               // <LineChart.Provider data={chartData}>
//               //   <LineChart width={wp("80%")} height={300}>

//               //     <LineChart.Path
//               //       color={isProfit ? "#00C853" : "#FF4D6D"}
//               //       width={3}
//               //     />

//               //     <LineChart.Gradient
//               //       color={isProfit ? "#00C853" : "#FF4D6D"}
//               //     />

//               //     <LineChart.CursorCrosshair>
//               //       <LineChart.Tooltip />
//               //     </LineChart.CursorCrosshair>

//               //   </LineChart>
//               // </LineChart.Provider>

//    <LineChart
//   areaChart
//   curved
//   data={lineData}
//   height={220}
//   width={width - 40}
//   color={isProfit ? "#00C853" : "#FF4D6D"}
//   startFillColor={isProfit ? "#00C853" : "#FF4D6D"}
//   endFillColor={isProfit ? "#00C853" : "#FF4D6D"}
//   startOpacity={0.3}
//   endOpacity={0.05}
//   spacing={35}
//   thickness={3}
//   hideDataPoints={false}
//   dataPointsColor={isProfit ? "#00C853" : "#FF4D6D"}
//   yAxisColor="#1F2937"
//   xAxisColor="#1F2937"
//   textColor="#6B7280"
//   hideRules={false}
//   rulesColor="#1F2937"
//   noOfSections={5}
//   yAxisTextStyle={{
//     color: "#6B7280",
//     fontSize: 10,
//   }}
// />

//             ) : (

//              <View style={{ height: 220, width: "100%" }}>
//   <CandlestickChart.Provider data={candleData}>
//     <CandlestickChart>

//       <CandlestickChart.Candles
//         positiveColor="#00C853"
//         negativeColor="#FF4D6D"
//       />

//       <CandlestickChart.Crosshair>
//         <CandlestickChart.Tooltip />
//       </CandlestickChart.Crosshair>

//     </CandlestickChart>
//   </CandlestickChart.Provider>
// </View>
//             )}

//           </View>
//               <View style={{ justifyContent: "space-between", height: 300 }}>
//             {getYAxisValues().map((price, index) => (
//               <Text key={index} style={{ color: "#aaa", fontSize: 12 }}>
//                 {price}
//               </Text>
//             ))}
//           </View>
//         </View>

//         <View
//           style={{
//             flexDirection: "row",
//             justifyContent: "space-between",
//             marginTop: 10,
//             paddingLeft: 30,
//           }}
//         >

//           {chartData.map((item, index) => {

//             if (index % 2 !== 0) return null;

//             return (
//               <Text key={index} style={{ color: "#888", fontSize: 12 }}>
//                 {formatXAxis(item.timestamp)}
//               </Text>
//             );

//           })}

//         </View>

//         {/* KEY DATA */}
//         <View style={styles.dataCard}>

//           <Text style={styles.dataTitle}>
//             Key Data Points
//           </Text>

//           <View style={styles.dataRow}>
//             <Text style={styles.dataLabel}>Previous Close</Text>
//             <Text style={styles.dataValue}>{coin.prevClose}</Text>
//           </View>

//           <View style={styles.dataRow}>
//             <Text style={styles.dataLabel}>Open</Text>
//             <Text style={styles.dataValue}>{coin.open}</Text>
//           </View>

//           <View style={styles.dataRow}>
//             <Text style={styles.dataLabel}>Day Range</Text>
//             <Text style={styles.dataValue}>{coin.dayRange}</Text>
//           </View>

//           <View style={styles.dataRow}>
//             <Text style={styles.dataLabel}>Volume</Text>
//             <Text style={styles.dataValue}>{coin.volume}</Text>
//           </View>

//         </View>

//          <View style={styles.historyCard}>

//           <Text style={styles.dataTitle}>
//             Trading History
//           </Text>

//           <View style={styles.historyRow}>
//             <Text style={styles.historyType}>BUY</Text>
//             <Text style={styles.historyAmount}>0.25 BTC</Text>
//             <Text style={styles.historyPrice}>$19,200</Text>
//           </View>

//           <View style={styles.historyRow}>
//             <Text style={[styles.historyType, { color: "#FF4D6D" }]}>SELL</Text>
//             <Text style={styles.historyAmount}>0.10 BTC</Text>
//             <Text style={styles.historyPrice}>$7,500</Text>
//           </View>

//           <View style={styles.historyRow}>
//             <Text style={styles.historyType}>BUY</Text>
//             <Text style={styles.historyAmount}>0.30 BTC</Text>
//             <Text style={styles.historyPrice}>$22,000</Text>
//           </View>

//         </View>

//       </ScrollView>
//     </SafeAreaView>
//   );
// }
// const styles = StyleSheet.create({

//   container: {
//     flex: 1,
//     backgroundColor: "#0B0E11",
//     padding: wp("4%"),
//   },

//   headerRow: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//   },

//   coinRow: {
//     flexDirection: "row",
//     alignItems: "center",
//   },

//   coinImage: {
//     width: 40,
//     height: 40,
//     marginRight: 10,
//   },

//   coinSymbol: {
//     color: "#fff",
//     fontSize: 20,
//     fontWeight: "700",
//   },

//   coinName: {
//     color: "#aaa",
//   },

//   tradeButtons: {
//     flexDirection: "row",
//   },

//   buyBtn: {
//     backgroundColor: "#00C853",
//     paddingHorizontal: 12,
//     paddingVertical: 6,
//     borderRadius: 6,
//     marginRight: 8,
//   },

//   sellBtn: {
//     backgroundColor: "#FF4D6D",
//     paddingHorizontal: 12,
//     paddingVertical: 6,
//     borderRadius: 6,
//   },

//   tradeText: {
//     color: "#fff",
//     fontWeight: "600",
//   },

//   price: {
//     fontSize: 32,
//     color: "#fff",
//     fontWeight: "700",
//     marginTop: 10,
//   },

//   change: {
//     fontSize: 16,
//     marginBottom: hp("2%"),
//   },

//   statsRow: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//   },

//   statLabel: {
//     color: "#888",
//   },

//   statValue: {
//     color: "#fff",
//     fontWeight: "700",
//   },

//   timeframeRow: {
//     flexDirection: "row",
//     marginTop: hp("2%"),
//   },

//   tfBtn: {
//     marginRight: 15,
//   },

//   tfText: {
//     color: "#888",
//   },

//   activeTF: {
//     borderBottomWidth: 2,
//     borderBottomColor: "#FCD535",
//   },

//   chart: {
//     marginTop: hp("2%"),
//   },

//   dataCard: {
//     marginTop: hp("3%"),
//     backgroundColor: "#111",
//     padding: 15,
//     borderRadius: 12,
//   },

//   dataTitle: {
//     color: "#FCD535",
//     fontWeight: "700",
//     marginBottom: 10,
//   },

//   dataRow: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     marginBottom: 8,
//   },

//   dataLabel: {
//     color: "#aaa",
//   },

//   dataValue: {
//     color: "#fff",
//     fontWeight: "600",
//   },


// historyCard:{
// marginTop:20,
// backgroundColor:"#1E2329",
// padding:15,
// borderRadius:10
// },

// historyRow:{
// flexDirection:"row",
// justifyContent:"space-between",
// marginBottom:10
// },

// historyType:{
// color:"#00C853",
// fontWeight:"bold"
// },

// historyAmount:{
// color:"#fff"
// },

// historyPrice:{
// color:"#fff"
// }


// });




// import React, { useState, useEffect } from 'react';
// import {
//   SafeAreaView,
//   ScrollView,
//   View,
//   Text,
//   Image,
//   TouchableOpacity,
//   StyleSheet,
//   Dimensions,
//   ActivityIndicator
// } from 'react-native';
// import { LineChart, CandlestickChart } from 'react-native-wagmi-charts';

// const { width } = Dimensions.get('window');

// export default function CoinDetailsScreen({ route }) {
//   const [selectedTF, setSelectedTF] = useState("1D");
//   const [chartType, setChartType] = useState("line");
//   const [loading, setLoading] = useState(true);
//   const [coinData, setCoinData] = useState(null);
//   const [chartData, setChartData] = useState([]);

//   const symbol = route?.params?.symbol || "BTCUSDT";

//   useEffect(() => {
//     fetchCoinData();
//   }, [symbol]);

//   useEffect(() => {
//     if (coinData && selectedTF) {
//       updateChartData();
//     }
//   }, [selectedTF, coinData]);

//   const fetchCoinData = async () => {
//     try {
//       setLoading(true);
//       const response = await fetch('http://payo-app.duckdns.org:3001/api/trading/market/BTCUSDT');
//       const result = await response.json();
      
//       if (result.success) {
//         setCoinData(result.data);
//         updateChartData(result.data, selectedTF);
//       }
//     } catch (error) {
//       console.error('Error fetching coin data:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const updateChartData = (data = coinData, timeframe = selectedTF) => {
//     if (!data) return;

//     const timeframeData = data.timeframes[timeframe.toLowerCase()];
//     if (!timeframeData) return;

//     // Use MA7 data for line chart
//     const ma7Data = timeframeData.movingAverages.MA7;
    
//     // Format data for LineChart - needs { timestamp, value } or { x, y } format
//     const formattedData = ma7Data.map(item => ({
//       timestamp: item.time,
//       value: item.value
//     }));

//     console.log('Chart Data:', formattedData); // Debug log
//     setChartData(formattedData);
//   };

//   const getCurrentPrice = () => {
//     if (!coinData) return 0;
//     return coinData.currentPrice;
//   };

//   const getPriceChange = () => {
//     if (!coinData) return 0;
//     return coinData.priceChangePercent24h;
//   };

//   const getHigh24h = () => {
//     if (!coinData) return 0;
//     return coinData.high24h;
//   };

//   const getLow24h = () => {
//     if (!coinData) return 0;
//     return coinData.low24h;
//   };

//   const getVolume = () => {
//     if (!coinData) return '0';
//     const volume = coinData.volume24h;
//     if (volume > 1000000) {
//       return `${(volume / 1000000).toFixed(2)}M`;
//     }
//     if (volume > 1000) {
//       return `${(volume / 1000).toFixed(2)}K`;
//     }
//     return volume.toString();
//   };

//   const getOpenPrice = () => {
//     if (!coinData || !coinData.timeframes['1d']) return '0';
//     const dailyData = coinData.timeframes['1d'];
//     if (dailyData.movingAverages.MA7.length > 0) {
//       return dailyData.movingAverages.MA7[0].value.toFixed(2);
//     }
//     return '0';
//   };

//   const getPrevClose = () => {
//     if (!coinData || !coinData.timeframes['1d']) return '0';
//     const dailyData = coinData.timeframes['1d'];
//     if (dailyData.movingAverages.MA7.length > 1) {
//       return dailyData.movingAverages.MA7[dailyData.movingAverages.MA7.length - 2].value.toFixed(2);
//     }
//     return '0';
//   };

//   const getDayRange = () => {
//     if (!coinData) return '0 - 0';
//     return `${coinData.low24h.toFixed(2)} - ${coinData.high24h.toFixed(2)}`;
//   };

//   const formatXAxis = (timestamp) => {
//     const date = new Date(timestamp);

//     if (selectedTF === "1H") {
//       return `${date.getHours()}:${date.getMinutes()}`;
//     }
//     if (selectedTF === "4H") {
//       return `${date.getHours()}:00`;
//     }
//     if (selectedTF === "1D") {
//       return `${date.getHours()}h`;
//     }
//     if (selectedTF === "1W") {
//       return date.toLocaleDateString("en-US", { weekday: "short" });
//     }
//     if (selectedTF === "1M") {
//       return `${date.getDate()}/${date.getMonth() + 1}`;
//     }
//     return `${date.getHours()}:00`;
//   };

//   const getYAxisValues = () => {
//     if (!chartData.length) return ['0', '0', '0', '0', '0'];
    
//     const values = chartData.map((d) => d.value);
//     const min = Math.min(...values);
//     const max = Math.max(...values);

//     const step = (max - min) / 4;

//     return [
//       min.toFixed(0),
//       (min + step).toFixed(0),
//       (min + step * 2).toFixed(0),
//       (min + step * 3).toFixed(0),
//       max.toFixed(0),
//     ];
//   };

//   const isProfit = () => {
//     if (!chartData.length) return true;
//     return chartData[chartData.length - 1].value > chartData[0].value;
//   };

//   if (loading) {
//     return (
//       <SafeAreaView style={[styles.container, styles.centerContent]}>
//         <ActivityIndicator size="large" color="#FCD535" />
//       </SafeAreaView>
//     );
//   }

//   if (!coinData) {
//     return (
//       <SafeAreaView style={[styles.container, styles.centerContent]}>
//         <Text style={styles.errorText}>Failed to load data</Text>
//       </SafeAreaView>
//     );
//   }

//   return (
//     <SafeAreaView style={styles.container}>
//       <ScrollView showsVerticalScrollIndicator={false}>
//         {/* HEADER */}
//         <View style={styles.headerRow}>
//           <View style={styles.coinRow}>
//             <Image 
//               source={{ uri: `https://assets.coingecko.com/coins/images/1/large/bitcoin.png` }} 
//               style={styles.coinImage} 
//             />
//             <View>
//               <Text style={styles.coinSymbol}>{coinData.symbol}/USDT</Text>
//               <Text style={styles.coinName}>{coinData.symbol}</Text>
//             </View>
//           </View>

//           <View style={styles.tradeButtons}>
//             <TouchableOpacity style={styles.buyBtn}>
//               <Text style={styles.tradeText}>Buy</Text>
//             </TouchableOpacity>
//             <TouchableOpacity style={styles.sellBtn}>
//               <Text style={styles.tradeText}>Sell</Text>
//             </TouchableOpacity>
//           </View>
//         </View>

//         {/* PRICE */}
//         <Text style={styles.price}>
//           ${getCurrentPrice().toLocaleString()}
//         </Text>

//         <Text
//           style={[
//             styles.change,
//             { color: getPriceChange() < 0 ? "#FF4D6D" : "#00C853" },
//           ]}
//         >
//           {getPriceChange() > 0 ? '+' : ''}{getPriceChange().toFixed(2)}%
//         </Text>

//         {/* MARKET STATS */}
//         <View style={styles.statsRow}>
//           <View>
//             <Text style={styles.statLabel}>24h High</Text>
//             <Text style={styles.statValue}>${getHigh24h().toLocaleString()}</Text>
//           </View>
//           <View>
//             <Text style={styles.statLabel}>24h Low</Text>
//             <Text style={styles.statValue}>${getLow24h().toLocaleString()}</Text>
//           </View>
//           <View>
//             <Text style={styles.statLabel}>Volume</Text>
//             <Text style={styles.statValue}>{getVolume()}</Text>
//           </View>
//         </View>

//         {/* TIMEFRAME */}
//         <View style={{ flexDirection: "row", marginTop: 15 }}>
//           {["1H", "4H", "1D", "1W", "1M"].map((tf) => (
//             <TouchableOpacity
//               key={tf}
//               onPress={() => setSelectedTF(tf)}
//               style={{
//                 marginRight: 10,
//                 padding: 8,
//                 paddingHorizontal: 16,
//                 backgroundColor: selectedTF === tf ? "#FCD535" : "#1F2937",
//                 borderRadius: 8,
//               }}
//             >
//               <Text style={{ color: selectedTF === tf ? "#000" : "#fff", fontWeight: "600" }}>{tf}</Text>
//             </TouchableOpacity>
//           ))}
//         </View>

//         {/* CHART TYPE BUTTONS */}
//         <View style={{ flexDirection: "row", marginTop: 15, gap: 15 }}>
//           <TouchableOpacity onPress={() => setChartType("line")}>
//             <Text style={{ color: chartType === "line" ? "#FCD535" : "#fff", fontWeight: "600" }}>Line</Text>
//           </TouchableOpacity>
//           <TouchableOpacity onPress={() => setChartType("candle")}>
//             <Text style={{ color: chartType === "candle" ? "#FCD535" : "#fff", fontWeight: "600" }}>Candle</Text>
//           </TouchableOpacity>
//         </View>

//         {/* CHART SECTION */}
//         <View style={{ marginTop: 20 }}>
//           {/* Y Axis and Chart Container */}
//           <View style={{ flexDirection: "row" }}>
//             {/* Y Axis */}
//             <View style={{ justifyContent: "space-between", height: 220, marginRight: 8 }}>
//               {getYAxisValues().map((price, index) => (
//                 <Text key={index} style={{ color: "#6B7280", fontSize: 11 }}>
//                   ${price}
//                 </Text>
//               ))}
//             </View>

//             {/* Chart */}
//             <View style={{ flex: 1 }}>
//               {chartType === "line" && chartData?.length > 0 ? (
//                 <LineChart.Provider data={chartData}>
//                   <LineChart height={220}>
//                     <LineChart.Path 
//                       color={isProfit() ? "#00C853" : "#FF4D6D"}
//                       width={3}
//                     />
//                     <LineChart.Gradient 
//                       color={isProfit() ? "#00C853" : "#FF4D6D"}
//                     />
//                     <LineChart.CursorCrosshair>
//                       <LineChart.Tooltip 
//                         textStyle={{ color: "#fff" }}
//                       />
//                     </LineChart.CursorCrosshair>
//                   </LineChart>
//                 </LineChart.Provider>
//               ) : chartType === "line" ? (
//                 <View style={{ height: 220, justifyContent: 'center', alignItems: 'center', backgroundColor: '#1A1F2E', borderRadius: 8 }}>
//                   <Text style={{ color: '#6B7280' }}>No chart data available</Text>
//                 </View>
//               ) : (
//                 <View style={{ height: 220, justifyContent: 'center', alignItems: 'center', backgroundColor: '#1A1F2E', borderRadius: 8 }}>
//                   <Text style={{ color: '#6B7280' }}>Candlestick chart coming soon</Text>
//                 </View>
//               )}
//             </View>
//           </View>

//           {/* X Axis Labels */}
//           <View
//             style={{
//               flexDirection: "row",
//               justifyContent: "space-between",
//               marginTop: 8,
//               marginLeft: 35,
//             }}
//           >
//             {chartData?.map((item, index) => {
//               // Show every nth label to avoid crowding
//               const step = Math.max(1, Math.floor(chartData.length / 5));
//               if (index % step !== 0 && index !== chartData.length - 1) return null;
//               return (
//                 <Text key={index} style={{ color: "#6B7280", fontSize: 11 }}>
//                   {formatXAxis(item.timestamp)}
//                 </Text>
//               );
//             })}
//           </View>
//         </View>

//         {/* KEY DATA */}
//         <View style={styles.dataCard}>
//           <Text style={styles.dataTitle}>Key Data Points</Text>
          
//           <View style={styles.dataRow}>
//             <Text style={styles.dataLabel}>Previous Close</Text>
//             <Text style={styles.dataValue}>${getPrevClose()}</Text>
//           </View>
          
//           <View style={styles.dataRow}>
//             <Text style={styles.dataLabel}>Open</Text>
//             <Text style={styles.dataValue}>${getOpenPrice()}</Text>
//           </View>
          
//           <View style={styles.dataRow}>
//             <Text style={styles.dataLabel}>Day Range</Text>
//             <Text style={styles.dataValue}>${getDayRange()}</Text>
//           </View>
          
//           <View style={styles.dataRow}>
//             <Text style={styles.dataLabel}>Volume</Text>
//             <Text style={styles.dataValue}>{getVolume()} BTC</Text>
//           </View>
//         </View>

//         {/* TRADING HISTORY */}
//         <View style={styles.historyCard}>
//           <Text style={styles.dataTitle}>Trading History</Text>
          
//           <View style={styles.historyRow}>
//             <Text style={styles.historyType}>BUY</Text>
//             <Text style={styles.historyAmount}>0.25 BTC</Text>
//             <Text style={styles.historyPrice}>${getCurrentPrice().toLocaleString()}</Text>
//           </View>
          
//           <View style={styles.historyRow}>
//             <Text style={[styles.historyType, { color: "#FF4D6D" }]}>SELL</Text>
//             <Text style={styles.historyAmount}>0.10 BTC</Text>
//             <Text style={styles.historyPrice}>${(getCurrentPrice() * 0.95).toLocaleString()}</Text>
//           </View>
          
//           <View style={styles.historyRow}>
//             <Text style={styles.historyType}>BUY</Text>
//             <Text style={styles.historyAmount}>0.30 BTC</Text>
//             <Text style={styles.historyPrice}>${(getCurrentPrice() * 0.92).toLocaleString()}</Text>
//           </View>
//         </View>
//       </ScrollView>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#0B0E14',
//     paddingHorizontal: 16,
//   },
//   centerContent: {
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   errorText: {
//     color: '#FF4D6D',
//     fontSize: 16,
//   },
//   headerRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginTop: 16,
//   },
//   coinRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   coinImage: {
//     width: 40,
//     height: 40,
//     marginRight: 12,
//     borderRadius: 20,
//   },
//   coinSymbol: {
//     color: '#fff',
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
//   coinName: {
//     color: '#6B7280',
//     fontSize: 14,
//   },
//   tradeButtons: {
//     flexDirection: 'row',
//     gap: 8,
//   },
//   buyBtn: {
//     backgroundColor: '#00C853',
//     paddingHorizontal: 20,
//     paddingVertical: 8,
//     borderRadius: 8,
//   },
//   sellBtn: {
//     backgroundColor: '#FF4D6D',
//     paddingHorizontal: 20,
//     paddingVertical: 8,
//     borderRadius: 8,
//   },
//   tradeText: {
//     color: '#fff',
//     fontWeight: 'bold',
//   },
//   price: {
//     color: '#fff',
//     fontSize: 32,
//     fontWeight: 'bold',
//     marginTop: 16,
//   },
//   change: {
//     fontSize: 16,
//     marginTop: 4,
//     fontWeight: '600',
//   },
//   statsRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginTop: 20,
//     paddingVertical: 16,
//     borderTopWidth: 1,
//     borderBottomWidth: 1,
//     borderColor: '#1F2937',
//   },
//   statLabel: {
//     color: '#6B7280',
//     fontSize: 12,
//     marginBottom: 4,
//   },
//   statValue: {
//     color: '#fff',
//     fontSize: 14,
//     fontWeight: 'bold',
//   },
//   dataCard: {
//     marginTop: 24,
//     padding: 16,
//     backgroundColor: '#1A1F2E',
//     borderRadius: 12,
//   },
//   dataTitle: {
//     color: '#fff',
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginBottom: 16,
//   },
//   dataRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     paddingVertical: 12,
//     borderBottomWidth: 1,
//     borderBottomColor: '#2A2F3E',
//   },
//   dataLabel: {
//     color: '#6B7280',
//     fontSize: 14,
//   },
//   dataValue: {
//     color: '#fff',
//     fontSize: 14,
//     fontWeight: '500',
//   },
//   historyCard: {
//     marginTop: 16,
//     marginBottom: 32,
//     padding: 16,
//     backgroundColor: '#1A1F2E',
//     borderRadius: 12,
//   },
//   historyRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     paddingVertical: 12,
//     borderBottomWidth: 1,
//     borderBottomColor: '#2A2F3E',
//   },
//   historyType: {
//     color: '#00C853',
//     fontWeight: 'bold',
//   },
//   historyAmount: {
//     color: '#fff',
//   },
//   historyPrice: {
//     color: '#6B7280',
//   },
// });


/////////////////////////////////// candle ///////////////////////


import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
  PanResponder,
} from 'react-native';
import Svg, { Path, Defs, LinearGradient, Stop, Circle, Line as SvgLine } from 'react-native-svg';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

import { moderateScale } from "react-native-size-matters";
import api from '../../api/axios';

const { width: screenWidth } = Dimensions.get('window');

export default function CoinDetailsScreen({ route }) {
  // State
  const [selectedTF, setSelectedTF] = useState("1D");
  const [chartType, setChartType] = useState("line");
  const [loading, setLoading] = useState(true);
  const [coinData, setCoinData] = useState(null);
  const [chartData, setChartData] = useState([]);
  const [candleData, setCandleData] = useState([]);
  const [selectedPoint, setSelectedPoint] = useState(null);
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const [tooltipValue, setTooltipValue] = useState(null);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [panOffset, setPanOffset] = useState(0);

  const symbol = route?.params?.coin?.fullSymbol;
  console.log(symbol,"symbol")
  const chartHeight = 300;
  const chartWidth = screenWidth - 80;

  useEffect(() => {
    fetchCoinData();
  }, [symbol]);
  

  useEffect(() => {
    if (coinData && selectedTF) {
      updateChartData();
      generateCandleData();
    }
  }, [selectedTF, coinData]);

  const fetchCoinData = async () => {
  try {
    setLoading(true);

    const response = await api.get(`/api/trading/market/${symbol}`);

    const result = response.data;

    if (result.success) {
      setCoinData(result.data);
      updateChartData(result.data, selectedTF);
      generateCandleData(result.data, selectedTF);
    }
  } catch (error) {
    console.error('Error fetching coin data:', error);
  } finally {
    setLoading(false);
  }
};

  const updateChartData = (data = coinData, timeframe = selectedTF) => {
    if (!data) return;

    const timeframeData = data.timeframes[timeframe.toLowerCase()];
    if (!timeframeData) return;

    const ma7Data = timeframeData.movingAverages.MA7;
    
    const formattedData = ma7Data.map((item) => ({
      timestamp: item.time,
      value: item.value,
      date: new Date(item.time),
    }));

    setChartData(formattedData);
  };

  const generateCandleData = (data = coinData, timeframe = selectedTF) => {
    if (!data) return;

    const timeframeData = data.timeframes[timeframe.toLowerCase()];
    if (!timeframeData) return;

    const ma7Data = timeframeData.movingAverages.MA7;
    const high = timeframeData.high;
    const low = timeframeData.low;
    
    const candles = [];
    for (let i = 0; i < ma7Data.length; i++) {
      const currentClose = ma7Data[i].value;
      const prevClose = i > 0 ? ma7Data[i - 1].value : currentClose * 0.998;
      
      const open = prevClose;
      const close = currentClose;
      const volatility = (high - low) * 0.15;
      const highPrice = Math.max(open, close) + (Math.random() * volatility);
      const lowPrice = Math.min(open, close) - (Math.random() * volatility);
      
      candles.push({
        timestamp: ma7Data[i].time,
        open: parseFloat(open.toFixed(2)),
        high: parseFloat(Math.min(highPrice, high).toFixed(2)),
        low: parseFloat(Math.max(lowPrice, low).toFixed(2)),
        close: parseFloat(close.toFixed(2)),
      });
    }
    
    setCandleData(candles);
  };

  // Handle chart touch
  const handleChartTouch = (event, index, point) => {
    const { locationX, locationY } = event.nativeEvent;
    setTooltipVisible(true);
    setTooltipPosition({ x: locationX, y: locationY - 40 });
    setTooltipValue(point);
    setSelectedPoint(index);
    
    // Hide tooltip after 3 seconds
    setTimeout(() => {
      setTooltipVisible(false);
      setSelectedPoint(null);
    }, 3000);
  };

  // Generate smooth cubic bezier path
  const getCubicBezierPath = (points, minValue, maxValue, graphHeight, graphWidth) => {
    if (points.length < 2) return '';
    
    const valueRange = maxValue - minValue;
    
    const getX = (index) => {
      return (index / (points.length - 1)) * graphWidth;
    };
    
    const getY = (value) => {
      return graphHeight - ((value - minValue) / valueRange) * graphHeight;
    };
    
    let path = `M ${getX(0)} ${getY(points[0].value)}`;
    
    for (let i = 1; i < points.length; i++) {
      const prev = points[i - 1];
      const curr = points[i];
      
      const x0 = getX(i - 1);
      const y0 = getY(prev.value);
      const x1 = getX(i);
      const y1 = getY(curr.value);
      
      // Calculate control points for smooth curve
      const cp1x = x0 + (x1 - x0) * 0.4;
      const cp1y = y0;
      const cp2x = x1 - (x1 - x0) * 0.4;
      const cp2y = y1;
      
      path += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${x1} ${y1}`;
    }
    
    return path;
  };

  // Render smooth line chart
  const renderSmoothLineChart = () => {
    if (!chartData.length) return null;

    const graphHeight = chartHeight - 20;
    const graphWidth = chartWidth;

    const values = chartData.map(d => d.value);
    const minValue = Math.min(...values);
    const maxValue = Math.max(...values);
    const isProfit = chartData[chartData.length - 1].value > chartData[0].value;
    const lineColor = isProfit ? "#00C853" : "#FF4D6D";

    const smoothPath = getCubicBezierPath(chartData, minValue, maxValue, graphHeight, graphWidth);
    
    const firstX = 0;
    const lastX = graphWidth;
    const bottomY = graphHeight;
    const fillPath = `${smoothPath} L ${lastX} ${bottomY} L ${firstX} ${bottomY} Z`;

    // Y-axis values
    const step = (maxValue - minValue) / 4;
    const yAxisValues = [
      maxValue.toFixed(0),
      (maxValue - step).toFixed(0),
      (maxValue - step * 2).toFixed(0),
      (maxValue - step * 3).toFixed(0),
      minValue.toFixed(0),
    ];

    // X-axis labels (show every 5th label)
    const xAxisLabels = chartData.filter((_, index) => {
      const step = Math.max(1, Math.floor(chartData.length / 6));
      return index % step === 0 || index === chartData.length - 1;
    });

    return (
      <View style={{ marginTop: 10 }}>
        <View style={{ flexDirection: 'row' }}>
          {/* Y-Axis */}
          <View style={{ justifyContent: 'space-between', height: chartHeight, marginRight: 8 }}>
            {yAxisValues.map((price, index) => (
              <Text key={index} style={{ color: "#6B7280", fontSize: 11 }}>
                ${price}
              </Text>
            ))}
          </View>

          {/* Chart Area */}
          <View style={{ flex: 1 }}>
            <Svg 
              height={chartHeight} 
              width={graphWidth}
              onTouchStart={(e) => {
                // Find closest data point
                const touchX = e.nativeEvent.locationX;
                const pointIndex = Math.floor((touchX / graphWidth) * chartData.length);
                if (pointIndex >= 0 && pointIndex < chartData.length) {
                  handleChartTouch(e, pointIndex, chartData[pointIndex]);
                }
              }}>
              <Defs>
                <LinearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
                  <Stop offset="0%" stopColor={lineColor} stopOpacity="0.3" />
                  <Stop offset="100%" stopColor={lineColor} stopOpacity="0.0" />
                </LinearGradient>
              </Defs>
              
              {/* Grid lines */}
              {yAxisValues.map((_, index) => {
                const y = (index / 4) * graphHeight;
                return (
                  <SvgLine
                    key={`grid-${index}`}
                    x1={0}
                    y1={y}
                    x2={graphWidth}
                    y2={y}
                    stroke="#1F2937"
                    strokeWidth={1}
                    strokeDasharray="5,5"
                  />
                );
              })}
              
              {/* Gradient Fill */}
              <Path d={fillPath} fill="url(#gradient)" />
              
              {/* Smooth Line */}
              <Path
                d={smoothPath}
                stroke={lineColor}
                strokeWidth={3}
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              
              {/* Data Points - Only show selected point */}
              {chartData.map((point, index) => {
                const valueRange = maxValue - minValue;
                const x = (index / (chartData.length - 1)) * graphWidth;
                const y = graphHeight - ((point.value - minValue) / valueRange) * graphHeight;
                
                if (selectedPoint === index && tooltipVisible) {
                  return (
                    <Circle
                      key={`point-${index}`}
                      cx={x}
                      cy={y}
                      r="6"
                      fill="#FCD535"
                      stroke={lineColor}
                      strokeWidth="2"
                    />
                  );
                }
                return null;
              })}
            </Svg>

            {/* Tooltip */}
            {tooltipVisible && tooltipValue && (
              <View
                style={[
                  styles.tooltip,
                  {
                    position: 'absolute',
                    left: tooltipPosition.x - 40,
                    top: tooltipPosition.y,
                  },
                ]}>
                <Text style={styles.tooltipText}>
                  ${tooltipValue.value.toLocaleString()}
                </Text>
                <Text style={styles.tooltipSubtext}>
                  {formatXAxis(tooltipValue.timestamp)}
                </Text>
                <View style={styles.tooltipArrow} />
              </View>
            )}
          </View>
        </View>

        {/* X-Axis Labels */}
        <View style={{ flexDirection: 'row', marginLeft: 35, marginTop: 8 }}>
          {xAxisLabels.map((item, index) => {
            const xPosition = (index / (xAxisLabels.length - 1)) * (graphWidth - 20);
            return (
              <Text
                key={index}
                style={[
                  styles.xAxisLabel,
                  { position: 'absolute', left: xPosition }
                ]}
              >
                {formatXAxis(item.timestamp)}
              </Text>
            );
          })}
        </View>
      </View>
    );
  };

  // Render candlestick chart
  const renderCandlestickChart = () => {
    if (!candleData.length) return null;

    const graphHeight = chartHeight - 20;
    const graphWidth = chartWidth;

    const allValues = candleData.flatMap(d => [d.high, d.low]);
    const minValue = Math.min(...allValues);
    const maxValue = Math.max(...allValues);
    const valueRange = maxValue - minValue;

    const candleWidth = (graphWidth / candleData.length) * 0.7;
    const candleSpacing = (graphWidth / candleData.length) * 0.3;

    const getYCoordinate = (value) => {
      return graphHeight - ((value - minValue) / valueRange) * graphHeight;
    };

    const getXCoordinate = (index) => {
      return (index * (candleWidth + candleSpacing)) + (candleSpacing / 2);
    };

    const step = (maxValue - minValue) / 4;
    const yAxisValues = [
      maxValue.toFixed(0),
      (maxValue - step).toFixed(0),
      (maxValue - step * 2).toFixed(0),
      (maxValue - step * 3).toFixed(0),
      minValue.toFixed(0),
    ];

    const xAxisLabels = candleData.filter((_, index) => {
      const step = Math.max(1, Math.floor(candleData.length / 6));
      return index % step === 0 || index === candleData.length - 1;
    });

    return (
      <View style={{ marginTop: 10 }}>
        <View style={{ flexDirection: 'row' }}>
          <View style={{ justifyContent: 'space-between', height: chartHeight, marginRight: 8 }}>
            {yAxisValues.map((price, index) => (
              <Text key={index} style={{ color: "#6B7280", fontSize: 11 }}>
                ${price}
              </Text>
            ))}
          </View>

          <View style={{ flex: 1 }}>
            <Svg height={chartHeight} width={graphWidth}>
              {yAxisValues.map((_, index) => {
                const y = (index / 4) * graphHeight;
                return (
                  <SvgLine
                    key={`grid-${index}`}
                    x1={0}
                    y1={y}
                    x2={graphWidth}
                    y2={y}
                    stroke="#1F2937"
                    strokeWidth={1}
                    strokeDasharray="5,5"
                  />
                );
              })}
              
              {candleData.map((candle, index) => {
                const x = getXCoordinate(index);
                const yHigh = getYCoordinate(candle.high);
                const yLow = getYCoordinate(candle.low);
                const yOpen = getYCoordinate(candle.open);
                const yClose = getYCoordinate(candle.close);
                
                const isPositive = candle.close >= candle.open;
                const bodyTop = isPositive ? yClose : yOpen;
                const bodyHeight = Math.abs(yClose - yOpen);
                const color = isPositive ? "#00C853" : "#FF4D6D";
                
                return (
                  <React.Fragment key={`candle-${index}`}>
                    {/* Wick/Shadow */}
                    <SvgLine
                      x1={x + candleWidth / 2}
                      y1={yHigh}
                      x2={x + candleWidth / 2}
                      y2={yLow}
                      stroke={color}
                      strokeWidth={1.5}
                    />
                    {/* Candle Body */}
                    <SvgLine
                      x1={x}
                      y1={bodyTop}
                      x2={x + candleWidth}
                      y2={bodyTop}
                      stroke={color}
                      strokeWidth={bodyHeight}
                    />
                  </React.Fragment>
                );
              })}
            </Svg>
          </View>
        </View>

        <View style={{ flexDirection: 'row', marginLeft: 35, marginTop: 8 }}>
          {xAxisLabels.map((item, index) => {
            const xPosition = (index / (xAxisLabels.length - 1)) * (graphWidth - 20);
            return (
              <Text
                key={index}
                style={[
                  styles.xAxisLabel,
                  { position: 'absolute', left: xPosition }
                ]}
              >
                {formatXAxis(item.timestamp)}
              </Text>
            );
          })}
        </View>
      </View>
    );
  };

  // Helper functions
  const getCurrentPrice = () => {
    if (!coinData) return 0;
    return coinData.currentPrice;
  };

  const getPriceChange = () => {
    if (!coinData) return 0;
    return coinData.priceChangePercent24h;
  };

  const getHigh24h = () => {
    if (!coinData) return 0;
    return coinData.high24h;
  };

  const getLow24h = () => {
    if (!coinData) return 0;
    return coinData.low24h;
  };

  const getVolume = () => {
    if (!coinData) return '0';
    const volume = coinData.volume24h;
    if (volume > 1000000) {
      return `${(volume / 1000000).toFixed(2)}M`;
    }
    if (volume > 1000) {
      return `${(volume / 1000).toFixed(2)}K`;
    }
    return volume.toString();
  };

  const getOpenPrice = () => {
    if (!coinData || !coinData.timeframes['1d']) return '0';
    const dailyData = coinData.timeframes['1d'];
    if (dailyData.movingAverages.MA7.length > 0) {
      return dailyData.movingAverages.MA7[0].value.toFixed(2);
    }
    return '0';
  };

  const getPrevClose = () => {
    if (!coinData || !coinData.timeframes['1d']) return '0';
    const dailyData = coinData.timeframes['1d'];
    if (dailyData.movingAverages.MA7.length > 1) {
      return dailyData.movingAverages.MA7[dailyData.movingAverages.MA7.length - 2].value.toFixed(2);
    }
    return '0';
  };

  const getDayRange = () => {
    if (!coinData) return '0 - 0';
    return `${coinData.low24h.toFixed(2)} - ${coinData.high24h.toFixed(2)}`;
  };

  const formatXAxis = (timestamp) => {
    const date = new Date(timestamp);

    if (selectedTF === "1H") {
      return `${date.getHours()}:${date.getMinutes().toString().padStart(2, '0')}`;
    }
    if (selectedTF === "4H") {
      return `${date.getHours()}:00`;
    }
    if (selectedTF === "1D") {
      return `${date.getHours()}h`;
    }
    if (selectedTF === "1W") {
      return date.toLocaleDateString("en-US", { weekday: "short" });
    }
    if (selectedTF === "1M") {
      return `${date.getDate()}/${date.getMonth() + 1}`;
    }
    return `${date.getHours()}:00`;
  };

  if (loading) {
    return (
      <SafeAreaView style={[styles.container, styles.centerContent]}>
        <ActivityIndicator size="large" color="#FCD535" />
      </SafeAreaView>
    );
  }

  if (!coinData) {
    return (
      <SafeAreaView style={[styles.container, styles.centerContent]}>
        <Text style={styles.errorText}>Failed to load data</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.headerRow}>
          <View style={styles.coinRow}>
            <Image 
              source={{ uri: `https://assets.coingecko.com/coins/images/1/large/bitcoin.png` }} 
              style={styles.coinImage} 
            />
            <View>
              <Text style={styles.coinSymbol}>{coinData.symbol}/USDT</Text>
              <Text style={styles.coinName}>{coinData.symbol}</Text>
            </View>
          </View>

          <View style={styles.tradeButtons}>
            <TouchableOpacity style={styles.buyBtn}>
              <Text style={styles.tradeText}>Buy</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.sellBtn}>
              <Text style={styles.tradeText}>Sell</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Price */}
        <Text style={styles.price}>
          ${getCurrentPrice().toLocaleString()}
        </Text>

        <Text
          style={[
            styles.change,
            { color: getPriceChange() < 0 ? "#FF4D6D" : "#00C853" },
          ]}
        >
          {getPriceChange() > 0 ? '+' : ''}{getPriceChange().toFixed(2)}%
        </Text>

        {/* Stats */}
        <View style={styles.statsRow}>
          <View>
            <Text style={styles.statLabel}>24h High</Text>
            <Text style={styles.statValue}>${getHigh24h().toLocaleString()}</Text>
          </View>
          <View>
            <Text style={styles.statLabel}>24h Low</Text>
            <Text style={styles.statValue}>${getLow24h().toLocaleString()}</Text>
          </View>
          <View>
            <Text style={styles.statLabel}>Volume</Text>
            <Text style={styles.statValue}>{getVolume()}</Text>
          </View>
        </View>

        {/* Timeframes */}
        <View style={styles.timeframeContainer}>
          {["1H", "4H", "1D", "1W", "1M"].map((tf) => (
            <TouchableOpacity
              key={tf}
              onPress={() => {
                setSelectedTF(tf);
                setTooltipVisible(false);
                setSelectedPoint(null);
              }}
              style={[
                styles.timeframeButton,
                selectedTF === tf && styles.timeframeButtonActive
              ]}
            >
              <Text style={[
                styles.timeframeText,
                selectedTF === tf && styles.timeframeTextActive
              ]}>{tf}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Chart Type Toggle */}
        <View style={styles.chartTypeContainer}>
          <TouchableOpacity onPress={() => setChartType("line")}>
            <Text style={[styles.chartTypeText, chartType === "line" && styles.chartTypeTextActive]}>Line Chart</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setChartType("candle")}>
            <Text style={[styles.chartTypeText, chartType === "candle" && styles.chartTypeTextActive]}>Candlestick</Text>
          </TouchableOpacity>
        </View>

        {/* Chart */}
        {chartType === "line" ? renderSmoothLineChart() : renderCandlestickChart()}

        {/* Instructions */}
        <View style={styles.instructionsCard}>
          <Text style={styles.instructionsTitle}>Chart Controls</Text>
          <Text style={styles.instructionsText}>• Tap on chart to see price at specific point</Text>
          <Text style={styles.instructionsText}>• Select different timeframes using buttons above</Text>
          <Text style={styles.instructionsText}>• Switch between Line and Candlestick charts</Text>
        </View>

        {/* Key Data */}
        <View style={styles.dataCard}>
          <Text style={styles.dataTitle}>Key Data Points</Text>
          
          <View style={styles.dataRow}>
            <Text style={styles.dataLabel}>Previous Close</Text>
            <Text style={styles.dataValue}>${getPrevClose()}</Text>
          </View>
          
          <View style={styles.dataRow}>
            <Text style={styles.dataLabel}>Open</Text>
            <Text style={styles.dataValue}>${getOpenPrice()}</Text>
          </View>
          
          <View style={styles.dataRow}>
            <Text style={styles.dataLabel}>Day Range</Text>
            <Text style={styles.dataValue}>${getDayRange()}</Text>
          </View>
          
          <View style={styles.dataRow}>
            <Text style={styles.dataLabel}>Volume</Text>
            <Text style={styles.dataValue}>{getVolume()} BTC</Text>
          </View>
        </View>

        {/* Trading History */}
        <View style={styles.historyCard}>
          <Text style={styles.dataTitle}>Trading History</Text>
          
          <View style={styles.historyRow}>
            <Text style={styles.historyType}>BUY</Text>
            <Text style={styles.historyAmount}>0.25 BTC</Text>
            <Text style={styles.historyPrice}>${getCurrentPrice().toLocaleString()}</Text>
          </View>
          
          <View style={styles.historyRow}>
            <Text style={[styles.historyType, { color: "#FF4D6D" }]}>SELL</Text>
            <Text style={styles.historyAmount}>0.10 BTC</Text>
            <Text style={styles.historyPrice}>${(getCurrentPrice() * 0.95).toLocaleString()}</Text>
          </View>
          
          <View style={styles.historyRow}>
            <Text style={styles.historyType}>BUY</Text>
            <Text style={styles.historyAmount}>0.30 BTC</Text>
            <Text style={styles.historyPrice}>${(getCurrentPrice() * 0.92).toLocaleString()}</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0B0E14',
    paddingHorizontal: 16,
    
  },
  centerContent: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: '#FF4D6D',
    fontSize: 16,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 16,
  },
  coinRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  coinImage: {
    width: 40,
    height: 40,
    marginRight: 12,
    borderRadius: 20,
  },
  coinSymbol: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  coinName: {
    color: '#6B7280',
    fontSize: 14,
  },
  tradeButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  buyBtn: {
    backgroundColor: '#00C853',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 8,
  },
  sellBtn: {
    backgroundColor: '#FF4D6D',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 8,
  },
  tradeText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  price: {
    color: '#fff',
    fontSize: 32,
    fontWeight: 'bold',
    marginTop: 16,
  },
  change: {
    fontSize: 16,
    marginTop: 4,
    fontWeight: '600',
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#1F2937',
  },
  statLabel: {
    color: '#6B7280',
    fontSize: 12,
    marginBottom: 4,
  },
  statValue: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  timeframeContainer: {
    flexDirection: 'row',
    marginTop: 15,
    flexWrap: 'wrap',
    gap: 8,
  },
  timeframeButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#1F2937',
    borderRadius: 8,
  },
  timeframeButtonActive: {
    backgroundColor: '#FCD535',
  },
  timeframeText: {
    color: '#fff',
    fontWeight: '600',
  },
  timeframeTextActive: {
    color: '#000',
  },
  chartTypeContainer: {
    flexDirection: 'row',
    marginTop: 15,
    gap: 15,
  },
  chartTypeText: {
    color: '#fff',
    fontSize: 16,
  },
  chartTypeTextActive: {
    color: '#FCD535',
    fontWeight: '600',
  },
  xAxisLabel: {
    color: '#6B7280',
    fontSize: 10,
  },
  tooltip: {
    backgroundColor: '#1A1F2E',
    borderRadius: 8,
    padding: 8,
    minWidth: 100,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#FCD535',
  },
  tooltipText: {
    color: '#FCD535',
    fontSize: 14,
    fontWeight: 'bold',
  },
  tooltipSubtext: {
    color: '#6B7280',
    fontSize: 10,
    marginTop: 2,
  },
  tooltipArrow: {
    position: 'absolute',
    bottom: -6,
    left: '50%',
    marginLeft: -6,
    width: 0,
    height: 0,
    borderLeftWidth: 6,
    borderRightWidth: 6,
    borderTopWidth: 6,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: '#FCD535',
  },
  instructionsCard: {
    marginTop: 16,
    padding: 12,
    backgroundColor: '#1A1F2E',
    borderRadius: 8,
  },
  instructionsTitle: {
    color: '#FCD535',
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  instructionsText: {
    color: '#6B7280',
    fontSize: 12,
    marginBottom: 4,
  },
  dataCard: {
    marginTop: 24,
    padding: 16,
    backgroundColor: '#1A1F2E',
    borderRadius: 12,
  },
  dataTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  dataRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#2A2F3E',
  },
  dataLabel: {
    color: '#6B7280',
    fontSize: 14,
  },
  dataValue: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
  },
  historyCard: {
    marginTop: 16,
    marginBottom: 32,
    padding: 16,
    backgroundColor: '#1A1F2E',
    borderRadius: 12,
  },
  historyRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#2A2F3E',
  },
  historyType: {
    color: '#00C853',
    fontWeight: 'bold',
  },
  historyAmount: {
    color: '#fff',
  },
  historyPrice: {
    color: '#6B7280',
  },
});