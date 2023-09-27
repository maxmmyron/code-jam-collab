import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import Prisma from "@prisma/client";
import prisma from "../../../../lib/prisma";

/**
 * ## GET /api/v1/users
 *
 * Retrieves a list of users based on the passed query parameters.
 *
 * ### Valid query parameters
 *
 * The following query parameters are supported (all are exclusive of each other):
 * - ids: a comma-separated list of user ids
 * - email: a user's email
 * - username: a user's username
 * - name: a user's name
 *
 * @param request Request object
 * @param param1
 *
 * @returns
 * - if ids is passed:
 *   - 200 OK with a list of users
 *
 * - if email is passed:
 *   - 200 OK with a user
 *   - 404 Not Found if the user does not exist
 *
 * - if name is passed:
 *   - 200 OK with a list of users
 *
 * For all of the above, the following errors are possible:
 * - 400 Bad Request if the query parameters are invalid
 * - 500 Internal Server Error if an error occurs
 *
 */
export async function GET(request: NextRequest) {
  let paramSchema = z.string().nonempty();

  if (request.nextUrl.searchParams.size === 0) {
    return NextResponse.json(
      {
        error: "No query parameters were passed",
      },
      {
        status: 400,
      },
    );
  }

  if (request.nextUrl.searchParams.size > 1) {
    return NextResponse.json(
      {
        error: "Only one query parameter may be passed",
      },
      {
        status: 400,
      },
    );
  }

  try {
    let users: Array<Prisma.User> = [];
    let query = {};

    if (request.nextUrl.searchParams.get("ids"))
      query = {
        id: {
          in: paramSchema
            .parse(request.nextUrl.searchParams.get("ids"))
            .split(","),
        },
      };
    else if (request.nextUrl.searchParams.get("email"))
      query = {
        email: paramSchema.parse(request.nextUrl.searchParams.get("email")),
      };
    else if (request.nextUrl.searchParams.get("name"))
      query = {
        name: {
          contains: paramSchema.parse(request.nextUrl.searchParams.get("name")),
        },
      };

    try {
      users = await prisma.user.findMany({ where: query });
    } catch (e) {
      return NextResponse.json(
        {
          error: `An error occurred while attempting to retrieve users: ${e.message}`,
        },
        { status: 400 },
      );
    }

    return NextResponse.json(users, {
      status: 200,
    });
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
}
