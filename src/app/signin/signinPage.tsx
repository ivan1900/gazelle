import { Button, Card, Container, Stack, Typography } from '@mui/material';
import Signin from '../components/signin';

export default function signinPage() {
  return (
    <Container maxWidth='sm'>
      <Stack spacing={10}>
        <Card>
          <Typography variant='h4' align='center'>
            Mindheins
          </Typography>
        </Card>
        <Signin />
      </Stack>
    </Container>
  );
}
