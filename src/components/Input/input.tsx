import React, { useState } from 'react';
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

export type InputProps = BaseInputProps & Omit<React.InputHTMLAttributes<HTMLElement>, removeProps>;

const Input: React.FC<InputProps> = (props) => {
  const {
    className,
    disabled,
    size,
    children,
    prefix,
    suffix,
    value,
    onChange,
    onPressEnter,
    ...restProps
  } = props;
  const [inputValue, setInputValue] = useState(value ?? '');
  const classes = classNames('input-wrap', className, {
    [`input-${size}`]: size,
    'disabled': disabled,
  })

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.code === 'Enter' && onPressEnter && !disabled) {
      onPressEnter(event.currentTarget.value);
    }
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.currentTarget.value);
    onChange && onChange(event);
  }

  return (
    <div className={classes} data-testid="test-input">
      {prefix}
      <input
        disabled={disabled}
        onKeyDown={handleKeyDown}
        onChange={handleInputChange}
        value={inputValue}
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
