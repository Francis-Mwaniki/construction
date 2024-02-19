import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

// Get all services
export async function GET(req: Request, res: Response) {
  try {
        const data = await prisma.user.findMany()

        console.log("users-----", data);

          
      return NextResponse.json({
        message: "ok",
        status: 200,
        data: data
      });
  } catch (error: any) {
    return NextResponse.json({
      message: error.message,
      status: 500,
    });
  }
}
