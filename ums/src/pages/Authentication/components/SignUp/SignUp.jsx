import {
  Button,
  Paper,
  Stack,
  Typography,
  CircularProgress,
} from "@mui/material";
import { useState, useMemo } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { v4 as uuid } from "uuid";
import { object, string, boolean, number, ref } from "yup";
import { ControlledCheckbox } from "../../../../components/ControlledCheckbox";
import { ControlledTextField } from "../../../../components";
import { ControlledDropdown } from "../../../../components";
import { useSelector } from "react-redux";
import { isUserAdminSelector } from "../../../../models/user/selectors";
import { useSignUp } from "../../../../queries/useSignUp";

const generateSignUpValidationSchema = (isUserAdmin) => {
  return isUserAdmin
    ? object({
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
        role: string().required("User role is required"),
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
      })
    : object({
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
};

const generateFormDefaultValues = (isUserAdmin) => {
  return isUserAdmin
    ? {
        username: "",
        password: "",
        confirmPassword: "",
        fullName: "",
        age: "",
        loggedIn: false,
        role: "",
      }
    : {
        username: "",
        password: "",
        confirmPassword: "",
        fullName: "",
        age: "",
        loggedIn: false,
      };
};

const ROLE_OPTIONS = [
  { value: "regular", label: "Regular" },
  { value: "admin", label: "Administrator" },
];

// eslint-disable-next-line react/prop-types
export function SignUp({ isForMyself }) {
  const isUserAdmin = useSelector(isUserAdminSelector);
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
  const [userCreationError, setUserCreationError] = useState("");
  const { signUpUser, isLoadingSignUp } = useSignUp(
    isForMyself,
    setUserCreationError
  );

  const validationSchema = useMemo(
    () => generateSignUpValidationSchema(isUserAdmin),
    [isUserAdmin]
  );
  const formDefaultValues = useMemo(
    () => generateFormDefaultValues(isUserAdmin),
    [isUserAdmin]
  );

  const { handleSubmit, control, watch } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: formDefaultValues,
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
    const newUser = {
      ...userInfo,
      id: uuid(),
      username: data.username,
      password: data.password,
      fullName: data.fullName,
      loggedIn: data.loggedIn,
      role: data.role ?? "regular",
      age: data.age,
      isPasswordSafe: !isUserAdmin,
    };

    setUserInfo(newUser);
    signUpUser(newUser).then();
  };

  return (
    <Paper elevation={2} sx={{ padding: "20px 0px" }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack alignItems={"center"} spacing={2}>
          {!isUserAdmin ? (
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
            disabled={isUserAdmin}
          />
          {isUserAdmin && (
            <ControlledDropdown
              name="role"
              control={control}
              label="User Role"
              options={ROLE_OPTIONS}
            />
          )}

          <Stack direction={"row"} columnGap={3}>
            {isLoadingSignUp && <CircularProgress />}
            <Button
              variant="contained"
              type="submit"
              disabled={isSubmitDisabled || isLoadingSignUp}
            >
              Sign Up
            </Button>
          </Stack>
          {!!userCreationError && (
            <Typography color={"error"}>{userCreationError}</Typography>
          )}
        </Stack>
      </form>
    </Paper>
  );
}
