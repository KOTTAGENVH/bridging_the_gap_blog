"use client";
import React, { useState } from 'react';
import { useMutation, useQuery } from "@apollo/client";
import { delete_a_user, query_all_users } from '../apollo/queries_Mutations';
import { useRouter } from 'next/navigation';
import UpdateModal from '@/components/graphql/updateModal';
import CreateModal from '@/components/graphql/createModal';

enum Nationality {
  US = "US",
  UK = "UK",
  DE = "DE",
  FR = "FR",
  ES = "ES",
  IT = "IT",
  RU = "RU",
  JP = "JP",
  CN = "CN",
  IN = "IN",
  BR = "BR",
  AU = "AU"
}

interface Users {
  id: string;
  name: string;
  username: string;
  age: number;
  nationality: Nationality;
  createdAt: string;
  updatedAt: string;
}

function Page() {
  const router = useRouter();

  const userFields: (keyof Users)[] = [
    "name",
    "username",
    "age",
    "nationality",
    "createdAt",
    "updatedAt",
  ];

  const [selectedFields, setSelectedFields] = useState<(keyof Users)[]>(["id"]);
  const [displayUpdateModal, setDisplayUpdateModal] = useState(false);
  const [displayCreateModal, setDisplayCreateModal] = useState(false);
  const [updateUser, setUpdateUser] = useState<Users | null>(null);

  const { data, loading, error } = useQuery(query_all_users(selectedFields));

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [deleteUser, { loading: loading_delete, error: error_delete }] = useMutation(delete_a_user, {
    refetchQueries: [{ query: query_all_users(selectedFields) }],
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  if (!data || !data.getUsers) return <p>No data</p>;

  const handleCheckboxChange = (field: keyof Users) => {
    setSelectedFields((prev) =>
      prev.includes(field) ? prev.filter((f) => f !== field) : [...prev, field]
    );
  };

  const handleNavigate = (path: string) => {
    router.push(path);
  };

  const handleUpdateUser = (user: Users) => {
    setUpdateUser(user);
    setDisplayUpdateModal(true);
  };

  const handleDeleteUser = async (user: Users) => {
    try {
      await deleteUser({
        variables: {
          id: user.id,
        },
      });
    } catch (err) {
      console.error(err);
    }
  };

  const handleCreateOnClose = () => {
    setDisplayCreateModal(false);
    window.location.reload();
  };

  return (
    <div className="min-h-screen w-full bg-bg-gradient-one p-8">
      <div className='flex flex-row items-center justify-around w-full'>
        <button
          onClick={() => handleNavigate("/")}
          className="w-auto h-auto  m-4 p-3 text-lg font-medium text-white bg-blue-700 hover:bg-blue-600 active:bg-blue-500 rounded-lg shadow-md transition-all duration-200"
          aria-label="Navigate to Back"
        >
          Back
        </button>
        <button
          onClick={() => setDisplayCreateModal(true)}
          className="w-auto h-auto m-4 p-3 text-lg font-medium text-white bg-blue-700 hover:bg-blue-600 active:bg-blue-500 rounded-lg shadow-md transition-all duration-200"
          aria-label="Navigate to Back"
        >
          Create
        </button>
      </div>
      <div className="flex flex-row flex-wrap items-center justify-around w-full mb-8">
        {userFields.map((field) => (
          <label key={field} className="flex items-center gap-2 text-white">
            <input
              type="checkbox"
              checked={selectedFields.includes(field)}
              onChange={() => handleCheckboxChange(field)}
              className="h-4 w-4"
            />
            {field}
          </label>
        ))}
      </div>
      <div className="flex flex-row flex-wrap items-center justify-center mt-8 gap-4">
        {data.getUsers.map((user: Users) => (
          <div key={user.id} className="flex flex-col items-center justify-center p-4 bg-white rounded-lg shadow-md">
            {selectedFields
              .filter((field) => field !== "id")
              .map((field) => (
                <p key={field} className="text-sm text-gray-800">
                  <span className="font-semibold">{field}</span>: {user[field]}
                </p>
              ))}
            <button
              className="mt-4 py-2 px-4 text-white bg-blue-700 hover:bg-blue-600 active:bg-blue-500 rounded-lg shadow-md transition-all duration-200"
              onClick={() => handleUpdateUser(user)}
            >
              Edit
            </button>
            <button
              className="mt-4 py-2 px-4 text-white bg-red-700 hover:bg-red-600 active:bg-red-500 rounded-lg shadow-md transition-all duration-200"
              onClick={() => handleDeleteUser(user)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
      {displayCreateModal && (
        <CreateModal
          onClose={() => handleCreateOnClose()}
        />
      )}
      {displayUpdateModal && updateUser && (
        <UpdateModal
          onClose={() => setDisplayUpdateModal(false)}
          user={updateUser}
        />
      )}
    </div>
  );
}

export default Page;
