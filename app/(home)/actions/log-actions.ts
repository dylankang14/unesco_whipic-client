"use server";

import { customFetch, CustomFetcherReturnType } from "@/libs/fetcher";

export async function getLog(fromDate: string, toDate: string, page = 0): Promise<CustomFetcherReturnType> {
  const response = await customFetch(
    `http://****:8080/api/1.0/admin/log/retrieveAccessLogList?searchTarget=USER_NAME&fromDate=${fromDate}&toDate=${toDate}&page=${page}&size=30`,
    {
      method: "GET",
    }
  );
  return response;
}
