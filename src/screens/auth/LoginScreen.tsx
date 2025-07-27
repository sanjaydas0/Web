import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import {
  Text,
  TextInput,
  Button,
  Card,
  useTheme,
  Snackbar,
  Divider,
} from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import * as Animatable from 'react-native-animatable';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import { useAuthStore } from '@/store/authStore';
import { Colors, Spacing, shadows } from '@/theme/theme';

type AuthNavigationProp = StackNavigationProp<any>;

const LoginScreen: React.FC = () => {
  const navigation = useNavigation<AuthNavigationProp>();
  const theme = useTheme();
  const { login, loginWithGoogle, error, isLoading, clearError } = useAuthStore();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [snackbarVisible, setSnackbarVisible] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    try {
      await login(email, password);
    } catch (error) {
      setSnackbarVisible(true);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await loginWithGoogle();
    } catch (error) {
      setSnackbarVisible(true);
    }
  };

  const navigateToRegister = () => {
    navigation.navigate('Register');
  };

  const navigateToForgotPassword = () => {
    navigation.navigate('ForgotPassword');
  };

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={[Colors.primary, Colors.primaryLight]}
        style={styles.gradient}
      >
        <KeyboardAvoidingView
          style={styles.keyboardView}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            {/* Header */}
            <Animatable.View animation="fadeInDown" delay={300}>
              <View style={styles.header}>
                <Ionicons 
                  name="storefront-outline" 
                  size={60} 
                  color={Colors.white} 
                />
                <Text style={styles.title}>Welcome Back</Text>
                <Text style={styles.subtitle}>
                  Sign in to continue shopping
                </Text>
              </View>
            </Animatable.View>

            {/* Login Form */}
            <Animatable.View animation="fadeInUp" delay={500}>
              <Card style={[styles.card, shadows.lg]}>
                <Card.Content style={styles.cardContent}>
                  <Text style={styles.formTitle}>Sign In</Text>

                  <TextInput
                    label="Email"
                    value={email}
                    onChangeText={setEmail}
                    mode="outlined"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoComplete="email"
                    left={<TextInput.Icon icon="email-outline" />}
                    style={styles.input}
                  />

                  <TextInput
                    label="Password"
                    value={password}
                    onChangeText={setPassword}
                    mode="outlined"
                    secureTextEntry={!showPassword}
                    autoCapitalize="none"
                    autoComplete="password"
                    left={<TextInput.Icon icon="lock-outline" />}
                    right={
                      <TextInput.Icon
                        icon={showPassword ? 'eye-off' : 'eye'}
                        onPress={() => setShowPassword(!showPassword)}
                      />
                    }
                    style={styles.input}
                  />

                  <Button
                    mode="text"
                    onPress={navigateToForgotPassword}
                    style={styles.forgotButton}
                  >
                    Forgot Password?
                  </Button>

                  <Button
                    mode="contained"
                    onPress={handleLogin}
                    loading={isLoading}
                    disabled={isLoading}
                    style={styles.loginButton}
                    contentStyle={styles.buttonContent}
                  >
                    Sign In
                  </Button>

                  <View style={styles.dividerContainer}>
                    <Divider style={styles.divider} />
                    <Text style={styles.dividerText}>or</Text>
                    <Divider style={styles.divider} />
                  </View>

                  <Button
                    mode="outlined"
                    onPress={handleGoogleLogin}
                    icon="google"
                    style={styles.googleButton}
                    contentStyle={styles.buttonContent}
                  >
                    Continue with Google
                  </Button>

                  <View style={styles.registerContainer}>
                    <Text style={styles.registerText}>
                      Don't have an account?{' '}
                    </Text>
                    <Button
                      mode="text"
                      onPress={navigateToRegister}
                      compact
                    >
                      Sign Up
                    </Button>
                  </View>
                </Card.Content>
              </Card>
            </Animatable.View>
          </ScrollView>
        </KeyboardAvoidingView>
      </LinearGradient>

      <Snackbar
        visible={snackbarVisible}
        onDismiss={() => {
          setSnackbarVisible(false);
          clearError();
        }}
        duration={4000}
        action={{
          label: 'Dismiss',
          onPress: () => {
            setSnackbarVisible(false);
            clearError();
          },
        }}
      >
        {error}
      </Snackbar>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: Spacing.lg,
  },
  header: {
    alignItems: 'center',
    marginBottom: Spacing.xl,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: Colors.white,
    marginTop: Spacing.md,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: Colors.white,
    opacity: 0.9,
    marginTop: Spacing.sm,
    textAlign: 'center',
  },
  card: {
    backgroundColor: Colors.white,
    borderRadius: 20,
  },
  cardContent: {
    padding: Spacing.xl,
  },
  formTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: Spacing.xl,
    color: Colors.textPrimary,
  },
  input: {
    marginBottom: Spacing.md,
  },
  forgotButton: {
    alignSelf: 'flex-end',
    marginBottom: Spacing.lg,
  },
  loginButton: {
    marginBottom: Spacing.lg,
    borderRadius: 12,
  },
  buttonContent: {
    paddingVertical: Spacing.sm,
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.lg,
  },
  divider: {
    flex: 1,
  },
  dividerText: {
    marginHorizontal: Spacing.md,
    color: Colors.textSecondary,
  },
  googleButton: {
    marginBottom: Spacing.lg,
    borderRadius: 12,
  },
  registerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  registerText: {
    color: Colors.textSecondary,
  },
});

export default LoginScreen;