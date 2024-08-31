import NextAuth from "next-auth";
import User from "../../../../models/User";
import bcrypt from "bcryptjs";
import CredentialsProvider from "next-auth/providers/credentials";
import logger from "../../../../winston";
import connectDB from "../../../../lib/mongodb";

export const login = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      async authorize(credentials) {
        const { email, password } = credentials;
        try {
          await connectDB();
          if (!email || !password)
            throw new Error("Please provide an email & password");

          const user = await User.findOne({ email: email });
          if (!user) {
            throw new Error("Incorrect username or password");
          }
          const validPassword = await bcrypt.compare(password, user.password);
          if (!validPassword) {
            throw new Error("Incorrect username or password");
          }

          return user;
        } catch (error) {
          console.log(error);
          logger.error("Error in ...nextauth login", error);
          throw error;
        }
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        (token.id = user._id),
          (token.email = user.email),
          (token.address = user.address),
          (token.postalCode = user.postalCode),
          (token.country = user.country),
          (token.city = user.city),
          (token.admin = user.admin);
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user = {
          id: token.id,
          email: token.email,
          admin: token.admin,
          address: token.address,
          postalCode: token.postalCode,
          country: token.country,
          city: token.city,
        };
      }
   
      return session;
    },
  },
};

const handler = NextAuth(login);
export { handler as GET, handler as POST };
