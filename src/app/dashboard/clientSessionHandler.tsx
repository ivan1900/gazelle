'use client';

import React from 'react';
import { useSession } from 'next-auth/react';

const ClientSessionHandler: React.FC = ({ children }) => {
  const { data: session } = useSession();

  // Aquí puedes manejar la sesión como desees
  console.log(session);

  return <>{children}</>;
};

export default ClientSessionHandler;
