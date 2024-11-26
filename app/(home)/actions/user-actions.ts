"use server";

import { PASSWORD_REGEX, PASSWORD_REGEX_ERROR } from "@/libs/constants";
import { customFetch } from "@/libs/fetcher";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { NextResponse } from "next/server";
import { z } from "zod";

export async function getUser() {
  const userId = cookies().get("userId")?.value;
  const response = await customFetch(`http://****:8080/api/1.0/admin/user/getDetail/${userId}`, {
    method: "GET",
  });

  console.log("getUser res :", response);

  if (response.ok) {
    return response.data.data;
  } else {
    return { message: "Fail to get user info." };
  }
}

export async function logOut() {
  const response = await customFetch(`http://****:8080/api/1.0/admin/user/logout`, {
    method: "POST",
  });

  const cookiesStore = cookies();

  cookiesStore.set("Authorization", "", { maxAge: 0 });
  cookiesStore.set("accessToken", "", { maxAge: 0 });
  cookiesStore.set("refreshToken", "", { maxAge: 0 });
  cookiesStore.set("authority", "", { maxAge: 0 });
  cookiesStore.set("userId", "", { maxAge: 0 });

  redirect("/login");
}

const checkPasswords = ({ new_password, confirm_password }: { new_password: string; confirm_password: string }) =>
  new_password === confirm_password;

const resetPasswordSchema = z
  .object({
    userId: z.string(),
    new_password: z.string().regex(PASSWORD_REGEX, PASSWORD_REGEX_ERROR),
    confirm_password: z.string(),
  })
  .refine(checkPasswords, {
    message: "비밀번호가 일치하지 않습니다. 다시 입력해주세요.",
    path: ["confirm_password"],
  });

export async function resetPassword(prevState: any, formData: FormData) {
  const data = {
    userId: formData.get("userId"),
    new_password: formData.get("new_password"),
    confirm_password: formData.get("confirm_password"),
  };
  const result = resetPasswordSchema.safeParse(data);
  if (!result.success) {
    console.log("result error:", result.error.flatten());
    // return result.error.flatten();
    return {
      ok: false,
      status: 400,
      data: result.error.flatten(),
    };
  } else {
    const response = await customFetch("http://****:8080/api/1.0/admin/user/resetPassword", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId: result.data.userId, newPassword: result.data.new_password }),
    });

    return response;
  }
}

const updatePasswordSchema = z
  .object({
    userId: z.string(),
    originalPassword: z.string().regex(PASSWORD_REGEX, PASSWORD_REGEX_ERROR),
    new_password: z.string().regex(PASSWORD_REGEX, PASSWORD_REGEX_ERROR),
    confirm_password: z.string(),
  })
  .refine(checkPasswords, {
    message: "비밀번호가 일치하지 않습니다. 다시 입력해주세요.",
    path: ["confirm_password"],
  });

export async function updatePassword(prevState: any, formData: FormData) {
  const data = {
    userId: "whipic",
    originalPassword: formData.get("originalPassword"),
    new_password: formData.get("new_password"),
    confirm_password: formData.get("confirm_password"),
  };
  const result = updatePasswordSchema.safeParse(data);
  if (!result.success) {
    console.log("result error:", result.error.flatten());
    // return result.error.flatten();
    return {
      ok: false,
      status: 400,
      data: result.error.flatten(),
    };
  } else {
    const response = await customFetch("http://****:8080/api/1.0/admin/user/updatePassword", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: result.data.userId,
        originalPassword: result.data.originalPassword,
        newPassword: result.data.new_password,
      }),
    });

    return response;
  }
}
