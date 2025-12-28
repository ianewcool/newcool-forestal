import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sector Forestal Chile - CONAF | NewCooltura Informada",
  description: "Oficinas CONAF, permisos forestales, especies nativas y calculadora de plan de manejo",
  keywords: ["CONAF", "sector forestal", "permisos forestales", "especies nativas", "plan manejo"],
  openGraph: {
    title: "Forestal Chile - NewCooltura Informada",
    description: "CONAF, permisos y manejo forestal",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
