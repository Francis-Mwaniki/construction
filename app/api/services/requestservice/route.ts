import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

// submit request
export async function POST(req: Request, res: Response) {
  try {
    const data = await req.json();

    // Validate request body //name, email, details, serviceId
    if (!data) {
      return NextResponse.json({
        message: "Invalid request",
        status: 400,
      });
    }

    const { name, email, details, servicesId, userId } = data;

    //log 
    console.log("name", name, "email", email, "details", details, "serviceId", servicesId);

    //create request
    const request = await  prisma.serviceRequest.create({
      data:{
        name: name,
        email: email,
        details: details,
       services: {connect: {id: servicesId}},
        status: "pending",
        createdAt: new Date(),
        UpdatedAt: new Date(),

        


      }


    });

    //log
    console.log("request", request);

    return NextResponse.json({
      message: "Request submitted successfully",
      status: 200,
      data: request,
    });




    

    
      
  } catch (error: any) {
    return NextResponse.json({
      message: error.message,
      status: 500,
    });
  }
}
