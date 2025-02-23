import { updateProduct } from '@/app/api/services/productServices';
import React, { useState } from 'react';

interface Products {
  id: string;
  name: string;
}

interface UpdateModalProps {
  product: Products;
  onClose: () => void;
}

function UpdateModal({ product, onClose }: UpdateModalProps) {
  const [name, setName] = useState(product.name || '');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateProduct(product.id, { name });
      alert('Product updated successfully');
      onClose();
    } catch (err) {
      console.error(err);
      alert('Failed to update product');
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6 transform transition-all duration-300 ease-in-out">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Update Product</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 mb-1">
              Name
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full text-black border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter name"
            />
          </div>
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 transition disabled:opacity-50"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UpdateModal;
