// router.ts
import express from 'express';
import { createProduct, deleteProduct, getProducts, getProductById, updateProduct } from '../controller/productController.js';

const productsRouter = express.Router();

// Routes
productsRouter.post('/product', createProduct);
productsRouter.get('/products', getProducts);
productsRouter.get('/product/:id', getProductById);
productsRouter.put('/product/:id', updateProduct);
productsRouter.delete('/product/:id', deleteProduct);

export default productsRouter;
