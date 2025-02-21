import Product from '../../models/product.js';
import { GraphQLError } from 'graphql';

interface GetProductArgs {
  id: string;
}

interface CreateProductArgs {
  name: string;
}

interface UpdateProductArgs {
  id: string;
  name: string;
}

interface DeleteProductArgs {
  id: string;
}

const productResolvers = {
  Query: {
    // Matches typeDefs: getProducts
    getProducts: async (): Promise<any> => {
      try {
        return await Product.find();
      } catch (err: unknown) {
        throw new GraphQLError(`Error fetching products: ${(err as Error).message}`);
      }
    },

    // Matches typeDefs: getProduct
    getProduct: async (_: any, { id }: GetProductArgs): Promise<any> => {
      try {
        const product = await Product.findById(id);
        if (!product) {
          throw new GraphQLError('Product not found');
        }
        return product;
      } catch (err: unknown) {
        throw new GraphQLError(`Error fetching product: ${(err as Error).message}`);
      }
    },
  },

  Mutation: {
    createProduct: async (_: any, { name }: CreateProductArgs): Promise<any> => {
      try {
        const newProduct = new Product({ name });
        return await newProduct.save();
      } catch (err: unknown) {
        throw new GraphQLError(`Failed to create product: ${(err as Error).message}`);
      }
    },

    updateProduct: async (_: any, { id, name }: UpdateProductArgs): Promise<any> => {
      try {
        const updatedProduct = await Product.findByIdAndUpdate(
          id,
          { name },
          { new: true }
        );
        if (!updatedProduct) {
          throw new GraphQLError('Product not found for update');
        }
        return updatedProduct;
      } catch (err: unknown) {
        throw new GraphQLError(`Failed to update product: ${(err as Error).message}`);
      }
    },

    deleteProduct: async (_: any, { id }: DeleteProductArgs): Promise<boolean> => {
      try {
        const deletedProduct = await Product.findByIdAndDelete(id);
        if (!deletedProduct) {
          throw new GraphQLError('Product not found for deletion');
        }
        return true;
      } catch (err: unknown) {
        throw new GraphQLError(`Failed to delete product: ${(err as Error).message}`);
      }
    },
  },
};

export default productResolvers;
