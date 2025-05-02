import { View, Text, StyleSheet } from 'react-native';
import { theme } from '@/hooks/use-theme';

export default function Orders() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Pedidos</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.background,
  },
  text: {
    fontSize: 24,
    fontFamily: theme.fonts.bold,
    color: theme.colors.foreground,
  },
}); 