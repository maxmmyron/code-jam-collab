"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";

export default function Home() {
  const { data: session, status } = useSession();

  return (
    <>
      <Link href="/api/auth/signin" className="text-xl m-4">
        Login
      </Link>
      <Link href="/api/auth/signout" className="text-xl m-4">
        Logout
      </Link>
      <h1 className="text-xl m-4">Logged in as {session?.user?.name}</h1>
      <h2 className="text-lg m-4">
        <a
          href="https://www.youtube.com/watch?v=H-3YrkLZU44"
          className="text-blue-500 underline"
        >
          Bozo Dubbed Over
        </a>
      </h2>
      <h3>Bruhhhhhhhhhhhhhhhhhington!</h3>
    </>
  );
}
