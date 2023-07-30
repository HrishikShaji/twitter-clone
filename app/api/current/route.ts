import serverAuth from "@/libs/serverAuth";
import { NextRequest, NextResponse } from "next/server";

const handler = async (req: NextRequest, res: NextResponse) => {
  try {
    const { currentUser } = await serverAuth(req);

    return NextResponse.json(currentUser);
  } catch (err) {
    return NextResponse.json(err);
  }
};

export { handler as GET };
