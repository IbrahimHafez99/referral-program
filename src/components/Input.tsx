import React from "react";
type InputProps = {
  label?: string;
  placeholder?: string;
  type: string;
  name: string;
  value: string;
  styles?: string;
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const Input = ({
  label,
  placeholder,
  value,
  type,
  name,
  styles,
  handleInputChange,
}: InputProps) => {
  return (
    <div className="form-control w-[45%] max-w-xs">
      <label className="label">
        <span className="label-text text-white">{label}</span>
      </label>
      <input
        name={name}
        type={type}
        value={value}
        placeholder={placeholder}
        className={`input input-bordered w-full max-w-xs mb-4 ${styles}`}
        onChange={handleInputChange}
        autoComplete="new-password"
      />
    </div>
  );
};

export default Input;
