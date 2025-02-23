import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
  }
});

const Product = mongoose.model('Product', ProductSchema);

export default Product;
