import { gql } from 'graphql-tag';
import Nationality from '../../enums/nationality.js';

const user_typeDefs = gql`
  scalar Date

  enum Nationality {
  US
  UK
  DE
  FR
  ES
  IT
  RU
  JP
  CN
  IN
  BR
  AU
}

  type User {
    id: String!
    name: String
    username: String
    age: Int
    nationality: Nationality
    friends: [User]
    createdAt: Date
    updatedAt: Date
  }

  type Query {
    getUser(id: ID!): User
    getUsers: [User]
  }

  type Mutation {
    createUser(
      name: String
      username: String
      age: Int
      nationality: Nationality
    ): User

    updateUser(  
      id: String!
  name: String
  username: String
  age: Int
  nationality: Nationality): User

    deleteUser(id: String!): String
  }
`;

export default user_typeDefs;
