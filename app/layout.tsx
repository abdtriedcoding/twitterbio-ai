import "./globals.css";
import { Toaster } from "sonner";
import { Poppins } from "next/font/google";
import { constructMetadata } from "@/lib/utils";
import { Analytics } from "@vercel/analytics/react";

import Header from "@/components/header";
import Footer from "@/components/footer";

const font = Poppins({ subsets: ["latin"], weight: ["500"] });

export const metadata = constructMetadata();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={font.className}>
        <Header />
        <main className="min-h-full w-full p-4 flex flex-col items-center max-w-xl mx-auto space-y-5">
          <Toaster richColors theme="system" />
          {children}
          <Analytics />
        </main>
        <Footer />
      </body>
    </html>
  );
}
