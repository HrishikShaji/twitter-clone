import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import prismadb from "@/libs/prismadb";

const handler = async (req: NextRequest, res: NextResponse) => {
  try {
    const { email, username, name, password } = await req.json();

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prismadb.user.create({
      data: {
        email,
        username,
        name,
        hashedPassword,
      },
    });

    return NextResponse.json(user);
  } catch (err) {
    return NextResponse.json("Error Registering");
  }
};

export { handler as POST };
