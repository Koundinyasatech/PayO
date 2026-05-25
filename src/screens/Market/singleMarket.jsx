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











/////////////////////////////////// candle ///////////////////////

import React, { useState, useEffect, useRef } from 'react';
import {
  ScrollView,
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
  PanResponder,
  Animated,
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';

import {
  PinchGestureHandler,
  State,
} from 'react-native-gesture-handler';

import Svg, {
  Path,
  Defs,
  LinearGradient,
  Stop,
  Circle,
  Line as SvgLine,
} from 'react-native-svg';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import { moderateScale } from 'react-native-size-matters';
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

  const scale = useRef(
    new Animated.Value(1)
  ).current;

  const lastScale = useRef(1);

  const translateX = useRef(
    new Animated.Value(0)
  ).current;

  const lastTranslateX = useRef(0);

  const symbol = `${route?.params?.coin?.symbol?.toUpperCase()}USDT`;

  console.log(symbol, "symbol");

  // RESPONSIVE CHART SIZE
  const chartHeight = hp('34%');
  const chartWidth = wp('78%');

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

  const handleChartTouch = (event, index, point) => {
    const { locationX, locationY } = event.nativeEvent;

    setTooltipVisible(true);

    // RESPONSIVE TOOLTIP POSITION
    setTooltipPosition({
      x: locationX,
      y: locationY - hp('5%'),
    });

    setTooltipValue(point);
    setSelectedPoint(index);

    setTimeout(() => {
      setTooltipVisible(false);
      setSelectedPoint(null);
    }, 3000);
  };

  const onPinchEvent =
    Animated.event(
      [
        {
          nativeEvent: {
            scale: scale,
          },
        },
      ],
      {
        useNativeDriver: true,
      }
    );

  const onPinchStateChange = (
    event
  ) => {
    if (
      event.nativeEvent.oldState ===
      State.ACTIVE
    ) {
      lastScale.current *=
        event.nativeEvent.scale;

      if (
        lastScale.current < 1
      ) {
        lastScale.current = 1;
      }

      if (
        lastScale.current > 4
      ) {
        lastScale.current = 4;
      }

      scale.setValue(
        lastScale.current
      );
    }
  };

  const panResponder =
    PanResponder.create({
      onMoveShouldSetPanResponder:
        () => true,

      onPanResponderMove: (
        evt,
        gestureState
      ) => {
        translateX.setValue(
          lastTranslateX.current +
          gestureState.dx
        );
      },

      onPanResponderRelease:
        (evt, gestureState) => {
          lastTranslateX.current +=
            gestureState.dx;
        },
    });

  const getCubicBezierPath = (
    points,
    minValue,
    maxValue,
    graphHeight,
    graphWidth
  ) => {
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

    const graphHeight = chartHeight - hp('2.5%');
    const graphWidth = chartWidth;

    const values = chartData.map(d => d.value);
    const minValue = Math.min(...values);
    const maxValue = Math.max(...values);

    const isProfit =
      chartData[chartData.length - 1].value >
      chartData[0].value;

    const lineColor = isProfit
      ? '#00C853'
      : '#FF4D6D';

    const smoothPath = getCubicBezierPath(
      chartData,
      minValue,
      maxValue,
      graphHeight,
      graphWidth
    );

    const firstX = 0;
    const lastX = graphWidth;
    const bottomY = graphHeight;

    const fillPath =
      `${smoothPath} L ${lastX} ${bottomY} L ${firstX} ${bottomY} Z`;

    const step = (maxValue - minValue) / 4;

    const yAxisValues = [
      maxValue.toFixed(0),
      (maxValue - step).toFixed(0),
      (maxValue - step * 2).toFixed(0),
      (maxValue - step * 3).toFixed(0),
      minValue.toFixed(0),
    ];

    const xAxisLabels = chartData.filter((_, index) => {
      const step = Math.max(
        1,
        Math.floor(chartData.length / 6)
      );

      return (
        index % step === 0 ||
        index === chartData.length - 1
      );
    });

    return (
      <View style={{ marginTop: hp('1.5%') }}>
        <View style={{ flexDirection: 'row' }}>
          {/* Y AXIS */}
          <View
            style={{
              justifyContent: 'space-between',
              height: chartHeight,
              marginRight: wp('2%'),
              width: wp('12%'),
            }}
          >
            {yAxisValues.map((price, index) => (
              <Text
                key={index}
                style={{
                  color: '#6B7280',
                  fontSize: moderateScale(10),
                }}
              >
                ${price}
              </Text>
            ))}
          </View>

          {/* CHART */}
          <View style={{ flex: 1, overflow: 'hidden' }}>
            <PinchGestureHandler
              onGestureEvent={onPinchEvent}
              onHandlerStateChange={
                onPinchStateChange
              }
            >
              <Animated.View
                {...panResponder.panHandlers}
                style={{
                  transform: [
                    {
                      scale: scale,
                    },
                    {
                      translateX:
                        translateX,
                    },
                  ],
                }}
              >
                <Svg
                  height={chartHeight}
                  width={graphWidth}
                  onTouchStart={(e) => {
                    const touchX =
                      e.nativeEvent.locationX;

                    const pointIndex = Math.floor(
                      (touchX / graphWidth) *
                      chartData.length
                    );

                    if (
                      pointIndex >= 0 &&
                      pointIndex < chartData.length
                    ) {
                      handleChartTouch(
                        e,
                        pointIndex,
                        chartData[pointIndex]
                      );
                    }
                  }}
                >
                  <Defs>
                    <LinearGradient
                      id="gradient"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <Stop
                        offset="0%"
                        stopColor={lineColor}
                        stopOpacity="0.3"
                      />
                      <Stop
                        offset="100%"
                        stopColor={lineColor}
                        stopOpacity="0.0"
                      />
                    </LinearGradient>
                  </Defs>

                  {/* GRID */}
                  {yAxisValues.map((_, index) => {
                    const y =
                      (index / 4) * graphHeight;

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

                  {/* FILL */}
                  <Path
                    d={fillPath}
                    fill="url(#gradient)"
                  />

                  {/* LINE */}
                  <Path
                    d={smoothPath}
                    stroke={lineColor}
                    strokeWidth={moderateScale(3)}
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />

                  {/* POINT */}
                  {chartData.map((point, index) => {
                    const valueRange =
                      maxValue - minValue;

                    const x =
                      (index /
                        (chartData.length - 1)) *
                      graphWidth;

                    const y =
                      graphHeight -
                      ((point.value - minValue) /
                        valueRange) *
                      graphHeight;

                    if (
                      selectedPoint === index &&
                      tooltipVisible
                    ) {
                      return (
                        <Circle
                          key={`point-${index}`}
                          cx={x}
                          cy={y}
                          r={moderateScale(6)}
                          fill="#FCD535"
                          stroke={lineColor}
                          strokeWidth="2"
                        />
                      );
                    }

                    return null;
                  })}
                </Svg>
              </Animated.View>
            </PinchGestureHandler>

            {/* TOOLTIP */}
            {tooltipVisible && tooltipValue && (
              <View
                style={[
                  styles.tooltip,
                  {
                    position: 'absolute',
                    left: Math.max(
                      10,
                      Math.min(
                        tooltipPosition.x -
                        50 +
                        lastTranslateX.current,
                        chartWidth * 4 - 110
                      )
                    ),
                    top: tooltipPosition.y,
                  },
                ]}
              >
                <Text style={styles.tooltipText}>
                  $
                  {tooltipValue.value.toLocaleString()}
                </Text>

                <Text style={styles.tooltipSubtext}>
                  {formatXAxis(
                    tooltipValue.timestamp
                  )}
                </Text>

                <View
                  style={styles.tooltipArrow}
                />
              </View>
            )}
          </View>
        </View>

        {/* X AXIS */}
        <View
          style={{
            flexDirection: 'row',
            marginLeft: wp('10%'),
            marginTop: hp('1%'),
            minHeight: hp('3%'),
          }}
        >
          {xAxisLabels.map((item, index) => {
            const xPosition =
              (index /
                (xAxisLabels.length - 1)) *
              (graphWidth - 20);

            return (
              <Text
                key={index}
                style={[
                  styles.xAxisLabel,
                  {
                    position: 'absolute',
                    left: xPosition,
                  },
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

    const graphHeight = chartHeight - hp('2.5%');
    const graphWidth =
      chartWidth *
      lastScale.current;

    const allValues = candleData.flatMap(
      candle => [
        candle.high,
        candle.low,
      ]
    );

    const minValue = Math.min(...allValues);
    const maxValue = Math.max(...allValues);
    const valueRange =
      maxValue - minValue;

    const candleWidth = Math.max(
      moderateScale(3),
      graphWidth /
      candleData.length /
      2
    );

    const step = valueRange / 4;

    const yAxisValues = [
      maxValue.toFixed(0),
      (maxValue - step).toFixed(0),
      (maxValue - step * 2).toFixed(0),
      (maxValue - step * 3).toFixed(0),
      minValue.toFixed(0),
    ];

    const xAxisLabels = candleData.filter(
      (_, index) => {
        const step = Math.max(
          1,
          Math.floor(
            candleData.length / 6
          )
        );

        return (
          index % step === 0 ||
          index ===
          candleData.length - 1
        );
      }
    );

    return (
      <View style={{ marginTop: hp('1.5%') }}>
        <View
          style={{
            flexDirection: 'row',
          }}
        >
          {/* Y AXIS */}
          <View
            style={{
              justifyContent:
                'space-between',
              height: chartHeight,
              marginRight: wp('2%'),
              width: wp('12%'),
            }}
          >
            {yAxisValues.map(
              (price, index) => (
                <Text
                  key={index}
                  style={{
                    color: '#6B7280',
                    fontSize:
                      moderateScale(10),
                  }}
                >
                  ${price}
                </Text>
              )
            )}
          </View>

          {/* CHART */}
          <View
            style={{
              flex: 1,
              overflow: 'hidden',
            }}
          >
            <PinchGestureHandler
              onGestureEvent={onPinchEvent}
              onHandlerStateChange={
                onPinchStateChange
              }
            >
              <Animated.View
                {...panResponder.panHandlers}
                style={{
                  transform: [
                    {
                      scale: scale,
                    },
                    {
                      translateX:
                        translateX,
                    },
                  ],
                }}
              >
                <Svg
                  height={chartHeight}
                  width={graphWidth}
                  onTouchStart={(e) => {
                    const touchX =
                      e.nativeEvent
                        .locationX;

                    const candleIndex =
                      Math.floor(
                        (touchX /
                          graphWidth) *
                        candleData.length
                      );

                    if (
                      candleIndex >= 0 &&
                      candleIndex <
                      candleData.length
                    ) {
                      handleChartTouch(
                        e,
                        candleIndex,
                        candleData[
                        candleIndex
                        ]
                      );
                    }
                  }}
                >
                  {/* GRID */}
                  {yAxisValues.map(
                    (_, index) => {
                      const y =
                        (index / 4) *
                        graphHeight;

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
                    }
                  )}

                  {/* CANDLES */}
                  {candleData.map(
                    (candle, index) => {
                      const x =
                        (index /
                          candleData.length) *
                        graphWidth;

                      const highY =
                        graphHeight -
                        ((candle.high -
                          minValue) /
                          valueRange) *
                        graphHeight;

                      const lowY =
                        graphHeight -
                        ((candle.low -
                          minValue) /
                          valueRange) *
                        graphHeight;

                      const openY =
                        graphHeight -
                        ((candle.open -
                          minValue) /
                          valueRange) *
                        graphHeight;

                      const closeY =
                        graphHeight -
                        ((candle.close -
                          minValue) /
                          valueRange) *
                        graphHeight;

                      const isBullish =
                        candle.close >
                        candle.open;

                      const candleColor =
                        isBullish
                          ? '#00C853'
                          : '#FF4D6D';

                      return (
                        <React.Fragment
                          key={index}
                        >
                          {/* WICK */}
                          <SvgLine
                            x1={
                              x +
                              candleWidth / 2
                            }
                            y1={highY}
                            x2={
                              x +
                              candleWidth / 2
                            }
                            y2={lowY}
                            stroke={
                              candleColor
                            }
                            strokeWidth={1.5}
                          />

                          {/* BODY */}
                          <Path
                            d={`M ${x} ${Math.min(
                              openY,
                              closeY
                            )} 
                          L ${x +
                              candleWidth
                              } ${Math.min(
                                openY,
                                closeY
                              )} 
                          L ${x +
                              candleWidth
                              } ${Math.max(
                                openY,
                                closeY
                              )} 
                          L ${x} ${Math.max(
                                openY,
                                closeY
                              )} Z`}
                            fill={
                              candleColor
                            }
                          />
                        </React.Fragment>
                      );
                    }
                  )}
                </Svg>
              </Animated.View>
            </PinchGestureHandler>

            {/* TOOLTIP */}
            {tooltipVisible &&
              tooltipValue && (
                <View
                  style={[
                    styles.tooltip,
                    {
                      position:
                        'absolute',
                      left: Math.max(
                        10,
                        Math.min(
                          tooltipPosition.x -
                          50 +
                          lastTranslateX.current,
                          chartWidth * 4 - 110
                        )
                      ),
                      top:
                        tooltipPosition.y,
                    },
                  ]}
                >
                  <Text
                    style={
                      styles.tooltipText
                    }
                  >
                    Open: $
                    {
                      tooltipValue.open
                    }
                  </Text>

                  <Text
                    style={
                      styles.tooltipSubtext
                    }
                  >
                    Close: $
                    {
                      tooltipValue.close
                    }
                  </Text>

                  <Text
                    style={
                      styles.tooltipSubtext
                    }
                  >
                    {formatXAxis(
                      tooltipValue.timestamp
                    )}
                  </Text>
                </View>
              )}
          </View>
        </View>

        {/* X AXIS */}
        <View
          style={{
            flexDirection: 'row',
            marginLeft: wp('10%'),
            marginTop: hp('1%'),
            minHeight: hp('3%'),
          }}
        >
          {xAxisLabels.map(
            (item, index) => {
              const xPosition =
                (index /
                  (xAxisLabels.length -
                    1)) *
                (graphWidth - 20);

              return (
                <Text
                  key={index}
                  style={[
                    styles.xAxisLabel,
                    {
                      position:
                        'absolute',
                      left: xPosition,
                    },
                  ]}
                >
                  {formatXAxis(
                    item.timestamp
                  )}
                </Text>
              );
            }
          )}
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
    <SafeAreaView
      style={styles.container}
      edges={['top', 'bottom']}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: hp('8%'),
        }}
      >
        {/* HEADER */}
        <View style={styles.headerRow}>
          <TouchableOpacity
            style={styles.backBtn}
          >
            <Text style={styles.backIcon}>
              ←
            </Text>
          </TouchableOpacity>

          <Text style={styles.screenTitle}>
            Market Details
          </Text>

          <View style={{ width: wp('8%') }} />
        </View>

        {/* COIN INFO */}
        <View style={styles.coinHeader}>
          <View
            style={styles.coinLeft}
          >
            <Image
              source={{
                uri:
                  route?.params?.coin
                    ?.image,
              }}
              style={styles.coinImage}
            />

            <View>
              <Text
                style={
                  styles.coinSymbol
                }
              >
                {
                  coinData?.symbol
                }
              </Text>

              <Text
                style={
                  styles.coinName
                }
              >
                {
                  route?.params
                    ?.coin?.name
                }
              </Text>
            </View>
          </View>

          <View
            style={
              styles.chartSwitcher
            }
          >
            <TouchableOpacity
              style={[
                styles.chartBtn,
                chartType ===
                'line' &&
                styles.activeChartBtn,
              ]}
              onPress={() =>
                setChartType(
                  'line'
                )
              }
            >
              <Text
                style={[
                  styles.chartBtnText,
                  chartType ===
                  'line' &&
                  styles.activeChartText,
                ]}
              >
                Line
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.chartBtn,
                chartType ===
                'candle' &&
                styles.activeChartBtn,
              ]}
              onPress={() =>
                setChartType(
                  'candle'
                )
              }
            >
              <Text
                style={[
                  styles.chartBtnText,
                  chartType ===
                  'candle' &&
                  styles.activeChartText,
                ]}
              >
                Candle
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* PRICE */}
        <View style={styles.priceSection}>
          <Text style={styles.price}>
            $
            {coinData?.currentPrice?.toLocaleString()}
          </Text>

          <Text
            style={[
              styles.change,
              {
                color:
                  coinData?.priceChange24h >=
                    0
                    ? '#00C853'
                    : '#FF4D6D',
              },
            ]}
          >
            {
              coinData?.priceChange24h
            }
            %
          </Text>
        </View>

        {/* TIMEFRAME */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={
            false
          }
          contentContainerStyle={
            styles.timeframeContainer
          }
        >
          {[
            '1D',
            '1W',
            '1M',
            '3M',
            '1Y',
          ].map((tf) => (
            <TouchableOpacity
              key={tf}
              style={[
                styles.timeBtn,
                selectedTF === tf &&
                styles.activeTimeBtn,
              ]}
              onPress={() =>
                setSelectedTF(tf)
              }
            >
              <Text
                style={[
                  styles.timeBtnText,
                  selectedTF === tf &&
                  styles.activeTimeText,
                ]}
              >
                {tf}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* CHART */}
        <View style={styles.chartCard}>
          {chartType === 'line'
            ? renderSmoothLineChart()
            : renderCandlestickChart()}
        </View>

        {/* STATS */}
        <View style={styles.statsRow}>
          <View
            style={styles.statCard}
          >
            <Text
              style={
                styles.statLabel
              }
            >
              Market Cap
            </Text>

            <Text
              style={
                styles.statValue
              }
            >
              $
              {coinData?.marketCap?.toLocaleString()}
            </Text>
          </View>

          <View
            style={styles.statCard}
          >
            <Text
              style={
                styles.statLabel
              }
            >
              Volume
            </Text>

            <Text
              style={
                styles.statValue
              }
            >
              $
              {coinData?.volume24h?.toLocaleString()}
            </Text>
          </View>
        </View>

        {/* BUTTONS */}
        <View style={styles.tradeRow}>
          <TouchableOpacity
            style={styles.buyBtn}
          >
            <Text
              style={
                styles.tradeText
              }
            >
              Buy
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.sellBtn}
          >
            <Text
              style={
                styles.tradeText
              }
            >
              Sell
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0B0F1A',
    paddingHorizontal: wp('4%'),
  },

  centerContent: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: hp('1.5%'),
    marginBottom: hp('2%'),
    flexWrap: 'wrap',
  },

  backBtn: {
    padding: wp('2%'),
  },

  backIcon: {
    color: '#fff',
    fontSize: moderateScale(22),
  },

  screenTitle: {
    color: '#fff',
    fontSize: moderateScale(18),
    fontWeight: '700',
  },

  coinHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    marginBottom: hp('2%'),
  },

  coinLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    paddingRight: wp('3%'),
  },

  coinImage: {
    width: wp('10%'),
    height: wp('10%'),
    borderRadius: wp('5%'),
    marginRight: wp('3%'),
  },

  coinSymbol: {
    color: '#fff',
    fontSize: moderateScale(16),
    fontWeight: '700',
  },

  coinName: {
    color: '#9CA3AF',
    fontSize: moderateScale(12),
    marginTop: hp('0.3%'),
  },

  chartSwitcher: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: hp('1%'),
  },

  chartBtn: {
    paddingHorizontal: wp('4%'),
    paddingVertical: hp('1%'),
    borderRadius: moderateScale(12),
    backgroundColor: '#111827',
    marginLeft: wp('2%'),
    marginBottom: hp('1%'),
  },

  activeChartBtn: {
    backgroundColor: '#FCD535',
  },

  chartBtnText: {
    color: '#fff',
    fontSize: moderateScale(12),
  },

  activeChartText: {
    color: '#000',
    fontWeight: '700',
  },

  priceSection: {
    marginBottom: hp('2%'),
  },

  price: {
    color: '#fff',
    fontSize: moderateScale(28),
    fontWeight: '700',
  },

  change: {
    fontSize: moderateScale(14),
    marginTop: hp('0.5%'),
    fontWeight: '600',
  },

  timeframeContainer: {
    paddingBottom: hp('1.5%'),
  },

  timeBtn: {
    paddingHorizontal: wp('4%'),
    paddingVertical: hp('1%'),
    backgroundColor: '#111827',
    borderRadius: moderateScale(12),
    marginRight: wp('2.5%'),
  },

  activeTimeBtn: {
    backgroundColor: '#FCD535',
  },

  timeBtnText: {
    color: '#fff',
    fontSize: moderateScale(12),
  },

  activeTimeText: {
    color: '#000',
    fontWeight: '700',
  },

  chartCard: {
    backgroundColor: '#111827',
    borderRadius: moderateScale(18),
    padding: wp('4%'),
    marginBottom: hp('2.5%'),
  },

  tooltip: {
    backgroundColor: '#1F2937',
    padding: wp('3%'),
    borderRadius: moderateScale(12),
    minWidth: wp('26%'),
    zIndex: 100,
  },

  tooltipText: {
    color: '#fff',
    fontSize: moderateScale(12),
    fontWeight: '700',
  },

  tooltipSubtext: {
    color: '#9CA3AF',
    fontSize: moderateScale(10),
    marginTop: hp('0.3%'),
  },

  tooltipArrow: {
    position: 'absolute',
    bottom: -8,
    left: '45%',
    width: 0,
    height: 0,
    borderLeftWidth: 8,
    borderRightWidth: 8,
    borderTopWidth: 8,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: '#1F2937',
  },

  xAxisLabel: {
    color: '#6B7280',
    fontSize: moderateScale(9),
  },

  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    marginBottom: hp('2%'),
  },

  statCard: {
    width: '48%',
    backgroundColor: '#111827',
    padding: wp('4%'),
    borderRadius: moderateScale(16),
    marginBottom: hp('1.5%'),
  },

  statLabel: {
    color: '#9CA3AF',
    fontSize: moderateScale(11),
  },

  statValue: {
    color: '#fff',
    fontSize: moderateScale(14),
    fontWeight: '700',
    marginTop: hp('0.8%'),
  },

  tradeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: hp('5%'),
  },

  buyBtn: {
    width: '48%',
    backgroundColor: '#00C853',
    paddingVertical: hp('1.8%'),
    borderRadius: moderateScale(14),
    alignItems: 'center',
  },

  sellBtn: {
    width: '48%',
    backgroundColor: '#FF4D6D',
    paddingVertical: hp('1.8%'),
    borderRadius: moderateScale(14),
    alignItems: 'center',
  },

  tradeText: {
    color: '#fff',
    fontSize: moderateScale(14),
    fontWeight: '700',
  },
});