import express from 'express';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import { mergeTypeDefs, mergeResolvers } from '@graphql-tools/merge';
import productResolvers from './graphql/resolvers/product_resolvers.js';
import userResolvers from './graphql/resolvers/user_resolvers.js';
import product_typeDefs from './graphql/typedef/product_typeDef.js';
import user_typeDefs from './graphql/typedef/user_typeDef.js';
import bodyParser from 'body-parser';

dotenv.config({ path: '.env.local' });
const port = process.env.PORT || 5000;
connectDB();

const app = express();
app.use(cors({ origin: 'http://localhost:3000' }));

// Set up REST endpoints as needed
app.post('/api/auth/signin', (req, res) => {
  // Sign in logic
  res.send('Sign in endpoint');
});

app.post('/api/auth/signup', (req, res) => {
  // Sign up logic
  res.send('Sign up endpoint');
});

// Merge your type definitions and resolvers into a single schema
const typeDefs = mergeTypeDefs([product_typeDefs, user_typeDefs]);
const resolvers = mergeResolvers([productResolvers, userResolvers]);

// Create an Apollo Server instance with the unified schema
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

(async function startServer() {
  await server.start();
  
  // Use expressMiddleware to integrate Apollo Server with Express
  app.use(
    '/graphql',
    bodyParser.json(),
    expressMiddleware(server)
  );

  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/graphql`);
  });
})();
