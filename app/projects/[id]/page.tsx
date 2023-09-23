import Prisma from "@prisma/client";
import prisma from "../../../lib/prisma";
import Project from "../../components/Project";

async function getProject(id: string): Promise<Prisma.Project | null> {
  const project = await prisma.project.findUnique({
    where: {
      id,
    },
  });
  return project;
}

const Page = async ({ params }: { params: { id: string } }) => {
  const project = await getProject(params.id);

  return project === null ? (
    <div>Project not found</div>
  ) : (
    <Project project={project} />
  );
};

export default Page;
