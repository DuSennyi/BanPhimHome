import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LoginScreen({ navigation }) {
  const [phoneNumber, setPhoneNumber] = useState('');

  const handlePhoneNumberChange = (text) => {
    // Cập nhật số điện thoại khi người dùng nhập
    const phoneRegex = /^[0-9]*$/; // Chỉ cho phép ký tự số

    if (phoneRegex.test(text)) {
      setPhoneNumber(text); // Chỉ cập nhật nếu là số
    }
  };

  const handleContinue = async () => {
    if (phoneNumber.length === 10) { // Kiểm tra xem có đúng 10 ký tự không
      await AsyncStorage.setItem('phoneNumber', phoneNumber);
      navigation.navigate('OTPScreen');
    } else {
      Alert.alert('Thông báo', 'Số điện thoại không hợp lệ');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Đăng Nhập</Text>
      <TextInput
        style={styles.input}
        placeholder="Nhập số điện thoại"
        keyboardType="numeric"
        onChangeText={handlePhoneNumberChange}
        value={phoneNumber}
        maxLength={10} // Giới hạn số ký tự là 10
      />
      <TouchableOpacity
        style={[styles.button, phoneNumber.length < 10 && styles.disabledButton]} // Nút vô hiệu khi không đủ ký tự
        onPress={handleContinue}
        disabled={phoneNumber.length < 10}
      >
        <Text style={styles.buttonText}>Tiếp tục</Text>
      </TouchableOpacity>
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
});
