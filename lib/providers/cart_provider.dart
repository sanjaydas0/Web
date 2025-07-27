import 'package:flutter/material.dart';
import '../models/product_model.dart';

class CartProvider with ChangeNotifier {
  final Map<ProductModel, int> _items = {};

  Map<ProductModel, int> get items => _items;

  double get totalPrice => _items.entries
      .fold(0, (total, entry) => total + (entry.key.price * entry.value));

  void addToCart(ProductModel product, {int qty = 1}) {
    if (_items.containsKey(product)) {
      _items[product] = _items[product]! + qty;
    } else {
      _items[product] = qty;
    }
    notifyListeners();
  }

  void removeFromCart(ProductModel product) {
    _items.remove(product);
    notifyListeners();
  }

  void updateQty(ProductModel product, int qty) {
    if (!_items.containsKey(product)) return;
    if (qty < 1) {
      removeFromCart(product);
    } else {
      _items[product] = qty;
    }
    notifyListeners();
  }

  void clear() {
    _items.clear();
    notifyListeners();
  }
}