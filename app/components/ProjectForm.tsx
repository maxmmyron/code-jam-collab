import { FormEvent } from 'react'
import prisma from '../../lib/prisma';
import { Session } from 'next-auth';

const ProjectForm = (session: Session) => {
  const handleProjectSubmission = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    let formData = new FormData(event.currentTarget);

    if (!formData.get("name") || !formData.get("description")) return;
    if(!session.user || !session.user.email) return;

    const user = await prisma.user.findUnique({
      where: {
        email: session.user.email,
      },
    });

    // FIXME: fix error checking
    if(!user) return;

    // TODO: update in try/catch
    await prisma.project.create({
      data: {
        name: formData.get("name") as string,
        description: formData.get("description") as string,
        ownerId: user.id as string,
      }
    });
  };

  return (
    <form onSubmit={handleProjectSubmission}>
      <label>
        Project Name
        <input type="text" name="name" />
      </label>

      <label>
        Project Description
        <textarea name="description" />
      </label>

      <button type="submit">Create Project</button>
    </form>
  )
}

export default ProjectForm
