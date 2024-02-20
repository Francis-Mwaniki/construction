import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
const prisma = new PrismaClient();


export async function POST(req: Request, res: Response) {

  try {
    if (!req.body) {
      return new NextResponse("Invalid request", { status: 400 });
    }
    const  { id,expertId } = await req.json(); 

    console.log("id",id,expertId);
    if(!id || !expertId){
        return NextResponse.json({ message: "Invalid request", status: 400 });
        }
    

    const data = await prisma.expert.findUnique({
        where:{
            id: parseInt(expertId)
        },
        select:{
         meetings:true
        }
    })


    console.log("data from bookings",data);
    
     

    if (data === null) {
      return NextResponse.json({ message: "No meeting found", status: 404 });
    }

    //delete the meeting
    const deletedMeeting = await prisma.meeting.delete({
        where:{
            id:parseInt(id)
        }
    })

    console.log("deletedMeeting",deletedMeeting);

    //fetch the updated meetings
    const updatedMeetings = await prisma.expert.findUnique({
        where:{
            id: parseInt(expertId)
        },
        select:{
         meetings:true
        }
    })
  

    return NextResponse.json({ message: "Meeting deleted successfully",
       status: 200 });



  } catch (error: any) {
    return  NextResponse.json({ message: error.message, 
       status: 500
      });
  }
}