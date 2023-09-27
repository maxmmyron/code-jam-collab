import Prisma from "@prisma/client";
import DeleteButton from "../../components/DeleteButton";
import EditButton from "../../components/EditButton";
import authOptions from "../../api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import prisma from "../../../lib/prisma";

const getUserByEmail = async (email: string) => {
  const user = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  return user;
};

const Page = async ({ params }: { params: { id: string } }) => {
  const session = await getServerSession(authOptions);

  const projectData = await fetch(
    `${process.env.URL}/api/v1/projects/${params.id}`,
  ).then((res) => res.json());
  const project = projectData.project as Prisma.Project;

  const ownerData = await fetch(
    `${process.env.URL}/api/v1/users/${project.ownerId}`,
  ).then((res) => res.json());
  const owner = ownerData.user as Prisma.User;

  let authUser: Prisma.User | null = null;
  if (session?.user?.email) {
    authUser = await getUserByEmail(session.user.email);
  }

  return project === null ? (
    <div>Project not found</div>
  ) : (
    <section className="mx-8 mt-8">
      <header className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl">{project.name}</h1>
          <p>by {owner.name}</p>
        </div>
        {authUser && owner.id === authUser.id && (
          <div className="flex gap-2">
            <DeleteButton id={params.id} projectName={project.name} />
            <EditButton id={params.id} project={project} />
          </div>
        )}
      </header>
      <hr className="my-6" />
      <p>{project.description}</p>
    </section>
  );
};

export default Page;
