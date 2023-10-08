import * as Yup from "yup";

export const LoginSchema = Yup.object({
  username: Yup.string()
    .matches(/^[a-zA-Z0-9\s]+$/, {
      message: "Username can only contain letters, numbers, and spaces",
      excludeEmptyString: true,
    })
    .min(2, "Username must be at least 2 characters")
    .max(15, "Username can't be longer than 15 characters")
    .required("Please enter a username"),

  email: Yup.string()
    .email("Invalid email format")
    .required("Please enter an email address"),
    
  password: Yup.string()
    .matches(
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[A-Za-z\d@]{1,8}$/,
      "Password must contain at least 1 uppercase letter, 1 lowercase letter, 1 digit and can contain special character @"
    )
    .max(8, "Password can't be longer than 8 characters")
    .required("Please enter a password")
});
