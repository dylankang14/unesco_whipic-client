"use client";

import CheckBox from "./checkbox";
import Toggle from "./toggle";
import { InitialDataProps, ListFileProps } from "./table-main";
import { formatFileSize } from "@/libs/utility";
import { downloadFile } from "@/libs/downloadFile";
import ModalFileStatus from "./modal-file-status";
import Input from "./input";
import { handlePublicFlag } from "@/libs/handleFile";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function ListFile({
  fileId,
  fileExtension,
  fileSize,
  saveFilePath,
  originalFileName,
  transFileName,
  departmentName,
  hashTagList,
  fileLinkUrl,
  publicFlag,
  createUserId,
  createDatetime,
  updateUserId,
  updateDatetime,
  delFlag,
  onChange,
  parentFolderList,
  folderId,
}: ListFileProps & { parentFolderList: any; folderId: number }) {
  const [checked, setChecked] = useState(publicFlag === "Y");
  const router = useRouter();

  const _onChange = (e: React.ChangeEvent<HTMLInputElement>, fileId: string) => {
    if (onChange) {
      onChange(e, fileId);
    }
  };

  const onDownloadFile = async () => {
    const result = await downloadFile([fileId]);

    if (!result.ok) {
      console.error(result.error);
    } else {
      console.log("download successful");
    }
  };

  const togglePublicFlag = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const newChecked = e.target.checked;

    const result = await handlePublicFlag(fileId, newChecked);
    if (!result.ok) {
      console.error("Failed to file change.");
    } else {
      console.log("Success file change.");
      router.refresh();
    }
  };

  useEffect(() => {
    setChecked(publicFlag === "Y");
  }, [publicFlag]);

  return (
    <tr>
      <td>
        <CheckBox name={"checkedFile"} onChange={(e) => _onChange(e, fileId)} />
      </td>
      <td>
        <div className="cursor-pointer" onClick={onDownloadFile}>
          {originalFileName}
        </div>
      </td>
      <td>{departmentName}</td>
      <td>{formatFileSize(fileSize)}</td>
      <td>
        <Input
          name="publicFlag"
          id="publicFlag"
          type="checkbox"
          className="toggle self-center"
          checked={checked}
          onChange={togglePublicFlag}
        />
      </td>
      <td>파일</td>
      <td>{updateDatetime || createDatetime}</td>
      <td>
        <ModalFileStatus
          fileId={fileId}
          folderId={folderId}
          hashTagList={hashTagList}
          originalFileName={originalFileName}
          fileLinkUrl={fileLinkUrl}
          parentFolderList={parentFolderList}
        />
      </td>
    </tr>
  );
}
