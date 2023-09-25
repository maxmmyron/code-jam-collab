"use client";
import React from "react";
import Prisma from "@prisma/client";
import { useRouter } from "next/navigation";

type Props = {
  project: Prisma.Project;
  authUser: Prisma.User | null;
};

const JoinButton = (props: Props) => {
  const { project, authUser } = props;
  const router = useRouter();
  const handleJoin = async (e) => {
    e.preventDefault();
    try {
      if (!authUser) return;
      const response = await fetch(`/api/v1/projects/${project.id}/users`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user: authUser }),
      });
      if (!response.ok)
        throw new Error(`${response.status}: (${response.statusText})`);
      router.refresh();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <button
      onClick={handleJoin}
      className="px-3 bg-sky-500 py-2 rounded-md w-fit text-white"
    >
      Join
    </button>
  );
};

export default JoinButton;
