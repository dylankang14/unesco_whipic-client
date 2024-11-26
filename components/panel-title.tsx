import { Cog6ToothIcon, FolderIcon } from "@heroicons/react/24/outline";

interface PanelTitleProps {
  title: string;
  className?: string;
}

export default function PanelTitle({ title, className }: PanelTitleProps) {
  return (
    <div className={`card card-compact bg-base-100 shadow w-full border self-center ${className}`}>
      <div className="card-body py-2">
        <div className="flex flex-wrap items-center gap-4">
          <Cog6ToothIcon className="size-6" />
          <div className="font-semibold text-base">{title}</div>
        </div>
      </div>
    </div>
  );
}
