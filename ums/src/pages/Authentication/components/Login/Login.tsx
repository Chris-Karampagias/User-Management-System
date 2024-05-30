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
import {
  findUser,
  setLocalStorageKeepMeLoggedIn,
  setLocalStorageUser,
} from "../../../../utilities";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { update } from "../../../../app/store";
import { useNavigate } from "react-router-dom";
import { useUsers } from "../../../../queries/useUsers";
import { useUser } from "../../../../queries/useUser";
import { RoutesConfig } from "../../../../router";

const schema = object({
  username: string().required("Username is required"),
  password: string().min(6).required("Password is required"),
  loggedIn: boolean().required(),
});

export function Login() {
  const { users } = useUsers();
  const [userId, setUserId] = useState<string | null>(null);
  const [validationError, setValidationError] = useState(false);
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

const { user } = useUser(userId);

  const onSubmit = async (data: ILoginForm) => {
    const { user } = findUser(users, data.username);

    if (!user || user.password !== data.password) {
      setValidationError(true);
    } else {
      setUserId(user.id);
      setValidationError(false);
      setLocalStorageKeepMeLoggedIn(data.loggedIn);
    }
  };

  useEffect(() => {
    if (user) {
      dispatch(update(user));
      setLocalStorageUser(user);
      navigate(RoutesConfig.home.browserRouter.path);
    }
  }, [user, dispatch, navigate]);

  return (
    <Paper elevation={2} sx={{ padding: "20px 0px" }}>
      <form onSubmit={handleSubmit(onSubmit)}>
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
          />
          <ControlledCheckbox
            label="Keep me logged in"
            control={control}
            name="loggedIn"
          />
          <Stack direction={"row"}>
            {user?.isLoading && <CircularProgress />}
            <Button
              variant="contained"
              type="submit"
              disabled={isButtonDisabled || user?.isLoading}
            >
              Log In
            </Button>
          </Stack>
          {validationError && (
            <Typography color={"error"}>
              Invalid Username or Password
            </Typography>
          )}
        </Stack>
      </form>
    </Paper>
  );
}
