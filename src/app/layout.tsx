import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { AuthProvider } from "../context/AuthProvider";
import "./globals.css";

// підключаємо Inter
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter", // змінна для CSS
});

export const metadata: Metadata = {
  title: "Dating | Registration & Login",
  description:
    "Pixel-perfect demo app with registration flow, login, password recovery, and dashboard. Built with Next.js, TypeScript, Formik, and Docker.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased`}>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
