import { cookies } from "next/headers";
import ListFolder from "./list-folder";
import { ListFolderProps } from "./table-main";

export default function FolderList({ initialFolders }: { initialFolders: ListFolderProps[] }) {
  return (
    <>
      {initialFolders.map((data: any) => (
        <ListFolder key={data.folderId} {...data} />
      ))}
    </>
  );
}
