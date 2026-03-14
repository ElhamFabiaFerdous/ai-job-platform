import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function POST(req) {

  const data = await req.formData();
  const file = data.get("resume");

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const filePath = path.join(process.cwd(),"uploads",file.name);

  fs.writeFileSync(filePath,buffer);

  return NextResponse.json({message:"File uploaded"});
}
