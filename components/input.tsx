import { ForwardedRef, InputHTMLAttributes, forwardRef } from "react";

interface InputProps {
  name: string;
  errors?: string[];
}

const _Input = (
  { name, errors = [], ...rest }: InputProps & InputHTMLAttributes<HTMLInputElement>,
  ref: ForwardedRef<HTMLInputElement>
) => {
  return (
    <div className="flex flex-col flex-grow gap-2">
      <input ref={ref} name={name} className="input input-bordered w-full" {...rest} />
      {errors.map((error, index) => (
        <span key={index} className="text-red-500 font-medium">
          {error}
        </span>
      ))}
    </div>
  );
};

export default forwardRef(_Input);
