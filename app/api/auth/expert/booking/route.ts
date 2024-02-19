
 import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
//TemplateID:  d-20c6e30370374c6ca63b6f0179ccf14a
import sendgrid from "@sendgrid/mail";

const prisma = new PrismaClient();

sendgrid.setApiKey(process.env.SENDGRID_API_KEY!);
// book expert
export async function POST(req: Request, res: Response) {
    if(!process.env.SENDGRID_API_KEY) {
        console.log("SENDGRID_API_KEY is not set");
        
        return  NextResponse.json({ message: "Invalid request", 
        status: 400
       });
      }
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

        // Get the current date and time
        const currentDate = new Date();
        const currentHour = currentDate.getHours();

        // Reset hour to 0 every 24 hours
        if (currentHour >= 24) {
        data.hour = "0";
        }




    // Create booking
    const booking = await prisma.meeting.create({
        data: {
            name: data.name,
            email: data.email,
            message: data.message,
            hour: parseInt(data.hour),
            expertId: parseInt(data.id),
            expertEmail: user.email,
            expertName: `${user.firstName} ${user.lastName}`,
            shareMeetingLink: data.shareMeetingLink,
        },
    });

    if (!booking) {
        return NextResponse.json({
            message: "Booking failed",
            status: 500,
        });
    }


    const mail = {
        to: user.email,
        subject: 'New Booking',
        from: 'francismwanik254@gmail.com', // Fill it with your validated email on SendGrid account
        dynamicTemplateData: {
            name: user.firstName,
            email: user.email,
            message: data.message,
            expertId: data.id,
            hour: data.hour + ":00" + "-" + (parseInt(data.hour) + 1) + ":00",
            shareMeetingLink: data.shareMeetingLink,
            expertName: `${user.firstName} ${user.lastName}`,
            expertEmail: user.email,
        },
        templateId: 'd-20c6e30370374c6ca63b6f0179ccf14a',
      };
        try {
          await sendgrid.send(mail);
          console.log("email sent");
          
        } catch (error: any) {
          console.error(error);
          if (error.message) {
            console.log(error.message);
            
            return  NextResponse.json({ message: error.message,
              status: 500
             });
          }

          
        }


          
      return NextResponse.json({
        message: "ok",
        status: 200,
        data: booking,
      });
  } catch (error: any) {
    return NextResponse.json({
      message: error.message,
      status: 500,
    });
  }
}
