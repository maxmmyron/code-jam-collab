import Project from '../components/Project'
import prisma from '../../lib/prisma'
import authOptions from '../api/auth/[...nextauth]/options'
import { getServerSession } from 'next-auth'
import ProjectForm from '../components/ProjectForm'

async function getProjects(session) {
  const projects = await prisma.project.findMany({
    where: {
      owner: session?.user
    },
    orderBy: {
      id: "asc"
    }
  })
  return projects
}

export default async function ProjectIndex() {
  const session = await getServerSession(authOptions)
  const projects = await getProjects(session)
  return (
    <div className="mt-24">
      <h1 className="ml-8 mt-8 text-4xl">Projects</h1>
      <div className="flex justify-between mt-8">
        {projects?.map((project) => {
          return <Project key={project.id} project={project} />
        })}
      </div>
      {/* <ProjectForm /> */}
    </div>
  )
}
