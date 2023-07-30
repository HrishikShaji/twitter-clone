import { AuthOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { NextRequest } from "next/server";

import prisma from "@/libs/prismadb";

const serverAuth = async (req: NextRequest) => {
  const session = await getServerSession(AuthOptions);
  console.log(session);

  if (!session?.user) {
    throw new Error("not signed in");
  }

  const currentUser = await prisma.user.findUnique({
    where: {
      id: session.user as string,
    },
  });

  if (!currentUser) {
    throw new Error("not signed in");
  }

  return { currentUser };
};

export default serverAuth;
