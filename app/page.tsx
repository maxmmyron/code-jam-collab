"use client";

import { useSession } from "next-auth/react";

export default function Home() {
  const { data: session, status } = useSession();

  return (
    <>
      <h1 className="mt-8">Page component</h1>
    </>
  );
}
