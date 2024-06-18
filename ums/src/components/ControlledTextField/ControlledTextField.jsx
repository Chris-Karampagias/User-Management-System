import { TextField } from "@mui/material";
import { Controller } from "react-hook-form";

export function ControlledTextField({ name, control, label, type = "text" }) {
  return (
    <Controller
      name={name}
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
