import { TextField } from "@mui/material";
import { Controller } from "react-hook-form";
import { IControlledTextInput } from "../../api/types";

export default function ControlledTextField({
  name,
  control,
  label,
  type = 'text'
}: IControlledTextInput) {
  return (
    <Controller
      name={name as "username" | "password"}
      control={control}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <TextField
          helperText={error ? error.message : null}
          error={!!error}
          onChange={onChange}
          value={value}
          label={label}
          required
          variant="standard"
          type={type}
        />
      )}
    />
  );
}
