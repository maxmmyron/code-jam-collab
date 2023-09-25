import Prisma from "@prisma/client";
import Link from "next/link";
import React from "react";

const Project = ({ project }: { project: Prisma.Project }) => {
  return (
    <Link
      className="basis-1/4 mr-4 last-of-type:mr-0"
      href={`/projects/${project.id}`}
    >
      <div className="px-4 py-8 mt-4 border-2 border-black rounded hover:bg-black hover:text-white transition">
        <h1 className="text-4xl mb-4">{project.name}</h1>
        <p>{project.description}</p>
      </div>
    </Link>
  );
};

export default Project;
