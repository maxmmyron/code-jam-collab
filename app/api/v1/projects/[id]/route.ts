import { NextResponse } from "next/server";
import prisma from "../../../../../lib/prisma";
import { z } from "zod";
import Prisma from "@prisma/client";
import { ProjectSchema } from "../../../../../prisma/generated/zod";

export async function GET(request: Request, { params }) {
  let paramSchema = z.string().nonempty();
  let id: string;

  try {
    id = paramSchema.parse(params.id);
  } catch (e) {
    // return 400 Bad Request for any zod errors
    if (e instanceof z.ZodError) {
      return NextResponse.json(
        { error: `Bad payload: ${e.issues}` },
        { status: 400 },
      );
    }

    // return 500 Internal Server Error for any other error
    return NextResponse.json({ error: e.message }, { status: 500 });
  }

  let project: Prisma.Project | null;
  try {
    project = await prisma.project.findUnique({
      where: {
        id,
      },
    });
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }

  if (!project) {
    return NextResponse.json({ error: "Project not found" }, { status: 404 });
  }

  // let projectSchema
  // try {
  //   projectSchema = ProjectSchema.parse(project);
  // } catch (e) {
  //   // return 400 Bad Request for any zod errors
  //   if (e instanceof z.ZodError) {
  //     return NextResponse.json({ error: `Bad payload: ${e.issues}` }, { status: 400 });
  //   }

  //   // return 500 Internal Server Error for any other error
  //   return NextResponse.json({ error: e.message }, { status: 500 });
  // }

  // return 200 OK with project
  return NextResponse.json(project, {
    status: 200,
  });
}

export async function DELETE(request: Request, { params }) {
  let id: string;

  // validate request
  try {
    const paramSchema = z.string().nonempty();
    id = paramSchema.parse(params.id);
  } catch (e) {
    // return 400 Bad Request for any zod errors
    if (e instanceof z.ZodError) {
      return NextResponse.json(
        { error: `Bad payload: ${e.issues}` },
        { status: 400 },
      );
    }

    // return 500 Internal Server Error for any other error
    return NextResponse.json({ error: e.message }, { status: 500 });
  }

  // delete project
  try {
    await prisma.project.delete({
      where: {
        id,
      },
    });
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }

  // return 200 OK
  return NextResponse.json({}, { status: 200 });
}

export async function PUT(request: Request, { params }) {
  let id: string;
  let body: { name: string; description: string };

  // validate request
  try {
    // define zod schemas
    const paramSchema = z.string().nonempty();
    const bodySchema = z.object({
      name: z.string().nonempty(),
      description: z.string(),
    });

    // parse request
    id = paramSchema.parse(params.id);
    body = bodySchema.parse(request.json());
  } catch (e) {
    // return 400 Bad Request for any zod errors
    if (e instanceof z.ZodError) {
      return NextResponse.json(
        { error: `Bad payload: ${e.issues}` },
        { status: 400 },
      );
    }

    // return 500 Internal Server Error for any other error
    return NextResponse.json({ error: e.message }, { status: 500 });
  }

  // update project
  try {
    await prisma.project.update({
      where: {
        id,
      },
      data: body,
    });
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }

  // return 200 OK
  return NextResponse.json({}, { status: 200 });
}
