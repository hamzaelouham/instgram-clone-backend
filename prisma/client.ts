import { PrismaClient } from "@prisma/client";
import { argsToArgsConfig } from "graphql/type/definition";

// add prisma to the NodeJS global type
// TODO : downgraded @types/node to 15.14.1 to avoid error on NodeJS.Global
// interface CustomNodeJsGlobal extends NodeJS.Global {
//   prisma: PrismaClient;
// }

// Prevent multiple instances of Prisma Client in development
// declare const global: CustomNodeJsGlobal;

// const prisma = global.prisma || new PrismaClient();

// if (process.env.NODE_ENV === "development") {
//   global.prisma = prisma;
// }
const prisma = new PrismaClient();

export default prisma;
