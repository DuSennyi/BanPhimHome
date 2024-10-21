import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function OTPScreen({ navigation }) {
  const [otp, setOtp] = useState('');

  const handleOtpChange = (text) => {
    if (text.length <= 6) {
      setOtp(text);
    }
  };

  const handleContinue = async () => {
    if (otp === '123456') { // Kiểm tra OTP
      await AsyncStorage.setItem('otp', otp); // Lưu OTP (nếu cần)
      navigation.navigate('HomeScreen');
    } else {
      Alert.alert('Thông báo', 'Mã OTP không hợp lệ');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Nhập mã OTP</Text>
      <TextInput
        style={styles.input}
        placeholder="Nhập OTP"
        keyboardType="numeric"
        maxLength={6}
        onChangeText={handleOtpChange}
        value={otp}
      />
      <TouchableOpacity
        style={[styles.button, !otp && styles.disabledButton]}
        onPress={handleContinue}
        disabled={!otp}
      >
        <Text style={styles.buttonText}>Tiếp tục</Text>
      </TouchableOpacity>
      <Text style={styles.footerText}>Bạn chưa nhận được mã? Nhấn vào đây để gửi lại.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#4A90E2',
  },
  input: {
    width: '100%',
    padding: 15,
    borderWidth: 1,
    borderColor: '#4A90E2',
    borderRadius: 25,
    backgroundColor: '#fff',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  button: {
    width: '100%',
    padding: 15,
    backgroundColor: '#4A90E2',
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  disabledButton: {
    backgroundColor: '#B0BEC5',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  footerText: {
    marginTop: 20,
    fontSize: 14,
    color: '#888',
    textAlign: 'center',
  },
});
