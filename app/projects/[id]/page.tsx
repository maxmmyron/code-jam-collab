import Prisma from "@prisma/client";
import DeleteButton from "../../components/DeleteButton";
import EditButton from "../../components/EditButton";
import authOptions from "../../api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";

const Page = async ({ params }: { params: { id: string } }) => {
  const session = await getServerSession(authOptions);

  const projectData = await fetch(`${process.env.URL}/api/v1/projects/${params.id}`)
  const project = (await projectData.json()) as Prisma.Project;

  const ownerData = await fetch(`${process.env.URL}/api/v1/users/${project.ownerId}`);
  const owner = (await ownerData.json()) as Prisma.User;

  let user: Prisma.User | null = null;
  if (session?.user?.email) {
    const userData = await fetch(`${process.env.URL}/api/v1/users?email=${session.user.email}`)
    user = (await userData.json())[0] as Prisma.User;
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
        {user && owner.id === user.id && (
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
