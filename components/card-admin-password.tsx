import { useFormState } from "react-dom";
import Input from "./input";
import { updatePassword } from "@/app/(home)/actions/user-actions";

export default function CardAdminPassword() {
  const [state, dispatch] = useFormState(updatePassword, null);
  return (
    <>
      <form
        action={dispatch}
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
      </form>
    </>
  );
}
