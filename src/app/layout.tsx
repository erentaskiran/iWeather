import type { Metadata } from "next";
import "./globals.css";
import "@radix-ui/themes/styles.css";


export const metadata: Metadata = {
  title: "iWeather",
  description: "iWeather",
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
