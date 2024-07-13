import { Stack, Divider } from '@mui/material';
import { Login, SignUp } from './components';

export function Authentication() {
  return (
    <Stack gap={10}>
      <Login />
      <Divider component="h3" sx={{ opacity: 0.6 }}>
        or
      </Divider>
      <SignUp isForMyself={true}/>
    </Stack>
  );
}
