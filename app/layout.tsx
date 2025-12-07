import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "./Providers";
import { StoreProvider } from "./Redux/StoreProvider";
import { Suspense } from "react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Perfume Store",
  description: "Generated To Show a Variety of Luxury Perfumes For Men And Women",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider>
        <StoreProvider>
        <Suspense fallback={<div>Loading...</div>}>
        {children}
        </Suspense>
        </StoreProvider>

        </AuthProvider>
      </body>
    </html>
  );
}
