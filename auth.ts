import NextAuth from "next-auth";
import { ZodError } from "zod";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import Apple from "next-auth/providers/apple";
import Discord from "next-auth/providers/discord";
import Twitter from "next-auth/providers/twitter";
import Facebook from "next-auth/providers/facebook";
import GitHub from "next-auth/providers/github";

import { site } from "./site";
import { saltAndHashPassword } from "@/utils/password";
import { signInSchema } from "@/lib/zod";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from "@/lib/prisma";

const providers = [];

if (site.auth.credentials) {
  providers.push(
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        try {
          const { email, password } = await signInSchema.parseAsync(
            credentials
          );

          const pwHash = saltAndHashPassword(password);
          const user = await db.user.findFirst({
            where: { email, password: pwHash },
          });

          if (!user) {
            throw new Error("Invalid credentials.");
          }

          return user;
        } catch (error) {
          if (error instanceof ZodError) {
            return null; // invalid input
          }

          // Optional: log non-zod errors
          console.error("Auth error:", error);
          return null;
        }
      },
    })
  );
}

if (site.auth.google)
  providers.push(
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    })
  );

if (site.auth.apple)
  providers.push(
    Apple({
      clientId: process.env.APPLE_CLIENT_ID!,
      clientSecret: process.env.APPLE_CLIENT_SECRET!,
    })
  );

if (site.auth.discord)
  providers.push(
    Discord({
      clientId: process.env.DISCORD_CLIENT_ID!,
      clientSecret: process.env.DISCORD_CLIENT_SECRET!,
    })
  );

if (site.auth.twitter)
  providers.push(
    Twitter({
      clientId: process.env.TWITTER_CLIENT_ID!,
      clientSecret: process.env.TWITTER_CLIENT_SECRET!,
    })
  );

if (site.auth.facebook)
  providers.push(
    Facebook({
      clientId: process.env.FACEBOOK_CLIENT_ID!,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET!,
    })
  );

if (site.auth.github)
  providers.push(
    GitHub({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    })
  );

// Export handlers and auth
export const { handlers, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers,
});
