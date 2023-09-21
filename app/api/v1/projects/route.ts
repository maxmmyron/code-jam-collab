import prisma from '../../../../lib/prisma';
import { getServerSession } from 'next-auth';
import authOptions from '../../auth/[...nextauth]/options';
import { NextResponse } from 'next/server';

export async function GET() {
  const session = await getServerSession(authOptions)
  
  // Get all projects where user is owner (and eventually that they are apart of)
  if(session) {
    const projects = await prisma.project.findMany({
      where: {
        owner: session?.user
      },
      orderBy: {
        id: "asc"
      }
    })
    return NextResponse.json({projects})
  } else {
    return new Response("Unauthorized access detected", {
      status: 401,
    });
  }

}