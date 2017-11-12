//  @flow
import React from 'react';

type Props = {
  input: Object,
  label?: string,
  type?: string,
  placeholder?: string,
  style?: Object,
  meta: Object,
  value?: string,
};

const Input = ({ input, label, type, placeholder, style, meta, value }: Props) =>
  (
    <div>
      {label && <label htmlFor={input.name}>{label}</label>}
      <input
        {...input}
        type={type}
        placeholder={placeholder}
        className="form-control"
        style={style && style}
        default={value}
      />
      {meta.touched && meta.error &&
        <div style={{ fontSize: '85%', color: 'rgb(255,59,48)' }}>{meta.error}</div>
      }
    </div>
  );

export default Input;
