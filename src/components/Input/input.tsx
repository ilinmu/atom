import React from 'react';
import classNames from 'classnames';

export enum InputSize {
  Large = 'lg',
  Small = 'sl',
  Default = 'dt',
}

interface BaseInputProps {
  className?: string;
  disabled?: boolean;
  prefix?: string | React.ReactNode;
  suffix?: string | React.ReactNode;
  size?: InputSize;
  onPressEnter?: (value: string) => void;
  // onPressEnter?: () => void;
}

type removeProps = 'size' | 'prefix';

export type NativeInputProps = BaseInputProps & Omit<React.InputHTMLAttributes<HTMLElement>, removeProps>;

const Input: React.FC<NativeInputProps> = (props) => {
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
    if (event.code === 'Enter' && onPressEnter && !disabled) {
      onPressEnter(event.currentTarget.value);
    }
  }
  return (
    <div className={classes} data-testid="test-input">
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
  className: '',
  size: InputSize.Large,
  disabled: false,
}

export default Input;
