import { NextResponse } from "next/server";
import prisma from "../../../../../lib/prisma";
import { getServerSession } from "next-auth";
import authOptions from "../../../auth/[...nextauth]/options";

export async function DELETE(request: Request, { params }) {
  const { id } = params
  try {
    await prisma.project.delete({
      where: {
        id: id
      }
    })

    return NextResponse.json({ id: id }, { status: 201 })
  } catch(e) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}