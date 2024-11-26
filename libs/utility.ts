export function cls(...classnames: string[]) {
  return classnames.join(" ");
}

export function filterValue(list: { id: number; [key: string]: any }[], value: number[], isText = false) {
  if (list.length === value.length) {
    return "모두";
  } else if (value.length === 0) {
    return "없음";
  } else if (isText) {
    return list.filter((item) => value.includes(item.id)).map((item) => item.name);
  } else {
    return list.filter((item) => value.includes(item.id)).length;
  }
}

export function paginate<T>(items: T[], pageNumber: number, pageSize: number) {
  const startIndex = (pageNumber - 1) * pageSize;
  return items.slice(startIndex, startIndex + pageSize);
}

export function getType(target: any) {
  return Object.prototype.toString.call(target).slice(8, -1);
}

export function formatToTimeAgo(date: string): string {
  const dayInMs = 1000 * 60 * 60 * 24;
  const time = new Date(date).getTime();
  const now = new Date().getTime();
  const diff = Math.round((time - now) / dayInMs);

  const formatter = new Intl.RelativeTimeFormat("ko");

  return formatter.format(diff, "days");
}

export function formatFileSize(bytes: number, decimals: number = 1): string {
  if (bytes === 0) return "0 Bytes";

  const k = 1024; // 1 KB = 1024 Bytes
  const sizes = ["Bytes", "KB", "MB", "GB", "TB"]; // 가능한 단위
  const i = Math.floor(Math.log(bytes) / Math.log(k)); // 적절한 단위를 계산

  const fileSize = parseFloat((bytes / Math.pow(k, i)).toFixed(decimals)); // 소수점 자릿수 설정

  return `${fileSize} ${sizes[i]}`; // 결과 문자열 반환
}

export function getFormattedDate(date: Date) {
  if (date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  }
}

export const today = new Date();
export const oneMonthAgo = new Date(new Date().setDate(today.getDate() - 30));
