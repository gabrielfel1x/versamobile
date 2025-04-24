import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import { useRouter } from 'expo-router';

export default function Login() {
  const router = useRouter()

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Logar kkkkk</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#121212',
  },
  text: {
    fontSize: 20,
    color: '#fff',
  },
});
