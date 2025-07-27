import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  updateProfile,
  User as FirebaseUser,
  GoogleAuthProvider,
  signInWithCredential,
} from 'firebase/auth';
import { doc, setDoc, getDoc, updateDoc } from 'firebase/firestore';
import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';
import { auth, db } from './config';
import { User } from '@/types';

WebBrowser.maybeCompleteAuthSession();

class AuthService {
  private googleRequest: any;

  constructor() {
    // Initialize Google Auth
    this.initializeGoogleAuth();
  }

  private initializeGoogleAuth() {
    const [request, response, promptAsync] = Google.useAuthRequest({
      expoClientId: 'your-expo-client-id',
      iosClientId: 'your-ios-client-id',
      androidClientId: 'your-android-client-id',
      webClientId: 'your-web-client-id',
    });

    this.googleRequest = { request, response, promptAsync };
  }

  async signUpWithEmail(email: string, password: string, name: string): Promise<User> {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const firebaseUser = userCredential.user;

      // Update display name
      await updateProfile(firebaseUser, { displayName: name });

      // Create user document in Firestore
      const userData: User = {
        id: firebaseUser.uid,
        email: firebaseUser.email!,
        name,
        addresses: [],
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      await setDoc(doc(db, 'users', firebaseUser.uid), userData);
      return userData;
    } catch (error: any) {
      throw new Error(this.getErrorMessage(error.code));
    }
  }

  async signInWithEmail(email: string, password: string): Promise<User> {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      return await this.getUserData(userCredential.user.uid);
    } catch (error: any) {
      throw new Error(this.getErrorMessage(error.code));
    }
  }

  async signInWithGoogle(): Promise<User> {
    try {
      const { promptAsync } = this.googleRequest;
      const result = await promptAsync();

      if (result?.type === 'success') {
        const { id_token, access_token } = result.params;
        const credential = GoogleAuthProvider.credential(id_token, access_token);
        const userCredential = await signInWithCredential(auth, credential);
        
        // Check if user exists in Firestore
        let userData = await this.getUserData(userCredential.user.uid);
        
        if (!userData) {
          // Create new user document
          userData = {
            id: userCredential.user.uid,
            email: userCredential.user.email!,
            name: userCredential.user.displayName || 'User',
            avatar: userCredential.user.photoURL || undefined,
            addresses: [],
            createdAt: new Date(),
            updatedAt: new Date(),
          };
          
          await setDoc(doc(db, 'users', userCredential.user.uid), userData);
        }
        
        return userData;
      } else {
        throw new Error('Google sign-in was cancelled');
      }
    } catch (error: any) {
      throw new Error(this.getErrorMessage(error.code));
    }
  }

  async signOut(): Promise<void> {
    try {
      await signOut(auth);
    } catch (error: any) {
      throw new Error('Failed to sign out');
    }
  }

  async resetPassword(email: string): Promise<void> {
    try {
      await sendPasswordResetEmail(auth, email);
    } catch (error: any) {
      throw new Error(this.getErrorMessage(error.code));
    }
  }

  async getCurrentUser(): Promise<User | null> {
    const firebaseUser = auth.currentUser;
    if (!firebaseUser) return null;
    
    return await this.getUserData(firebaseUser.uid);
  }

  async updateUserProfile(userId: string, updates: Partial<User>): Promise<User> {
    try {
      const userRef = doc(db, 'users', userId);
      const updateData = {
        ...updates,
        updatedAt: new Date(),
      };
      
      await updateDoc(userRef, updateData);
      return await this.getUserData(userId);
    } catch (error: any) {
      throw new Error('Failed to update profile');
    }
  }

  private async getUserData(userId: string): Promise<User> {
    try {
      const userDoc = await getDoc(doc(db, 'users', userId));
      if (userDoc.exists()) {
        return userDoc.data() as User;
      } else {
        throw new Error('User data not found');
      }
    } catch (error) {
      throw new Error('Failed to fetch user data');
    }
  }

  private getErrorMessage(errorCode: string): string {
    switch (errorCode) {
      case 'auth/user-not-found':
        return 'No account found with this email address';
      case 'auth/wrong-password':
        return 'Incorrect password';
      case 'auth/email-already-in-use':
        return 'An account with this email already exists';
      case 'auth/weak-password':
        return 'Password should be at least 6 characters';
      case 'auth/invalid-email':
        return 'Invalid email address';
      case 'auth/too-many-requests':
        return 'Too many failed attempts. Please try again later';
      default:
        return 'An error occurred. Please try again';
    }
  }
}

export const authService = new AuthService();