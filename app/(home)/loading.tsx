import { ArrowPathIcon } from "@heroicons/react/24/outline";

export default function Loading() {
  return (
    <div className="p-5 text-lg font-semibold w-full h-80 justify-center items-center flex gap-5">
      로딩중...{" "}
      <span className="animate-spin size-6">
        <ArrowPathIcon className="size-6" />
      </span>
    </div>
  );
}
