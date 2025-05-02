import { View, Text, StyleSheet } from 'react-native';
import { theme } from '@/hooks/use-theme';

export default function Reports() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Relatórios</Text>
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