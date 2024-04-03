import type { Metadata } from "next";
import "./globals.css";
import "@radix-ui/themes/styles.css";


export const metadata: Metadata = {
  title: "I Weather",
  description: "I Weather",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body >{children}</body>
    </html>
  );
}
