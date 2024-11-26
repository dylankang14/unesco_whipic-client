import { customFetch } from "@/libs/fetcher";

export async function searchAction(prevState: any, formData: FormData) {
  const data = Object.fromEntries(formData.entries());

  const response = await customFetch(
    `http://****:8080/api/1.0/admin/folder/retrieveList/1?searchTarget=FILE_NAME_HASH_TAG&keyword=${data.search_text}`,
    {
      method: "GET",
    }
  );

  return response;
}

export const getFolders = async (folderId = 1, search_text?: string) => {
  const data = await customFetch(
    `http://****:8080/api/1.0/admin/folder/retrieveList/${folderId}?searchTarget=FILE_NAME_HASH_TAG${
      search_text ? `&keyword=${search_text}` : ""
    }`,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    }
  );
  return data.data;
};
