import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";


const prisma = new PrismaClient();

// Get all services
export async function GET(req: Request, res: Response) {
  try {
    const services = await prisma.service.findMany(
      {
        include: {
          serviceProviders: true,
          providers: true,
          serviceRequests: true,
          additionalResources: true,
        },
      }
    );
    
    return NextResponse.json({
      message: "Services fetched successfully",
      status: 200,
      data: services,
    });
  } catch (error: any) {
    return NextResponse.json({
      message: error.message,
      status: 500,
    });
  }
}


