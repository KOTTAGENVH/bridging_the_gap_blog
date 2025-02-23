import { gql } from 'graphql-tag';

const product_typeDefs = gql`
  type Product {
    id: ID!
    name: String!
  }

  type Query {
    getProduct(id: ID!): Product
    getProducts: [Product]
  }

  type Mutation {
    createProduct(name: String!): Product
    updateProduct(id: ID!, name: String!): Product
    deleteProduct(id: ID!): Boolean
  }
`;

export default product_typeDefs;
