import {
  Button,
  Paper,
  Stack,
  Typography,
  CircularProgress,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { object, string, boolean } from "yup";
import { ControlledTextField } from "../../../../components";
import { ControlledCheckbox } from "../../../../components";
import { useLogin } from '../../../../queries/useLogin';
import { useSelector } from "react-redux";
import { userIdSelector } from "../../../../models/user/selectors";

const schema = object({
  username: string().required("Username is required"),
  password: string().min(6).required("Password is required"),
  loggedIn: boolean().required(),
});

const defaultValues = {
  username: "",
  password: "",
  loggedIn: false,
};

export function Login() {
  const { loginUser, isLoadingLogin, logInRequestFinished } = useLogin();
  const userId = useSelector(userIdSelector);

  const { handleSubmit, control, watch } = useForm({
    resolver: yupResolver(schema),
    defaultValues,
  });
  const [username, password, loggedIn] = watch([
    "username",
    "password",
    "loggedIn"
  ]);

  const isButtonDisabled = !username || !password;

  const onSubmit = (data) => {
    loginUser({username: data.username, password: data.password, keepMeLoggedIn: loggedIn});
  };

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
            {isLoadingLogin && <CircularProgress />}
            <Button
              variant="contained"
              type="submit"
              disabled={isButtonDisabled || isLoadingLogin}
            >
              Log In
            </Button>
          </Stack>
          {!userId && logInRequestFinished && (
            <Typography color={"error"}>
              Invalid Username or Password
            </Typography>
          )}
        </Stack>
      </form>
    </Paper>
  );
}
