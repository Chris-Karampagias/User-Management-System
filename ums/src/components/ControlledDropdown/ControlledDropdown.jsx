import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { Controller } from "react-hook-form";

export function ControlledDropdown({ name, control, label, options }) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value } }) => {
        return (
          <FormControl
            sx={{
              m: 1,
              minWidth: 120,
            }}
            size="small"
          >
            <InputLabel>{label}</InputLabel>
            <Select onChange={onChange} value={value} label={label}>
              {options.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        );
      }}
    />
  );
}
