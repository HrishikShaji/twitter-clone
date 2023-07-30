import { NextRequest, NextResponse } from "next/server";

const handler = async (req: NextRequest, res: NextResponse) => {
  const url = req.nextUrl.pathname;
  const urlSplit = url.split("/");
  const userId = urlSplit[urlSplit.length - 1];

  try {
    if (!userId || typeof userId !== "string") {
      throw new Error("String error");
    }

    const existingUser = await prisma?.user.findUnique({
      where: {
        id: userId,
      },
    });

    const followersCount = await prisma?.user.count({
      where: {
        followingIds: {
          has: userId,
        },
      },
    });

    return NextResponse.json({ ...existingUser, followersCount });
  } catch (err) {
    return NextResponse.json(err);
  }
};

export { handler as GET };
