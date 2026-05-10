import { redirect } from 'next/navigation';
import { linkTo } from './linkTo';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export default async function isUserAuth() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect(linkTo.LOGIN);
  }
  return session;
}
