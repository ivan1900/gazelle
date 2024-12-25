import { getServerSession, type NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import { accountServiceAuth } from '@/Contexts/Account/application/AccountServiceAuth';
import getAccountByEmail from '@server/actions/account/getAccountByEmail';

export const authOptions: NextAuthOptions = {
  session: { strategy: 'jwt' },
  callbacks: {
    async jwt({ token, account, user }) {
      if (account && account.type === 'credentials') {
        // token.userId = account.userId;
      }
      if (account && account.provider === 'google') {
        const meUser = await getAccountByEmail(user.email as string);
        token.accountId = meUser?.id || 0;
      }
      return token;
    },
    async signIn({ account, user }) {
      if (account?.type === 'credentials') {
        return false; // at the moment, we don't want to allow credentials login
      }

      if (account?.provider === 'google') {
        const authenticatedUser = await accountServiceAuth.authenticateGoogle(
          user?.email
        );
        return authenticatedUser ? true : false;
      }

      return false;
    },
    async session({ session, token }) {
      session.user.accountId = token.accountId;
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

        return accountServiceAuth.authenticate(username, password);
      },
    }),
  ],
};

export const getServerAuthSession = () => getServerSession(authOptions);
