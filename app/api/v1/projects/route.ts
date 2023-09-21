import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import authOptions from "../../auth/[...nextauth]/options";
import { NextResponse } from "next/server";

export async function GET (req: NextApiRequest, res: NextApiResponse) {
  // authenticate user
  const session = await getServerSession(req, res, authOptions);

  console.log("in sess")

  if(session) {
    return NextResponse.json({ message: "success" });
  }

  return NextResponse.json({ message: "failed" }, { status: 401 });
}
