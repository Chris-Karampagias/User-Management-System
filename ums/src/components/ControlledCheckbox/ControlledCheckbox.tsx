import { Controller } from "react-hook-form";
import { FormControlLabel, Checkbox } from "@mui/material";
import { IControlledCheckbox } from "../../api/types";

export default function ControlledCheckbox({
  name,
  control,
  label,
}: IControlledCheckbox) {
  return (
    <FormControlLabel
      control={
        <Controller
          name={name}
          control={control}
          render={({ field }) => <Checkbox />}
        />
      }
      label={label}
    />
  );
}
