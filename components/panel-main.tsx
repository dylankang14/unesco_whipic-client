"use client";

import { downloadFile } from "@/libs/downloadFile";
import Breadcrumbs from "./breadcrumbs";
import Button from "./button";
import ModalCreateFolder from "./modal-create-folder";
import { ListFolderProps } from "./table-main";
import { useParams, useRouter } from "next/navigation";

interface PanelMainProps {
  parentFolderList: ListFolderProps[];
  currentFolderId: number;
}

export default function PanelMain({ parentFolderList, currentFolderId }: PanelMainProps) {
  const params = useParams();
  const router = useRouter();

  const onDownloadFiles = async () => {
    const checkedFiles = localStorage.getItem("checkedFiles");
    if (checkedFiles) {
      const result = await downloadFile(JSON.parse(checkedFiles));
      if (!result.ok) {
        console.error(result.error);
      } else {
        console.log("download successful");
      }
    }
  };

  const delCheckedFiles = async () => {
    const checkedFiles = localStorage.getItem("checkedFiles");
    console.log("checkedFiles ", checkedFiles, JSON.parse(checkedFiles!));
    const response = await fetch("nextApi/file", {
      method: "POST",
      body: checkedFiles,
    });

    console.log("del response: ", response);
    if (response.ok) router.refresh();
  };

  const onSubmit = (formDate: FormData) => {
    const data = Object.fromEntries(formDate.entries());
    router.push(
      `/${params.folder ? params.folder : 1}?searchTarget=FILE_NAME_HASH_TAG${
        data.search_text ? `&keyword=${data.search_text}` : ""
      }`
    );
  };

  return (
    <div className="card card-compact bg-base-100 shadow w-full border">
      <div className="card-body py-2">
        <div className="flex flex-wrap justify-between flex-col">
          <div className="flex flex-wrap items-center gap-x-5 border-b pt-2 pb-1 mb-2">
            <Breadcrumbs parentFolderList={parentFolderList} />
            <ModalCreateFolder currentFolderId={currentFolderId} />
          </div>
          <div className="flex flex-wrap justify-between items-center">
            <form action={onSubmit} className="flex md:gap-2">
              <label className="input input-bordered input-sm flex items-center gap-2">
                <input name="search_text" type="text" className="grow" placeholder="Search" />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="h-4 w-4 opacity-70"
                >
                  <path
                    fillRule="evenodd"
                    d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                    clipRule="evenodd"
                  />
                </svg>
              </label>
              <Button className="btn btn-sm btn-primary" text="검색" />
            </form>
            <div className="flex gap-2">
              <Button onClick={onDownloadFiles} text="선택 다운로드" className="btn btn-sm btn-primary" />
              <Button onClick={delCheckedFiles} text="선택 삭제" className="btn btn-sm btn-error" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
