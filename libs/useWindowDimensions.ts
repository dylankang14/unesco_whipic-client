"use client";

import { useEffect, useState } from "react";
interface WindowDimensionsType {
  width: number | null;
  height: number | null;
}

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return { width, height };
}

export default function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState<WindowDimensionsType>({ width: null, height: null });
  const [device, setDevice] = useState({ device: "mobile" });

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
      if (windowDimensions.width !== null && windowDimensions.width >= 1024) {
        setDevice({ device: "pc" });
      } else if (windowDimensions.width !== null && windowDimensions.width >= 640) {
        setDevice({ device: "tablet" });
      } else {
        setDevice({ device: "mobile" });
      }
    }
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [windowDimensions.width]);

  return { ...windowDimensions, ...device };
}
