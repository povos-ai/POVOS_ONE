import type { Metadata } from "next";
import './globals.css'
import { initializeAuth } from '@/lib/auth-store';

// Initialize auth on load
if (typeof window !== 'undefined') initializeAuth();

export const metadata: Metadata = {
  title: "POVOS ONE - AI Powered Opportunity Platform",
  description: "Discover opportunities, schemes, and grants powered by AI.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:opsz,wght@14..32,400;14..32,500;14..32,600;14..32,700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}



