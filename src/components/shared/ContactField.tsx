import React from "react";

type BaseProps = {
  label: string;
  name: string;
  id: string;
  placeholder: string;
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  onBlur?: React.FocusEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  error?: string;
  required?: boolean;
  minLength?: number;
  autoComplete?: string;
};

type ContactInputProps = BaseProps & {
  type: string;
};

type ContactTextareaProps = BaseProps & {
  rows?: number;
};

export const ContactInput: React.FC<ContactInputProps> = ({
  type,
  label,
  name,
  id,
  placeholder,
  value,
  onChange,
  onBlur,
  error,
  required,
  minLength,
  autoComplete,
}) => (
  <div className="form-group">
    <label className="visually-hidden" htmlFor={id}>
      {label}
    </label>
    <input
      type={type}
      className="form-control"
      name={name}
      id={id}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      aria-invalid={Boolean(error)}
      aria-describedby={error ? `${id}-validation` : undefined}
      required={required}
      minLength={minLength}
      autoComplete={autoComplete}
    />
    <div
      id={`${id}-validation`}
      className={`validation${error ? " show" : ""}`}
      role={error ? "alert" : undefined}
      aria-live="polite"
    >
      {error}
    </div>
  </div>
);

export const ContactTextarea: React.FC<ContactTextareaProps> = ({
  name,
  label,
  id,
  placeholder,
  value,
  onChange,
  onBlur,
  error,
  required,
  minLength,
  rows = 5,
}) => (
  <div className="form-group">
    <label className="visually-hidden" htmlFor={id}>
      {label}
    </label>
    <textarea
      className="form-control"
      name={name}
      id={id}
      rows={rows}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      aria-invalid={Boolean(error)}
      aria-describedby={error ? `${id}-validation` : undefined}
      required={required}
      minLength={minLength}
    ></textarea>
    <div
      id={`${id}-validation`}
      className={`validation${error ? " show" : ""}`}
      role={error ? "alert" : undefined}
      aria-live="polite"
    >
      {error}
    </div>
  </div>
);
