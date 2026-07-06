import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Gnb from "@/components/common/gnb";
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
  title: "Code-it todo-list",
  description: "개인 할 일 관리를 위한 투두 서비스",
};

// 모든 페이지를 감싸는 루트 레이아웃
// GNB(상단 네비게이션)를 깔아줍니다.
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Gnb />
        {children}
      </body>
    </html>
  );
}
