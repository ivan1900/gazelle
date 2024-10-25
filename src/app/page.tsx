import { Alert, Button, Stack, Typography } from '@mui/material';
import { headers } from 'next/headers';

export default function Home() {
  const csrfToken = headers().get('X-CSRF-Token') || 'missing';

  return (
    <main>
      <Stack>
        <Typography> Prueba de texto</Typography>
        <Typography color={'text.primary'}> Prueba de texto</Typography>
        <Typography color={'text.secondary'}> Prueba de texto</Typography>
        <Typography color={'error'}> Prueba de texto</Typography>
        <Typography color={'warning'}> Prueba de texto</Typography>

        <Alert severity='error'>This is an error alert — check it out!</Alert>
        <Alert severity='warning'>
          This is a warning alert — check it out!
        </Alert>
        <Alert severity='info'>This is an info alert — check it out!</Alert>
        <Alert severity='success'>
          This is a success alert — check it out!
        </Alert>
        <Button variant='contained' color='error'>
          Click me!
        </Button>
        <Button variant='contained' color='warning'>
          Click me!
        </Button>
        <Button variant='contained' color='primary'>
          Click me!
        </Button>
        <Button variant='contained' color='secondary'>
          Click me!
        </Button>
      </Stack>
    </main>
  );
}
