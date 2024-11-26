"use client";

import { downloadFile } from "@/libs/downloadFile";
import Breadcrumbs from "./breadcrumbs";
import Button from "./button";
import ModalCreateFolder from "./modal-create-folder";
import { ListFolderProps } from "./table-main";
import { useParams, useRouter } from "next/navigation";

export default function PanelSearch() {
  const params = useParams();
  const router = useRouter();

  return (
    <div className="card card-compact bg-base-100 shadow w-full border">
      <div className="card-body py-2">
        <form className="hidden md:flex md:gap-2">
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
      </div>
    </div>
  );
}
