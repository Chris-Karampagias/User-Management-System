import {
  Button,
  Paper,
  Stack,
  Typography,
  CircularProgress,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import { v4 as uuid } from "uuid";
import { object, string, boolean, number, ref } from "yup";
import { ControlledCheckbox } from "../../../../components/ControlledCheckbox";
import { ControlledTextField } from "../../../../components";
import { useUserTools } from "../../../../hooks";
import { useUser } from "../../../../queries/useUser";
import { routesConfig } from "../../../../app";

const schema = object({
  username: string().required("Username is required"),
  password: string()
    .min(6)
    .oneOf([ref("confirmPassword"), null], "Passwords do not match")
    .required("Password is required"),
  confirmPassword: string()
    .min(6)
    .oneOf([ref("password"), null], "Passwords do not match")
    .required("Please confirm your password"),
  fullName: string().required("Full name is required"),
  age: number()
    .transform((value, originalValue) => {
      if (value === originalValue) {
        return 0;
      }
      return value;
    })
    .positive("Age must be a positive number")
    .min(18, "You must be atleast 18 years old to sign up")
    .required("Age is required"),
  loggedIn: boolean().required(),
});

export function SignUp() {
  const { setUser, setUserLoggedInPreference, isUserAdmin, isUserLoggedIn } =
    useUserTools();
  const {
    user,
    userIsFetching,
    userIsFetched,
    userRefetch,
    createUserFromData,
    isCreatingUser,
  } = useUser();
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({
    id: "",
    username: "",
    password: "",
    fullName: "",
    age: 0,
    isPasswordSafe: false,
    role: "regular",
    loggedIn: false,
  });
  const [userAlreadyExists, setUserAlreadyExists] = useState(false);

  const { handleSubmit, control, watch } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      username: "",
      password: "",
      confirmPassword: "",
      fullName: "",
      age: "",
      loggedIn: false,
    },
  });

  const watchedFields = watch([
    "username",
    "password",
    "confirmPassword",
    "fullName",
    "age",
  ]);
  const isSubmitDisabled = watchedFields.some((field) => !field);

  const onSubmit = (data) => {
    setUserInfo({
      ...userInfo,
      id: uuid(),
      username: data.username,
      password: data.password,
      fullName: data.fullName,
      loggedIn: data.loggedIn,
      age: data.age,
      isPasswordSafe: !isUserAdmin(),
    });
    userRefetch(data.username);
  };

  useEffect(() => {
    if (user) {
      setUserAlreadyExists(true);
      return;
    }
    if (userInfo.username && userIsFetched) {
      setUserAlreadyExists(false);
      const { loggedIn, ...apiUserInfo } = userInfo;
      createUserFromData(apiUserInfo);
      if (!isUserAdmin() || !isUserLoggedIn()) {
        setUser(apiUserInfo);
        setUserLoggedInPreference(loggedIn);
        navigate(routesConfig.changePassword.browserRouter.path);
      }
    }
  }, [
    createUserFromData,
    isUserAdmin,
    isUserLoggedIn,
    navigate,
    setUser,
    setUserLoggedInPreference,
    user,
    userInfo,
    userIsFetched,
  ]);

  return (
    <Paper elevation={2} sx={{ padding: "20px 0px" }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack alignItems={"center"} spacing={2}>
          {!isUserAdmin() ? (
            <Typography variant="h2" fontSize={30}>
              Sign Up
            </Typography>
          ) : (
            <Typography variant="h2" fontSize={30}>
              Add a User
            </Typography>
          )}

          <ControlledTextField
            label="Username"
            control={control}
            name="username"
          />
          <Stack flexDirection={"row"} alignSelf={"center"} columnGap={10}>
            <ControlledTextField
              label="Password"
              control={control}
              name="password"
              type={"password"}
            />
            <ControlledTextField
              label="Confirm Password"
              control={control}
              name="confirmPassword"
              type={"password"}
            />
          </Stack>
          <ControlledTextField
            label="Full Name"
            control={control}
            name="fullName"
          />
          <ControlledTextField
            label="Age"
            control={control}
            name="age"
            type={"number"}
          />
          <ControlledCheckbox
            label="Keep me logged in"
            control={control}
            name="loggedIn"
            disabled={isUserAdmin()}
          />
          <Stack direction={"row"} columnGap={3}>
            {userIsFetching && <CircularProgress />}
            <Button
              variant="contained"
              type="submit"
              disabled={isSubmitDisabled || userIsFetching || isCreatingUser}
            >
              Sign Up
            </Button>
          </Stack>
          {userAlreadyExists && userIsFetched && (
            <Typography color={"error"}>Username is taken</Typography>
          )}
        </Stack>
      </form>
    </Paper>
  );
}
