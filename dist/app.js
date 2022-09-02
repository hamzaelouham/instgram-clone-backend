"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_express_1 = require("apollo-server-express");
const apollo_server_core_1 = require("apollo-server-core");
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const cors_1 = __importDefault(require("cors"));
//@ts-ignore
async function startApolloServer(typeDefs, resolvers) {
    // Required logic for integrating with Express
    const app = (0, express_1.default)();
    app.use((0, cors_1.default)());
    // Our httpServer handles incoming requests to our Express app.
    // Below, we tell Apollo Server to "drain" this httpServer,
    // enabling our servers to shut down gracefully.
    const httpServer = http_1.default.createServer(app);
    // Same ApolloServer initialization as before, plus the drain plugin
    // for our httpServer.
    const server = new apollo_server_express_1.ApolloServer({
        typeDefs,
        resolvers,
        csrfPrevention: true,
        cache: "bounded",
        plugins: [
            (0, apollo_server_core_1.ApolloServerPluginDrainHttpServer)({ httpServer }),
            (0, apollo_server_core_1.ApolloServerPluginLandingPageLocalDefault)({ embed: true }),
        ],
    });
    // More required logic for integrating with Express
    await server.start();
    server.applyMiddleware({
        app,
        // By default, apollo-server hosts its GraphQL endpoint at the
        // server root. However, *other* Apollo Server packages host it at
        // /graphql. Optionally provide this to match apollo-server.
        path: "/graphql",
    });
    // Modified server startup
    await new Promise((resolve) => httpServer.listen({ port: 4000 }, resolve));
    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
}
exports.default = startApolloServer;
//# sourceMappingURL=app.js.map