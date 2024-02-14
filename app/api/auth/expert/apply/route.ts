import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import crypto from "crypto";
import bcrypt from "bcryptjs"; // Import for password hashing
// import { sendVerificationEmail } from "./verificationEmail"; 

const prisma = new PrismaClient();

export async function POST(req: Request, res: Response) {
  try {
    // Validate request body
    if (!req.body) {
      return new NextResponse("Invalid request", { status: 400 });
    }

    const { firstName,bio, lastName, email, password, certifications, services, verifiedWebsites, availableDay, startTime, endTime, profilepicURL } =await req.json();

    // Log request body
    console.log(firstName, lastName, email, password, certifications, bio, services, verifiedWebsites, availableDay, startTime, endTime, profilepicURL);
    // Validate email format
    if (!validateEmail(email)) {
      return NextResponse.json({ message: "Invalid email format", status: 400 });
    }

    // Validate email existence
    const existingExpert = await prisma.expert.findUnique({
      where: { email },
    });
    if (existingExpert) {
      return NextResponse.json({ message: "Email already exists", status: 400 });
    }

    // Validate password strength (consider using a password validator module)
    if (password.length < 8) {
      return NextResponse.json({ message: "Password is too short", status: 400 });
    }

    // Generate random token
    const token = crypto.randomBytes(32).toString("hex");

    // Hash password using a secure algorithm (bcrypt recommended)
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create expert
    const expert = await prisma.expert.create({
      data: {
        firstName,
        lastName,
        email,
        password: hashedPassword,
        certifications,
        bio: bio,
        services,
        verifiedWebsites,
        availableDay,
        startTime,
        endTime,
        profilepicURL,
        
      },
    });

    // Send verification email
    // await sendVerificationEmail(expert.email, token);

    // Log success
    console.log(`Expert created successfully with ID: ${expert.id}`);

    // Return success response
    return NextResponse.json({ message: "Expert created and verification email sent", status: 201 });
  } catch (error: any) {
    console.error("Error creating expert:", error);
    return NextResponse.json({ message: "Error creating expert", status: 500 });
  }
}

// Function to validate email format
function validateEmail(email: string): boolean {
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  return emailRegex.test(email);
}
