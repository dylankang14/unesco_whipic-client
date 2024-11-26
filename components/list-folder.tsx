import { BuildingLibraryIcon, Cog6ToothIcon, FolderIcon, PencilSquareIcon } from "@heroicons/react/24/outline";
import { ListFolderProps } from "./table-main";
import ModalFolderStatus from "./modal-folder-status";
import Link from "next/link";
import { cookies } from "next/headers";

export default function ListFolder({
  folderId,
  folderName,
  parentFolderId,
  parentFolderName,
  ownedDepartmentName,
  createUserId,
  createDatetime,
  updateUserId,
  updateDatetime,
  delFlag,
}: ListFolderProps) {
  return (
    <tr key={folderId}>
      <td></td>
      <td>
        <Link href={`/${folderId > 1 && folderId}`} className="flex gap-2">
          {folderId === 2 ? <BuildingLibraryIcon className="size-5" /> : <FolderIcon className="size-5" />}
          <span className="flex-1 truncate">{folderName}</span>
        </Link>
      </td>
      <td>{ownedDepartmentName}</td>
      <td>-</td>
      <td>-</td>
      <td>폴더</td>
      <td>{updateDatetime || createDatetime}</td>
      <td>
        {folderId > 2 ? (
          <ModalFolderStatus folderId={folderId} folderName={folderName}>
            <div className="btn btn-primary px-1 h-[30px] min-h-[30px]">
              <Cog6ToothIcon className="size-6" />
            </div>
          </ModalFolderStatus>
        ) : null}
      </td>
    </tr>
  );
}
