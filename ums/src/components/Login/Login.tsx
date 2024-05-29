import {
  Button,
  Paper,
  Stack,
  Typography,
  CircularProgress,
} from "@mui/material";
import { ILoginForm, IuserData } from "../../api/types";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import getUser from "../../api/getUser";
import { object, string, boolean } from "yup";
import ControlledTextField from "../ControlledTextField";
import ControlledCheckbox from "../ControlledCheckbox";
import {
  findUser,
  setLocalStorageKeepMeLoggedIn,
  setLocalStorageUser,
} from "../../utilities";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { update } from "../../app/store";
import { useNavigate } from "react-router-dom";

const schema = object({
  username: string().required("Username is required"),
  password: string().min(6).required("Password is required"),
  loggedIn: boolean().required(),
});

export default function Login({ users }: { users: IuserData[] }) {
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

  const user = useQuery({
    queryKey: ["user", userId],
    queryFn: () => getUser(userId),
    enabled: !!userId,
  });

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
    if (user.data) {
      dispatch(update(user.data));
      setLocalStorageUser(user.data);
      navigate("/home");
    }
  }, [user.data, dispatch, navigate]);

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
