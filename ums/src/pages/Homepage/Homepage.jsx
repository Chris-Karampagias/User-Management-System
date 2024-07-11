import { Paper, Stack, Typography, Button } from "@mui/material";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { object, string, number, ref } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { userSelector } from "../../models/user/selectors";
import { ControlledTextField } from "../../components";
import { useUser } from "../../queries/useUser";

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
    .min(18, "You must be atleast 18 years old")
    .required("Age is required"),
});

export function Homepage() {
  const user = useSelector(userSelector);
  const { isPasswordSafe, id, ...formDefaultValues } = user;
  const { handleSubmit, control, watch } = useForm({
    resolver: yupResolver(schema),
    defaultValues: formDefaultValues,
  });
  return (
    <Paper elevation={2} sx={{ padding: "20px 0px" }}>
      <form>
        <Stack>
          <Typography variant="h1" fontSize={30}>
            Home
          </Typography>
        </Stack>
      </form>
    </Paper>
  );
}
