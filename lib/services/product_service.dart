import 'package:cloud_firestore/cloud_firestore.dart';
import '../models/product_model.dart';

class ProductService {
  final CollectionReference _productsRef =
      FirebaseFirestore.instance.collection('products');

  Future<List<ProductModel>> fetchProducts() async {
    final snapshot = await _productsRef.get();
    return snapshot.docs.map((doc) => ProductModel.fromFirestore(doc)).toList();
  }

  Future<ProductModel> getProduct(String id) async {
    final doc = await _productsRef.doc(id).get();
    return ProductModel.fromFirestore(doc);
  }

  Future<void> addProduct(ProductModel product) async {
    await _productsRef.add(product.toMap());
  }
}