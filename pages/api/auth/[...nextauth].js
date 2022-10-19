import { compare } from "bcryptjs";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import connectMongo from "../../../database/conn";
import Users from "../../../model/Schema";

export default NextAuth({
  providers: [
    // Google Provider
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),

    // Github Provider
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),

    // Credential Provider
    CredentialsProvider({
      name: "Credentials",
      async authorize(credentials, req) {
        connectMongo().catch((error) => {
          error: "Connection Fail!";
        });

        // Check user existence
        const result = await Users.findOne({ email: credentials.email });
        if (!result) {
          throw new Error("Not user found with this email, Please sign up");
        }

        // Compare password by compare() of bcryptjs
        const checkPassword = await compare(credentials.password, result.password);

        // incorrect password
        if(!checkPassword || credentials.email !== result.email){
            throw new Error("Email or Password doesn't match!")
        }

        return result;
      },
    }),
  ],
  secret:procces.env.NEXT_SECRET
});
