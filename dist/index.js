"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
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
(0, app_1.default)(typeDefs, resolvers);
//# sourceMappingURL=index.js.map