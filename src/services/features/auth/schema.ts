import { z } from "zod";
import { UserRole } from "@/services/shared";

export const LoginFormSchema = z.object({
  email: z.string().email({ message: "Format email tidak valid." }),
  password: z.string().min(6, { message: "Password minimal 6 karakter." }),
});

export type LoginFormData = z.infer<typeof LoginFormSchema>;

export const RegisterFormSchema = z.object({
  name: z.string().min(3, { message: "Nama lengkap minimal 3 karakter." }),
  email: z.string().email({ message: "Format email tidak valid." }),
  phone: z.string().min(10, { message: "Nomor telepon minimal 10 digit." }),
  password: z.string().min(6, { message: "Password minimal 6 karakter." }),
  role: z.enum([UserRole.VENDOR, UserRole.ORGANIZER], {
    required_error: "Silakan pilih peran Anda.",
  }),
});

export type RegisterFormData = z.infer<typeof RegisterFormSchema>;
