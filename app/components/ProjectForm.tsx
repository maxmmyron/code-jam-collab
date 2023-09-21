'use client'

import React, { FormEvent, useState } from 'react'

const ProjectForm = () => {
  const [loading, setLoading] = useState(false);

  const handleProjectSubmission = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    const formData = new FormData(event.currentTarget);

    const res = await fetch('/api/v1/projects', {
      body: formData,
      method: 'POST',
    })

    const data = await res.json();
    setLoading(false);
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
