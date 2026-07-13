import { betterAuth } from "better-auth";
import { bearer, jwt } from "better-auth/plugins";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";

const client = new MongoClient(process.env.MONGO_URI as string);
const db = client.db(process.env.DB_NAME);

export const auth = betterAuth({
  database: mongodbAdapter(db),
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
  },
  user: {
    additionalFields: {
      role: {
        type: "string",
        required: true,
        defaultValue: "supporter",
        input: true, // registration form
      },
      credits: {
        type: "number",
        required: true,
        defaultValue: 0,
        input: false,
      },
      creditsGranted: {
        type: "boolean",
        required: true,
        defaultValue: false,
        input: false,
      },
    },
  },
  databaseHooks: {
    user: {
      create: {
        before: async (user) => {
          const bonus = user.role === "creator" ? 20 : 50;
          return {
            data: {
              ...user,
              credits: bonus,
              creditsGranted: true,
            },
          };
        },
      },
    },
  },
  plugins: [
    bearer(),
    jwt({
      jwt: {
        definePayload: (session) => {
          // JWT payload-এ role/credits/email
          return {
            id: session.user.id,
            email: session.user.email,
            role: session.user.role,
            credits: session.user.credits,
          };
        },
      },
    }),
  ],
});

export type Session = typeof auth.$Infer.Session;
