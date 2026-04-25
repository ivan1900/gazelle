import * as React from 'react';
import { auth } from '@/app/server/auth/auth';
import { redirect } from 'next/navigation';

export default async function PrivateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session) {
    redirect('/signin');
  }

  return <div>{children}</div>;
}
