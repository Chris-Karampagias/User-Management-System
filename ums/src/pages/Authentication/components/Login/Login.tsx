import {
  Button,
  Paper,
  Stack,
  Typography,
  CircularProgress,
} from "@mui/material";
import { ILoginForm } from "../../../../api/types";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { object, string, boolean } from "yup";
import ControlledTextField from "../../../../components/ControlledTextField";
import ControlledCheckbox from "../../../../components/ControlledCheckbox";
import { setLocalStorageKeepMeLoggedIn, setLocalStorageUser } from "../../../../utilities";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { updateUser } from "../../../../app/store/slices/userSlice";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../../../queries/useUser";
import { routesConfig } from "../../../../app";

const schema = object({
  username: string().required("Username is required"),
  password: string().min(6).required("Password is required"),
  loggedIn: boolean().required(),
});

export function Login() {
  const [loginDetails, setLoginDetails] = useState({
    username: "",
    password: "",
    keepMeLoggedIn: false,
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { handleSubmit, control, watch } = useForm<ILoginForm>({
    resolver: yupResolver(schema),
    defaultValues: {
      username: "",
      password: "",
      loggedIn: false,
    },
  });
  const usernameAndPasswordValues = watch(["username", "password"]);
  const isButtonDisabled = usernameAndPasswordValues.some((value) => !value);

  const { user, userIsError, userIsFetching, userIsFetched, userRefetch } = useUser();

  const onSubmit = async (data: ILoginForm) => {
    setLoginDetails({
      username: data.username,
      password: data.password,
      keepMeLoggedIn: data.loggedIn,
    });

    userRefetch(data.username, data.password);
  };


  useEffect(() => {
    if (user) {
      setLocalStorageUser(user);
      dispatch(updateUser(user));
      setLocalStorageKeepMeLoggedIn(loginDetails.keepMeLoggedIn);
      navigate(routesConfig.home.browserRouter.path);
    }
  }, [user, dispatch, navigate, loginDetails.keepMeLoggedIn, userIsError]);

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
          {userIsError && userIsFetched && (
            <Typography color={"error"}>
              Invalid Username or Password
            </Typography>
          )}
        </Stack>
      </form>
    </Paper>
  );
}
