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
  Checkbox,
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

const RegisterScreen: React.FC = () => {
  const navigation = useNavigation<AuthNavigationProp>();
  const theme = useTheme();
  const { register, error, isLoading, clearError } = useAuthStore();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [snackbarVisible, setSnackbarVisible] = useState(false);

  const handleRegister = async () => {
    if (!formData.name || !formData.email || !formData.password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    if (formData.password.length < 6) {
      Alert.alert('Error', 'Password should be at least 6 characters');
      return;
    }

    if (!agreeToTerms) {
      Alert.alert('Error', 'Please agree to terms and conditions');
      return;
    }

    try {
      await register(formData.email, formData.password, formData.name);
    } catch (error) {
      setSnackbarVisible(true);
    }
  };

  const navigateToLogin = () => {
    navigation.navigate('Login');
  };

  const updateFormData = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={[Colors.secondary, Colors.secondaryLight]}
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
                  name="person-add-outline" 
                  size={60} 
                  color={Colors.white} 
                />
                <Text style={styles.title}>Create Account</Text>
                <Text style={styles.subtitle}>
                  Join us for amazing shopping experience
                </Text>
              </View>
            </Animatable.View>

            {/* Register Form */}
            <Animatable.View animation="fadeInUp" delay={500}>
              <Card style={[styles.card, shadows.lg]}>
                <Card.Content style={styles.cardContent}>
                  <Text style={styles.formTitle}>Sign Up</Text>

                  <TextInput
                    label="Full Name"
                    value={formData.name}
                    onChangeText={(value) => updateFormData('name', value)}
                    mode="outlined"
                    autoCapitalize="words"
                    autoComplete="name"
                    left={<TextInput.Icon icon="account-outline" />}
                    style={styles.input}
                  />

                  <TextInput
                    label="Email"
                    value={formData.email}
                    onChangeText={(value) => updateFormData('email', value)}
                    mode="outlined"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoComplete="email"
                    left={<TextInput.Icon icon="email-outline" />}
                    style={styles.input}
                  />

                  <TextInput
                    label="Password"
                    value={formData.password}
                    onChangeText={(value) => updateFormData('password', value)}
                    mode="outlined"
                    secureTextEntry={!showPassword}
                    autoCapitalize="none"
                    autoComplete="password-new"
                    left={<TextInput.Icon icon="lock-outline" />}
                    right={
                      <TextInput.Icon
                        icon={showPassword ? 'eye-off' : 'eye'}
                        onPress={() => setShowPassword(!showPassword)}
                      />
                    }
                    style={styles.input}
                  />

                  <TextInput
                    label="Confirm Password"
                    value={formData.confirmPassword}
                    onChangeText={(value) => updateFormData('confirmPassword', value)}
                    mode="outlined"
                    secureTextEntry={!showConfirmPassword}
                    autoCapitalize="none"
                    autoComplete="password-new"
                    left={<TextInput.Icon icon="lock-check-outline" />}
                    right={
                      <TextInput.Icon
                        icon={showConfirmPassword ? 'eye-off' : 'eye'}
                        onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                      />
                    }
                    style={styles.input}
                  />

                  <View style={styles.checkboxContainer}>
                    <Checkbox
                      status={agreeToTerms ? 'checked' : 'unchecked'}
                      onPress={() => setAgreeToTerms(!agreeToTerms)}
                    />
                    <Text style={styles.checkboxText}>
                      I agree to the{' '}
                      <Text style={styles.linkText}>Terms of Service</Text>
                      {' '}and{' '}
                      <Text style={styles.linkText}>Privacy Policy</Text>
                    </Text>
                  </View>

                  <Button
                    mode="contained"
                    onPress={handleRegister}
                    loading={isLoading}
                    disabled={isLoading}
                    style={styles.registerButton}
                    contentStyle={styles.buttonContent}
                  >
                    Create Account
                  </Button>

                  <View style={styles.loginContainer}>
                    <Text style={styles.loginText}>
                      Already have an account?{' '}
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
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.lg,
    marginTop: Spacing.sm,
  },
  checkboxText: {
    flex: 1,
    marginLeft: Spacing.sm,
    color: Colors.textSecondary,
    fontSize: 14,
  },
  linkText: {
    color: Colors.primary,
    fontWeight: '500',
  },
  registerButton: {
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

export default RegisterScreen;