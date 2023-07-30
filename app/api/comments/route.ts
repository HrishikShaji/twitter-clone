import serverAuth from "@/libs/serverAuth";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/libs/prismadb";

const handler = async (req: NextRequest, res: NextResponse) => {
  const { body } = await req.json();
  const postId = req.nextUrl.searchParams.get("postId");
  console.log("post id is", postId);
  try {
    const { currentUser } = await serverAuth(req);

    const comment = await prisma.comment.create({
      data: {
        body,
        userId: currentUser.id,
        postId: postId as string,
      },
    });
    console.log("commented");
    return NextResponse.json(comment);
  } catch (err) {
    return NextResponse.json(err);
  }
};

export { handler as POST };
