"use client";

import { FormEvent, useState } from "react";
import { Session } from "next-auth";
import { useRouter } from "next/navigation";

const ProjectForm = (session: Session) => {
  const router = useRouter();
  const handleProjectSubmission = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    try {
      const res = await fetch("/api/v1/projects", {
        method: "POST",
        body: JSON.stringify(Object.fromEntries(formData)),
      });
      router.refresh();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <form onSubmit={handleProjectSubmission} className="flex flex-col gap-2">
      <input
        type="text"
        name="name"
        placeholder="New Project"
        className="border px-2 py-1 rounded-md"
      />
      <textarea
        name="description"
        placeholder="Project Description"
        className="border px-2 py-1 rounded-md"
      />

      <button
        type="submit"
        className="border bg-black px-3 py-2 rounded-md w-fit text-white"
      >
        Create Project
      </button>
    </form>
  );
};

export default ProjectForm;
