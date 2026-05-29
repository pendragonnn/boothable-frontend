"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { register, login, getMe, useAuthStore, RegisterFormSchema, RegisterFormData } from "@/services/features/auth";
import { UserRole } from "@/services/shared";
import Cookies from "js-cookie";

export function RegisterForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const setAuth = useAuthStore((state) => state.setAuth);

  const form = useForm<RegisterFormData>({
    resolver: zodResolver(RegisterFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
      role: UserRole.VENDOR,
    },
  });

  const onSubmit = async (values: RegisterFormData) => {
    try {
      setIsLoading(true);
      const registerRes = await register(values);
      
      toast.success("Registrasi berhasil", {
        description: "Akun Anda telah berhasil dibuat. Mengalihkan...",
      });

      // Auto login after register
      const loginRes = await login({
        email: values.email,
        password: values.password
      });

      if (loginRes.data) {
        const { accessToken, refreshToken } = loginRes.data;
        
        // Set cookies manually first so getMe interceptor works
        Cookies.set("accessToken", accessToken);
        Cookies.set("refreshToken", refreshToken);
        
        const meRes = await getMe();
        const user = meRes.data;

        setAuth(accessToken, refreshToken, user);
        
        if (user.role === UserRole.ORGANIZER) {
          router.push("/dashboard/organizer");
        } else {
          router.push("/");
        }
      } else {
        router.push("/login");
      }
    } catch (error: any) {
      toast.error("Gagal registrasi", {
        description: error?.response?.data?.message || "Terjadi kesalahan saat pendaftaran.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto shadow-xl border-slate-100">
      <CardHeader className="space-y-1 text-center">
        <CardTitle className="text-2xl font-bold font-heading text-slate-900">Daftar Akun Baru</CardTitle>
        <CardDescription className="font-plus-jakarta text-slate-500">
          Lengkapi data di bawah untuk bergabung dengan Boothable
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 font-plus-jakarta">
          <Field>
            <FieldLabel className="text-slate-700">Nama Lengkap / Instansi</FieldLabel>
            <Input placeholder="Masukkan nama" {...form.register("name")} disabled={isLoading} className="bg-slate-50" />
            <FieldError errors={[form.formState.errors.name]} />
          </Field>
          
          <Field>
            <FieldLabel className="text-slate-700">Email</FieldLabel>
            <Input placeholder="contoh@email.com" {...form.register("email")} disabled={isLoading} className="bg-slate-50" />
            <FieldError errors={[form.formState.errors.email]} />
          </Field>
          
          <Field>
            <FieldLabel className="text-slate-700">Nomor WhatsApp</FieldLabel>
            <Input placeholder="081234567890" {...form.register("phone")} disabled={isLoading} className="bg-slate-50" />
            <FieldError errors={[form.formState.errors.phone]} />
          </Field>
          
          <Field>
            <FieldLabel className="text-slate-700">Mendaftar Sebagai</FieldLabel>
            <Controller
              control={form.control}
              name="role"
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value} disabled={isLoading}>
                  <SelectTrigger className="bg-slate-50">
                    <SelectValue placeholder="Pilih Peran" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={UserRole.VENDOR}>Vendor (Penyewa Booth)</SelectItem>
                    <SelectItem value={UserRole.ORGANIZER}>Organizer (Penyelenggara)</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
            <FieldError errors={[form.formState.errors.role]} />
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
              "Daftar Sekarang"
            )}
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex flex-col items-center justify-center space-y-2 border-t p-6 pb-6 font-plus-jakarta bg-slate-50/50 rounded-b-xl">
        <div className="text-sm text-slate-500">
          Sudah punya akun?{" "}
          <Link href="/login" className="font-semibold text-indigo-600 hover:text-indigo-700 hover:underline">
            Masuk di sini
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
}
