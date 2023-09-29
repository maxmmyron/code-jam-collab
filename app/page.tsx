"use client";

import { useSession } from "next-auth/react";

export default function Home() {
  const { data: session, status } = useSession();

  return (
    <>
      <h1 className="text-center mt-20 text-6xl">W GYATTT RIZZ</h1>
    </>
  );
}
