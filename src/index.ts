import startApolloServer from "./app";
import prisma from "../prisma/client";

// const typeDefs = gql`
//   type user {
//     id: ID
//     email: String
//     name: String
//   }

//   type Query {
//     getusers: [user]
//   }
// `;

// const resolvers = {
//   Query: {
//     getusers: async () => {
//       return await prisma.user.findMany();
//     },
//   },
// };

startApolloServer();
