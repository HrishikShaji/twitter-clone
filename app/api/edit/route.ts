import serverAuth from "@/libs/serverAuth";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/libs/prismadb";

const handler = async (req: NextRequest, res: NextResponse) => {
  try {
    const { currentUser } = await serverAuth(req);

    const { name, username, bio, profileImage, coverImage } = await req.json();
    if (!name || !username) {
      throw new Error("Missing fields");
    }

    const updatedUser = await prisma.user.update({
      where: {
        id: currentUser.id,
      },
      data: {
        name,
        username,
        bio,
        profileImage,
        coverImage,
      },
    });
    return NextResponse.json(updatedUser);
  } catch (err) {
    return NextResponse.json(err);
  }
};

export { handler as PATCH };
