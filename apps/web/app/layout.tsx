import "./globals.css";
import "@repo/ui/styles.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ReduxProvider } from "@/data/providers/redux-provider";
import { QueryProvider } from "@/data/providers/query-provider";
import Header from '@/components/header';
import { Footer } from '@repo/ui/footer';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Testing Casino",
  description: "Testing Casino",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ReduxProvider>
          <QueryProvider>
            <div className="min-h-screen flex flex-col">
              <Header />
              <main className="flex-grow">
                {children}
              </main>
              <Footer />
            </div>
          </QueryProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
