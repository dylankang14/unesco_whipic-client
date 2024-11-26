"use client";

import { ChevronLeftIcon, ChevronRightIcon, ClipboardDocumentListIcon, FolderIcon } from "@heroicons/react/24/outline";
import DateRangePicker from "./date-range-picker";
import Button from "./button";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function PanelLog({ totalPages }: { totalPages: number }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [currentPage, setCurrentPage] = useState(1);
  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };
  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };
  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", (currentPage - 1).toString());
    router.push(`${window.location.pathname}?${params.toString()}`);
  }, [currentPage, searchParams, router]);
  return (
    <div className="card card-compact bg-base-100 shadow w-full border">
      <div className="card-body py-2">
        <div className="flex flex-wrap justify-between items-center">
          <div className="breadcrumbs text-sm">
            <ul>
              <li className="flex gap-4">
                <ClipboardDocumentListIcon className="size-6" />
                <span className="text-base font-semibold">로그인 내역</span>
              </li>
              <li>
                <DateRangePicker />
              </li>
            </ul>
          </div>
          <div className="flex gap-2 items-center">
            <div className="flex gap-2 font-semibold border rounded-md px-3 py-1 mr-2">
              <span>{currentPage}</span>
              <span>/</span>
              <span>{totalPages}</span>
            </div>
            <button onClick={prevPage} className="btn btn-primary btn-sm">
              <ChevronLeftIcon className="size-6" />
            </button>
            <button onClick={nextPage} className="btn btn-primary btn-sm">
              <ChevronRightIcon className="size-6" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
