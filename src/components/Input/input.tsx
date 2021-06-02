import React from 'react';
import classNames from 'classnames';

export enum InputSize {
  Large = 'lg',
  Small = 'sl',
}

interface BaseInputProps {
  className?: string;
  disabled?: boolean;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  size?: InputSize;
  // onPressEnter?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

type removeProps = 'size' | 'prefix';

type NativeButtonProps = BaseInputProps & Omit<React.InputHTMLAttributes<HTMLElement>, removeProps>;

const Input: React.FC<NativeButtonProps> = (props) => {
  const {
    className,
    disabled,
    size,
    children,
    prefix,
    suffix,
    ...restProps
  } = props;
  const classes = classNames('input-wrap', className, {
    [`input-${size}`]: size,
    'disabled': disabled,
  })
  return (
    <div className={classes}>
      {prefix}
      <input
        disabled={disabled}
        {...restProps}
      >
        {children}
      </input>
      {suffix}
    </div>
  )
}

Input.defaultProps = {
}

export default Input;
