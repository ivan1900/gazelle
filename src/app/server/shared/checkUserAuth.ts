import { redirect } from 'next/navigation';
import { getServerAuthSession } from '../auth/auth';
import { linkTo } from './linkTo';

export default async function isUserAuth() {
  const session = await getServerAuthSession();
  if (!session) {
    redirect(linkTo.LOGIN);
  }
  return session;
}
