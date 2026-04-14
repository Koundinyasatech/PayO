import React, { useState, useEffect, useRef } from 'react';
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    Alert,
    ActivityIndicator
} from 'react-native';

import api from '../api/axios';
import * as Keychain from 'react-native-keychain';

export default function OtpVerificationScreen({ route, navigation }) {

    const { mobile } = route.params;

    const [otp, setOtp] = useState(['', '', '', '']);
    const [timer, setTimer] = useState(30);
    const [loading, setLoading] = useState(false);

    const inputs = useRef([]);

    useEffect(() => {
        startTimer();
    }, []);

    const startTimer = () => {
        setTimer(30);

        const interval = setInterval(() => {
            setTimer((prev) => {
                if (prev <= 1) {
                    clearInterval(interval);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
    };

    const handleChange = (text, index) => {
        const newOtp = [...otp];
        newOtp[index] = text;
        setOtp(newOtp);

        if (text && index < 3) {
            inputs.current[index + 1].focus();
        }
    };

    const handleKeyPress = (e, index) => {
        if (e.nativeEvent.key === 'Backspace' && index > 0 && !otp[index]) {
            inputs.current[index - 1].focus();
        }
    };

    const saveToken = async (token) => {
        try {
            await Keychain.setGenericPassword('user', token);
            console.log("TOKEN SAVED:", token);
        } catch (error) {
            console.log('Keychain error:', error);
        }
    };

    const handleVerifyOTP = async () => {

        const finalOtp = otp.join('');

        if (finalOtp.length < 4) {
            Alert.alert('Error', 'Enter valid OTP');
            return;
        }

        try {
            setLoading(true);

            const response = await api.post('/verify-otp', {
                mobile: mobile,
                otp: finalOtp
            });

            console.log('VERIFY RESPONSE:', response.data);

            if (response.data.token) {

                const token = response.data.token;

                if (token) {
                    await saveToken(token);
                }

                // ✅ ONLY THIS — NO setTimeout
                Alert.alert(
                    'Success',
                    'OTP Verified Successfully',
                    [
                        {
                            text: 'OK',
                            onPress: () => {
                                console.log("NAVIGATING...");
                                navigation.replace('Profile');
                            }
                        }
                    ]
                );

            } else {
                Alert.alert('Error', response.data.message || 'Invalid OTP');
            }

        } catch (error) {
            console.log('VERIFY ERROR:', error.response?.data || error.message);
            Alert.alert('Error', 'Verification failed');
        } finally {
            setLoading(false);
        }
    };

    const handleResendOTP = async () => {
        try {
            await api.post('/send-otp', { mobile });

            Alert.alert('Success', 'OTP Resent');

            startTimer();

        } catch (error) {
            console.log('RESEND ERROR:', error);
            Alert.alert('Error', 'Failed to resend OTP');
        }
    };

    return (
        <View style={styles.container}>

            <Text style={styles.title}>Verify Your Number</Text>

            <Text style={styles.sub}>
                Enter the 4 digit code sent to +91 ******{mobile.slice(-2)}
            </Text>

            <View style={styles.otpContainer}>
                {otp.map((digit, index) => (
                    <TextInput
                        key={index}
                        ref={(ref) => (inputs.current[index] = ref)}
                        style={styles.box}
                        keyboardType="number-pad"
                        maxLength={1}
                        value={digit}
                        onChangeText={(text) => handleChange(text, index)}
                        onKeyPress={(e) => handleKeyPress(e, index)}
                    />
                ))}
            </View>

            <Text style={styles.timer}>
                Code expires in : 00:{timer < 10 ? `0${timer}` : timer}
            </Text>

            <Text style={styles.resend}>
                Didn’t receive code?{' '}
                <Text style={styles.link} onPress={handleResendOTP}>
                    Resend Code
                </Text>
            </Text>

            <TouchableOpacity
                style={styles.button}
                onPress={handleVerifyOTP}
                disabled={loading}
            >
                {loading ? (
                    <ActivityIndicator color="#fff" />
                ) : (
                    <Text style={styles.buttonText}>Verify OTP</Text>
                )}
            </TouchableOpacity>

            <Text style={styles.loginText}>
                Already have an account?{' '}
                <Text
                    style={styles.link}
                    onPress={() => navigation.navigate('Login')}
                >
                    Login
                </Text>
            </Text>

            <Text style={styles.footer}>
                By Continuing, you agree to our{' '}
                <Text style={styles.link}>Privacy Policy</Text>
            </Text>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F2F2F2',
        alignItems: 'center',
        paddingTop: 80,
    },
    title: {
        fontSize: 18,
        fontWeight: '700',
    },
    sub: {
        textAlign: 'center',
        marginTop: 10,
        color: '#555',
        paddingHorizontal: 20,
    },
    otpContainer: {
        flexDirection: 'row',
        marginTop: 30,
    },
    box: {
        width: 50,
        height: 50,
        borderWidth: 1,
        borderColor: '#ccc',
        marginHorizontal: 5,
        textAlign: 'center',
        fontSize: 18,
        borderRadius: 8,
        backgroundColor: '#fff',
    },
    timer: {
        marginTop: 20,
        color: '#555',
    },
    resend: {
        marginTop: 10,
        color: '#555',
    },
    link: {
        color: '#5A00D1',
    },
    button: {
        backgroundColor: '#5A00D1',
        padding: 14,
        borderRadius: 8,
        marginTop: 30,
        width: '80%',
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontWeight: '600',
    },
    loginText: {
        marginTop: 20,
        color: '#555',
    },
    footer: {
        marginTop: 10,
        color: '#555',
        fontSize: 12,
    },
});