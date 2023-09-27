import { NextResponse } from "next/server";
import prisma from "../../../../../../lib/prisma";

export async function PUT(request: Request, { params }) {
  const { id } = params;
  const { user } = await request.json();
  try {
    await prisma.membersInProject.create({
      data: {
        userId: user.id,
        projectId: id,
      },
    });
    return NextResponse.json({ id: id }, { status: 201 });
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }) {
  const { id } = params;
  const { user } = await request.json();
  try {
    await prisma.membersInProject.deleteMany({
      where: {
        userId: user.id,
        projectId: id,
      },
    });
    return NextResponse.json({ id: id }, { status: 201 });
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
