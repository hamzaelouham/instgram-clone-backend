import { gql } from "apollo-server-express";
import startApolloServer from "./app";
import prisma from "../prisma/client";

const typeDefs = gql`
  type Product {
    id: ID
    title: String
    description: String
    price: Float
    image: String
    category: String
  }

  type Query {
    getProducts: [Product]
  }
`;
const resolvers = {
  Query: {
    getProducts: async () => {
      return await prisma.products.findMany();
    },
  },
};

startApolloServer(typeDefs, resolvers);
