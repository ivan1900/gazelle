'use client';

import { Button, Card, Stack } from '@mui/material';
import { signIn } from 'next-auth/react';
import GoogleIcon from '@mui/icons-material/Google';

export default function Signin() {
  const handleGoogleSignIn = async () => {
    signIn('google', { callbackUrl: '/dashboard/home' });
  };

  return (
    <Stack>
      <Card>
        <Button
          variant='outlined'
          startIcon={<GoogleIcon />}
          onClick={handleGoogleSignIn}
          fullWidth>
          Continua con Google
        </Button>
      </Card>
    </Stack>
  );
}
