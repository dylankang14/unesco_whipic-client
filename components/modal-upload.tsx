"use client";

import { HomeIcon, PlusIcon } from "@heroicons/react/24/outline";
import Input from "./input";
import Select from "./select";
import Toggle from "./toggle";
import InputFile from "./input-file";
import { customFetch } from "@/libs/fetcher";
import { useEffect, useRef, useState } from "react";
import { useFormState } from "react-dom";
import { uploadFiles } from "@/app/(home)/actions";
import Breadcrumbs from "./breadcrumbs";
import { ListFolderProps } from "./table-main";
import Button from "./button";
import { useParams, useRouter } from "next/navigation";

interface ModalUploadProps {
  parentFolderList: ListFolderProps[];
  currentFolderId: number;
}

export default function ModalUpload({ parentFolderList, currentFolderId }: ModalUploadProps) {
  const [state, dispatch] = useFormState(uploadFiles, null);
  const [msg, setMsg] = useState("");
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state && "ok" in state && state.ok) {
      formRef.current?.reset();
      router.refresh();
      (document.getElementById("file-upload") as HTMLFormElement)?.close();
    }
    if (state?.data.error) setMsg(state.data.error);
  }, [state, router]);

  return (
    <>
      <button
        className="fixed bottom-4 right-4 flex justify-center items-center bg-warning size-12 rounded-full shadow-lg cursor-pointer"
        onClick={() => (document?.getElementById("file-upload") as HTMLFormElement)?.showModal()}
      >
        <PlusIcon className="size-10 text-white" />
      </button>
      <dialog id="file-upload" className="modal">
        <div className="modal-box w-11/12 max-w-3xl p-0">
          <div>
            <button
              onClick={() => (document.getElementById("file-upload") as HTMLFormElement)?.close()}
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            >
              ✕
            </button>
          </div>
          <h3 className="font-bold text-lg px-5 py-3 border-b">파일 업로드</h3>
          <form action={dispatch} ref={formRef} className="px-5 py-4 flex flex-col gap-4">
            <div className="grid grid-cols-[max-content_1fr] items-center gap-4">
              <label htmlFor="folderId">현재폴더</label>
              <Breadcrumbs parentFolderList={parentFolderList} />
              <div className="hidden">
                <Input name="folderId" type="text" defaultValue={currentFolderId} hidden />
              </div>
              <label htmlFor="publicFlag">일반 공개</label>
              <div className="form-control">
                <Input name="publicFlag" id="publicFlag" type="checkbox" className="toggle" defaultChecked />
              </div>
              <label htmlFor="hashTags">태그</label>
              <Input name="hashTags" type="text" />
              <label htmlFor="files">파일선택</label>
              <Input
                name="files"
                type="file"
                multiple
                className="file-input file-input-bordered file-input-md w-full"
                required
                errors={state?.data?.fieldErrors?.files}
              />
            </div>
            {msg !== "" ? <div className="text-sm text-center text-error">{msg}</div> : null}
            <div className="flex justify-center items-center gap-2">
              <Button text="업로드" className="btn btn-sm px-8 btn-primary" />
              <button
                onClick={() => (document.getElementById("file-upload") as HTMLFormElement)?.close()}
                className="btn btn-sm px-8 btn-error"
              >
                취소
              </button>
            </div>
          </form>
        </div>
        <div
          onClick={() => (document.getElementById("file-upload") as HTMLFormElement)?.close()}
          className="modal-backdrop"
        >
          <button>close</button>
        </div>
      </dialog>
    </>
  );
}
