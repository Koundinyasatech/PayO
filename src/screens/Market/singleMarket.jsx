import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';
import { LineChart } from 'react-native-chart-kit';
import Header from '../components/header';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import { moderateScale } from 'react-native-size-matters';

export default function CoinDetailsScreen({
  route,
}) {
  const { coin } = route.params;

  const isNegative =
    coin.priceChangePercentage24h < 0;

  const graphData = [
    coin.price + coin.price * 0.15,
    coin.price + coin.price * 0.1,
    coin.price + coin.price * 0.05,
    coin.price,
    coin.price - coin.price * 0.03,
    coin.price + coin.price * 0.02,
    coin.price - coin.price * 0.04,
    coin.price,
  ];

  return (
    <SafeAreaView
      style={styles.container}
      edges={['top', 'bottom']}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={
          styles.scrollContent
        }>
        <Header />

        <View style={styles.marketCard}>
          <View
            style={
              styles.marketHeader
            }>
            <View
              style={
                styles.marketCoinRow
              }>
              <Image
                source={{
                  uri:
                    coin.image ||
                    'https://via.placeholder.com/60',
                }}
                style={
                  styles.marketCoinImage
                }
              />

              <View
                style={
                  styles.coinInfo
                }>
                <Text
                  style={
                    styles.marketCoinName
                  }
                  numberOfLines={1}>
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
                style={[
                  styles.badgeText,
                  {
                    color:
                      isNegative
                        ? '#FF4D6D'
                        : '#00C853',
                  },
                ]}>
                {isNegative
                  ? 'Bearish'
                  : 'Bullish'}
              </Text>
            </View>
          </View>

          <View
            style={
              styles.priceSection
            }>
            <Text
              style={
                styles.marketPrice
              }>
              $
              {coin?.price?.toLocaleString()}
            </Text>

            <Text
              style={[
                styles.marketChange,
                {
                  color:
                    isNegative
                      ? '#FF4D6D'
                      : '#00C853',
                },
              ]}>
              {isNegative
                ? '▼'
                : '▲'}{' '}
              {Math.abs(
                coin.priceChangePercentage24h,
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
            width={wp('77%')}
            height={hp('28%')}
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
              decimalPlaces: 6,
              color: () =>
                isNegative
                  ? '#FF4D6D'
                  : '#00C853',
              strokeWidth: 3,
              propsForBackgroundLines:
                {
                  stroke:
                    'transparent',
                },
            }}
            style={
              styles.chart
            }
          />

          <View style={styles.statsBox}>
            <View
              style={
                styles.statItem
              }>
              <Text
                style={
                  styles.statLabel
                }>
                Market Cap
              </Text>

              <Text
                style={
                  styles.statValue
                }
                numberOfLines={1}>
                $
                {coin?.marketCap?.toLocaleString() ||
                  'N/A'}
              </Text>
            </View>

            <View
              style={
                styles.statItem
              }>
              <Text
                style={
                  styles.statLabel
                }>
                24h High
              </Text>

              <Text
                style={
                  styles.statValue
                }>
                $
                {coin?.high24h?.toLocaleString()}
              </Text>
            </View>

            <View
              style={
                styles.statItem
              }>
              <Text
                style={
                  styles.statLabel
                }>
                24h Low
              </Text>

              <Text
                style={
                  styles.statValue
                }>
                $
                {coin?.low24h?.toLocaleString()}
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles =
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor:
        '#3B0A6B',
    },

    scrollContent: {
      paddingHorizontal:
        wp('4.5%'),
      paddingBottom:
        hp('4%'),
      flexGrow: 1,
    },

    marketCard: {
      backgroundColor:
        '#cecdfa',
      borderRadius:
        moderateScale(28),
      padding: wp('5%'),
      marginTop: hp('2%'),
      marginBottom: hp('4%'),
    },

    marketHeader: {
      flexDirection:
        'row',
      justifyContent:
        'space-between',
      alignItems:
        'flex-start',
    },

    marketCoinRow: {
      flexDirection:
        'row',
      alignItems:
        'center',
      flex: 1,
      paddingRight:
        wp('3%'),
    },

    coinInfo: {
      flex: 1,
    },

    marketCoinImage: {
      width: wp('15%'),
      height: wp('15%'),
      borderRadius:
        wp('7.5%'),
      marginRight:
        wp('4%'),
    },

    marketCoinName: {
      fontSize:
        moderateScale(
          22,
        ),
      fontWeight:
        '700',
      color: '#111',
    },

    marketCoinSymbol: {
      fontSize:
        moderateScale(
          14,
        ),
      color: '#777',
      marginTop:
        hp('0.5%'),
    },

    marketBadge: {
      paddingHorizontal:
        wp('4%'),
      paddingVertical:
        hp('1%'),
      borderRadius:
        moderateScale(
          24,
        ),
    },

    badgeText: {
      fontWeight: '700',
      fontSize:
        moderateScale(
          12,
        ),
    },

    priceSection: {
      marginTop:
        hp('3.5%'),
    },

    marketPrice: {
      fontSize:
        moderateScale(
          28,
        ),
      fontWeight:
        '800',
      color: '#000',
    },

    marketChange: {
      marginTop:
        hp('1%'),
      fontSize:
        moderateScale(
          18,
        ),
      fontWeight:
        '700',
    },

    chart: {
      marginTop:
        hp('3%'),
      borderRadius:
        moderateScale(
          20,
        ),
      alignSelf:
        'center',
    },

    statsBox: {
      marginTop:
        hp('4%'),
      backgroundColor:
        '#F7F8FA',
      borderRadius:
        moderateScale(
          20,
        ),
      padding: wp('5%'),
    },

    statItem: {
      marginBottom:
        hp('2.2%'),
    },

    statLabel: {
      fontSize:
        moderateScale(
          13,
        ),
      color: '#888',
      marginBottom:
        hp('0.6%'),
    },

    statValue: {
      fontSize:
        moderateScale(
          17,
        ),
      fontWeight:
        '700',
      color: '#111',
    },
  });