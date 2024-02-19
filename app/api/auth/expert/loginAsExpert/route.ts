import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs"; // Import for password hashing

const prisma = new PrismaClient();

export async function POST(req: Request, res: Response) {
  if (req.method !== 'POST') {
    return new NextResponse("Invalid request", { status: 400 });
  }

    const { email, password } = await req.json();

    

  // Basic form validation (replace with more comprehensive checks)
  if (!email || !password) {
    // return NextResponse.json({ message: "Invalid email format", status: 400 });
    return NextResponse.json({ message: "Invalid email or password", status: 400 });
  }

  //check if the isAccountDeactivated is true
  const user = await prisma.expert.findUnique({
    where: { email },
  });

  if (user?.isAccountDeactivated) {
    return NextResponse.json({ message: "Account was deactivated", status: 401 });
  }

  try {
    if(!user?.isAccountDeactivated){
        const expert = await prisma.expert.findUnique({
      where: { email },
    });

    if (!expert) {
     return NextResponse.json({ message: "Invalid email or password", status: 401 });
    }

    const passwordMatches = await bcrypt.compare(password, expert.password);

    if (!passwordMatches) {
        return NextResponse.json({ message: "Invalid email or password", status: 401 });
    }

    // Log in successful
    return NextResponse.json({ message: "Logged in successfully", status: 200, id: expert.id, data: expert });
    }

    const passwordExluded = { ...user, password: undefined };
    
    return NextResponse.json({ message: "Invalid email or password or account deactivated",
  data: passwordExluded, status: 401 });
  

  } catch (error: any) {
    console.error('Error logging in expert:', error);
    return NextResponse.json({ message: "Unknown error", status: 500 });
  }
}
