import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import Svg, { Path, Defs, LinearGradient, Stop, Circle } from 'react-native-svg';
import { LineChart } from 'react-native-chart-kit';

const screenWidth = Dimensions.get('window').width;

const AdvancedMarketCard = ({ coin, onPress }) => {
  const [loading, setLoading] = useState(false);
  const isNegative = coin?.priceChangePercentage24h < 0;
  
  // Increased graph width - use full width with less horizontal padding
  const graphWidth = screenWidth - 48; // Increased from screenWidth - 80 to screenWidth - 48
  const graphHeight = 140; // Increased height for better visibility
  
  const generateChartPath = () => {
    const points = Array.from({ length: 60 }, (_, i) => { // More points for smoother curve
      const x = (i / 59) * graphWidth;
      const y = graphHeight / 2 + 
        Math.sin(i * 0.25) * (graphHeight * 0.25) + 
        Math.cos(i * 0.6) * (graphHeight * 0.15);
      return { x, y };
    });
    
    let path = `M ${points[0].x} ${points[0].y}`;
    for (let i = 1; i < points.length; i++) {
      const cp1x = (points[i-1].x + points[i].x) / 2;
      const cp1y = points[i-1].y;
      const cp2x = cp1x;
      const cp2y = points[i].y;
      path += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${points[i].x} ${points[i].y}`;
    }
    return path;
  };

  return (
    <TouchableOpacity 
      style={{
        backgroundColor: '#fff',
        borderRadius: 24,
        padding: 20,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.08,
        shadowRadius: 12,
        elevation: 4,
      }}
      onPress={onPress}
      activeOpacity={0.9}
    >
      {/* Header with Coin Info */}
      <View style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
      }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
          <Image
            source={{ uri: coin?.image }}
            style={{
              width: 52,
              height: 52,
              borderRadius: 26,
              backgroundColor: '#F5F5F5',
            }}
          />
          <View>
            <Text style={{
              fontSize: 18,
              fontWeight: '700',
              color: '#1A1A1A',
            }}>
              {coin?.symbol?.toUpperCase()}/USDT
            </Text>
            <Text style={{
              fontSize: 13,
              color: '#666',
              marginTop: 2,
            }}>
              {coin?.name}
            </Text>
          </View>
        </View>
        
        <View style={{
          backgroundColor: isNegative ? '#FFE5EA' : '#E7FFF1',
          paddingHorizontal: 12,
          paddingVertical: 6,
          borderRadius: 20,
        }}>
          <Text style={{
            color: isNegative ? '#FF4D6D' : '#00C853',
            fontWeight: '600',
            fontSize: 12,
          }}>
            {isNegative ? 'BEARISH' : 'BULLISH'}
          </Text>
        </View>
      </View>

      {/* Price and Change */}
      <View style={{
        flexDirection: 'row',
        alignItems: 'baseline',
        justifyContent: 'space-between',
        marginBottom: 20,
      }}>
        <Text style={{
          fontSize: 28,
          fontWeight: '700',
          color: '#1A1A1A',
        }}>
          ${coin?.price?.toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 4
          })}
        </Text>
        <Text style={{
          fontSize: 16,
          fontWeight: '600',
          color: isNegative ? '#FF4D6D' : '#00C853',
        }}>
          {isNegative ? '▼' : '▲'} {Math.abs(coin.priceChangePercentage24h || 0).toFixed(2)}%
        </Text>
      </View>

      {/* Chart with Gradient Background - Increased Width */}
      <View style={{
        marginVertical: 12,
        position: 'relative',
        alignItems: 'center',
        width: '100%',
      }}>
        <Svg
          height={graphHeight}
          width={graphWidth}
          viewBox={`0 0 ${graphWidth} ${graphHeight}`}
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
                stopColor={isNegative ? '#FF4D6D' : '#00C853'}
                stopOpacity="0.4"
              />
              <Stop
                offset="100%"
                stopColor={isNegative ? '#FF4D6D' : '#00C853'}
                stopOpacity="0.05"
              />
            </LinearGradient>
          </Defs>
          <Path
            d={generateChartPath()}
            fill="none"
            stroke={isNegative ? '#FF4D6D' : '#00C853'}
            strokeWidth="2.5"
          />
          <Path
            d={`${generateChartPath()} L ${graphWidth} ${graphHeight} L 0 ${graphHeight} Z`}
            fill="url(#gradient)"
            opacity="0.3"
          />
        </Svg>
      </View>

      {/* Stats Row */}
      <View style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
        paddingTop: 16,
        borderTopWidth: 1,
        borderTopColor: '#F0F0F0',
      }}>
        <View style={{ flex: 1 }}>
          <Text style={{ fontSize: 11, color: '#999', marginBottom: 4 }}>
            24h High
          </Text>
          <Text style={{ fontSize: 13, fontWeight: '500', color: '#333' }}>
            ${(coin?.high24h).toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2
            })}
          </Text>
        </View>
        <View style={{ flex: 1, alignItems: 'center' }}>
          <Text style={{ fontSize: 11, color: '#999', marginBottom: 4 }}>
            24h Low
          </Text>
          <Text style={{ fontSize: 13, fontWeight: '500', color: '#333' }}>
            ${(coin?.low24h).toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2
            })}
          </Text>
        </View>
        <View style={{ flex: 1, alignItems: 'flex-end' }}>
          <Text style={{ fontSize: 11, color: '#999', marginBottom: 4 }}>
            24h Volume
          </Text>
          <Text style={{ fontSize: 13, fontWeight: '500', color: '#333' }}>
            ${(coin?.volume24h || 0).toLocaleString()}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default AdvancedMarketCard;