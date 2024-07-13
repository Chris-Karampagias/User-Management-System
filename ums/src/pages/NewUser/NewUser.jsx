import { Stack } from '@mui/material';
import { SignUp } from '../Authentication/components';

export function NewUser() {
  return (
    <Stack gap={10}>
      <SignUp isForMyself={false}/>
    </Stack>
  );
}
