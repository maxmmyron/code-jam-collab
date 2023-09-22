"use client";

import { FormEvent, useState } from "react";
import prisma from "../../lib/prisma";
import { Session } from "next-auth";

const ProjectForm = (session: Session) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleProjectSubmission = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    //TODO Add try catch
    await fetch("http://localhost:3000/api/v1/projects", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        formData,
      }),
    });
  };

  return (
    <form onSubmit={handleProjectSubmission}>
      <label>
        Project Name
        <input
          onChange={handleInputChange}
          value={formData.name}
          type="text"
          name="name"
        />
      </label>

      <label>
        Project Description
        <textarea
          onChange={handleInputChange}
          value={formData.description}
          name="description"
        />
      </label>

      <button type="submit">Create Project</button>
    </form>
  );
};

export default ProjectForm;
