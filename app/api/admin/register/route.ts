import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import crypto from "crypto";
import bcrypt from "bcryptjs"; // Import for password hashing
const prisma = new PrismaClient();


export async function POST(req: Request, res: Response) {

  try {
    if (!req.body) {
      return new NextResponse("Invalid request", { status: 400 });
    }
    const  { email, password,username } = await req.json(); 

    console.log(email, password,username);
    

    // Validate email existence
    const existingUser = await prisma.admin.findUnique({
      where: { email },
    });
    if (existingUser) {
      // return new NextResponse("Email already exists", { status: 400 });
      return  NextResponse.json({ message: "Email already exists", 
       status: 400
      }); 
    }

    // (Implement password validation rules here)
     if (password.length < 8) {
      return NextResponse.json({ message: "Password is too short", 
        status: 400
       });
       
    }

    // Generate token
    const token = crypto.randomBytes(32).toString("hex");

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
     await prisma.admin.create({
      data: {
        email: email,
        username: username,
        password: hashedPassword,
      }
    });


     

        //User created successfully and verification email sent to ${email}
        return  NextResponse.json({ message: "ok", 
       status: 201
      });


  } catch (error: any) {
    return  NextResponse.json({ message: error.message, 
       status: 500
      });
  }
}