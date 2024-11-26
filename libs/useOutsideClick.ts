import { useEffect, useRef } from "react";

export default function useOutsideClick(callBack: () => void) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (e?: MouseEvent): void => {
      if (ref.current && !ref.current.contains(e?.target as Element)) {
        callBack && callBack();
      }
    };

    document.addEventListener("click", handleClick, true);

    return () => {
      document.addEventListener("click", handleClick, true);
    };
  }, [callBack, ref]);

  return ref;
}
