/* eslint-disable react/prop-types */
import {
  Input,
  InputAdornment,
  IconButton,
  FormControl,
  FormHelperText,
  InputLabel,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Controller } from "react-hook-form";
import { useState } from "react";

export function ControlledTextField({
  name = "",
  control,
  label,
  type = "text",
  disabled = false,
}) {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value }, fieldState: { error } }) =>
        type === "password" ? (
          <FormControl size="small">
            <InputLabel sx={{ marginLeft: "-14px" }}>{label}</InputLabel>
            <Input
              type={showPassword ? "text" : "password"}
              error={!!error}
              fullWidth
              onChange={onChange}
              value={value}
              required
              disabled={disabled}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton onClick={handleClickShowPassword} edge="end">
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
            />
            <FormHelperText error={!!error}>
              {error ? error.message : null}
            </FormHelperText>
          </FormControl>
        ) : (
          <FormControl size="small">
            <InputLabel sx={{ marginLeft: "-14px" }}>{label}</InputLabel>
            <Input
              sx={{ minWidth: "243px", boxSizing: "border-box" }}
              error={!!error}
              onChange={onChange}
              value={value}
              required
              variant="standard"
              type={type}
              disabled={disabled}
            />
            <FormHelperText error={!!error}>
              {error ? error.message : null}
            </FormHelperText>
          </FormControl>
        )
      }
    />
  );
}
