import { ApolloServer } from "apollo-server-express";
import express from "express";
import http from "http";
import cors from "cors";
import { schema } from "./graphql/schema";
import {
  ApolloServerPluginDrainHttpServer,
  ApolloServerPluginLandingPageLocalDefault,
} from "apollo-server-core";

//@ts-ignore
async function startApolloServer(port) {
  const app = express();
  app.use(cors());

  const httpServer = http.createServer(app);

  const server = new ApolloServer({
    schema,
    csrfPrevention: true,
    cache: "bounded",
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      ApolloServerPluginLandingPageLocalDefault({ embed: true }),
    ],
  });

  await server.start();
  server.applyMiddleware({
    app,
    path: "/graphql",
  });

  await new Promise<void>((resolve) => httpServer.listen({ port }, resolve));
  console.log(` Server ready at http://localhost:4000${server.graphqlPath}`);
}

export default startApolloServer;
