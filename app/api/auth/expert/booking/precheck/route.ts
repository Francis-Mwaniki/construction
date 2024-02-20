
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";


const prisma = new PrismaClient();

// book expert
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

    

    //check if the expert exists
    const user = await prisma.expert.findUnique({
      where: { id: parseInt(data.id) },
    });

    if (!user) {
      return NextResponse.json({
        message: "Expert not found",
        status: 404,
      });
    }


    //see if the expert is available by checking if the selected hour is in the expert's available hours
    const availableHours = user.startTime + "-" + user.endTime;
    const availableHoursArray = availableHours.split("-");
    const startHour = parseInt(availableHoursArray[0]);
    const endHour = parseInt(availableHoursArray[1]);
    const selectedHourInt = parseInt(data.hour);
    if (selectedHourInt < startHour || selectedHourInt > endHour) {
      return NextResponse.json({
        message: "Expert is not available at this hour",
        status: 400,
      });
    }

    //check if the hour is already booked
    const existingBooking = await prisma.meeting.findFirst({
      where: {
        expertId: parseInt(data.id),
        hour: parseInt(data.hour),
      },
    });

    if (existingBooking) {
      return NextResponse.json({
        message: "Expert is already booked at this hour",
        status: 400,
      });
    }





    

  

          
      return NextResponse.json({
        message: "Available for booking",
        status: 200,
        data:  user,
      });
  } catch (error: any) {
    return NextResponse.json({
      message: error.message,
      status: 500,
    });
  }
}
