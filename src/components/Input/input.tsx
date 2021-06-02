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
  onPressEnter?: (value: string) => void;
  // onPressEnter?: () => void;
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
    onPressEnter,
    ...restProps
  } = props;
  const classes = classNames('input-wrap', className, {
    [`input-${size}`]: size,
    'disabled': disabled,
  })

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.code === 'Enter' && onPressEnter) {
      onPressEnter(event.currentTarget.value);
    }
  }
  return (
    <div className={classes}>
      {prefix}
      <input
        disabled={disabled}
        onKeyDown={handleKeyDown}
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
