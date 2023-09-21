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
    <div className="mt-24">
      <h1 className="ml-8 mt-8 text-2xl">Projects</h1>
      <div className="flex justify-between mt-8">
        {projects?.map((project) => {
          return <Project key={project.id} project={project} />
        })}
      </div>
    </div>
  )
}

export default ProjectIndex