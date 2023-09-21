import React, { FormEvent, useState } from 'react'
import prisma from '../../lib/prisma';
import { Session } from 'next-auth';

const ProjectForm = (session: Session) => {
  const handleProjectSubmission = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    let formData = new FormData(event.currentTarget);

    if (!formData.get("name") || !formData.get("description")) return;

    await prisma.project.create({
      data: {
        name: formData.get("name") as string,
        description: formData.get("description") as string,
      }
    });

    await prisma.project
  };

  return (
    <form onSubmit={handleProjectSubmission}>
      <label>
        Project Name
        <input type="text" name="name" />
      </label>

      <label>
        Project Description
        <textarea name="description" />
      </label>

      <button type="submit">Create Project</button>

      <p>{loading ? 'Loading...' : ''}</p>
    </form>
  )
}

export default ProjectForm
