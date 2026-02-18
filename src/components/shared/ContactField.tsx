import React from "react";

type BaseProps = {
  name: string;
  id: string;
  placeholder: string;
  dataRule?: string;
  dataMsg?: string;
};

type ContactInputProps = BaseProps & {
  type: string;
};

type ContactTextareaProps = BaseProps & {
  rows?: number;
};

export const ContactInput: React.FC<ContactInputProps> = ({
  type,
  name,
  id,
  placeholder,
  dataRule,
  dataMsg,
}) => (
  <div className="form-group">
    <input
      type={type}
      className="form-control"
      name={name}
      id={id}
      placeholder={placeholder}
      data-rule={dataRule}
      data-msg={dataMsg}
    />
    <div className="validation"></div>
  </div>
);

export const ContactTextarea: React.FC<ContactTextareaProps> = ({
  name,
  id,
  placeholder,
  dataRule,
  dataMsg,
  rows = 5,
}) => (
  <div className="form-group">
    <textarea
      className="form-control"
      name={name}
      id={id}
      rows={rows}
      data-rule={dataRule}
      data-msg={dataMsg}
      placeholder={placeholder}
    ></textarea>
    <div className="validation"></div>
  </div>
);
