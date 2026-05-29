"use client";

import { useAuthStore } from "@/services/features/auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Loader2, Activity } from "lucide-react";
import { UserRole } from "@/services/shared";
import Cookies from "js-cookie";
import { Button } from "@/components/ui/button";
import { getMe } from "@/services/features/auth";
import { toast } from "sonner";

export default function OrganizerDashboard() {
  const user = useAuthStore((state) => state.user);
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);
  const [isTesting, setIsTesting] = useState(false);
  
  const handleTestRequest = async () => {
    try {
      setIsTesting(true);
      const res = await getMe();
      toast.success("Request API Berhasil", {
        description: `Backend merespons dengan nama: ${res.data.name}`,
      });
      console.log("[Test API] Success", res.data);
    } catch (error: any) {
      toast.error("Request API Gagal", {
        description: error?.response?.data?.message || "Terjadi kesalahan",
      });
      console.error("[Test API] Error", error);
    } finally {
      setIsTesting(false);
    }
  };
  
  useEffect(() => {
    setIsClient(true);
    const token = Cookies.get("accessToken");
    
    if (!token) {
      router.push("/login");
    } else if (user && user.role !== UserRole.ORGANIZER) {
      router.push("/login");
    }
  }, [user, router]);

  if (!isClient || !user) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="p-8 font-plus-jakarta max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold font-heading mb-4 text-slate-900">Dashboard Organizer</h1>
      <p className="text-lg text-slate-600">Selamat datang kembali, <strong className="text-indigo-600">{user.name}</strong>!</p>
      
      <div className="mt-8 p-8 bg-white rounded-2xl border border-slate-200 shadow-xl shadow-slate-100">
        <h2 className="text-xl font-bold mb-2">Overview</h2>
        <p className="text-slate-500 italic">Ini adalah halaman dummy dashboard untuk organizer.</p>
        <p className="text-slate-500 mt-4 text-sm">Nantinya Anda dapat mengelola event, mengatur denah booth, dan memverifikasi pembayaran vendor di sini.</p>
        
        <div className="mt-8 pt-6 border-t border-slate-100">
          <h3 className="text-sm font-semibold text-slate-700 mb-3">Pengujian Refresh Token</h3>
          <p className="text-sm text-slate-500 mb-4">
            Tunggu 10 detik setelah login, lalu klik tombol di bawah ini. Anda akan melihat di Network DevTools bahwa request akan mendapat 401, otomatis memanggil /auth/refresh, dan mengulang request dengan token baru.
          </p>
          <Button onClick={handleTestRequest} disabled={isTesting} className="bg-indigo-600 hover:bg-indigo-700">
            {isTesting ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Activity className="w-4 h-4 mr-2" />}
            Test Request API
          </Button>
        </div>
      </div>
    </div>
  );
}
