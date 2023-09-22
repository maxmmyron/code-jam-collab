import { NextResponse } from "next/server"
import prisma from "../../../../lib/prisma"
import { getServerSession } from "next-auth"
import authOptions from "../../auth/[...nextauth]/options";

export async function POST(request: Request) {
  const session = await getServerSession(authOptions)
  const body = await request.json()
  const { name, description } = body.formData
  await prisma.project.create({
    data: {
      name: name,
      description: description,
      owner: { connect: { email: session?.user?.email }}
    }
  });
  return NextResponse.json({hello: 'world'})
}