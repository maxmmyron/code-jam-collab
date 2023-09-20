"use client";
import "./globals.css";
import { Inter } from "next/font/google";
import Nav from "./nav-bar";

const inter = Inter({ subsets: ["latin"] });

import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";

export interface AuthContextProps {
  children: ReactNode;
}

export default function AuthContext({ children }: AuthContextProps) {
  return (
    <html>
      <SessionProvider>
        <body className="mx-16">
          <Nav />
          {children}
        </body>
      </SessionProvider>
    </html>
  );
}
