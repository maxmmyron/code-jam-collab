import { NextResponse } from "next/server";
import prisma from "../../../../../lib/prisma";
import { z } from "zod";
import Prisma from "@prisma/client";

export async function GET(request: Request, { params }) {
  let paramSchema = z.string().nonempty();
  let id: string;

  try {
    id = paramSchema.parse(params.id);
  } catch (e) {
    // return 400 Bad Request for any zod errors
    if (e instanceof z.ZodError) {
      return NextResponse.json({ error: `Bad payload: ${e.issues}` }, { status: 400 });
    }

    // return 500 Internal Server Error for any other error
    return NextResponse.json({ error: e.message }, { status: 500 });
  }

  let user: Prisma.User | null;
  try {
    user = await prisma.user.findUnique({
      where: {
        id,
      },
    });
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }

  if (!user) {
    return NextResponse.json({ error: "Project not found" }, { status: 404 });
  }

  // return 200 OK with project
  return NextResponse.json(user, {
    status: 200
  });
};
