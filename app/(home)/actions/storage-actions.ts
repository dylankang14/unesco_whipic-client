"use server";

import { customFetch, CustomFetcherReturnType } from "@/libs/fetcher";

export interface StorageInfoType {
  storageUsageList: [
    {
      driveName: string;
      totalSize: number;
      availableSize: number;
    }
  ];
  departmentUsageList: [
    {
      departmentId: number;
      departmentName: string;
      usedSize: number;
    },
    {
      departmentId: number;
      departmentName: string;
      usedSize: number;
    },
    {
      departmentId: number;
      departmentName: string;
      usedSize: number;
    },
    {
      departmentId: number;
      departmentName: string;
      usedSize: number;
    },
    {
      departmentId: number;
      departmentName: string;
      usedSize: number;
    }
  ];
}

export async function getStorageInfo(): Promise<CustomFetcherReturnType> {
  const response = await customFetch(`http://****:8080/api/1.0/app/storage/getUsageInfo`, {
    method: "GET",
  });

  return response;
}
