"use client";

import { FormEvent, useRef, useState } from "react";
import { Session } from "next-auth";
import { useRouter } from "next/navigation";

const ProjectForm = (session: Session) => {
  const router = useRouter();
  const form = useRef<HTMLFormElement>(null);

  const handleProjectSubmission = async (event: FormEvent<HTMLFormElement>) => {
    if (!form.current) throw new Error("Form is not defined");

    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    try {
      const res = await fetch("/api/v1/projects", {
        method: "POST",
        body: JSON.stringify(Object.fromEntries(formData)),
      });

      // if result is OK, then reset form and refresh page
      if (res.ok) {
        // FIXME: two courses of action here:
        // 1. reset form and use progressive enhancement to display the project returned from the fetch
        // 2. refresh page and just rerender

        form.current.reset();
        router.refresh();
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <form
      onSubmit={handleProjectSubmission}
      className="flex flex-col gap-2"
      ref={form}
    >
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
