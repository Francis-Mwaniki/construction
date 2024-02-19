import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

// Get all services
export async function POST(req: Request, res: Response) {
  try {
    const data = await req.json();

    // Validate request body
    if (!data) {
      return NextResponse.json({
        message: "Invalid request",
        status: 400,
      });
    }
    const { id } = data;
    console.log("id", id);
 /* 
 
 */
        const expert = await prisma.expert.findUnique({
            where: { id:parseInt(id)
             },
            select:{
                id: true,
                firstName: true,
                lastName: true,
                email: true,
                certifications: true,
                services: true,
                bio: true,
                verifiedWebsites: true,
                availableDay: true,
                startTime: true,
                endTime: true,
                profilepicURL: true,
                projectss: true,

            }
        });

        console.log("expert-----", expert);

          
      return NextResponse.json({
        message: "ok",
        status: 200,
        data: expert,
      });
  } catch (error: any) {
    return NextResponse.json({
      message: error.message,
      status: 500,
    });
  }
}
