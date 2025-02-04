import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/users";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await connectMongoDB();
    console.log("Connected to MongoDB");
    const { email } = await req.json();
    const user = await User.findOne({ email });
    return NextResponse.json({ user });
  } catch (error) {
    console.log(error);
  }
}
