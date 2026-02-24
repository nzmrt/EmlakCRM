'use client';

import React, { useState } from "react";
import { Inter } from "next/font/google";
import "./globals.css";
import { Sidebar } from "@/components/Sidebar";
import { Menu, Building2 } from "lucide-react";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <html lang="tr">
      <body className={`${inter.className} antialiased`}>
        <div className="flex min-h-screen bg-background text-foreground">
          <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

          <div className="flex-1 flex flex-col min-w-0">
            {/* Mobile Header */}
            <header className="lg:hidden glass-panel h-16 px-4 flex items-center justify-between sticky top-0 z-40 border-b">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 premium-gradient rounded-lg flex items-center justify-center">
                  <Building2 className="text-white w-5 h-5" />
                </div>
                <h1 className="font-bold tracking-tight">Emlak<span className="text-primary font-black">CRM</span></h1>
              </div>
              <button
                onClick={() => setIsSidebarOpen(true)}
                className="p-2 hover:bg-accent rounded-lg transition-colors"
              >
                <Menu className="w-6 h-6" />
              </button>
            </header>

            <main className="flex-1 p-4 md:p-8 lg:ml-64 transition-all duration-300">
              <div className="max-w-7xl mx-auto">
                {children}
              </div>
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}
