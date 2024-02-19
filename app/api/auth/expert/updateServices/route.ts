import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

//update expert profile
export async function POST(req: Request, res: Response) {
  try {
    const data = await req.json();

    /* id: id,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        email: newUser.email,
        certifications: newUser.certifications,
        services: newUser.services,
        bio: newUser.bio,
        verifiedWebsites: newUser.verifiedWebsites,
        availableDay: newUser.availableDay,
        endTime: newUser.endTime,
        projectss: newUser.projectss
        
        */

    // Validate request body
    if (!data) {
      return NextResponse.json({
        message: "Invalid request",
        status: 400,
      });
    }

    const id = parseInt(data.id)
    const newUser = {
        services: data.services

    };

    // Update user
    const updatedUser = await prisma.expert.update({
      where: { id: id },
        data: newUser,
    });

    if (!updatedUser) {
        return NextResponse.json({
            message: "User not found",
            status: 404,
        });
    }




          
      return NextResponse.json({
        message: "ok",
        status: 200,
        data: updatedUser,
      });
  } catch (error: any) {
    return NextResponse.json({
      message: error.message,
      status: 500,
    });
  }
}
