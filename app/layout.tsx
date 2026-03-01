import type { Metadata } from "next";
import { Inter, Montserrat } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["300", "400", "600"],
});

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  weight: ["500", "700", "800"],
});

export const metadata: Metadata = {
  title: {
    default: "ZOOM Unisex Salon | Premium Care",
    template: "%s | ZOOM Unisex Salon"
  },
  description: "Sri Lanka's premier unisex salon. Defining your signature style with uncompromising quality and elegance.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${montserrat.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
