import z from "zod";

const usernameValidate = z
  .string()
  .min(6, { message: "Username must be at least 6 char longs" })
  .max(20, { message: "Username cannot exceed 20 characters" })
  .regex(
    /^[a-z0-9]{6,20}$/,
    "Username must not contain special characters or uppercase letters",
  );

const emailValidate = z.email({ message: "Invalid Email" });

const passwordValidate = z
  .string()
  .min(8, { message: "Password should have minimum length of 8" })
  .max(15, "Password is too long")
  .regex(/^(?=.*[A-Z]).{8,}$/, {
    message:
      "Should Contain at least one uppercase letter and have a minimum length of 8 characters.",
  });

export const SignupSchema = z.object({
  username: usernameValidate,
  email: emailValidate,
  password: passwordValidate,
  avatar: z.string().optional(),
});

export const SigninSchema = z.object({
  username: usernameValidate.optional(),
  email: emailValidate.optional(),
  password: passwordValidate,
});

export const roomSchema = z.object({
  RoomName: z
    .string()
    .min(6)
    .max(30)
    .regex(
      /^[a-z0-9]{6,30}$/,
      "RoomName must not contain special characters or uppercase letters",
    ),
});
