import * as React from 'react';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

export default async function PrivateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession();

  if (!session) {
    redirect('/signin');
  }

  return <div>{children}</div>;
}
