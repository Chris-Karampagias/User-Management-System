import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  Button,
  Paper,
  Stack,
  Typography,
  CircularProgress,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useSelector } from "react-redux";
import { userSelector } from "../../models/user/selectors";
import { object, string, ref } from "yup";
import { ControlledTextField } from "../../components";
import { useUser } from "../../queries/useUser";
import { useUserTools } from "../../hooks";

const createValidationSchema = (oldPassword) => {
  return object({
    oldPassword: string()
      .oneOf([oldPassword, null], "Incorrect old password")
      .required("Old Password is required"),
    newPassword: string()
      .min(6)
      .oneOf([ref("confirmNewPassword"), null], "Passwords do not match")
      .required("New Password is required"),
    confirmNewPassword: string()
      .oneOf([ref("newPassword"), null], "Passwords do not match")
      .required("You must confirm your password"),
  });
};

export function ChangePassword() {
  const [validationSchema, setValidationSchema] = useState(null);
  const { updatedUser, isUpdatingUser, updateUserFromData } = useUser();
  const navigate = useNavigate();
  const currentUser = useSelector(userSelector);
  const { setUser } = useUserTools();

  const { handleSubmit, control, watch } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      oldPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    },
  });

  useEffect(() => {
    const schema = createValidationSchema(currentUser.password);
    setValidationSchema(schema);
  }, [currentUser.password]);

  const watchedFields = watch([
    "oldPassword",
    "newPassword",
    "confirmNewPassword",
  ]);
  const isSubmitDisabled = watchedFields.some((field) => !field);

  const onSubmit = (data) => {
    const updatedUserInfo = {
      ...currentUser,
      password: data.newPassword,
      isPasswordSafe: true,
    };

    updateUserFromData(updatedUserInfo);
  };

  useEffect(() => {
    if (updatedUser) {
      setUser(updatedUser);
      return navigate(-1);
    }
  }, [navigate, setUser, updatedUser]);

  return (
    <Paper elevation={2} sx={{ padding: "20px 0px" }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack alignItems={"center"} spacing={2}>
          <Typography variant="h2" textAlign={"center"} fontSize={30}>
            Your account was created by an admin.
          </Typography>
          <Typography>
            Please update your password in order to use the app.
          </Typography>
          <ControlledTextField
            label="Old Password"
            control={control}
            name="oldPassword"
            type={"password"}
          />
          <Stack flexDirection={"row"} alignSelf={"center"} columnGap={10}>
            <ControlledTextField
              label="New Password"
              control={control}
              name="newPassword"
              type={"password"}
            />
            <ControlledTextField
              label="Confirm New Password"
              control={control}
              name="confirmNewPassword"
              type={"password"}
            />
          </Stack>
          <Stack direction={"row"} columnGap={3}>
            {isUpdatingUser && <CircularProgress />}
            <Button
              variant="contained"
              type="submit"
              disabled={isSubmitDisabled || isUpdatingUser}
            >
              Sign Up
            </Button>
          </Stack>
        </Stack>
      </form>
    </Paper>
  );
}
