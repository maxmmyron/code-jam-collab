import { getServerSession } from "next-auth";
import prisma from "../../lib/prisma";
import authOptions from "../api/auth/[...nextauth]/options";

const Profile = async () => {

  const session = await getServerSession(authOptions);

  if(!session || !session.user || !session.user.email) throw new Error("User not found");

  let user = await prisma.user.findUnique({
    where: {
      email: session.user.email
    }
  });

  return (
    <section className="mt-8 mx-8">
      <h1 className="text-4xl">{user?.name}</h1>
    </section>
  );
};

export default Profile;
