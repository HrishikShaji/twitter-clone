import { NextRequest, NextResponse } from "next/server";
import prisma from "@/libs/prismadb";

const handler = async (req: NextRequest, res: NextResponse) => {
  const url = req.nextUrl.pathname;
  const urlSplit = url.split("/");
  const postId = urlSplit[urlSplit.length - 1];

  console.log("fetching post", postId);
  try {
    if (!postId) {
      throw new Error("invalid id");
    }
    const post = await prisma.post.findUnique({
      where: {
        id: postId,
      },
      include: {
        user: true,
        comments: {
          include: {
            user: true,
          },
          orderBy: {
            createdAt: "desc",
          },
        },
      },
    });

    return NextResponse.json(post);
  } catch (err) {
    return NextResponse.json(err);
  }
};

export { handler as GET };
