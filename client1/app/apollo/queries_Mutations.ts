import { gql } from "@apollo/client";

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

const query_all_users = (fields: (keyof Users)[]) => {
  const fieldsString = fields.join("\n");
  return gql`
    query GetUsers {
      getUsers {
        ${fieldsString}
      }
    }
  `;
};

const update_user_mutation = gql`
  mutation UpdateUser(
    $id: String!,
    $name: String!,
    $username: String!,
    $age: Int!,
    $nationality: Nationality!
  ) {
    updateUser(
      id: $id,
      name: $name,
      username: $username,
      age: $age,
      nationality: $nationality
    ) {
      id
      name
      username
      age
      nationality
    }
  }
`;

const delete_a_user = gql`
  mutation DeleteUser($id: String!) {
    deleteUser(id: $id)
  }
`;


const create_user_mutation = gql`
  mutation CreateUser(
    $name: String!,
    $username: String!,
    $age: Int!,
    $nationality: Nationality!
  ) {
    createUser(
      name: $name,
      username: $username,
      age: $age,
      nationality: $nationality
    ) {
      name
      username
      age
      nationality
    }
  }
`;

export { query_all_users, update_user_mutation, delete_a_user, create_user_mutation };
