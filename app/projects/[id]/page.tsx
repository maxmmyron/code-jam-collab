import Prisma from "@prisma/client";
import prisma from "../../../lib/prisma";
import Project from "../../components/Project";

async function getProject(id: string): Promise<Prisma.Project & {owner: Prisma.User} | null> {
  const project = await prisma.project.findUnique({
    where: {
      id,
    },
    include: {
      owner: true,
    }
  });
  return project;
}

const Page = async ({ params }: { params: { id: string } }) => {
  const project = await getProject(params.id);

  if(!project) throw new Error("Project not found");

  const owner = project.owner;

  return project === null ? (
    <div>Project not found</div>
  ) : (
    <>
      <Project project={project} />
      <p>by {owner.name}</p>
    </>
  );
};

export default Page;
