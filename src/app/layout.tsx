"use client"
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import Navbar from "./_components/Navbar/Navbar";
import { Toaster } from "react-hot-toast";
import { store } from "@/lib/Redux/store";
import {Provider} from "react-redux"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <Provider store={store}>
        <AppRouterCacheProvider>
            <Navbar/>
            {children}
            <Toaster/>
        </AppRouterCacheProvider>
        </Provider>
      </body>
    </html>
  );
}
