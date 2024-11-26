import CardPermission from "@/components/card-permission";
import PanelTitle from "@/components/panel-title";
import { getPermissions } from "../actions/file-actions";

export default async function SetPermission() {
  const response = await getPermissions();

  return (
    <div className="flex flex-col gap-2">
      <PanelTitle className="max-w-3xl p-2" title="부서별 권한 설정" />
      <CardPermission data={response.data} />
    </div>
  );
}
