import { Login, SignUp } from "./components";
import { Stack, Divider, Typography } from "@mui/material";
import { useUserTools } from "../../hooks";

export function Authentication() {
  const { isUserLoggedIn } = useUserTools();
  return (
    <Stack gap={10}>
      <Typography textAlign={"center"} variant="h2" fontSize={32}>
        Authentication
      </Typography>
      {!isUserLoggedIn() && (
        <>
          <Login />
          <Divider component={"h3"} sx={{ opacity: 0.6 }}>
            or
          </Divider>
        </>
      )}
      <SignUp />
    </Stack>
  );
}
