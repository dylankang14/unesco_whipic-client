"use client";

import React, { useEffect, useState } from "react";
import Button from "./button";
import Input from "./input";
import { useFormState } from "react-dom";
import { renameFolder } from "@/app/(home)/actions";
import { useRouter } from "next/navigation";
import { FolderIcon } from "@heroicons/react/24/outline";
import { getUser } from "@/app/(home)/actions/user-actions";
import { customFetch } from "@/libs/fetcher";
import { UserInfoType } from "./header";

export default function ModalFolderStatus({
  children,
  className,
  folderId,
  folderName,
}: {
  children: React.ReactNode;
  className?: string;
  folderId: number;
  folderName: string;
}) {
  const [state, dispatch] = useFormState(renameFolder, null);
  const router = useRouter();
  const [user, setUser] = useState<UserInfoType | null>(null);
  useEffect(() => {
    async function getUserInfo() {
      const user = await getUser();

      setUser((prev) => ({ ...prev, ...user }));
    }
    getUserInfo();
  }, []);

  const deleteFolder = async (folderId: number) => {
    const confirmed = window.confirm(
      "이 폴더를 삭제하시면 폴더내의 하위폴더와 모든 파일들도 함께 삭제됩니다.\n정말로 이 폴더를 삭제하시겠습니까?"
    );

    if (confirmed) {
      try {
        const response = await customFetch(`http://****:8080/api/1.0/admin/folder/delete/${folderId}`, {
          method: "DELETE",
        });

        if (!response.ok) {
          console.error("폴더 삭제중 오류 발생!");
        }
        alert("폴더가 삭제 되었습니다.");
        router.refresh();
      } catch (error) {
        console.error("폴더삭제중 오류 발생:", error);
        alert("폴더 삭제중 오류가 발생했습니다.");
      }
    }
  };

  useEffect(() => {
    if (state && "ok" in state && state.ok) {
      router.refresh();
      (document.getElementById(`folder-${folderId}`) as HTMLFormElement)?.close();
    }
  }, [state, router, folderId]);
  return (
    <>
      <div
        className={className}
        onClick={() => (document?.getElementById(`folder-${folderId}`) as HTMLFormElement)?.showModal()}
      >
        {children}
      </div>
      <dialog id={`folder-${folderId}`} className="modal">
        <div className="modal-box p-0">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
          </form>
          <h3 className="font-bold text-lg px-5 py-2 border-b flex items-center gap-2 flex-wrap">
            <FolderIcon className="size-5" /> <span className="flex-1 truncate">{folderName}</span>
          </h3>
          <form action={dispatch} className="px-5 py-5 flex flex-col gap-4">
            <div className="hidden">
              <Input name="folderId" defaultValue={folderId} hidden required />
            </div>
            <div className="flex items-center gap-2">
              <label htmlFor="folderName text">폴더명 변경</label>
              <div className="flex-1">
                <Input name="folderName" type="text" required />
              </div>
            </div>
            <div className="flex justify-center items-center gap-2">
              <Button text="확인" className="btn btn-sm px-8 btn-primary" />
              <div
                onClick={() => (document?.getElementById(`folder-${folderId}`) as any)?.close()}
                className="btn btn-sm px-8 btn-error"
              >
                취소
              </div>
            </div>
          </form>
          {user?.authority === "SUPER" ? (
            <div
              onClick={() => deleteFolder(folderId)}
              className="bg-red-500 text-white p-4 cursor-pointer font-semibold"
            >
              현재 폴더 삭제
            </div>
          ) : null}
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </>
  );
}
