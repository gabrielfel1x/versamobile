import { View, Text, StyleSheet, TouchableOpacity, TextInput, ActivityIndicator, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView, ScrollView } from 'react-native';
import React from 'react';
import { useRouter } from 'expo-router';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { theme } from '@/hooks/use-theme';
import Logo from '@/assets/images/logo/logo-inline.svg'
import { Ionicons } from '@expo/vector-icons';

const registerSchema = z.object({
  shop_name: z.string().min(1, 'Nome da loja é obrigatório'),
  shop_cellphone: z.string().min(1, 'Telefone é obrigatório'),
  user_name: z.string().min(1, 'Nome é obrigatório'),
  user_email: z.string().email('Email inválido').min(1, 'Email é obrigatório'),
  user_password: z.string().min(6, 'A senha deve ter pelo menos 6 caracteres'),
});

type RegisterFormData = z.infer<typeof registerSchema>;

export default function Register() {
  const router = useRouter();
  const [isFocused, setIsFocused] = React.useState({
    shop_name: false,
    shop_cellphone: false,
    user_name: false,
    user_email: false,
    user_password: false
  });

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      shop_name: '',
      shop_cellphone: '',
      user_name: '',
      user_email: '',
      user_password: '',
    },
    mode: 'onChange',
  });

  const onSubmit = async (data: RegisterFormData) => {
    router.push('/home');
    const finalData = {
      shop: {
        name: data.shop_name,
        cellphone: data.shop_cellphone,
      },
      shop_user: {
        name: data.user_name,
        email: data.user_email,
        password: data.user_password,
      },
    };
    console.log(finalData);
    // Aqui você pode fazer a chamada para a API
  };

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView behavior="padding" style={styles.keyboardView}>
        <ScrollView 
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.card}>
              <View style={styles.imgContainer}>
                <Logo width={120} height={120} />
              </View>

              <Text style={styles.title}>CRIAR CONTA</Text>

              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Informações da Loja</Text>
                
                <View style={styles.formGroup}>
                  <View style={[
                    styles.inputContainer, 
                    isFocused.shop_name && styles.inputFocused,
                    errors.shop_name && styles.inputError
                  ]}>
                    <Ionicons name="storefront-outline" size={20} color={theme.colors.muted} style={styles.inputIcon} />
                    <Controller
                      control={control}
                      name="shop_name"
                      render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput
                          style={styles.input}
                          placeholder="Nome da loja"
                          placeholderTextColor={theme.colors.muted}
                          onBlur={() => {
                            onBlur();
                            setIsFocused({...isFocused, shop_name: false});
                          }}
                          onChangeText={onChange}
                          value={value}
                          onFocus={() => setIsFocused({...isFocused, shop_name: true})}
                          underlineColorAndroid="transparent"
                          selectionColor={theme.colors.primary}
                        />
                      )}
                    />
                  </View>
                  {errors.shop_name && (
                    <Text style={styles.errorText}>{errors.shop_name.message}</Text>
                  )}
                </View>

                <View style={styles.formGroup}>
                  <View style={[
                    styles.inputContainer, 
                    isFocused.shop_cellphone && styles.inputFocused,
                    errors.shop_cellphone && styles.inputError
                  ]}>
                    <Ionicons name="call-outline" size={20} color={theme.colors.muted} style={styles.inputIcon} />
                    <Controller
                      control={control}
                      name="shop_cellphone"
                      render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput
                          style={styles.input}
                          placeholder="Telefone"
                          placeholderTextColor={theme.colors.muted}
                          keyboardType="phone-pad"
                          onBlur={() => {
                            onBlur();
                            setIsFocused({...isFocused, shop_cellphone: false});
                          }}
                          onChangeText={onChange}
                          value={value}
                          onFocus={() => setIsFocused({...isFocused, shop_cellphone: true})}
                          underlineColorAndroid="transparent"
                          selectionColor={theme.colors.primary}
                        />
                      )}
                    />
                  </View>
                  {errors.shop_cellphone && (
                    <Text style={styles.errorText}>{errors.shop_cellphone.message}</Text>
                  )}
                </View>
              </View>

              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Informações do Usuário</Text>
                
                <View style={styles.formGroup}>
                  <View style={[
                    styles.inputContainer, 
                    isFocused.user_name && styles.inputFocused,
                    errors.user_name && styles.inputError
                  ]}>
                    <Ionicons name="person-outline" size={20} color={theme.colors.muted} style={styles.inputIcon} />
                    <Controller
                      control={control}
                      name="user_name"
                      render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput
                          style={styles.input}
                          placeholder="Seu nome"
                          placeholderTextColor={theme.colors.muted}
                          onBlur={() => {
                            onBlur();
                            setIsFocused({...isFocused, user_name: false});
                          }}
                          onChangeText={onChange}
                          value={value}
                          onFocus={() => setIsFocused({...isFocused, user_name: true})}
                          underlineColorAndroid="transparent"
                          selectionColor={theme.colors.primary}
                        />
                      )}
                    />
                  </View>
                  {errors.user_name && (
                    <Text style={styles.errorText}>{errors.user_name.message}</Text>
                  )}
                </View>

                <View style={styles.formGroup}>
                  <View style={[
                    styles.inputContainer, 
                    isFocused.user_email && styles.inputFocused,
                    errors.user_email && styles.inputError
                  ]}>
                    <Ionicons name="mail-outline" size={20} color={theme.colors.muted} style={styles.inputIcon} />
                    <Controller
                      control={control}
                      name="user_email"
                      render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput
                          style={styles.input}
                          placeholder="Seu email"
                          placeholderTextColor={theme.colors.muted}
                          keyboardType="email-address"
                          autoCapitalize="none"
                          onBlur={() => {
                            onBlur();
                            setIsFocused({...isFocused, user_email: false});
                          }}
                          onChangeText={onChange}
                          value={value}
                          onFocus={() => setIsFocused({...isFocused, user_email: true})}
                          underlineColorAndroid="transparent"
                          selectionColor={theme.colors.primary}
                        />
                      )}
                    />
                  </View>
                  {errors.user_email && (
                    <Text style={styles.errorText}>{errors.user_email.message}</Text>
                  )}
                </View>

                <View style={styles.formGroup}>
                  <View style={[
                    styles.inputContainer, 
                    isFocused.user_password && styles.inputFocused,
                    errors.user_password && styles.inputError
                  ]}>
                    <Ionicons name="lock-closed-outline" size={20} color={theme.colors.muted} style={styles.inputIcon} />
                    <Controller
                      control={control}
                      name="user_password"
                      render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput
                          style={styles.input}
                          placeholder="Sua senha"
                          placeholderTextColor={theme.colors.muted}
                          secureTextEntry
                          onBlur={() => {
                            onBlur();
                            setIsFocused({...isFocused, user_password: false});
                          }}
                          onChangeText={onChange}
                          value={value}
                          onFocus={() => setIsFocused({...isFocused, user_password: true})}
                          underlineColorAndroid="transparent"
                          selectionColor={theme.colors.primary}
                        />
                      )}
                    />
                  </View>
                  {errors.user_password && (
                    <Text style={styles.errorText}>{errors.user_password.message}</Text>
                  )}
                </View>
              </View>

              <TouchableOpacity
                style={[styles.button, (isSubmitting || !isValid) && styles.buttonDisabled]}
                onPress={handleSubmit(onSubmit)}
                disabled={isSubmitting || !isValid}
              >
                {isSubmitting ? (
                  <ActivityIndicator color={theme.colors.primaryForeground} />
                ) : (
                  <View style={styles.buttonContent}>
                    <Text style={styles.buttonText}>Cadastrar</Text>
                    <Ionicons name="checkmark" size={20} color={theme.colors.primaryForeground} />
                  </View>
                )}
              </TouchableOpacity>

              <View style={styles.footer}>
                <Text style={styles.footerText}>Já tem uma conta?</Text>
                <TouchableOpacity onPress={() => router.push('/')}>
                  <Text style={styles.footerLink}>Entrar</Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  keyboardView: {
    flex: 1,
    width: '100%',
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 24,
  },
  imgContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  card: {
    width: '90%',
    maxWidth: 400,
    backgroundColor: theme.colors.card,
    borderRadius: 24,
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontFamily: theme.fonts.bold,
    color: theme.colors.foreground,
    marginBottom: 32,
    textAlign: 'center',
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: theme.fonts.semiBold,
    color: theme.colors.foreground,
    marginBottom: 20,
  },
  formGroup: {
    marginBottom: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.background,
    borderWidth: 1.5,
    borderColor: theme.colors.border,
    borderRadius: 16,
    paddingHorizontal: 16,
  },
  inputFocused: {
    borderColor: theme.colors.primary,
  },
  inputIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    height: 52,
    fontFamily: theme.fonts.regular,
    fontSize: 16,
    color: theme.colors.foreground,
    paddingVertical: 0,
  },
  inputError: {
    borderColor: theme.colors.destructive,
  },
  errorText: {
    fontSize: 12,
    fontFamily: theme.fonts.regular,
    color: theme.colors.destructive,
    marginTop: 4,
    marginLeft: 4,
  },
  button: {
    width: '100%',
    height: 52,
    backgroundColor: theme.colors.primary,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    flexDirection: 'row',
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  buttonText: {
    fontSize: 16,
    fontFamily: theme.fonts.semiBold,
    color: theme.colors.primaryForeground,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
    gap: 4,
  },
  footerText: {
    fontSize: 14,
    fontFamily: theme.fonts.regular,
    color: theme.colors.mutedForeground,
  },
  footerLink: {
    fontSize: 14,
    fontFamily: theme.fonts.semiBold,
    color: theme.colors.primary,
  },
});