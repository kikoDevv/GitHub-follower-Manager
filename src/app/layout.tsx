import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

/*--------- icon in browser tab ----------*/
export const metadata: Metadata = {
  title: "Follower-Manager",
  description:
    "Clean up your GitHub network effortlessly. See mutual followers, identify one-way connections, and manage your following list with smart insights.",
  icons: {
    icon: [
      { url: "/Github.png", sizes: "1024x1024", type: "image/png" },
      { url: "/favicon.ico", sizes: "32x32" },
    ],
    shortcut: "/Github.png",
    apple: "/Github.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
