import startApolloServer from "./app";

const typeDefs = `
  type User {
    email: String!
    name: String
  }

  type Query {
    allUsers: [User!]!
  }
`;
const resolvers = {
  Query: {
    allUsers: () => {
      return null;
    },
  },
};
startApolloServer(typeDefs, resolvers);
