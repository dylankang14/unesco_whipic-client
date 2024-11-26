import { PASSWORD_REGEX, PASSWORD_REGEX_ERROR } from "@/libs/constants";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const loginSchema = z.object({
  userId: z.string(),
  password: z
    .string({ required_error: "비밀번호를 입력하세요." })
    // .min(PASSWORD_MIN_LENGTH, PASSWORD_REGEX_ERROR)
    .regex(PASSWORD_REGEX, PASSWORD_REGEX_ERROR),
});
export type LoginSchemaType = z.infer<typeof loginSchema>;

export async function POST(request: NextRequest) {
  const body = await request.json();
  const result = loginSchema.safeParse(body);

  if (result.success) {
    const response = await fetch(`http://****:8080/api/1.0/admin/user/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId: result.data.userId, password: result.data.password }),
    });

    const { data } = await response.json();
    console.log("data:", data, new Date(data.token.accessToken.expires).toISOString());

    if (data.token) {
      const res = NextResponse.json({ message: "Logged in successfully" });
      res.cookies.set("Authorization", "process.env.TOKEN");
      res.cookies.set("accessToken", data.token.accessToken.key, {
        expires: new Date(data.token.accessToken.expires),
      });
      res.cookies.set("refreshToken", data.token.refreshToken.key, {
        expires: new Date(data.token.refreshToken.expires),
      });
      res.cookies.set("authority", data.authority, {
        expires: new Date(data.token.accessToken.expires),
        httpOnly: true,
      });
      res.cookies.set("userId", data.userId, {
        expires: new Date(data.token.accessToken.expires),
        httpOnly: true,
      });
      return res;
    } else {
      return NextResponse.json({ message: "Invalid login" }, { status: 401 });
    }
  } else {
    console.log("error back : ", result.error.flatten());

    return NextResponse.json({ errors: result.error.flatten() }, { status: 400 });
  }
}
