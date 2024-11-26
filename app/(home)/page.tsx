import ModalUpload from "@/components/modal-upload";
import PanelMain from "@/components/panel-main";
import TableMain from "@/components/table-main";
import { getFolders } from "./actions/search-actions";

export default async function Home({ params, searchParams }: { params: number; searchParams: { keyword: string } }) {
  const response = await getFolders(1, searchParams.keyword);
  console.log("main response : ", response);

  return (
    <div className="flex flex-col gap-2">
      <PanelMain currentFolderId={response?.data.folderId} parentFolderList={response?.data.parentFolderList} />
      <TableMain initialData={response?.data} />
      <ModalUpload currentFolderId={response?.data.folderId} parentFolderList={response?.data.parentFolderList} />
    </div>
  );
}
