import "./globals.css";
import { Inter } from "next/font/google";
import NextAuthSessionProvider from "./providers/sessionProvider";
import Nav from "./nav-bar";
import Toasts from "./components/Toasts";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Code Jam",
  description: "Goated Website",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NextAuthSessionProvider>
          <Nav />
          {children}
          <Toasts />
        </NextAuthSessionProvider>
      </body>
    </html>
  );
}
