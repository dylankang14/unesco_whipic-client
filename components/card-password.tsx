"use client";

import { useFormState } from "react-dom";
import Button from "./button";
import Input from "./input";
import SelectAccount from "./select-account";
import { resetPassword } from "@/app/(home)/actions/user-actions";
import { useEffect, useRef, useState } from "react";

export default function CardPassword() {
  const formRef = useRef<HTMLFormElement>(null);
  const [state, dispatch] = useFormState(resetPassword, null);
  const [userId, setUserId] = useState("all");

  const handleUserId = (userId: string) => {
    setUserId(userId);
  };

  useEffect(() => {
    if (state?.ok) {
      alert("비밀번호 변경이 완료 되었습니다.");
      formRef.current?.reset();
    }
  }, [state?.ok]);
  return (
    <>
      <form
        action={dispatch}
        ref={formRef}
        className="card card-compact bg-base-100 shadow max-w-3xl w-full border overflow-x-auto self-center"
      >
        <div className="grid grid-cols-[max-content_1fr] *:py-3 *:px-5 *:flex *:items-center">
          <div className="border-b">계정 선택</div>
          <div className="border-b">
            <SelectAccount setUserId={handleUserId} />
          </div>
          <div className="">변경 비밀번호</div>
          <div className="w-full">
            <Input
              disabled={userId === "all"}
              type="password"
              name="new_password"
              required
              errors={state?.data?.fieldErrors?.new_password}
            />
          </div>
          <div className="">변경 비밀번호 확인</div>
          <div className="w-full">
            <Input
              disabled={userId === "all"}
              type="password"
              name="confirm_password"
              required
              errors={state?.data?.fieldErrors?.confirm_password}
            />
          </div>
        </div>
        <div className="px-5 py-3 w-full">
          <Button className="w-full" text="확인" />
        </div>
      </form>
    </>
  );
}
