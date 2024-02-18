import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

// Get all services
export async function POST(req: Request, res: Response) {
  try {
    const data = await req.json();
    console.log("data", data);
    

    // Validate request body
    if (!data) {
      return NextResponse.json({
        message: "Invalid request",
        status: 400,
      });
    }
    const { id } = data;
    console.log("id", id);
    

      const serviceProviders = await prisma.serviceProvider.findMany({
       where:{
            id: id
       },
        include: {
          services: true,
          projects: true,
          links: true,
        },
      });
        console.log("serviceProviders-----", serviceProviders);

        const services = await prisma.service.findMany(
           
          );

          console.log("services-----", services);
          
      return NextResponse.json({
        message: "Service providers fetched successfully",
        status: 200,
        data: serviceProviders,
      });
  } catch (error: any) {
    return NextResponse.json({
      message: error.message,
      status: 500,
    });
  }
}
