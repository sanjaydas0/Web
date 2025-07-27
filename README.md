# Shoppie - Modern Shopping App (Flutter)

Shoppie is a complete cross-platform (Android, iOS & Web) shopping user application built with Flutter 💙.  It delivers a beautiful, responsive UI, packed with the essential e-commerce functionality ready to integrate with any backend.

## ✨  Major Features

1. **User Authentication** – Email/Password & Google sign-in via Firebase Auth.
2. **User Profile & Dashboard** – Update profile, change password, view order history.
3. **Product Listings** – Dynamic grid/list with categories, images, price, description, rating, stock status.
4. **Search & Filter** – Search bar + smart filters (category, price range, brand, rating).
5. **Product Details** – Image carousel, quantity selector, add-to-cart, wishlist.
6. **Shopping Cart** – Add, remove, update quantity, live total.
7. **Wishlist / Favorites** – Persist favorite products locally & on Firestore.
8. **Checkout** – Address form, shipping method, order summary, place order.
9. **Delivery Tracking** – Real-time order status (pending → shipped → delivered).
10. **Payments** – Stripe sample integration (replaceable with SSLCommerz, Bkash…).
11. **Order Success & Invoice** – Confirmation screen & downloadable invoice (PDF).
12. **Notifications** – Push (Firebase Cloud Messaging) & local in-app alerts.
13. **Settings** – Dark/Light theme, language, account actions.
14. **Beautiful Animations** – Hero transitions, shimmer loaders, Lottie animations.
15. **Fully Responsive** – Mobile-first layout that gracefully scales to tablet & web.

---

## 🗂  Folder Structure

```
lib/
 ├── main.dart                # App entry, routing, themes
 ├── core/                    # Shared constants, utilities, themes
 ├── models/                  # Plain data models (Product, User, Order…)
 ├── services/                # Firebase/REST service layer
 ├── providers/               # State management (Provider/Riverpod)
 ├── ui/
 │    ├── screens/            # Feature-level screens (CartScreen, LoginScreen…)
 │    └── widgets/            # Reusable widgets (ProductCard, CustomButton…)
 └── l10n/                    # Localization files (.arb)
```

> All layers are **decoupled** to keep the codebase scalable and testable. Replace Firebase with any backend by updating only `services/`.

---

## 🚀  Getting Started

1. **Install Flutter** (3.22+):  https://docs.flutter.dev/get-started/install
2. **Clone** repo:  `git clone <repo-url> && cd shoppie`
3. **Install deps**:  `flutter pub get`
4. **Firebase setup** (optional for demo):
   - Create project → Add Android, iOS & Web apps.
   - Download `google-services.json`, `GoogleService-Info.plist` and put under `android/app/` and `ios/Runner/`.
   - Copy web config to `web/index.html`.
5. **Run**:  `flutter run -d chrome` or `flutter run -d android-emulator`.

---

## 🔧  Tech Stack

• Flutter 3             • Firebase (Auth, Firestore, Storage, FCM)
• Provider (state)      • Stripe SDK (payments)
• HTTP & Dio            • Flutter Local Notifications
• intl (l10n)           • go_router (navigation)

---

## 🛣️  Roadmap / TODO

- Admin panel & seller app
- Review & rating system
- Advanced analytics dashboard
- Deep linking & dynamic links

---

## 📄  License

This project is licensed under the MIT License – see the [LICENSE](LICENSE) file for details.