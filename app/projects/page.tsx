import Project from "../components/Project";
import prisma from "../../lib/prisma";
import authOptions from "../api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import ProjectForm from "../components/ProjectForm";

async function getProjects(session) {
  const projects = await prisma.project.findMany({
    where: {
      owner: session?.user,
    },
    orderBy: {
      id: "asc",
    },
  });
  return projects;
}

const ProjectIndex = async () => {
  const session = await getServerSession(authOptions);
  const projects = await getProjects(session);
  return (
    <div className="mt-24 mx-20">
      <h1 className=" text-4xl font-bold">Projects</h1>
      <div className="flex flex-wrap mb-8 mt-8 flex-row">
        {projects?.map((project) => {
          return <Project key={project.id} project={project} />;
        })}
      </div>
      {session && <ProjectForm {...session} />}
    </div>
  );
};

export default ProjectIndex;
