import { InputHTMLAttributes } from "react";

interface ToggleProps {
  name?: string;
}

export default function Toggle({ name, ...rest }: ToggleProps & InputHTMLAttributes<HTMLInputElement>) {
  return <input type="checkbox" name={name} {...rest} className="toggle toggle-md toggle-primary m-0 align-top" />;
}
