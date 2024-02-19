import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
const prisma = new PrismaClient();

//TemplateID:  d-20c6e30370374c6ca63b6f0179ccf14a
import sendgrid from "@sendgrid/mail";

sendgrid.setApiKey(process.env.SENDGRID_API_KEY!);
export async function POST(req: Request, res: Response) {

  try {
    if (!req.body) {
      return new NextResponse("Invalid request", { status: 400 });
    }
    const  { id,name,
        email,
        message,
        hour,
        expertEmail,
        expertName,
        shareMeetingLink,
        isAccepted } = await req.json(); 

    console.log("id",id);
    //update the request -isAccepted
    const data = await prisma.meeting.update({
        where:{
            id: parseInt(id)
        },
        data:{
            isAccepted: true
        }
    })

    console.log("data",data);

    if (!data) {
      return NextResponse.json({ message: "No meeting found", status: 404 });
    }

    const mail = {
        to: email,
        subject: 'Booking Accepted',
        from: 'francismwanik254@gmail.com', // Fill it with your validated email on SendGrid account
        dynamicTemplateData: {
            name: name,
            email: email,
            message: message,
            expertId: data.expertId + " " + isAccepted ? "Accepted" : "Declined",
            hour: data.hour + ":00" + "-" + (parseInt(hour) + 1) + ":00",
            shareMeetingLink: shareMeetingLink,
            expertName: expertName,
            expertEmail: expertEmail,
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
    return NextResponse.json({ message: "Meeting accepted successfully. Email sent to the user.", status: 200 });

   
  } catch (error: any) {
    return  NextResponse.json({ message: error.message, 
       status: 500
      });
  }
}