



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


import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

import {  CandlestickChart } from "react-native-wagmi-charts";

import { LineChart } from "react-native-gifted-charts";
import { Dimensions } from "react-native";

const width = Dimensions.get("window").width;

export default function CoinDetailsScreen() {

  const [selectedTF, setSelectedTF] = useState("1D");
  const [chartType, setChartType] = useState("line");

//   const lineData = [
//   { value: 76400 },
//   { value: 76800 },
//   { value: 76000 },
//   { value: 77000 },
//   { value: 76500 },
//   { value: 77200 },
//   { value: 76800 },
// ];

  const coin = {
    name: "Bitcoin",
    symbol: "BTC/USDT",
    image: "https://assets.coingecko.com/coins/images/1/large/bitcoin.png",
    price: 76717.27,
    change: -0.74,
    high24h: 77800,
    low24h: 76051,
    volume: "1.26B",
    open: "74806",
    prevClose: "75200",
    dayRange: "74529 - 75244",
  };


  const chartData = [
    { timestamp: 1716200000000, value: 76400 },
    { timestamp: 1716203600000, value: 76600 },
    { timestamp: 1716207200000, value: 77100 },
    { timestamp: 1716210800000, value: 77500 },
    { timestamp: 1716214400000, value: 77200 },
    { timestamp: 1716218000000, value: 76800 },
    { timestamp: 1716221600000, value: 77000 },
  ];

  const chartDataByTF = {
  "1H": [
    { value: 76400 },
    { value: 76500 },
    { value: 76300 },
    { value: 76600 },
    { value: 76700 },
  ],

  "4H": [
    { value: 76000 },
    { value: 76200 },
    { value: 76500 },
    { value: 76300 },
    { value: 76800 },
    { value: 77000 },
  ],

  "1D": [
    { value: 75500 },
    { value: 76000 },
    { value: 76500 },
    { value: 77000 },
    { value: 76800 },
    { value: 77200 },
    { value: 76700 },
  ],

  "1W": [
    { value: 74000 },
    { value: 75000 },
    { value: 76000 },
    { value: 77000 },
    { value: 76500 },
    { value: 77500 },
  ],

  "1M": [
    { value: 70000 },
    { value: 72000 },
    { value: 74000 },
    { value: 76000 },
    { value: 78000 },
    { value: 77000 },
  ],
};

const lineData = chartDataByTF[selectedTF];

  const candleData = [
  {
    timestamp: 1716200000000,
    open: 76000,
    high: 77000,
    low: 75500,
    close: 76500, // green
  },
  {
    timestamp: 1716203600000,
    open: 76500,
    high: 76800,
    low: 75800,
    close: 76000, // red
  },
  {
    timestamp: 1716207200000,
    open: 76000,
    high: 77200,
    low: 75900,
    close: 77000, // green
  },
  {
    timestamp: 1716210800000,
    open: 77000,
    high: 77400,
    low: 76500,
    close: 76800, // red
  },
  {
    timestamp: 1716214400000,
    open: 76800,
    high: 77500,
    low: 76600,
    close: 77300, // green
  },
];

// const isProfit = chartData[chartData.length - 1].value > chartData[0].value;
const isProfit =
  lineData[lineData.length - 1].value > lineData[0].value;


  const formatXAxis = (timestamp) => {
    const date = new Date(timestamp);

    if (selectedTF === "1H") {
      return `${date.getHours()}:${date.getMinutes()}`;
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

    return date.getHours();
  };

  const getYAxisValues = () => {
    const values = chartData.map((d) => d.value);
    const min = Math.min(...values);
    const max = Math.max(...values);

    const step = (max - min) / 4;

    return [
      min.toFixed(0),
      (min + step).toFixed(0),
      (min + step * 2).toFixed(0),
      (min + step * 3).toFixed(0),
      max.toFixed(0),
    ];
  };

  const getSegmentedData = () => {
  const segments = [];

  for (let i = 1; i < chartData.length; i++) {
    const prev = chartData[i - 1];
    const curr = chartData[i];

    segments.push({
      data: [prev, curr],
      color: curr.value >= prev.value ? "#00C853" : "#FF4D6D",
    });
  }

  return segments;
};

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>

        {/* HEADER */}
        <View style={styles.headerRow}>
          <View style={styles.coinRow}>
            <Image source={{ uri: coin.image }} style={styles.coinImage} />

            <View>
              <Text style={styles.coinSymbol}>{coin.symbol}</Text>
              <Text style={styles.coinName}>{coin.name}</Text>
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

        {/* PRICE */}
        <Text style={styles.price}>
          ${coin.price.toLocaleString()}
        </Text>

        <Text
          style={[
            styles.change,
            { color: coin.change < 0 ? "#FF4D6D" : "#00C853" },
          ]}
        >
          {coin.change}%
        </Text>

        {/* MARKET STATS */}
        <View style={styles.statsRow}>

          <View>
            <Text style={styles.statLabel}>24h High</Text>
            <Text style={styles.statValue}>{coin.high24h}</Text>
          </View>

          <View>
            <Text style={styles.statLabel}>24h Low</Text>
            <Text style={styles.statValue}>{coin.low24h}</Text>
          </View>

          <View>
            <Text style={styles.statLabel}>Volume</Text>
            <Text style={styles.statValue}>{coin.volume}</Text>
          </View>

        </View>

        {/* TIMEFRAME */}
     <View style={{ flexDirection: "row", marginTop: 15 }}>
  {["1H", "4H", "1D", "1W", "1M"].map((tf) => (
    <TouchableOpacity
      key={tf}
      onPress={() => setSelectedTF(tf)}
      style={{
        marginRight: 10,
        padding: 6,
        backgroundColor: selectedTF === tf ? "#FCD535" : "#1F2937",
        borderRadius: 6,
      }}
    >
      <Text style={{ color: "#fff" }}>{tf}</Text>
    </TouchableOpacity>
  ))}
</View>

        {/* CHART TYPE BUTTONS */}
        <View style={{ flexDirection: "row", marginTop: 10 }}>
          <TouchableOpacity onPress={() => setChartType("line")}>
            <Text style={{ color: "#fff", marginRight: 15 }}>Line</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => setChartType("candle")}>
            <Text style={{ color: "#fff" }}>Candle</Text>
          </TouchableOpacity>
        </View>

        <View style={{ flexDirection: "row", marginTop: 20 }}>

          {/* Y AXIS */}
      

          {/* CHART */}
          <View style={{ flex: 1 }}>

            {chartType === "line" ? (

              // <LineChart.Provider data={chartData}>
              //   <LineChart width={wp("80%")} height={300}>

              //     <LineChart.Path
              //       color={isProfit ? "#00C853" : "#FF4D6D"}
              //       width={3}
              //     />

              //     <LineChart.Gradient
              //       color={isProfit ? "#00C853" : "#FF4D6D"}
              //     />

              //     <LineChart.CursorCrosshair>
              //       <LineChart.Tooltip />
              //     </LineChart.CursorCrosshair>

              //   </LineChart>
              // </LineChart.Provider>

   <LineChart
  areaChart
  curved
  data={lineData}
  height={220}
  width={width - 40}
  color={isProfit ? "#00C853" : "#FF4D6D"}
  startFillColor={isProfit ? "#00C853" : "#FF4D6D"}
  endFillColor={isProfit ? "#00C853" : "#FF4D6D"}
  startOpacity={0.3}
  endOpacity={0.05}
  spacing={35}
  thickness={3}
  hideDataPoints={false}
  dataPointsColor={isProfit ? "#00C853" : "#FF4D6D"}
  yAxisColor="#1F2937"
  xAxisColor="#1F2937"
  textColor="#6B7280"
  hideRules={false}
  rulesColor="#1F2937"
  noOfSections={5}
  yAxisTextStyle={{
    color: "#6B7280",
    fontSize: 10,
  }}
/>

            ) : (

             <View style={{ height: 220, width: "100%" }}>
  <CandlestickChart.Provider data={candleData}>
    <CandlestickChart>

      <CandlestickChart.Candles
        positiveColor="#00C853"
        negativeColor="#FF4D6D"
      />

      <CandlestickChart.Crosshair>
        <CandlestickChart.Tooltip />
      </CandlestickChart.Crosshair>

    </CandlestickChart>
  </CandlestickChart.Provider>
</View>
            )}

          </View>
              <View style={{ justifyContent: "space-between", height: 300 }}>
            {getYAxisValues().map((price, index) => (
              <Text key={index} style={{ color: "#aaa", fontSize: 12 }}>
                {price}
              </Text>
            ))}
          </View>
        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: 10,
            paddingLeft: 30,
          }}
        >

          {chartData.map((item, index) => {

            if (index % 2 !== 0) return null;

            return (
              <Text key={index} style={{ color: "#888", fontSize: 12 }}>
                {formatXAxis(item.timestamp)}
              </Text>
            );

          })}

        </View>

        {/* KEY DATA */}
        <View style={styles.dataCard}>

          <Text style={styles.dataTitle}>
            Key Data Points
          </Text>

          <View style={styles.dataRow}>
            <Text style={styles.dataLabel}>Previous Close</Text>
            <Text style={styles.dataValue}>{coin.prevClose}</Text>
          </View>

          <View style={styles.dataRow}>
            <Text style={styles.dataLabel}>Open</Text>
            <Text style={styles.dataValue}>{coin.open}</Text>
          </View>

          <View style={styles.dataRow}>
            <Text style={styles.dataLabel}>Day Range</Text>
            <Text style={styles.dataValue}>{coin.dayRange}</Text>
          </View>

          <View style={styles.dataRow}>
            <Text style={styles.dataLabel}>Volume</Text>
            <Text style={styles.dataValue}>{coin.volume}</Text>
          </View>

        </View>

         <View style={styles.historyCard}>

          <Text style={styles.dataTitle}>
            Trading History
          </Text>

          <View style={styles.historyRow}>
            <Text style={styles.historyType}>BUY</Text>
            <Text style={styles.historyAmount}>0.25 BTC</Text>
            <Text style={styles.historyPrice}>$19,200</Text>
          </View>

          <View style={styles.historyRow}>
            <Text style={[styles.historyType, { color: "#FF4D6D" }]}>SELL</Text>
            <Text style={styles.historyAmount}>0.10 BTC</Text>
            <Text style={styles.historyPrice}>$7,500</Text>
          </View>

          <View style={styles.historyRow}>
            <Text style={styles.historyType}>BUY</Text>
            <Text style={styles.historyAmount}>0.30 BTC</Text>
            <Text style={styles.historyPrice}>$22,000</Text>
          </View>

        </View>

      </ScrollView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#0B0E11",
    padding: wp("4%"),
  },

  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  coinRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  coinImage: {
    width: 40,
    height: 40,
    marginRight: 10,
  },

  coinSymbol: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "700",
  },

  coinName: {
    color: "#aaa",
  },

  tradeButtons: {
    flexDirection: "row",
  },

  buyBtn: {
    backgroundColor: "#00C853",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    marginRight: 8,
  },

  sellBtn: {
    backgroundColor: "#FF4D6D",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },

  tradeText: {
    color: "#fff",
    fontWeight: "600",
  },

  price: {
    fontSize: 32,
    color: "#fff",
    fontWeight: "700",
    marginTop: 10,
  },

  change: {
    fontSize: 16,
    marginBottom: hp("2%"),
  },

  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  statLabel: {
    color: "#888",
  },

  statValue: {
    color: "#fff",
    fontWeight: "700",
  },

  timeframeRow: {
    flexDirection: "row",
    marginTop: hp("2%"),
  },

  tfBtn: {
    marginRight: 15,
  },

  tfText: {
    color: "#888",
  },

  activeTF: {
    borderBottomWidth: 2,
    borderBottomColor: "#FCD535",
  },

  chart: {
    marginTop: hp("2%"),
  },

  dataCard: {
    marginTop: hp("3%"),
    backgroundColor: "#111",
    padding: 15,
    borderRadius: 12,
  },

  dataTitle: {
    color: "#FCD535",
    fontWeight: "700",
    marginBottom: 10,
  },

  dataRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },

  dataLabel: {
    color: "#aaa",
  },

  dataValue: {
    color: "#fff",
    fontWeight: "600",
  },


historyCard:{
marginTop:20,
backgroundColor:"#1E2329",
padding:15,
borderRadius:10
},

historyRow:{
flexDirection:"row",
justifyContent:"space-between",
marginBottom:10
},

historyType:{
color:"#00C853",
fontWeight:"bold"
},

historyAmount:{
color:"#fff"
},

historyPrice:{
color:"#fff"
}


});