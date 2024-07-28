import { useParams } from "react-router-dom";
import {
  Button,
  Paper,
  Stack,
  Typography,
  CircularProgress,
} from "@mui/material";
import { object, string, number } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useUser } from "../../queries/useUser";
import { useDeleteUser } from "../../queries/useDeleteUser";
import { useAdminEditUser } from "../../queries/useAdminEditUser";
import { ControlledDropdown, ControlledTextField } from "../../components";

const validationSchema = object({
  username: string().required("Username is required"),
  password: string().min(6).required("Password is required"),
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
  role: string().required("User role is required"),
});

const ROLE_OPTIONS = [
  { value: "regular", label: "Regular" },
  { value: "admin", label: "Administrator" },
];

const initialValues = {
  username: "",
  fullName: "",
  age: "",
  role: "",
  password: "",
};

export function UserDetails() {
  const { userId } = useParams();
  const { user, isFetchingUser, userFetchError } = useUser(userId);

  // eslint-disable-next-line no-unused-vars
  const { isPasswordSafe, id, age, ...formDefaultValues } = user;
  const valuesFromAPI = { age: age?.toString(), ...formDefaultValues };

  const { editUser, isUpdatingUser, userUpdateFailed } = useAdminEditUser();

  const { deleteUser, isDeletingUser, userDeletionErrorOccured } =
    useDeleteUser();

  const {
    handleSubmit,
    control,
    formState: { isDirty },
    watch,
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: initialValues,
    values: valuesFromAPI,
  });

  const onSubmit = (data) => {
    // eslint-disable-next-line no-unused-vars
    const isPasswordSafe =
      user.isPasswordSafe && data.password === user.password;
    const apiUserData = { id, isPasswordSafe, ...data };
    editUser(apiUserData).then();
  };

  const watchedFields = watch(["fullName", "password", "age"]);
  const isSaveDisabled = watchedFields.some((field) => !field);

  return (
    <Paper elevation={2} sx={{ padding: "20px 10px" }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack direction={"column"} gap={4}>
          <Typography alignSelf={"center"} variant="h1" fontSize={30}>
            User Details
          </Typography>
          {isFetchingUser ? (
            <CircularProgress sx={{ alignSelf: "center" }} size={60} />
          ) : (
            <>
              {userFetchError ? (
                <Typography textAlign="center" fontSize={20} color="error">
                  Unable to retrieve user data. Please try again later.
                </Typography>
              ) : (
                <>
                  <Stack direction={"column"} alignItems={"start"} gap={3}>
                    <ControlledTextField
                      label="Username"
                      control={control}
                      name="username"
                      disabled={true}
                    />
                    <ControlledTextField
                      label="Full name"
                      control={control}
                      name="fullName"
                      disabled={isUpdatingUser}
                    />
                    <ControlledTextField
                      label="Password"
                      control={control}
                      name="password"
                      type={"password"}
                      disabled={isUpdatingUser}
                    />
                    <ControlledTextField
                      label="Age"
                      control={control}
                      name="age"
                      type="number"
                      disabled={isUpdatingUser}
                    />
                    <ControlledDropdown
                      label="User Role"
                      control={control}
                      name="role"
                      options={ROLE_OPTIONS}
                      disabled={isUpdatingUser}
                    />
                  </Stack>
                  <Stack direction="row" justifyContent="space-between">
                    <Stack direction={"row"} gap={1} alignItems="center">
                      {isUpdatingUser && <CircularProgress size={20} />}
                      <Button
                        variant="contained"
                        color="success"
                        type="submit"
                        disabled={
                          !isDirty ||
                          isUpdatingUser ||
                          isSaveDisabled ||
                          isDeletingUser
                        }
                      >
                        Save
                      </Button>
                    </Stack>
                    <Stack direction={"row"} alignItems="center" gap={1}>
                      {isDeletingUser && <CircularProgress size={20} />}
                      <Button
                        variant="contained"
                        color="error"
                        type="button"
                        onClick={() => deleteUser(user?.id)}
                        disabled={isDeletingUser || isUpdatingUser}
                      >
                        Delete
                      </Button>
                    </Stack>
                  </Stack>
                </>
              )}
            </>
          )}
          {userDeletionErrorOccured ||
            (userUpdateFailed && (
              <Typography textAlign="center" fontSize={20} color="error">
                An error occured during the operation
              </Typography>
            ))}
        </Stack>
      </form>
    </Paper>
  );
}
