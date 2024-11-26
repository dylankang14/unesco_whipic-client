"use client";

import { ClipboardDocumentCheckIcon, Cog6ToothIcon } from "@heroicons/react/24/outline";
import { InitialDataProps, ListFileProps } from "./table-main";
import { ChangeEvent, useState } from "react";
import Button from "./button";
import Breadcrumbs from "./breadcrumbs";
import Input from "./input";
import { customFetch } from "@/libs/fetcher";
import { useRouter } from "next/navigation";

export default function ModalFileStatus({
  fileId,
  hashTagList,
  originalFileName,
  fileLinkUrl,
  parentFolderList,
  folderId,
}: Pick<ListFileProps, "fileId" | "originalFileName" | "fileLinkUrl" | "hashTagList"> & {
  parentFolderList: any;
  folderId: number;
}) {
  const router = useRouter();
  const [fileUrl, setFileUrl] = useState(fileLinkUrl);
  const [copyResult, setCopyResult] = useState("");
  const [hash, setHash] = useState(hashTagList.join(", "));
  const [folder, setFolder] = useState("");

  const handleCopy = async () => {
    console.log("copy fire :", fileUrl);

    if (navigator.clipboard) {
      console.log("in navigation :", fileUrl);
      try {
        await navigator.clipboard.writeText(fileUrl);
        setCopyResult("파일주소 복사가 완료되었습니다.");
      } catch (error) {
        setCopyResult("파일주소 복사를 실패하였습니다.");
        fallback(fileUrl);
        console.error("Failed to copy: ", error);
      }
    } else {
      await fallback(fileUrl);
    }
  };
  const fallback = async (fileUrl: string) => {
    console.log("fallback copy fire :", fileUrl);
    const textarea = document.createElement("textarea");
    textarea.value = fileUrl;
    document.body.appendChild(textarea);
    textarea.select();
    try {
      // @ts-ignore
      document.execCommand("copy");
      console.log("Fallback: Text copied successfully");
    } catch (err) {
      console.error("Fallback: Failed to copy text: ", err);
    }
    document.body.removeChild(textarea);
  };

  const newHashTagList = (e: ChangeEvent<HTMLInputElement>) => {
    setHash(e.target.value);
  };
  const handleFolder = (e: ChangeEvent<HTMLInputElement>) => {
    setFolder(e.target.value);
  };

  const handleFileUpdate = async () => {
    const newHash = hash.split(",").map((item) => item.trim());
    const targetFolder = folder !== "" ? folder : folderId;
    const data = {
      fileId: fileId,
      // fileName: "string",
      // publicFlag: "string",
      targetFolderId: folder ? folder : folderId,
      hashTags: newHash,
    };

    const response = await customFetch("http://****:8080/api/1.0/admin/file/update", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (response.ok) {
      (document?.getElementById(fileId) as HTMLFormElement)?.close();
      router.refresh();
    }
  };
  return (
    <>
      <div className="flex items-center">
        <button
          className="btn btn-primary px-1 h-[30px] min-h-[30px]"
          onClick={() => (document?.getElementById(fileId) as HTMLFormElement)?.showModal()}
        >
          <Cog6ToothIcon className="size-6" />
        </button>
      </div>
      <dialog id={fileId} className="modal">
        <div className="modal-box p-0 max-w-4xl">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
          </form>
          <h3 className="font-bold text-lg px-5 py-2 border-b">{originalFileName}</h3>
          <div className="px-5 py-6 flex flex-col gap-6">
            <div className="grid grid-cols-[max-content_1fr] gap-x-4 gap-y-5 *:flex *:items-center">
              <div className="font-semibold">파일 경로</div>
              <div className="flex flex-grow ">
                <Breadcrumbs parentFolderList={parentFolderList} />
              </div>
              <div className="font-semibold">파일 외부링크</div>
              <div className="flex flex-grow input input-bordered p-0 justify-between overflow-hidden items-stretch">
                <span className="flex items-center px-4 overflow-x-auto whitespace-nowrap cursor-text">
                  {fileLinkUrl}
                </span>
                {/* <span
                  onClick={handleCopy}
                  className="bg-primary flex self-stretch items-center text-white px-3 cursor-pointer"
                >
                  <ClipboardDocumentCheckIcon className="size-6" />
                </span> */}
              </div>
              <label htmlFor="newHashTagList" className="font-semibold">
                변경할 폴더 ID
              </label>
              <div className="flex-1">
                <Input name="folderId" type="text" value={folder} onChange={handleFolder} />
              </div>
              <label htmlFor="newHashTagList" className="font-semibold">
                태그리스트
              </label>
              <div className="flex-1">
                <Input
                  name="newHashTagList"
                  type="text"
                  required
                  value={hash}
                  onChange={(e) => {
                    newHashTagList(e);
                  }}
                />
              </div>
            </div>
            {copyResult && <div className="text-sm text-center text-gre">{copyResult}</div>}
            <div className="flex justify-center items-center gap-2">
              <Button onClick={handleFileUpdate} text="확인" className="btn btn-sm px-8 btn-primary" />
              <Button
                onClick={() => (document?.getElementById(fileId) as HTMLFormElement)?.close()}
                text="닫기"
                className="btn btn-sm px-8 btn-error"
              />
            </div>
          </div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </>
  );
}
