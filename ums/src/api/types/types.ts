import { Control } from "react-hook-form";

export interface IuserData {
  id: string;
  username: string;
  password: string;
  fullName?: string;
  age?: number;
  isPasswordSafe?: boolean;
  role?: "admin" | "regular";
}

export interface ILoginForm {
  username: string;
  password: string;
  loggedIn: boolean;
}

export interface IControlledTextInput {
  name: string;
  control: Control<ILoginForm>;
  label: string;
  type?: 'text' | 'password'
}

export interface IControlledCheckbox {
  name: string;
  control: Control<ILoginForm>;
  label: string;
}

export interface ILoginProps {
  users: IuserData[];
}
