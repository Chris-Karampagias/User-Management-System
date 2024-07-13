import {
  Paper,
  Stack,
  Typography,
  Button,
  CircularProgress,
} from "@mui/material";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { object, string, number, ref } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { userSelector } from "../../models/user/selectors";
import { ControlledTextField } from "../../components";
import { useEditUser } from "../../queries/useEditUser";

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
    .transform((value) => parseInt(value))
    .typeError("Please input a positive integer")
    .positive("Age must be a positive number")
    .min(18, "You must be atleast 18 years old")
    .required("Age is required"),
});

export function Homepage() {
  const user = useSelector(userSelector);
  const [isEditing, setIsEditing] = useState(false);
  const { isPasswordSafe, id, age, ...formDefaultValues } = user;
  const { editUser, isLoadingEditUser } = useEditUser();
  const {
    handleSubmit,
    control,
    reset: resetForm,
    formState: { isDirty },
    setValue,
    watch,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      confirmPassword: "",
      age: age.toString(),
      ...formDefaultValues,
    },
  });

  useEffect(() => {
    setValue('username', user.username);
    setValue('fullName', user.fullName);
    setValue('password', user.password);
    setValue('confirmPassword', '');
    setValue('age', user.age);
    setValue('role', user.role);
  }, [setValue, user]);

  const watchedFields = watch([
    "fullName",
    "password",
    "confirmPassword",
    "age",
  ]);
  const isSaveDisabled = watchedFields.some((field) => !field);

  const onSubmit = (data) => {
    // eslint-disable-next-line no-unused-vars
    const { confirmPassword, ...apiUserDataChunk } = data;
    const apiUserData = { id, isPasswordSafe, ...apiUserDataChunk };
    editUser(apiUserData);
  };

  return (
    <Paper elevation={2} sx={{ padding: "20px 10px" }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack direction={"column"} gap={2}>
          <Typography alignSelf={"center"} variant="h1" fontSize={30}>
            Home
          </Typography>
          <Stack direction={"column"} alignItems={"start"} gap={3}>
            <Typography variant="h2" fontSize={20}>
              Your Info
            </Typography>
            <ControlledTextField
              label=""
              control={control}
              name="username"
              disabled={true}
            />
            <ControlledTextField
              label={isEditing ? "Full name" : ""}
              control={control}
              name="fullName"
              disabled={!isEditing}
            />
            <Stack direction={"row"} justifyContent={"space-between"} gap={4}>
              <ControlledTextField
                label={isEditing ? "Password" : ""}
                control={control}
                name="password"
                type={"password"}
                disabled={!isEditing}
              />
              {isEditing && (
                <ControlledTextField
                  label="Confirm Password"
                  control={control}
                  name="confirmPassword"
                  type="password"
                />
              )}
            </Stack>
            <ControlledTextField
              label={isEditing ? "Age" : ""}
              control={control}
              name="age"
              type="number"
              disabled={!isEditing}
            />
            <ControlledTextField
              label=""
              name="role"
              control={control}
              disabled={true}
            />
          </Stack>
          {isEditing && (
            <Stack direction="row" justifyContent="space-between">
              <Stack direction={"row"} gap={1}>
                {isLoadingEditUser && <CircularProgress />}
                <Button
                  variant="contained"
                  color="success"
                  type="submit"
                  disabled={!isDirty || isLoadingEditUser || isSaveDisabled}
                >
                  Save
                </Button>
              </Stack>
              <Button
                color="error"
                variant="contained"
                onClick={() => {
                  resetForm();
                  setIsEditing(false);
                }}
                disabled={isLoadingEditUser}
              >
                Cancel
              </Button>
            </Stack>
          )}
          {!isEditing && (
            <Button
              sx={{ width: "fit-content", alignSelf: "end" }}
              variant="contained"
              onClick={() => setIsEditing(true)}
            >
              Edit Info
            </Button>
          )}
        </Stack>
      </form>
    </Paper>
  );
}
