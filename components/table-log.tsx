"use client";

import { getLog } from "@/app/(home)/actions/log-actions";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export interface LogHistoryType {
  data: {
    dataList: {
      accessLogId: number;
      userId: string;
      userName: string;
      ipAddress: string;
      loginDatetime: string;
      logoutDatetime: string | null;
    }[];
    data: null | any;
    totalPages: number;
    totalElements: number;
  };
  fromDate: string;
  toDate: string;
}

export default function TableLog({ data, fromDate, toDate }: LogHistoryType) {
  const router = useRouter();
  const [log, setLog] = useState(data.dataList);
  const [from, setFrom] = useState(fromDate);
  const [to, setTo] = useState(toDate);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [isLastPage, setIsLastPage] = useState(false);
  const trigger = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    if (data.dataList) setLog(data.dataList);
  }, [data.dataList]);
  // useEffect(() => {
  //   const observer = new IntersectionObserver(
  //     async (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
  //       const element = entries[0];
  //       if (element.isIntersecting && trigger.current) {
  //         observer.unobserve(trigger.current);
  //         setIsLoading(true);
  //         const newLog = await getLog(fromDate, toDate, page + 1);
  //         if (newLog.data.dataList.length !== 0) {
  //           console.log("wow :", newLog.data.dataList);

  //           setLog((prev) => [...prev, ...newLog.data.dataList]);
  //           setPage((prev) => prev + 1);
  //         } else {
  //           setIsLastPage(true);
  //         }
  //         setIsLoading(false);
  //       }
  //     },
  //     {
  //       threshold: 1.0,
  //     }
  //   );
  //   if (trigger.current) {
  //     observer.observe(trigger.current);
  //   }
  //   return () => {
  //     observer.disconnect();
  //   };
  // }, [page]);

  return (
    <>
      <div className="card card-compact bg-base-100 shadow w-full border overflow-x-auto">
        <table className="table table-md w-full min-w-max align-middle text-center">
          <thead>
            <tr>
              <th>No</th>
              <th>계정</th>
              <th>이벤트 일시</th>
              <th>이벤트 타입</th>
              <th>IP</th>
            </tr>
          </thead>
          <tbody>
            {log.length > 0 ? (
              log.map((v) => (
                <tr key={v.accessLogId}>
                  <td>{v.accessLogId}</td>
                  <td>{v.userName}</td>
                  <td>{v.logoutDatetime ?? v.loginDatetime}</td>
                  <td>{v.logoutDatetime ? "로그아웃" : "로그인"}</td>
                  <td>{v.ipAddress}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5}>해당 기간의 로그기록이 없습니다.</td>
              </tr>
            )}
          </tbody>
          <tfoot>
            <tr>
              <th>No</th>
              <th>계정</th>
              <th>이벤트 일시</th>
              <th>이벤트 타입</th>
              <th>IP</th>
            </tr>
          </tfoot>
        </table>
      </div>
      {/* {!isLastPage ? (
        <span
          ref={trigger}
          className="text-sm font-semibold bg-orange-500 w-fit mx-auto px-3 py-2 rounded-md hover:opacity-90 active:scale-95"
        >
          {isLoading ? "로딩 중" : "Load more"}
        </span>
      ) : null} */}
    </>
  );
}
