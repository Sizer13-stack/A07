import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { MongoClient } from "mongodb";

const globalForMongo = globalThis as unknown as { _mongo?: MongoClient };
const client =
  globalForMongo._mongo ?? new MongoClient(process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/bazardor");
if (process.env.NODE_ENV !== "production") globalForMongo._mongo = client;
const db = client.db();

export const auth = betterAuth({
  database: mongodbAdapter(db),
  baseURL: process.env.BETTER_AUTH_URL,
  secret: process.env.BETTER_AUTH_SECRET,
  emailAndPassword: { enabled: true, minPasswordLength: 8, autoSignIn: false },
  socialProviders: {
    google: { clientId: process.env.GOOGLE_CLIENT_ID || "", clientSecret: process.env.GOOGLE_CLIENT_SECRET || "" },
    github: { clientId: process.env.GITHUB_CLIENT_ID || "", clientSecret: process.env.GITHUB_CLIENT_SECRET || "" },
  },
});
