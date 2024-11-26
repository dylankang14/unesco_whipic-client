"use client";

import { ChangeEvent, useState } from "react";

export default function SelectAccount({ className, setUserId }: { className?: string; setUserId?: any }) {
  const [selectAccount, setSelectAccount] = useState("all");
  const onChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectAccount(event.target.value);
    setUserId(event.target.value);
  };
  return (
    <select
      name="userId"
      value={selectAccount}
      onChange={onChange}
      className={`select select-bordered w-full ${className}`}
    >
      <option value={"all"}>부서를 선택하세요.</option>
      <option value={"whipic_education"}>교육협력실</option>
      <option value={"whipic_information"}>정보관리실</option>
      <option value={"whipic_research"}>연구개발실</option>
      <option value={"whipic_strategy"}>전략기획실</option>
    </select>
  );
}
