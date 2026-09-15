import { NextResponse } from "next/server";
import { subscribeNewsletter } from "@/actions/newsletter";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();
    const result = await subscribeNewsletter(email);
    return NextResponse.json(result);
  } catch {
    return NextResponse.json({ success: false, message: "Invalid request" }, { status: 400 });
  }
}
