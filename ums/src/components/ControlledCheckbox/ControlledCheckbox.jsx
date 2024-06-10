import { Controller } from "react-hook-form";
import { FormControlLabel, Checkbox } from "@mui/material";

export default function ControlledCheckbox({ name, control, label, disabled }) {
  return (
    <FormControlLabel
      control={
        <Controller
          name={name}
          control={control}
          render={({ field }) => (
            <Checkbox
              {...field}
              checked={field.value}
              disabled={disabled}
              onChange={(e) => field.onChange(e.target.checked)}
            />
          )}
        />
      }
      label={label}
    />
  );
}
