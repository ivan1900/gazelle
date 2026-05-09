import { redirect } from 'next/navigation';
import { linkTo } from './linkTo';
import { getServerSession } from 'next-auth';

export default async function isUserAuth() {
  const session = await getServerSession();
  if (!session) {
    redirect(linkTo.LOGIN);
  }
  return session;
}
