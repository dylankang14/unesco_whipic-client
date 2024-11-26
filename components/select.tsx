"use client";

import { ChangeEvent, HTMLAttributes, useState } from "react";

interface SelectProps {
  folderList?: string[];
}

export default function Select({ folderList, ...rest }: SelectProps & HTMLAttributes<HTMLSelectElement>) {
  const [value, setValue] = useState("all");
  const onChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setValue(event.target.value);
  };
  return (
    <select
      name="account"
      value={value}
      onChange={onChange}
      {...rest}
      className="select select-bordered select-sm w-full max-w-xs"
    >
      <option value={"folder-01"}>폴더 01</option>
      <option value={"folder-02"}>폴더 02</option>
      <option value={"folder-03"}>폴더 03</option>
      <option value={"folder-04"}>폴더 04</option>
      <option value={"folder-05"}>폴더 05</option>
    </select>
  );
}
