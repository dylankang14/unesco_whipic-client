"use client";

import { useState } from "react";
import Button from "./button";
import Input from "./input";
import { useRouter } from "next/navigation";

export default function ModalCreateFolder({ currentFolderId }: { currentFolderId: number }) {
  const [folderName, setFolderName] = useState<string>("");
  const router = useRouter();
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value },
    } = event;
    setFolderName(value);
  };

  const createFolder = async () => {
    const response = await fetch("nextApi/folder", {
      method: "POST",
      body: JSON.stringify({
        folderName: folderName,
        parentFolderId: currentFolderId,
        isRoot: false,
      }),
    });
    setFolderName("");

    if (response.ok) {
      router.refresh();
      (document.getElementById("add-folder") as HTMLFormElement)?.close();
    }
  };
  return (
    <>
      <button
        className="btn btn-primary btn-sm"
        onClick={() => (document?.getElementById("add-folder") as HTMLFormElement)?.showModal()}
      >
        폴더 추가
      </button>
      <dialog id="add-folder" className="modal">
        <div className="modal-box p-0">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
          </form>
          <h3 className="font-bold text-lg px-5 py-2 border-b">폴더 추가</h3>
          <div className="px-5 py-4 flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <label htmlFor="folderName text">폴더명</label>
              <div className="flex-1">
                <Input name="folderName" type="text" required value={folderName} onChange={onChange} />
              </div>
            </div>
            <div className="flex justify-center items-center gap-2">
              <Button onClick={createFolder} text="확인" className="btn btn-sm px-8 btn-primary" />
              <button
                onClick={() => (document?.getElementById("add-folder") as any)?.close()}
                className="btn btn-sm px-8 btn-error"
              >
                취소
              </button>
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
