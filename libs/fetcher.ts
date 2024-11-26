"use server";

import { cookies } from "next/headers";

export interface CustomFetcherReturnType {
  ok: boolean;
  status: number;
  headers?: Headers;
  data?: any;
  message?: string | undefined;
}

export async function customFetch(url: string, options: RequestInit = {}): Promise<CustomFetcherReturnType> {
  const cookieStore = cookies();
  let accessToken = cookieStore.get("accessToken")?.value;
  const refreshToken = cookieStore.get("refreshToken")?.value;

  const defaultHeaders: Record<string, any> = {
    Authorization: "process.env.TOKEN",
    "x-auth-token": accessToken,
  };

  if (cookieStore.has("accessToken")) defaultHeaders["x-auth-token"] = cookieStore.get("accessToken")?.value;

  const newOptions: RequestInit = {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
  };

  try {
    const response = await fetch(url, newOptions);
    console.log("raw response :", response);
    const contentType = response.headers.get("Content-Disposition") || "";
    let result = null;

    if (response.status === 401) {
      const newAccessToken = (await refreshAccessToken(refreshToken!)).data;
      console.log("token refresh fire~!!", response.status, response);
      if (newAccessToken) {
        cookieStore.set("accessToken", newAccessToken);
        try {
          const response = await fetch(url, newOptions);
          if (response.ok) {
            if (contentType.includes("attachment")) {
              result = await response.blob();
              return {
                ok: response.ok,
                status: response.status,
                headers: response.headers,
                data: result,
                // message: response.statusText || "Unknown error",
              };
            } else {
              result = await response.json().catch(() => null);
              return {
                ok: response.ok,
                status: response.status,
                headers: response.headers,
                data: result,
                // message: response.statusText || "Unknown error",
              };
            }
          }
        } catch (error) {
          return {
            ok: false,
            status: 500,
            data: null,
            message: error instanceof Error ? error.message : "Unknown error",
          };
        }
      }
    }

    if (contentType.includes("attachment")) {
      result = await response.blob();
      return {
        ok: response.ok,
        status: response.status,
        headers: response.headers,
        data: result,
        // message: response.statusText || "Unknown error",
      };
    } else {
      result = await response.json().catch(() => null);
      return {
        ok: response.ok,
        status: response.status,
        headers: response.headers,
        data: result,
        // message: response.statusText || "Unknown error",
      };
    }
  } catch (error) {
    return {
      ok: false,
      status: 500,
      data: null,
      message: error instanceof Error ? error.message : "Unknown error",
    };
  }

  async function refreshAccessToken(refreshToken: string) {
    console.log("refresh start! :", refreshToken);
    const response = await fetch("http://****:8080/api/1.0/admin/user/refreshToken", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ refreshToken }),
    });

    if (response.ok) {
      const data = await response.json();
      console.log("refresh success! :", data);

      return {
        ok: false,
        status: 401,
        data: data.data.token.accessToken.key,
        message: { error: "Fail to accessToken refresh from server." },
      };

      // return data.data.token.accessToken.key;
    }
    return {
      ok: false,
      status: 401,
      data: null,
      message: { error: "Fail to accessToken refresh from server." },
    };
  }
}
