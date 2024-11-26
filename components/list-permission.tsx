"use client";

import { ChangeEvent, Fragment, useEffect, useState } from "react";
import Toggle from "./toggle";
import { DataListTypes } from "./card-permission";
import { updatePermissions } from "@/app/(home)/actions/file-actions";
import { useRouter } from "next/navigation";

export default function ListPermission({ data, index }: { data: DataListTypes; index: number }) {
  const router = useRouter();
  const [accessible, setAccessible] = useState(new Set<number>([]));
  const departmentName = (i: number) => {
    switch (i) {
      case 0:
        return "전략기획실";
        break;
      case 1:
        return "연구개발실";
        break;
      case 2:
        return "교육협력실";
        break;
      case 3:
        return "정보관리실";
        break;

      default:
        break;
    }
  };

  useEffect(() => {
    const permissions = data.accessibleDepartments.map((item) => item.departmentId);

    setAccessible(new Set(permissions));
  }, [data.accessibleDepartments]);

  const handleChange = async (e: ChangeEvent<HTMLInputElement>, id: number) => {
    if (accessible.has(id)) {
      accessible.delete(id);
    } else {
      accessible.add(id);
    }
    const arr = Array.from(accessible);

    const response = await updatePermissions(data.permissionId, arr);
    if (response.ok) {
      const permissions = response.data.data.accessibleDepartments.map((item: any) => item.departmentId);
      router.refresh();
    }
  };

  return (
    <tr>
      <td>{departmentName(index)}</td>
      {[...Array(4)].map((_, i: number) => {
        return (
          <Fragment key={i}>
            {index === i ? (
              <td>ON</td>
            ) : (
              <td>
                <Toggle checked={accessible.has(i + 1)} onChange={(e) => handleChange(e, i + 1)} />
              </td>
            )}
          </Fragment>
        );
      })}
    </tr>
  );
}
