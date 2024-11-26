import { PASSWORD_REGEX, PASSWORD_REGEX_ERROR } from "@/libs/constants";
import { customFetch } from "@/libs/fetcher";
import { z } from "zod";

const setAdminPasswordSchema = z.object({
  currentPassword: z.string({ required_error: "비밀번호를 입력하세요." }).regex(PASSWORD_REGEX, PASSWORD_REGEX_ERROR),
  newPassword: z.string({ required_error: "비밀번호를 입력하세요." }).regex(PASSWORD_REGEX, PASSWORD_REGEX_ERROR),
  confirmPassword: z.string({ required_error: "비밀번호를 입력하세요." }).regex(PASSWORD_REGEX, PASSWORD_REGEX_ERROR),
});

export default async function resetAdminPassword(prevState: any, formData: FormData) {
  const data = {
    currentPassword: formData.get("currentPassword"),
    newPassword: formData.get("newPassword"),
    confirmPassword: formData.get("confirmPassword"),
  };

  const result = setAdminPasswordSchema.safeParse(data);

  if (result.success) {
    // const response = await customFetch()
  }
}
