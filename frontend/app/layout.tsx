import type { Metadata } from "next";
import {  Hind_Siliguri,
  Inter,
  Noto_Sans_Bengali,} from "next/font/google";
import "./globals.css";
import TopBar from "@/components/layout/TopBar";

// Typography Scale

// Hero Heading       48–64px / 700
// Section Heading    32–40px / 700
// Product Heading    18–20px / 600
// Body Text          15–16px / 400
// Button             15–16px / 600
// Navbar             15px / 500
// Small Text         12–14px / 400
// Price              20–24px / 700

const hindSiliguri = Hind_Siliguri({
  variable: "--font-hind-siliguri",
  subsets: ["bengali"],
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const notoSansBengali = Noto_Sans_Bengali({
  variable: "--font-noto-bengali",
  subsets: ["bengali"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "শুঁটকি বাজার | খাঁটি শুঁটকির বিশ্বস্ত ঠিকানা",
  description: "কক্সবাজারের খাঁটি রোদে শুকানো প্রিমিয়াম শুঁটকি।",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
        className={`${hindSiliguri.variable} ${inter.variable} ${notoSansBengali.variable}`}
    >
      <body className="min-h-full flex flex-col ">
        <div><TopBar /></div>
        {children}</body>
    </html>
  );
}
