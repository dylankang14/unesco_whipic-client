import { customFetch } from "@/libs/fetcher";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const body = await request.json();

  const response = await customFetch(`http://****:8080/api/1.0/admin/file/delete?fileIdList=${body.join(",")}`, {
    method: "DELETE",
  });
  console.log("response in next :", response);

  return NextResponse.json(response);
}
export async function GET(request: NextRequest) {
  console.log("get req:", request);

  const { searchParams } = new URL(request.url);
  const fileId = searchParams.get("fileId");
  const response = await customFetch(`http://****:8080/api/1.0/admin/file/download/${fileId}`, {
    method: "GET",
  });

  if (response && response.data) {
    return new NextResponse(response.data, {
      status: 200,
      headers: response.headers,
    });
  } else {
    return NextResponse.json(
      {
        error: "File download filed",
      },
      { status: response.status || 500 }
    );
  }
}
