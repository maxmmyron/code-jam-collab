import Prisma from "@prisma/client";
import prisma from "../../../lib/prisma";
import Project from "../../components/Project";
import DeleteButton from "../../components/DeleteButton";

async function getProject(
  id: string,
): Promise<(Prisma.Project & { owner: Prisma.User }) | null> {
  const project = await prisma.project.findUnique({
    where: {
      id,
    },
    include: {
      owner: true,
    },
  });
  return project;
}

const Page = async ({ params }: { params: { id: string } }) => {
  const project = await getProject(params.id);

  if (!project) throw new Error("Project not found");

  const owner = project.owner;

  const handleDelete = (e) => {
    e.preventDefault();
    console.log("yo");
  };

  return project === null ? (
    <div>Project not found</div>
  ) : (
    <div className="mx-8">
      <Project project={project} />
      <p>by {owner.name}</p>
      <DeleteButton id={params.id} projectName={project.name} />
    </div>
  );
};

export default Page;
