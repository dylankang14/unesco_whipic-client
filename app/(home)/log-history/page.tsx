import PanelLog from "@/components/panel-log";
import TableLog from "@/components/table-log";
import { getLog } from "../actions/log-actions";
import { useEffect } from "react";
import { revalidatePath } from "next/cache";

export default async function LogHistory({
  searchParams,
}: {
  searchParams: { fromDate: string; toDate: string; page: number };
}) {
  const response = await getLog(searchParams.fromDate, searchParams.toDate, searchParams.page);
  return (
    <div className="flex flex-col gap-2">
      <PanelLog totalPages={response.data.totalPages} />
      <TableLog data={response.data} fromDate={searchParams.fromDate} toDate={searchParams.toDate} />
    </div>
  );
}
