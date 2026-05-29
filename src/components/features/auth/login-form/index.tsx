"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Field,
  FieldLabel,
  FieldError,
} from "@/components/ui/field";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { login, getMe, useAuthStore, LoginFormSchema, LoginFormData } from "@/services/features/auth";
import { UserRole } from "@/services/shared";
import Cookies from "js-cookie";

export function LoginForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const setAuth = useAuthStore((state) => state.setAuth);

  const form = useForm<LoginFormData>({
    resolver: zodResolver(LoginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: LoginFormData) => {
    try {
      setIsLoading(true);
      const res = await login(values);
      
      if (res.data) {
        const { accessToken, refreshToken } = res.data;
        
        // Set cookies manually first so getMe interceptor works
        Cookies.set("accessToken", accessToken);
        Cookies.set("refreshToken", refreshToken);
        
        const meRes = await getMe();
        const user = meRes.data;

        setAuth(accessToken, refreshToken, user);
        
        toast.success("Login berhasil", {
          description: `Selamat datang kembali, ${user.name}!`,
        });

        if (user.role === UserRole.ORGANIZER) {
          router.push("/dashboard/organizer");
        } else {
          router.push("/");
        }
      }
    } catch (error: any) {
      toast.error("Gagal login", {
        description: error?.response?.data?.message || "Email atau password salah.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto shadow-xl border-slate-100">
      <CardHeader className="space-y-1 text-center">
        <CardTitle className="text-2xl font-bold font-heading text-slate-900">Masuk ke Boothable</CardTitle>
        <CardDescription className="font-plus-jakarta text-slate-500">
          Masukkan email dan password Anda untuk melanjutkan
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 font-plus-jakarta">
          <Field>
            <FieldLabel className="text-slate-700">Email</FieldLabel>
            <Input placeholder="contoh@email.com" {...form.register("email")} disabled={isLoading} className="bg-slate-50" />
            <FieldError errors={[form.formState.errors.email]} />
          </Field>
          
          <Field>
            <FieldLabel className="text-slate-700">Password</FieldLabel>
            <Input type="password" placeholder="••••••••" {...form.register("password")} disabled={isLoading} className="bg-slate-50" />
            <FieldError errors={[form.formState.errors.password]} />
          </Field>
          
          <Button type="submit" className="w-full h-11 text-base font-semibold bg-[#6366f1] hover:bg-[#4f46e5] text-white" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Memproses...
              </>
            ) : (
              "Masuk"
            )}
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex flex-col items-center justify-center space-y-2 border-t p-6 pb-6 font-plus-jakarta bg-slate-50/50 rounded-b-xl">
        <div className="text-sm text-slate-500">
          Belum punya akun?{" "}
          <Link href="/register" className="font-semibold text-indigo-600 hover:text-indigo-700 hover:underline">
            Daftar sekarang
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
}
