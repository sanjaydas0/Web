# Modern Shopping App

A complete, modern and responsive shopping app for Android and web built with React Native, Expo, TypeScript, and Firebase. Features a beautiful, intuitive UI with full e-commerce functionality.

## 🚀 Features

### ✅ Currently Implemented
- **Authentication System** - Email/password login, Google authentication, registration, forgot password
- **Modern UI/UX** - Beautiful animated interface with light/dark theme support
- **Navigation** - Complete navigation system with stack and tab navigators
- **State Management** - Zustand for cart, wishlist, auth, and theme management
- **Responsive Design** - Mobile-first design that works on tablets and web
- **Theme System** - Light/dark mode with system preference detection

### 🔄 Planned Features
1. **Product System**
   - Dynamic product listings with categories
   - Product details with image gallery
   - Search & filter functionality
   - Rating and review system

2. **Shopping Features**
   - Shopping cart with quantity management
   - Wishlist/favorites functionality
   - Product variants (size, color, etc.)

3. **Checkout & Orders**
   - Complete checkout flow
   - Address management
   - Multiple payment methods (Stripe, PayPal, local payments)
   - Order tracking and history
   - Invoice generation

4. **User Features**
   - User profile management
   - Address book
   - Order history
   - Notifications system

5. **Advanced Features**
   - Push notifications
   - Real-time order tracking
   - Multi-language support
   - Offline support
   - Analytics integration

## 🛠 Tech Stack

- **Frontend**: React Native with Expo
- **Language**: TypeScript
- **Navigation**: React Navigation 6
- **UI Library**: React Native Paper (Material Design 3)
- **State Management**: Zustand
- **Backend**: Firebase (Auth, Firestore, Storage)
- **Animations**: React Native Animatable & Reanimated
- **Icons**: Expo Vector Icons
- **Image Handling**: Expo Image
- **Payment**: Stripe, PayPal integration ready
- **Testing**: Jest
- **Code Quality**: ESLint, TypeScript

## 📱 Supported Platforms

- ✅ **Android** - Native app via Expo
- ✅ **Web** - Progressive Web App
- ✅ **iOS** - Ready for iOS development
- ✅ **Tablets** - Responsive design for all screen sizes

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Expo CLI
- Android Studio (for Android development)
- Xcode (for iOS development - macOS only)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd modern-shopping-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start the development server**
   ```bash
   npm start
   # or
   yarn start
   ```

4. **Run on different platforms**
   ```bash
   # Android
   npm run android
   
   # iOS (macOS only)
   npm run ios
   
   # Web
   npm run web
   ```

## 🔧 Configuration

### Firebase Setup
1. Create a Firebase project at [Firebase Console](https://console.firebase.google.com/)
2. Enable Authentication, Firestore, and Storage
3. Add your Firebase config to `src/services/firebase/config.ts`
4. Enable Google Authentication in Firebase Console

### Environment Variables
Create a `.env` file in the root directory:
```
FIREBASE_API_KEY=your_api_key
FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_STORAGE_BUCKET=your_project.appspot.com
FIREBASE_MESSAGING_SENDER_ID=123456789
FIREBASE_APP_ID=1:123456789:web:abcdef123456789
```

## 📁 Project Structure

```
modern-shopping-app/
├── src/
│   ├── components/           # Reusable UI components
│   │   ├── product/         # Product-related components
│   │   └── category/        # Category-related components
│   ├── screens/             # Screen components
│   │   ├── auth/           # Authentication screens
│   │   ├── home/           # Home screen
│   │   ├── product/        # Product screens
│   │   ├── cart/           # Shopping cart screens
│   │   ├── profile/        # User profile screens
│   │   └── ...
│   ├── navigation/          # Navigation configuration
│   ├── services/           # API and external services
│   │   └── firebase/       # Firebase configuration
│   ├── store/              # State management (Zustand)
│   ├── theme/              # Theme configuration
│   ├── types/              # TypeScript type definitions
│   └── utils/              # Utility functions
├── assets/                 # Images, fonts, icons
├── App.tsx                # Main app component
└── package.json
```

## 🎨 Design System

The app uses a comprehensive design system with:
- **Colors**: Primary, secondary, accent colors with light/dark variants
- **Typography**: Consistent font sizes and weights
- **Spacing**: Standardized spacing scale
- **Components**: Reusable UI components following Material Design 3
- **Animations**: Smooth transitions and micro-interactions

## 🔒 Authentication Flow

1. **Welcome Screen** - App introduction with login/register options
2. **Login** - Email/password or Google authentication
3. **Register** - Account creation with email verification
4. **Forgot Password** - Password reset via email
5. **Auto-login** - Persistent authentication state

## 🛒 Shopping Flow

1. **Browse Products** - Category-based or search-based discovery
2. **Product Details** - Detailed product information with variants
3. **Add to Cart** - Cart management with quantity controls
4. **Checkout** - Address selection, payment method, order review
5. **Order Confirmation** - Success screen with order tracking

## 📱 Screenshots

[Screenshots will be added as features are implemented]

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🚀 Deployment

### Android
```bash
# Build APK
expo build:android

# Build AAB for Play Store
expo build:android -t app-bundle
```

### Web
```bash
# Build for web
expo build:web

# Deploy to any static hosting service
```

### iOS
```bash
# Build for iOS
expo build:ios
```

## 📞 Support

For support, email your-email@example.com or create an issue in this repository.

## 🙏 Acknowledgments

- React Native and Expo teams for the amazing framework
- Firebase for backend services
- Material Design team for the design system
- All open source contributors

---

**Made with ❤️ using React Native and Expo**