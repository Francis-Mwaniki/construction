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
    const  { id } = await req.json(); 

    console.log("id",id);
    

    const data = await prisma.meeting.findMany({
        where:{
            id:id
        }
    })


    console.log("data",data);
    
     

        //User created successfully and verification email sent to ${email}
        return  NextResponse.json({ message: "fetched all requests", 
       status: 201,
       data:data
      });


  } catch (error: any) {
    return  NextResponse.json({ message: error.message, 
       status: 500
      });
  }
}