import { View, Text, StyleSheet, TouchableOpacity, TextInput, ActivityIndicator, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView } from 'react-native';
import React from 'react';
import { useRouter } from 'expo-router';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { theme } from '@/hooks/use-theme';
import Logo from '@/assets/images/logo/logo-inline.svg'
import { Ionicons } from '@expo/vector-icons';

const loginSchema = z.object({
  email: z.string().email('Email inválido').min(1, 'Email é obrigatório'),
  password: z.string().min(6, 'A senha deve ter pelo menos 6 caracteres'),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function Login() {
  const router = useRouter();
  const [isFocused, setIsFocused] = React.useState({
    email: false,
    password: false
  });

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    router.push('/(app)/home');
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log(data);
  };

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView behavior="padding" style={{width: '100%', alignItems: 'center', justifyContent: 'center'}}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.card}>
            <View style={styles.imgContainer}>
              <Logo width={150} height={150} />
            </View>
            <Text style={styles.title}>BEM VINDO!</Text>
            <Text style={styles.subtitle}>Conecte em sua conta</Text>

            <View style={styles.formGroup}>
              <View style={[styles.inputContainer, isFocused.email && styles.inputFocused, errors.email && styles.inputError]}>
                <Ionicons name="mail-outline" size={20} color={theme.colors.muted} style={styles.inputIcon} />
                <Controller
                  control={control}
                  name="email"
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                      style={styles.input}
                      placeholder="Seu email"
                      placeholderTextColor={theme.colors.muted}
                      keyboardType="email-address"
                      autoCapitalize="none"
                      onBlur={() => {
                        onBlur();
                        setIsFocused({...isFocused, email: false});
                      }}
                      onChangeText={onChange}
                      value={value}
                      onFocus={() => setIsFocused({...isFocused, email: true})}
                      underlineColorAndroid="transparent"
                      selectionColor={theme.colors.primary}
                    />
                  )}
                />
              </View>
              {errors.email && (
                <Text style={styles.errorText}>{errors.email.message}</Text>
              )}
            </View>

            <View style={styles.formGroup}>
              <View style={[styles.inputContainer, isFocused.password && styles.inputFocused, errors.password && styles.inputError]}>
                <Ionicons name="lock-closed-outline" size={20} color={theme.colors.muted} style={styles.inputIcon} />
                <Controller
                  control={control}
                  name="password"
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                      style={styles.input}
                      placeholder="Sua senha"
                      placeholderTextColor={theme.colors.muted}
                      secureTextEntry
                      onBlur={() => {
                        onBlur();
                        setIsFocused({...isFocused, password: false});
                      }}
                      onChangeText={onChange}
                      value={value}
                      onFocus={() => setIsFocused({...isFocused, password: true})}
                      underlineColorAndroid="transparent"
                      selectionColor={theme.colors.primary}
                    />
                  )}
                />
              </View>
              {errors.password && (
                <Text style={styles.errorText}>{errors.password.message}</Text>
              )}
            </View>

            <TouchableOpacity
              style={[styles.button, isSubmitting && styles.buttonDisabled]}
              onPress={handleSubmit(onSubmit)}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <ActivityIndicator color={theme.colors.primaryForeground} />
              ) : (
                <View style={styles.buttonContent}>
                  <Text style={styles.buttonText}>Entrar</Text>
                  <Ionicons name="arrow-forward" size={20} color={theme.colors.primaryForeground} />
                </View>
              )}
            </TouchableOpacity>

            <TouchableOpacity style={styles.forgotPassword}>
              <Text style={styles.forgotPasswordText}>Esqueceu a senha?</Text>
            </TouchableOpacity>

            <View style={styles.footer}>
              <Text style={styles.footerText}>Não tem uma conta?</Text>
              <TouchableOpacity onPress={() => router.push('/register')}>
                <Text style={styles.footerLink}>Cadastre-se</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
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
  imgContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 32,
  },
  card: {
    width: '90%',
    maxWidth: 400,
    backgroundColor: theme.colors.card,
    borderRadius: 24,
    padding: 32,
  },
  title: {
    fontSize: 32,
    fontFamily: theme.fonts.bold,
    color: theme.colors.foreground,
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    fontFamily: theme.fonts.regular,
    color: theme.colors.mutedForeground,
    marginBottom: 32,
    textAlign: 'center',
  },
  formGroup: {
    marginBottom: 20,
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
    marginTop: 6,
    marginLeft: 4,
  },
  button: {
    width: '100%',
    height: 52,
    backgroundColor: theme.colors.primary,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
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
  forgotPassword: {
    alignSelf: 'flex-end',
    marginTop: 16,
    marginBottom: 8,
  },
  forgotPasswordText: {
    fontSize: 14,
    fontFamily: theme.fonts.semiBold,
    color: theme.colors.primary,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 32,
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