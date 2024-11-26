import { FolderIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { ListFolderProps } from "./table-main";

export default function Breadcrumbs({ parentFolderList }: { parentFolderList: ListFolderProps[] }) {
  return (
    <div className="breadcrumbs text-base font-semibold">
      <ul className="flex flex-wrap">
        <li className="">
          <Link className="flex gap-2" href={"/"}>
            <FolderIcon className="size-6" />
            <span className="">홈</span>
          </Link>
        </li>
        {parentFolderList?.map(
          (folder) =>
            folder.folderId !== 1 && (
              <li key={folder.folderId} className="flex-shrink">
                <Link href={`/${folder.folderId}`} className="flex-1 truncate">
                  {folder.folderName}
                </Link>
              </li>
            )
        )}
      </ul>
    </div>
  );
}
