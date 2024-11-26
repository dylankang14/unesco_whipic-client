import { customFetch } from "@/libs/fetcher";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const body = await request.json();

  const response = await customFetch(`http://****:8080/api/1.0/admin/folder/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  if (response.ok) {
    return NextResponse.json(response);
  } else {
    return NextResponse.json({ error: "fail to folder creation." });
  }
}
