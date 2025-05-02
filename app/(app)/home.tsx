import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { theme } from '@/hooks/use-theme';
import { useState } from 'react';

type MenuCard = {
  id: string;
  title: string;
  description: string;
  icon: JSX.Element;
  route: string;
  color: string;
};

const menuCards: MenuCard[] = [
  {
    id: 'orders',
    title: 'Pedidos',
    description: 'Gerencie os pedidos da sua loja',
    icon: <Ionicons name="cart-outline" size={32} color="#000" />,
    route: 'orders',
    color: '#4285F4',
  },
  {
    id: 'catalog',
    title: 'Catálogo',
    description: 'Gerencie seu catálogo',
    icon: <MaterialCommunityIcons name="book-open-outline" size={32} color="#000" />,
    route: 'catalog',
    color: '#34A853',
  },
  {
    id: 'settings',
    title: 'Configurações',
    description: 'Configure sua loja',
    icon: <Ionicons name="settings-outline" size={32} color="#000" />,
    route: 'settings',
    color: '#5F6368',
  },
  {
    id: 'marketing',
    title: 'Marketing',
    description: 'Estamos trabalhando nisso',
    icon: <Ionicons name="analytics-outline" size={32} color="#000" />,
    route: 'marketing',
    color: '#EA4335',
  },
  {
    id: 'reports',
    title: 'Relatórios',
    description: 'Acompanhe suas métricas',
    icon: <Ionicons name="stats-chart-outline" size={32} color="#000" />,
    route: 'reports',
    color: '#9747FF',
  },
  {
    id: 'support',
    title: 'Suporte',
    description: 'Área de atendimento e auxílio ao lojista',
    icon: <MaterialCommunityIcons name="headphones" size={32} color="#000" />,
    route: 'support',
    color: '#FBBC05',
  },
];

export default function Home() {
  const router = useRouter();
  const [showLogout, setShowLogout] = useState(false);

  const handleLogout = () => {
    console.log('Logout');
  };

  const renderCard = (card: MenuCard) => (
    <TouchableOpacity
      key={card.id}
      style={[styles.card, { backgroundColor: card.color }]}
      onPress={() => router.push(card.route as any)}
    >
      <View style={[styles.iconContainer, { backgroundColor: '#fff' }]}>
        {card.icon}
      </View>
      <Text style={[styles.cardTitle, { color: '#fff' }]}>{card.title}</Text>
      <Text style={[styles.cardDescription, { color: '#fff' }]}>{card.description}</Text>
      <View style={styles.accessContainer}>
        <Text style={[styles.accessText, { color: '#fff' }]}>Acessar</Text>
        <Ionicons name="arrow-forward" size={16} color="#fff" />
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Text style={styles.title}>Grata Pizza</Text>
            <Text style={styles.subtitle}>Gerencie sua loja</Text>
          </View>
          <View style={styles.profileContainer}>
            <TouchableOpacity 
              style={styles.profileButton}
              onPress={() => setShowLogout(!showLogout)}
            >
              <Ionicons name="person-circle" size={40} color={theme.colors.foreground} />
            </TouchableOpacity>
            {showLogout && (
              <TouchableOpacity 
                style={styles.logoutButton}
                onPress={handleLogout}
              >
                <Ionicons name="log-out-outline" size={16} color="#fff" />
                <Text style={styles.logoutText}>Sair</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
        
        <View style={styles.grid}>
          {menuCards.map(renderCard)}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    paddingTop: 20,
  },
  content: {
    flex: 1,
  },
  header: {
    padding: 24,
    paddingTop: 48,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerLeft: {
    flex: 1,
  },
  title: {
    fontSize: 28,
    fontFamily: theme.fonts.bold,
    color: theme.colors.foreground,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: theme.fonts.regular,
    color: theme.colors.mutedForeground,
  },
  profileContainer: {
    position: 'relative',
  },
  profileButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoutButton: {
    zIndex: 1000,
    width: 100,
    position: 'absolute',
    top: 50,
    right: 0,
    backgroundColor: '#EA4335',
    padding: 12,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  logoutText: {
    color: '#fff',
    fontFamily: theme.fonts.semiBold,
    fontSize: 14,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 12,
    gap: 12,
  },
  card: {
    width: '47%',
    padding: 16,
    borderRadius: 16,
    shadowColor: theme.colors.foreground,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 4,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 16,
    fontFamily: theme.fonts.semiBold,
    color: theme.colors.foreground,
    marginBottom: 4,
  },
  cardDescription: {
    fontSize: 14,
    fontFamily: theme.fonts.regular,
    color: theme.colors.mutedForeground,
    marginBottom: 12,
  },
  accessContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  accessText: {
    fontSize: 14,
    fontFamily: theme.fonts.semiBold,
    color: theme.colors.primary,
  },
}); 