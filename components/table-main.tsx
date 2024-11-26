"use client";

import Toggle from "./toggle";
import ListFolder from "./list-folder";
import ListFile from "./list-files";
import { ChangeEvent, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { getDepartments } from "@/app/(home)/actions/department-actions";
import Button from "./button";
import { UserInfoType } from "./header";
import { getUser } from "@/app/(home)/actions/user-actions";

export interface ListFolderProps {
  folderId: number;
  folderName: string;
  parentFolderId: number;
  parentFolderName: string;
  ownedDepartmentName: string;
  createUserId?: number;
  createDatetime: string;
  updateUserId?: number;
  updateDatetime?: string;
  delFlag: string;
}
export interface ListFileProps {
  fileId: string;
  fileExtension: string;
  fileSize: number;
  saveFilePath: string;
  originalFileName: string;
  transFileName: string;
  departmentName: string;
  hashTagList: string[];
  fileLinkUrl: string;
  publicFlag: string;
  createUserId: string;
  createDatetime: string;
  updateUserId?: string;
  updateDatetime?: string;
  delFlag: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>, fileId: string) => void;
}

export interface InitialDataProps {
  folderId: number;
  folderName: string;
  parentFolderId?: string;
  parentFolderName?: string;
  ownedDepartmentName: string;
  parentFolderList: ListFolderProps[];
  folderList: ListFolderProps[];
  fileList: ListFileProps[];
  createUserId?: string;
  createDatetime: string;
  updateUserId?: string;
  updateDatetime?: string;
  delFlag: string;
}

export interface DepartmentTypes {
  departmentId: number;
  departmentName: string;
  createUserId?: string;
  createDatetime: string;
  updateUserId?: string;
  updateDatetime?: string;
  delFlag: string;
}

export default function TableMain({ initialData }: { initialData: InitialDataProps }) {
  const searchParams = useSearchParams();
  const keyword = searchParams.get("keyword");
  const [iniData, setIniData] = useState(initialData);
  const [checkedFiles, setCheckedFiles] = useState(new Set());
  const [selectedTeam, setSelectedTeam] = useState([
    "whipic",
    "whipic_education",
    "whipic_information",
    "whipic_research",
    "whipic_strategy",
  ]);
  const [user, setUser] = useState<UserInfoType | null>(null);
  useEffect(() => {
    async function getUserInfo() {
      const user = await getUser();

      setUser((prev) => ({ ...prev, ...user }));
    }
    getUserInfo();
  }, []);

  const initialTeams = [
    {
      userId: "whipic_strategy",
      departmentId: 1,
      departmentName: "전략기획실",
    },
    {
      userId: "whipic_research",
      departmentId: 2,
      departmentName: "연구개발실",
    },
    {
      userId: "whipic_education",
      departmentId: 3,
      departmentName: "교육협력실",
    },
    {
      userId: "whipic_information",
      departmentId: 4,
      departmentName: "정보관리실",
    },
  ];
  const [departments, setDepartments] = useState(initialTeams);
  // useEffect(() => {
  //   async function getDeparts() {
  //     const departments = await getDepartments();
  //     if (departments.ok && departments.data) {
  //       setDepartments(departments.data.dataList);
  //     }
  //   }
  //   getDeparts();
  // }, []);

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>, fileId: string) => {
    const isChecked = e.target.checked;
    if (isChecked) {
      checkedFiles.add(fileId);
      setCheckedFiles(checkedFiles);
    } else if (!isChecked) {
      checkedFiles.delete(fileId);
      setCheckedFiles(checkedFiles);
    }
    const arr = Array.from(checkedFiles);
    localStorage.setItem("checkedFiles", JSON.stringify(arr));
  };

  const handleSelectedTeam = (e: ChangeEvent<HTMLInputElement>, userId: string) => {
    if (selectedTeam.includes(userId)) {
      setSelectedTeam((prevUserId) => prevUserId.filter((u) => u !== userId));
    } else {
      setSelectedTeam((prevUserId) => [...prevUserId, userId]);
    }
  };

  const selectTeam = (formData: FormData) => {
    const filteredData = initialData.fileList.filter((item) => selectedTeam.includes(item.createUserId));
    setIniData((prev) => ({ ...prev, fileList: filteredData }));
  };

  useEffect(() => {
    setIniData(initialData);
  }, [initialData]);

  const isSuper = useMemo(() => {
    return user?.authority === "SUPER";
  }, [user]);

  return (
    <>
      <div className="card card-compact bg-base-100 shadow w-full border overflow-x-auto">
        <table className="table table-common table-md w-full min-w-max align-middle ">
          <thead>
            <tr>
              <th>선택</th>
              <th>이름</th>
              <th>
                <div className="dropdown">
                  <div tabIndex={isSuper ? 0 : -1} role={isSuper ? "button" : undefined} className={isSuper ? "btn btn-sm m-1" : ""}>
                    부서
                  </div>
                  {isSuper && <form action={selectTeam}>
                    <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
                      {departments?.map((team) => {
                        return (
                          <li key={team.departmentId}>
                            <label htmlFor={`team-${team.departmentId}`} className="">
                              <Toggle
                                className="toggle toggle-sm self-center"
                                type="checkbox"
                                checked={selectedTeam.includes(team.userId)}
                                name={`team-${team.departmentId}`}
                                id={`team-${team.departmentId}`}
                                onChange={(e) => handleSelectedTeam(e, team.userId)}
                              />
                              {team.departmentName}
                            </label>
                          </li>
                        );
                      })}
                      <li>
                        <Button className="btn-sm mt-2" text="확인" />
                      </li>
                    </ul>
                  </form>}
                </div>
              </th>
              <th>크기</th>
              <th>URL</th>
              <th>종류</th>
              <th>추가된 날짜</th>
              <th>설정</th>
            </tr>
          </thead>
          <tbody className="">
            {iniData?.folderList?.length > 0 || iniData?.fileList?.length > 0 ? (
              <>
                {iniData?.folderList?.map((data: any) => (
                  <ListFolder key={data.folderId} {...data} />
                ))}
                {iniData?.fileList?.map((data: any) => (
                  <ListFile
                    key={data.fileId}
                    {...data}
                    onChange={onChangeHandler}
                    folderId={iniData.folderId}
                    parentFolderList={iniData.parentFolderList}
                  />
                ))}
              </>
            ) : (
              <tr>
                <td colSpan={8} className="text-center h-24">
                  <div className="text-lg font-semibold">
                    {keyword ? `"${keyword}" 검색결과 존재하는 파일이 없습니다.` : "현재 폴더는 비어있습니다."}
                  </div>
                </td>
              </tr>
            )}
          </tbody>
          <tfoot>
            <tr>
              <th>선택</th>
              <th>이름</th>
              <th>부서</th>
              <th>크기</th>
              <th>공개여부</th>
              <th>종류</th>
              <th>추가된 날짜</th>
              <th>설정</th>
            </tr>
          </tfoot>
        </table>
      </div>
    </>
  );
}
