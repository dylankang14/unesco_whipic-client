export const downloadFile = async (fileIds: string[]) => {
  try {
    const filePromise = fileIds.map(async (fileId) => {
      const response = await fetch(`/nextApi/file?fileId=${fileId}`);

      if (!response.ok) {
        throw new Error(`File download failed : ${fileId}`);
      }

      const contentDisposition = response.headers.get("Content-Disposition");
      const fileName = contentDisposition
        ? contentDisposition.split("filename=")[1].replace(/"/g, "")
        : "downloaded_file";

      const blob = await response.blob();
      const decodedFileName = decodeURIComponent(fileName);
      const blobUrl = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = blobUrl;
      link.setAttribute("download", decodedFileName);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });

    await Promise.all(filePromise);
    return { ok: true };
  } catch (error) {
    return { ok: false, error: error };
  }
};
