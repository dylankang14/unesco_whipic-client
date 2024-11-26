import CardPassword from "@/components/card-password";
import PanelTitle from "@/components/panel-title";

export default function SetPassword() {
  return (
    <div className="flex flex-col gap-2">
      <PanelTitle className="max-w-3xl p-2" title="부서별 비밀번호 설정" />
      <CardPassword />
    </div>
  );
}
