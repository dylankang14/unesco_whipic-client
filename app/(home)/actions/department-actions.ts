import { customFetch } from "@/libs/fetcher";

export async function getDepartments() {
  const response = await customFetch("http://****:8080/api/1.0/admin/department/retrieveList?page=0&size=30", {
    method: "GET",
  });
  return response;
}
