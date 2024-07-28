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
import { useEditUser } from "../../queries/useEditUser";
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
  const { user, isFetchingUser, userFetchError, userFetched } = useUser(userId);

  // eslint-disable-next-line no-unused-vars
  const { isPasswordSafe, id, age, ...formDefaultValues } = user;
  const valuesFromAPI = { age: age?.toString(), ...formDefaultValues };

  const { editUser, isLoadingEditUser, editUserRequestFinished } =
    useEditUser();

  const {
    deleteUser,
    isDeletingUser,
    userDeletionFinished,
    userDeletionErrorOccured,
  } = useDeleteUser();

  const {
    handleSubmit,
    control,
    reset: resetForm,
    formState: { isDirty },
    watch,
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: initialValues,
    values: valuesFromAPI,
  });

  const onSubmit = (data) => {
    // eslint-disable-next-line no-unused-vars
    const apiUserData = { id, isPasswordSafe: false, ...data };
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
              disabled={isLoadingEditUser}
            />
            <ControlledTextField
              label="Password"
              control={control}
              name="password"
              type={"password"}
              disabled={isLoadingEditUser}
            />
            <ControlledTextField
              label="Age"
              control={control}
              name="age"
              type="number"
              disabled={isLoadingEditUser}
            />
            <ControlledDropdown
              name="role"
              control={control}
              label="User Role"
              options={ROLE_OPTIONS}
              disabled={isLoadingEditUser}
            />
          </Stack>
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
              variant="contained"
              color="error"
              type="button"
              onClick={() => deleteUser(user?.id)}
            >
              Delete
            </Button>
          </Stack>
        </Stack>
      </form>
    </Paper>
  );
}
