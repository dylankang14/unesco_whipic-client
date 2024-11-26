"use client";

import { useCallback, useEffect, useReducer, useRef } from "react";

interface DropdownState {
  isDropdownOpen: boolean;
  position: {
    top: number;
    bottom: number;
    left: number;
    right: number;
  };
}

interface DropdownActions {
  type: string;
}

export default function useDropdown() {
  const ref = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const reducer = (state: DropdownState, action: DropdownActions): DropdownState => {
    const rect = ref.current?.getBoundingClientRect();

    switch (action.type) {
      case "openDropdown":
        return {
          ...state,
          isDropdownOpen: true,
          position: {
            top: rect?.y!,
            bottom: rect?.y! + rect?.height!,
            left: rect?.x!,
            right: document.body.scrollWidth - rect?.x! - rect?.width!,
          },
        };
      case "toggleDropdown":
        return {
          ...state,
          isDropdownOpen: !state.isDropdownOpen,
          position: {
            top: rect?.y!,
            bottom: rect?.y! + rect?.height!,
            left: rect?.x!,
            right: document.body.scrollWidth - rect?.x! - rect?.width!,
          },
        };
      case "closeDropdown":
        return { ...state, isDropdownOpen: false };
      default:
        return state;
    }
  };
  const [state, dispatch] = useReducer(reducer, {
    isDropdownOpen: false,
    position: {
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
    },
  } as DropdownState);
  const openDropdown = () => dispatch({ type: "openDropdown" });
  const toggleDropdown = () => dispatch({ type: "toggleDropdown" });
  const closeDropdown = useCallback(() => dispatch({ type: "closeDropdown" }), []);
  // const dropdownRef = useOutsideClick(closeDropdown);
  useEffect(() => {
    const handleClick = (e?: MouseEvent): void => {
      if (
        ref.current &&
        !ref.current.contains(e?.target as Element) &&
        dropdownRef.current &&
        !dropdownRef.current.contains(e?.target as Element)
      ) {
        closeDropdown();
      }
    };

    document.addEventListener("click", handleClick, true);

    return () => {
      document.addEventListener("click", handleClick, true);
    };
  }, [closeDropdown, ref]);

  return { ref, dropdownRef, openDropdown, toggleDropdown, closeDropdown, ...state };
}
