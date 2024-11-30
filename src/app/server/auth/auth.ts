import { getServerSession, type NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import { userService } from '@/app/server/account/application/userService';
import { cookies } from 'next/headers';
import { cookieNames } from '../shared/constants/cookie';
import getAccountByEmail from '../controllers/account/getAccountByEmail';

export const authOptions: NextAuthOptions = {
  session: { strategy: 'jwt' },
  callbacks: {
    async jwt({ token, account, user }) {
      if (account && account.type === 'credentials') {
        // token.userId = account.userId;
      }
      if (account && account.provider === 'google') {
        const meUser = await getAccountByEmail(user.email as string);
        token.userId = meUser?.id || 0;
      }
      return token;
    },
    async signIn({ account, user }) {
      if (account?.type === 'credentials') {
        return false; // at the moment, we don't want to allow credentials login
      }

      if (account?.provider === 'google') {
        const authenticatedUser = await userService.authenticateGoogle(
          user?.email
        );
        return authenticatedUser ? true : false;
      }

      return false;
    },
    async session({ session, token, user }) {
      session.user.userId = token.userId;
      return session;
    },
  },
  pages: { signIn: '/signin' },
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    // OAuth authentication providers...
    GoogleProvider({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string,
      authorization: {
        params: {
          prompt: 'consent',
          access_type: 'offline',
          response_type: 'code',
        },
      },
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: 'Username', type: 'text', placeholder: 'username' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials, req) {
        const { username, password } = credentials as {
          username: string;
          password: string;
        };

        return userService.authenticate(username, password);
      },
    }),
  ],
};

export const getServerAuthSession = () => getServerSession(authOptions);
