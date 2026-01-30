import { z } from "zod";

// Common reusable validators
const emailSchema = z
  .string()
  .min(1, "Email required")
  .email("Valid email enter karo");

const passwordSchema = z
  .string()
  .min(6, "Password kam se kam 6 characters hona chahiye");

const nameSchema = z
  .string()
  .min(2, "Name kam se kam 2 characters hona chahiye")
  .max(100, "Name zyada lamba mat likho");

// Login form: email + password
export const loginSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

// Sign Up form: name + email + password
export const signUpSchema = z.object({
  name: nameSchema,
  email: emailSchema,
  password: passwordSchema,
});

// Reset password – email step
export const resetEmailSchema = z.object({
  email: emailSchema,
});

// Reset password – OTP (6 digits)
export const resetOtpSchema = z.object({
  otp: z
    .string()
    .length(6, "OTP exactly 6 digits hona chahiye")
    .regex(/^\d{6}$/, "Sirf numbers daalo"),
});

// Reset password – new password
export const resetNewPasswordSchema = z.object({
  newPassword: passwordSchema,
});

// Verify email OTP
export const verifyOtpSchema = z.object({
  otp: z
    .string()
    .length(6, "OTP exactly 6 digits hona chahiye")
    .regex(/^\d{6}$/, "Sirf numbers daalo"),
});

/**
 * Validate data against a schema. Returns { success: true, data } or { success: false, errors: { field: message } }
 */
export function validate(schema, data) {
  const result = schema.safeParse(data);
  if (result.success) {
    return { success: true, data: result.data };
  }
  const errors = {};
  result.error.errors.forEach((err) => {
    const path = err.path.join(".");
    if (!errors[path]) errors[path] = err.message;
  });
  return { success: false, errors };
}
