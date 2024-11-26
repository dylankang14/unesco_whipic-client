"use client";

import ListPermission from "./list-permission";
import Toggle from "./toggle";

export interface AccessibleDepartments {
  departmentId: number;
  departmentName: string;
  createUserId?: string;
  createDatetime: string;
  updateUserId?: string;
  updateDatetime?: string;
  delFlag: string;
}
export interface DataListTypes {
  permissionId: string;
  permissionDesc: string;
  accessibleDepartments: AccessibleDepartments[];
  createUserId?: string;
  createDatetime: string;
  updateUserId?: string;
  updateDatetime?: string;
  delFlag: string;
}
interface PermissionTypes {
  dataList: DataListTypes[];
  data?: any;
  totalPages?: number;
  totalElements?: number;
}

export default function CardPermission({ data }: { data: PermissionTypes }) {
  return (
    <>
      <div className="card card-compact bg-base-100 shadow w-full max-w-3xl self-center border overflow-x-auto">
        <table className="table table-md w-full min-w-max text-center">
          <thead>
            <tr>
              <th>부서</th>
              <th>전략기획실 권한</th>
              <th>연구개발실 권한</th>
              <th>교육협력실 권한</th>
              <th>정보관리실 권한</th>
            </tr>
          </thead>
          <tbody>
            {data?.dataList.map((item: any, index: number) => (
              <ListPermission key={index} data={item} index={index} />
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
