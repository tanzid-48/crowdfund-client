import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
  fetchOptions: {
    onSuccess: (ctx) => {
      const jwtToken = ctx.response.headers.get("set-auth-jwt");
      if (jwtToken) {
        localStorage.setItem("access-token", jwtToken);
      }
    },
  },
});

export const { signIn, signUp, signOut, useSession } = authClient;
