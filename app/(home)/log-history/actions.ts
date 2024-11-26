"use server";

import { customFetch } from "@/libs/fetcher";

export async function getLogHistory(prevState: any, formData: FormData) {
  const data = Object.fromEntries(formData.entries());
  const response = await customFetch("http://****:8080/", {
    method: "GET",
  });

  if (!response.ok) {
    console.error(`Error: ${response.status}`);
  }
  return response;
}
