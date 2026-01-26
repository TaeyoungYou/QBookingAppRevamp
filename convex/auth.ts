// convex/auth.ts
import { Password } from "@convex-dev/auth/providers/Password";
import Google from "@auth/core/providers/google";
import { convexAuth } from "@convex-dev/auth/server";

export const { auth, signIn, signOut, store, isAuthenticated } = convexAuth({
  providers: [
    Password({
      id: "password",
    }),
    Google
  ],
  callbacks: {
    async redirect({ redirectTo }) {
      // Validate and return the redirectTo URL
      if (redirectTo !== "http://localhost:5173/login") {
        throw new Error(`Invalid redirectTo URI ${redirectTo}`);
      }
      return redirectTo;
    },
  },
});