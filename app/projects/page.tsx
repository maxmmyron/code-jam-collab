'use client'

import React from 'react'
import Project from '../components/Project'

async function getProjects() {
  const res = await fetch('http://localhost:3000/api/v1/projects', {
    method: "GET"
  })
  const data = await res.json()
  return data?.projects as any[]
}

const ProjectIndex = async () => {
  const projects =  await getProjects()

  return (
    <div>
      <h1 className="mt-8 text-2xl">Projects</h1>
      {projects?.map((project) => {
        return <Project key={project.id} project={project} />
      })}
    </div>
  )
}

export default ProjectIndex