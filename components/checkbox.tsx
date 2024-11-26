"use client";

import { InputHTMLAttributes } from "react";

interface CheckBoxProps {
  name?: string;
}

export default function CheckBox({ name, ...rest }: CheckBoxProps & InputHTMLAttributes<HTMLInputElement>) {
  return <input type="checkbox" name={name} {...rest} className="checkbox checkbox-sm" />;
}
