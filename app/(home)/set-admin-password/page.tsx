"use client";

import Button from "@/components/button";
import Input from "@/components/input";
import PanelTitle from "@/components/panel-title";
import { useFormState } from "react-dom";
import { updatePassword } from "../actions/user-actions";
import { useEffect, useRef } from "react";

export default function SetAdminPassword() {
  const formRef = useRef<HTMLFormElement>(null);
  const [state, dispatch] = useFormState(updatePassword, null);

  useEffect(() => {
    if (state?.ok) {
      alert("비밀번호 변경이 완료 되었습니다.");
      formRef.current?.reset();
    }
  }, [state?.ok]);
  return (
    <div className="flex flex-col gap-2">
      <PanelTitle className="max-w-3xl p-2" title="최고관리자 비밀번호 재설정" />
      <form
        action={dispatch}
        ref={formRef}
        className="card card-compact bg-base-100 shadow max-w-3xl w-full border overflow-x-auto self-center"
      >
        <div className="grid grid-cols-[max-content_1fr] *:py-3 *:px-5 *:flex *:items-center">
          <div className="">현재 비밀번호</div>
          <div className="w-full">
            <Input
              name="originalPassword"
              type="password"
              required
              errors={state?.data?.fieldErrors?.originalPassword}
            />
          </div>
          <div className="">변경 비밀번호</div>
          <div className="w-full">
            <Input name="new_password" type="password" required errors={state?.data?.fieldErrors?.new_password} />
          </div>
          <div className="">변경 비밀번호 확인</div>
          <div className="w-full">
            <Input
              name="confirm_password"
              type="password"
              required
              errors={state?.data?.fieldErrors?.confirm_password}
            />
          </div>
        </div>
        <div className="px-5 py-3 w-full">
          <Button className="w-full" text="확인" />
        </div>
      </form>
    </div>
  );
}
