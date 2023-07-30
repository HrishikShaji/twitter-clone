import serverAuth from "@/libs/serverAuth";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/libs/prismadb";

const handler = async (req: NextRequest, res: NextResponse) => {
  try {
    if (req.method === "POST") {
      const { currentUser } = await serverAuth(req);
      const { body } = await req.json();

      const post = await prisma.post.create({
        data: {
          body,
          userId: currentUser.id,
        },
      });
      return NextResponse.json(post);
    }

    if (req.method === "GET") {
      const id = req.nextUrl.searchParams.get("userId");
      let posts;
      if (id) {
        console.log("user posts ran", id);
        posts = await prisma.post.findMany({
          where: {
            userId: id,
          },
          include: {
            user: true,
            comments: true,
          },
          orderBy: {
            createdAt: "desc",
          },
        });
      } else {
        console.log("all posts ran");
        posts = await prisma.post.findMany({
          include: {
            user: true,
            comments: true,
          },
          orderBy: {
            createdAt: "desc",
          },
        });
      }
      return NextResponse.json(posts);
    }
  } catch (err) {
    return NextResponse.json(err);
  }
};

export { handler as GET, handler as POST };
