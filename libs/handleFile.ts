import { customFetch } from "./fetcher";

export const handlePublicFlag = async (fileId: string, checked: boolean) => {
  const payload = {
    fileId: fileId,
    publicFlag: checked ? "Y" : "N",
  };

  try {
    const response = await customFetch(`http://****:8080/api/1.0/admin/file/update`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`File change failed : ${fileId}`);
    }

    return { ok: true };
  } catch (error) {
    return { ok: false, error: error };
  }
};
