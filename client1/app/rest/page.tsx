"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import UpdateModal from '@/components/rest/updateModal';
import CreateModal from '@/components/rest/createModal';
import { deleteProduct, getProducts } from '../api/services/productServices';
import { useQuery } from '@tanstack/react-query';

interface Product {
  _id: string;
  name: string;
}

function Page() {
  const router = useRouter();

  const [displayUpdateModal, setDisplayUpdateModal] = useState(false);
  const [displayCreateModal, setDisplayCreateModal] = useState(false);
  const [updateProduct, setUpdateProduct] = useState<Product | null>(null);

  const { data, isLoading, error } = useQuery<Product[]>({
    queryKey: ['products'],
    queryFn: getProducts,
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {(error as Error).message}</p>;
  if (!data) return <p>No data</p>;

  if (data) {
    console.log(data);
  }

  const handleNavigate = (path: string) => {
    router.push(path);
  };

  const handleUpdateProduct = (product: Product) => {
    setUpdateProduct(product);
    setDisplayUpdateModal(true);
  };

  const handleDeleteProduct = async (product: Product) => {
    try {
      await deleteProduct(product._id);
      window.location.reload();
    } catch (err) {
      alert('Failed to delete product');
      console.error(err);
    }
  };

  const handleCreateOnClose = () => {
    setDisplayCreateModal(false);
    window.location.reload();
  };

  return (
    <div className="min-h-screen w-full bg-bg-gradient-one p-8">
      <div className="flex flex-row items-center justify-around w-full">
        <button
          onClick={() => handleNavigate("/")}
          className="w-auto h-auto m-4 p-3 text-lg font-medium text-white bg-blue-700 hover:bg-blue-600 active:bg-blue-500 rounded-lg shadow-md transition-all duration-200"
          aria-label="Navigate Back"
        >
          Back
        </button>
        <button
          onClick={() => setDisplayCreateModal(true)}
          className="w-auto h-auto m-4 p-3 text-lg font-medium text-white bg-blue-700 hover:bg-blue-600 active:bg-blue-500 rounded-lg shadow-md transition-all duration-200"
          aria-label="Create Product"
        >
          Create
        </button>
      </div>
      <div className="flex flex-row flex-wrap items-center justify-center mt-8 gap-4">
        {data.map((product: Product) => (
          <div key={product._id} className="flex flex-col items-center justify-center p-4 bg-white rounded-lg shadow-md">
            <p className="text-sm text-gray-800">
              <span className="font-semibold">Name</span>: {product.name}
            </p>
            <button
              className="mt-4 py-2 px-4 text-white bg-blue-700 hover:bg-blue-600 active:bg-blue-500 rounded-lg shadow-md transition-all duration-200"
              onClick={() => handleUpdateProduct(product)}
            >
              Edit
            </button>
            <button
              className="mt-4 py-2 px-4 text-white bg-red-700 hover:bg-red-600 active:bg-red-500 rounded-lg shadow-md transition-all duration-200"
              onClick={() => handleDeleteProduct(product)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
      {displayCreateModal && (
        <CreateModal onClose={handleCreateOnClose} />
      )}
      {displayUpdateModal && updateProduct && (
        <UpdateModal
          onClose={() => setDisplayUpdateModal(false)}
          product={{ id: updateProduct._id, name: updateProduct.name }}
        />
      )}
    </div>
  );
}

export default Page;
