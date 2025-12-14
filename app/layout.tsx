import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SystemProvider } from "@/lib/contexts/system-context";
import { HardwareBar } from "@/components/layout/hardware-bar";
import { Toaster } from "@/components/ui/sonner";
import { DemoControls } from "@/components/layout/demo-controls";

import { AuthProvider } from "@/lib/contexts/auth-context";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "EduLink Community Node",
  description: "Offline-First Educational Operating System",
};

import { MainLayout } from "@/components/layout/main-layout";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${inter.className} bg-slate-50 text-slate-900 min-h-screen`}>
        <AuthProvider>
          <SystemProvider>
            <HardwareBar />
            <main className="pt-14 pb-20 px-4 min-h-screen">
              <MainLayout>{children}</MainLayout>
            </main>
            <DemoControls />
            <Toaster />
          </SystemProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
