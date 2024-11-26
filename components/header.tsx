"use client";

import Image from "next/image";
import Link from "next/link";
import logo from "../public/logo.svg";
import { UserCircleIcon } from "@heroicons/react/24/solid";
import StorageInfo from "./storage-info";
import SelectAccount from "./select-account";
import { useEffect, useState } from "react";
import { getUser, logOut } from "@/app/(home)/actions/user-actions";
import { ArrowRightEndOnRectangleIcon } from "@heroicons/react/24/outline";
import { useFormState } from "react-dom";
import { searchAction } from "@/app/(home)/actions/search-actions";
import Button from "./button";
import { getFormattedDate, oneMonthAgo, today } from "@/libs/utility";

export interface UserInfoType {
  authority: string;
  createDatetime: string;
  createUserId: string;
  daysSincePasswordChangePeriod: number;
  delFlag: string;
  departmentName: string;
  email: string;
  language: string;
  mobile: string;
  passwordChangedDatetime: string;
  passwordNoticeRequired: boolean;
  permissionAccessibleDepartments: string[];
  updateDatetime: string;
  updateUserId: string;
  userId: string;
  userName: string;
}
export default function Header() {
  const [user, setUser] = useState<UserInfoType | null>(null);
  useEffect(() => {
    async function getUserInfo() {
      const user = await getUser();

      setUser((prev) => ({ ...prev, ...user }));
    }
    getUserInfo();
  }, []);

  const onLogOut = async () => {
    const response = await logOut();
  };

  const [state, dispatch] = useFormState(searchAction, null);

  return (
    <header className="sticky top-0 z-10 flex items-center justify-center w-full px-2 py-1 bg-white border-b">
      <div className="w-full flex justify-between lg:max-w-screen-xl">
        <div className="flex items-center">
          <div className="flex w-auto items-center md:px-2 lg:w-[200px]">
            <Link href="/" className="relative flex-1 px-2 cursor-pointer select-none logo">
              <Image src={logo} alt="Logo" width={118} height={46} className="w-auto h-8 md:w-[118px] md:h-auto" />
            </Link>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex gap-2">
            <StorageInfo />
          </div>
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="m-1">
              <UserCircleIcon className="size-8" />
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content menu bg-base-100 rounded-box z-[1] w-60 p-2 shadow border text-base"
            >
              <li className="text-center border-b pb-2 pt-1">{user?.userName}</li>
              {user?.authority === "SUPER" ? (
                <>
                  <li className="mt-2">
                    <Link
                      href={`/log-history?toDate=${getFormattedDate(today)}&fromDate=${getFormattedDate(oneMonthAgo)}`}
                    >
                      로그인 내역
                    </Link>
                  </li>
                  <li>
                    <Link href={"/set-permission"}>부서별 권한 설정</Link>
                  </li>
                  <li>
                    <Link href={"/set-password"}>부서계정 비밀번호 재설정</Link>
                  </li>
                  <li className="mb-2">
                    <Link href={"/set-admin-password"}>최고관리자 비밀번호 재설정</Link>
                  </li>
                </>
              ) : null}
              <li>
                <a onClick={onLogOut} className="btn btn-error btn-sm">
                  로그아웃 <ArrowRightEndOnRectangleIcon className="size-6" />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
}
