import { getStorageInfo } from "@/app/(home)/actions/storage-actions";
import { formatFileSize } from "@/libs/utility";
import { CloudIcon, ServerStackIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";

const initStorageUsageList = {
  storageUsageList: [
    {
      driveName: "/",
      totalSize: "",
      usedSize: "",
    },
  ],
  departmentUsageList: [
    {
      departmentId: 1,
      departmentName: "전략기획실",
      usedSize: 0,
    },
    {
      departmentId: 2,
      departmentName: "연구개발실",
      usedSize: 0,
    },
    {
      departmentId: 3,
      departmentName: "교육협력실",
      usedSize: 0,
    },
    {
      departmentId: 4,
      departmentName: "정보관리실",
      usedSize: 0,
    },
    {
      departmentId: 5,
      departmentName: "관리자",
      usedSize: 0,
    },
  ],
};

export default function StorageInfo() {
  const [storageInfo, setStorageInfo] = useState(initStorageUsageList);
  const [storageRatio, setStorageRatio] = useState(0);
  useEffect(() => {
    async function onStorageInfo() {
      const {
        data: { data: storageInfo },
      } = await getStorageInfo();

      setStorageInfo((prev) => ({ ...prev, ...storageInfo }));
    }
    onStorageInfo();
  }, []);

  useEffect(() => {
    const total = Number(storageInfo.storageUsageList[0].totalSize.replace("G", ""));
    const use = Number(storageInfo.storageUsageList[0].usedSize.replace("G", ""));
    const result = Math.ceil((use / total) * 100);
    setStorageRatio(result);
  }, [storageInfo.storageUsageList]);

  return (
    <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn btn-sm btn-primary">
        <ServerStackIcon className="size-6" />
      </div>
      <div tabIndex={0} className="border dropdown-content bg-base-100 rounded-box z-[1] w-56 p-2 shadow">
        <div className="flex flex-col pb-2 border-b">
          <div className="flex gap-2 mx-auto">
            <CloudIcon className="size-6" />
            <span className="font-semibold">저장용량 ({storageRatio}% 사용 중)</span>
          </div>
          <div className="a">
            <progress className="progress progress-warning w-full" value={storageRatio.toString()} max="100"></progress>
          </div>
          <div className="mx-auto">
            {storageInfo.storageUsageList[0].totalSize} 중 {storageInfo.storageUsageList[0].usedSize} 사용
          </div>
        </div>
        <ul className="pt-2 px-2 flex flex-col gap-1">
          {storageInfo.departmentUsageList.map((department, i) => (
            <li key={i} className="flex justify-between">
              <div className="font-semibold">{department.departmentName}</div>
              <div className="">{formatFileSize(+department.usedSize * 1024 * 1024)} 사용</div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
