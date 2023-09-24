import Prisma from "@prisma/client";
import prisma from "../../../lib/prisma";
import Project from "../../components/Project";
import DeleteButton from "../../components/DeleteButton";
import authOptions from "../../api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";

const getUser = async (email: string): Promise<Prisma.User | null> => {
  const user = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  return user;
};

const getProject = async (
  id: string,
): Promise<(Prisma.Project & { owner: Prisma.User }) | null> => {
  const project = await prisma.project.findUnique({
    where: {
      id,
    },
    include: {
      owner: true,
    },
  });

  return project;
};

const Page = async ({ params }: { params: { id: string } }) => {
  const session = await getServerSession(authOptions);
  const project = await getProject(params.id);

  if (!project) throw new Error("Project not found");

  if(!session?.user?.email) throw new Error("User not found");
  const authUser = await getUser(session?.user?.email);

  return project === null ? (
    <div>Project not found</div>
  ) : (
    <div className="mx-8">
      <Project project={project} />
      <p>by {project.owner.name}</p>
      {project.owner.id === authUser?.id && (
        <DeleteButton id={params.id} projectName={project.name} />
      )}
    </div>
  );
};

export default Page;
