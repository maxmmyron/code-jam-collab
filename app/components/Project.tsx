'use client'

import React from 'react'

const Project = ({ project }) => {
  return (
    <React.Fragment>
      <h1 className="text-4xl mx-8 border-2 border-black p-8 basis-1/3 rounded">{project.name}</h1>
    </React.Fragment>
  )
}

export default Project