import { customFetch } from "@/libs/fetcher";

export async function getUsageInfo() {
  const data = {};
  const response = await customFetch(`http://****:8080/api/1.0/app/storage/getUsageInfo`, {
    method: "GET",
  });

  return response;
}

export async function getPermissions() {
  const response = await customFetch("http://****:8080/api/1.0/admin/permission/retrieveList", {
    method: "GET",
  });

  return response;
}

export async function updatePermissions(permissionId: string, permissionArray: number[]) {
  const response = await customFetch("http://****:8080/api/1.0/admin/permission/update", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      permissionId: permissionId,
      accessibleDepartmentIdList: permissionArray,
    }),
  });

  return response;
}
