import * as React from 'react';
import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';

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
