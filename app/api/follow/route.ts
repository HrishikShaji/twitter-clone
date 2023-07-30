import serverAuth from "@/libs/serverAuth";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/libs/prismadb";

const handler = async (req: NextRequest, res: NextResponse) => {
  const { userId } = await req.json();
  const { currentUser } = await serverAuth(req);

  try {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
    if (!user) {
      throw new Error("No user");
    }

    let updatedFollowingIds = [...(user.followingIds || [])];

    if (req.method === "POST") {
      console.log("first", updatedFollowingIds);
      updatedFollowingIds.push(userId);
      console.log("second", updatedFollowingIds);
    }

    if (req.method === "DELETE") {
      console.log("this ran");
      updatedFollowingIds = updatedFollowingIds.filter(
        (followingId) => followingId !== userId
      );
    }

    const updatedUser = await prisma.user.update({
      where: {
        id: currentUser.id,
      },
      data: {
        followingIds: updatedFollowingIds,
      },
    });

    return NextResponse.json(updatedUser);
  } catch (err) {
    return NextResponse.json(err);
  }
};

export { handler as POST, handler as DELETE };
