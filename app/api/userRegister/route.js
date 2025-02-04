import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/users";
import { NextResponse } from "next/server"; // Import MongoDB connection function

export async function POST(req) {
  try {

    const { name, email, password, role } = await req.json();
    console.log("User data: ", name, email, password, role);
    await connectMongoDB();
    
    const user = await User.create({ name, email, password, role });

    return NextResponse.json(
      { message: "User registered."},
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "An error occurred while registering the user" },
      { status: 500 }
    );
  }
}