"use client";
import React from "react";
import Prisma from "@prisma/client";
import { useRouter } from "next/navigation";

type Props = {
  authUser: Prisma.User | null;
  project: Prisma.Project;
};

const LeaveButton = (props: Props) => {
  const { authUser, project } = props;
  const router = useRouter();
  const handleLeave = async (e) => {
    e.preventDefault();
    const verification = confirm(
      `Are you sure you want to leave project: ${project.name}`,
    );
    try {
      if (!authUser) return;
      const response = await fetch(`/api/v1/projects/${project.id}/users`, {
        method: "DELETE",
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
      onClick={handleLeave}
      className="px-3 bg-black py-2 rounded-md w-fit text-white"
    >
      Leave
    </button>
  );
};

export default LeaveButton;
