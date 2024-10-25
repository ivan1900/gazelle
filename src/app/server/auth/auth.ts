import { getServerSession, type NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import { userService } from '@/app/server/account/application/userService';

export const authOptions: NextAuthOptions = {
  session: { strategy: 'jwt' },
  callbacks: {
    async jwt({ token, account, profile }) {
      if (account && account.type === 'credentials') {
        token.userId = account.providerAccountId;
      }
      return token;
    },
    async signIn({ account, user }) {
      console.log(account);

      if (account?.type === 'credentials') {
        return false; // at the moment, we don't want to allow credentials login
      }

      if (account?.provider === 'google') {
        const authenticatedUser = await userService.authenticateGoogle(
          user?.email
        );
        return authenticatedUser ? true : false;
      }

      console.log('signIn', account, user);
      return false;
    },
    async session({ session, token, user }) {
      session.user.id = token.userId;
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

        return userService.authenticate(username, password); //(5)
      },
    }),
  ],
};

export const getServerAuthSession = () => getServerSession(authOptions);
