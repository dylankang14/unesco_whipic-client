"use server";

import { PASSWORD_MIN_LENGTH, PASSWORD_REGEX, PASSWORD_REGEX_ERROR } from "@/libs/constants";
import { cookies } from "next/headers";
import { z } from "zod";

const formSchema = z.object({
  id: z.string(),
  password: z
    .string({ required_error: "비밀번호를 입력하세요." })
    // .min(PASSWORD_MIN_LENGTH, PASSWORD_REGEX_ERROR)
    .regex(PASSWORD_REGEX, PASSWORD_REGEX_ERROR),
});

export async function logIn(prevState: any, formData: FormData) {
  const data = {
    id: formData.get("id"),
    password: formData.get("password"),
  };
  const result = formSchema.safeParse(data);
  if (!result.success) {
    return result.error.flatten();
  } else {
    const user = await (
      await fetch(`http://****:8080/api/1.0/admin/user/login?userId=${data.id}&password=${data.password}`, {})
    ).json();

    cookies().set("accessToken", user.data.token);
    cookies().set("Authorization", `process.env.TOKEN`);
  }
}
