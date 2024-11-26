"use server";

import { customFetch } from "@/libs/fetcher";
import { error } from "console";
import { NextResponse } from "next/server";
import { z } from "zod";

const MAX_TOTAL_FILE_SIZE = 1000 * 1024 * 1024;

const formSchema = z.object({
  folderId: z.string().trim(),
  publicFlag: z.string().nullable(),
  hashTags: z.string().trim(),
  files: z
    .array(z.instanceof(File))
    .nonempty("최소 한개이상의 파일을 선택하세요.")
    .refine(
      (files) => {
        const totalSize = files.reduce((acc, file) => acc + file.size, 0);
        return totalSize <= MAX_TOTAL_FILE_SIZE;
      },
      { message: "업로드 파일 용량의 총합은 1,000MB를 초과할 수 없습니다." }
    ),
});

export async function uploadFiles(prevState: any, formData: FormData) {
  const data = {
    folderId: formData.get("folderId"),
    publicFlag: formData.get("publicFlag"),
    hashTags: formData.get("hashTags"),
    files: formData.getAll("files"),
  };

  const result = formSchema.safeParse(data);
  if (!result.success) {
    return {
      ok: false,
      status: 400,
      data: result.error.flatten(),
    };
  } else {
    const dataPublicFlag = result.data.publicFlag === "on" ? "Y" : "N";
    const newFormData = new FormData();

    result.data.files.map((file: any) => {
      const encodedFileName = Buffer.from(file.name, "ascii").toString("utf8");
      const newFile = new File([file], encodedFileName, { type: file.type, lastModified: file.lastModified });
      newFormData.append("files", newFile as any);
    });

    const response = await customFetch(
      `http://****:8080/api/1.0/admin/file/upload?folderId=${result.data.folderId}&publicFlag=${dataPublicFlag}&hashTags=${result.data.hashTags}`,
      {
        method: "POST",
        headers: {
          accept: "application/json",
        },
        body: newFormData,
      }
    );
    if (!response.ok) {
      return {
        ok: false,
        status: 400,
        data: {
          error:
            "파일 업로드에 문제가 발생했습니다. 중복된 파일명의 파일이거나, 허용되지 않는 확장자입니다. 확인후 다시 업로드해주세요.",
        },
      };
    }
    return response;
  }
}

export async function renameFolder(prevState: any, formData: FormData) {
  const data = {
    folderId: formData.get("folderId"),
    folderName: formData.get("folderName"),
  };

  const response = await customFetch("http://****:8080/api/1.0/admin/folder/update", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return response;
}
