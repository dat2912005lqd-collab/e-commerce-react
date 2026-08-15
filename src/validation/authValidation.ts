import {
  isRequired,isEmail,minLength,
} from "../utils/validators";
export interface LoginFormData {
  username: string;
  password: string;
}
export interface RegisterFormData {
  name: string;
  email: string;
  password: string;
  avatar?: string;
}
export function validateLogin(
  data: LoginFormData
): Record<string, string> {
  const errors: Record<string, string> = {};
  const usernameError = isRequired(
    data.username,"Tên đăng nhập");
  const passwordError = isRequired(
    data.password,"Mật khẩu");
  if (usernameError) {
    errors.username = usernameError;
  }
  if (passwordError) {
    errors.password = passwordError;
  }
  return errors;
}
export function validateRegister(
  data: RegisterFormData
): Record<string, string> {
  const errors: Record<string, string> = {};
  const nameError = isRequired(
    data.name,"Họ tên");
  const emailRequired = isRequired(
    data.email,"Email");
  const emailError = isEmail(data.email);
  const passwordRequired = isRequired(
    data.password,
    "Mật khẩu"
  );
  const passwordLength = minLength(
    data.password, 6, "Mật khẩu");
  if (nameError) {
    errors.name = nameError;
  }
  if (emailRequired) {
    errors.email = emailRequired;
  } else if (emailError) {
    errors.email = emailError;
  }
  if (passwordRequired) {
    errors.password = passwordRequired;
  } else if (passwordLength) {
    errors.password = passwordLength;
  }
  return errors;
}