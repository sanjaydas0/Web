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

const ForgotPasswordScreen: React.FC = () => {
  const navigation = useNavigation<AuthNavigationProp>();
  const theme = useTheme();
  const { resetPassword, error, isLoading, clearError } = useAuthStore();

  const [email, setEmail] = useState('');
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [successSnackbarVisible, setSuccessSnackbarVisible] = useState(false);

  const handleResetPassword = async () => {
    if (!email) {
      Alert.alert('Error', 'Please enter your email address');
      return;
    }

    try {
      await resetPassword(email);
      setSuccessSnackbarVisible(true);
      setTimeout(() => {
        navigation.navigate('Login');
      }, 2000);
    } catch (error) {
      setSnackbarVisible(true);
    }
  };

  const navigateToLogin = () => {
    navigation.navigate('Login');
  };

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={[Colors.accent, Colors.accentLight]}
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
                  name="lock-closed-outline" 
                  size={60} 
                  color={Colors.white} 
                />
                <Text style={styles.title}>Forgot Password?</Text>
                <Text style={styles.subtitle}>
                  Enter your email to receive reset instructions
                </Text>
              </View>
            </Animatable.View>

            {/* Reset Form */}
            <Animatable.View animation="fadeInUp" delay={500}>
              <Card style={[styles.card, shadows.lg]}>
                <Card.Content style={styles.cardContent}>
                  <Text style={styles.formTitle}>Reset Password</Text>

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

                  <Button
                    mode="contained"
                    onPress={handleResetPassword}
                    loading={isLoading}
                    disabled={isLoading}
                    style={styles.resetButton}
                    contentStyle={styles.buttonContent}
                  >
                    Send Reset Link
                  </Button>

                  <View style={styles.loginContainer}>
                    <Text style={styles.loginText}>
                      Remember your password?{' '}
                    </Text>
                    <Button
                      mode="text"
                      onPress={navigateToLogin}
                      compact
                    >
                      Sign In
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

      <Snackbar
        visible={successSnackbarVisible}
        onDismiss={() => setSuccessSnackbarVisible(false)}
        duration={4000}
        style={{ backgroundColor: Colors.success }}
      >
        Password reset link sent to your email!
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
    marginBottom: Spacing.lg,
  },
  resetButton: {
    marginBottom: Spacing.lg,
    borderRadius: 12,
  },
  buttonContent: {
    paddingVertical: Spacing.sm,
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginText: {
    color: Colors.textSecondary,
  },
});

export default ForgotPasswordScreen;