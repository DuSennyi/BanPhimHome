import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';

export default function HomeScreen({ navigation }) {
  const [phoneNumber, setPhoneNumber] = useState('');

  useEffect(() => {
    const getPhoneNumber = async () => {
      const storedPhoneNumber = await AsyncStorage.getItem('phoneNumber');
      if (storedPhoneNumber) {
        setPhoneNumber(storedPhoneNumber);
      }
    };
    getPhoneNumber();
  }, []);

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('LoginScreen')}>
        <Ionicons name="arrow-back" size={24} color="#4A90E2" />
      </TouchableOpacity>
      <Image source={require('./images/AnyConv.com__1.png')} style={styles.image} />
      <Text style={styles.title}>Chào mừng!</Text>
      <Text style={styles.phoneNumber}>Số điện thoại của bạn:</Text>
      <Text style={styles.phoneNumberValue}>{phoneNumber}</Text>
      <Text style={styles.footerText}>Cảm ơn bạn đã sử dụng ứng dụng của chúng tôi!</Text>
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
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    padding: 10,
  },
  image: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#4A90E2',
  },
  phoneNumber: {
    fontSize: 20,
    color: '#555',
    marginBottom: 5,
  },
  phoneNumberValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4A90E2',
  },
  footerText: {
    marginTop: 20,
    fontSize: 16,
    color: '#888',
    textAlign: 'center',
    paddingHorizontal: 20,
  },
});
