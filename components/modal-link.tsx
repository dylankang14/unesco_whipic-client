"use client";

import { HomeIcon, PlusIcon } from "@heroicons/react/24/outline";
import Input from "./input";
import Select from "./select";
import Toggle from "./toggle";
import InputFile from "./input-file";

export default function ModalLink() {
  return (
    <>
      <button
        className="fixed bottom-4 right-4 flex justify-center items-center bg-warning size-12 rounded-full shadow-lg cursor-pointer"
        onClick={() => (document?.getElementById("file-upload") as HTMLFormElement)?.showModal()}
      >
        <PlusIcon className="size-10 text-white" />
      </button>
      <dialog id="file-upload" className="modal">
        <div className="modal-box w-11/12 max-w-5xl p-0">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
          </form>
          <h3 className="font-bold text-lg px-5 py-2 border-b">파일 이름.pdf</h3>
          <div className="px-5 py-4 flex flex-col gap-4">
            <div className="grid grid-cols-[max-content_1fr] items-center gap-2">
              <label htmlFor="folderName text">외부 링크</label>
              <Toggle />
              <label htmlFor="folderName text">태그</label>
              <Input name="tag" />
            </div>
            <InputFile />
            <form method="dialog" className="flex justify-center items-center gap-2">
              <button className="btn btn-sm px-8 btn-primary">업로드</button>
              <button className="btn btn-sm px-8 btn-error">취소</button>
            </form>
          </div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </>
  );
}
