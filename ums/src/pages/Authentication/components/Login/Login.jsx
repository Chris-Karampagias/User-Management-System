import {
  Button,
  Paper,
  Stack,
  Typography,
  CircularProgress,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { object, string, boolean } from "yup";
import { ControlledTextField } from "../../../../components";
import { ControlledCheckbox } from "../../../../components";
import { useUser } from "../../../../queries/useUser";
import { routesConfig } from "../../../../app";
import { useUserTools } from "../../../../hooks";
import { useIsPasswordSafe } from "../../../../hooks";

const schema = object({
  username: string().required("Username is required"),
  password: string().min(6).required("Password is required"),
  loggedIn: boolean().required(),
});

const defaultValues = {
      username: "",
      password: "",
      loggedIn: false,
    }

export function Login() {
  const { setUser, setUserLoggedInPreference } = useUserTools();
  const isPasswordSafe = useIsPasswordSafe();

  const navigate = useNavigate();
  const { handleSubmit, control, watch } = useForm({
    resolver: yupResolver(schema),
    defaultValues,
  });
  const [username, password, loggedIn] = watch(["username", "password", "loggedIn"])
  const isButtonDisabled = !username || !password;

  const { user, userIsFetching, userIsFetched, userRefetch } = useUser();

  const onSubmit = (data) => {
    userRefetch(data.username, data.password);
  };

  useEffect(() => {
    if (user) {
      setUser(user);
      setUserLoggedInPreference(loggedIn);
      if (user.isPasswordSafe) {
        navigate(routesConfig.home.browserRouter.path);
      } else {
        navigate(routesConfig.changePassword.browserRouter.path);
      }
    }
  }, [
    isPasswordSafe,
    loggedIn,
    navigate,
    setUser,
    setUserLoggedInPreference,
    user,
  ]);

  return (
    <Paper elevation={2} sx={{ padding: "20px 0px" }}>
      <form
        onSubmit={(e) => {
          handleSubmit(onSubmit)(e);
        }}
      >
        <Stack alignItems={"center"} spacing={2}>
          <Typography variant="h2" fontSize={30}>
            Login
          </Typography>
          <ControlledTextField
            label="Username"
            control={control}
            name="username"
          />
          <ControlledTextField
            label="Password"
            control={control}
            name="password"
            type="password"
          />
          <ControlledCheckbox
            label="Keep me logged in"
            control={control}
            name="loggedIn"
          />
          <Stack direction={"row"}>
            {userIsFetching && <CircularProgress />}
            <Button
              variant="contained"
              type="submit"
              disabled={isButtonDisabled || userIsFetching}
            >
              Log In
            </Button>
          </Stack>
          {!user && userIsFetched && (
            <Typography color={"error"}>
              Invalid Username or Password
            </Typography>
          )}
        </Stack>
      </form>
    </Paper>
  );
}
