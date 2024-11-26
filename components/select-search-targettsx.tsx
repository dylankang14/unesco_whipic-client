"use client";

import { ChangeEvent, useState } from "react";

export default function SelectSearchTarget({ className }: { className?: string }) {
  const [selectAccount, setSelectAccount] = useState("all");
  const onChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectAccount(event.target.value);
  };
  return (
    <select
      name="account"
      value={selectAccount}
      onChange={onChange}
      className={`select select-bordered w-full ${className}`}
    >
      <option value={"all"}>모든 부서</option>
      <option value={"strategy"}>전략기획실</option>
      <option value={"research"}>연구개발실</option>
      <option value={"education"}>교육협력실</option>
      <option value={"information"}>정보관리실</option>
    </select>
  );
}
