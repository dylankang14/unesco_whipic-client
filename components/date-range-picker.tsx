"use client";

import { getFormattedDate, oneMonthAgo, today } from "@/libs/utility";
import { CalendarDateRangeIcon } from "@heroicons/react/24/outline";
import { ko } from "date-fns/locale";
import { useRouter } from "next/navigation";
import { forwardRef, useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface CustomDateInputProps {
  [key: string]: any;
}

export default function DateRangePicker() {
  const router = useRouter();
  const [dateRange, setDateRange] = useState([oneMonthAgo, today]);
  const [startDate, endDate] = dateRange;

  useEffect(() => {
    if (startDate && endDate) {
      router.replace(`/log-history?toDate=${getFormattedDate(endDate)}&fromDate=${getFormattedDate(startDate)}`);
    }
  }, [router, startDate, endDate]);

  const CustomDateInput = forwardRef<HTMLDivElement, CustomDateInputProps>((props, ref) => {
    return (
      <div
        className="relative flex items-center cursor-pointer rounded border border-slate-300 bg-white py-1.5 pl-2 pr-3 text-sm"
        onClick={props.onClick}
        ref={ref}
      >
        <div className="text-slate-700">
          <CalendarDateRangeIcon className="size-6 mr-2" />
        </div>
        <span id="date">{props.value}</span>
      </div>
    );
  });
  CustomDateInput.displayName = "CustomDateInput";
  return (
    <div className="w-auto">
      <DatePicker
        selectsRange={true}
        startDate={startDate}
        endDate={endDate}
        locale={ko}
        onChange={(update: any) => {
          setDateRange(update);
        }}
        dateFormat="yyyy-MM-dd"
        minDate={oneMonthAgo}
        maxDate={today}
        customInput={<CustomDateInput />}
      />
    </div>
  );
}
