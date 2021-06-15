import React, { FC, KeyboardEvent, useState, useRef } from 'react';
import classNames from 'classnames';
import Input from '../Input/input';
import useClickOutside from '../../hooks/useClickOutside';

interface OptionDataType {
  name: string;
  value: string;
}

type SelectSize = 'Large' | 'Small';

export interface SelectProps {
  className?: string;
  disabled?: boolean;
  size?: SelectSize;
  defaultValue?: string[];
  value?: string[];
  multiple?: boolean;
  data: OptionDataType[];
  onChange: (item: OptionDataType, selected: string[]) => void;
  renderOption?: (item: OptionDataType) => React.ReactElement;
}

const Select: FC<SelectProps> = (props) => {
  const {
    data,
    value,
    multiple,
    onChange,
    renderOption,
  } = props;

  const [selected, setSelected] = useState(value ?? []);
  const [highlight, setHighlight] = useState(-1);
  const [showDropdown, setShowDropdown] = useState(false);

  const handleToggleDropdown = () => {
    setShowDropdown(true);
  }

  const renderTemplate = (item: OptionDataType) => {
    if (renderOption) {
      return <li>{renderOption(item)}</li>;
    }
    return item.name
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    const code = event.code;
    let newHighlight = highlight;
    const item = data[newHighlight];
    switch (code) {
      case 'ArrowDown':
        newHighlight = highlight + 1;
        break;
      case 'ArrowUp':
        newHighlight = highlight - 1;
        break;
      case 'Enter':
        handleItemClick(item, newHighlight);
        break;
      case 'Backspace':
        handleRemoveItem();
        break;
      default:
        break;
    }
    if (newHighlight < 0) {
      newHighlight = 0
    }
    if (newHighlight >= data.length) {
      newHighlight = data.length - 1;
    }
    setHighlight(newHighlight);
  }

  const handleRemoveItem = () => {
    if (selected.length) {
      const lastIndex = selected.length - 1;
      const lastValue = selected[lastIndex];
      const item = data.filter((child) => child.value === lastValue);
      const newSelected = selected.slice(0, lastIndex);
      setSelected(newSelected);
      setHighlight(-1);
      if (onChange) {
        onChange(item[0], newSelected);
      }
    }
  }

  const handleItemClick = (item: OptionDataType, index: number) => {
    let newSelected = [];
    if (multiple) {
      if (selected.includes(item.value)) {
        newSelected = selected.filter((child) => child !== item.value);
      } else {
        newSelected = selected.concat(item.value);
      }
    } else {
      newSelected = [item.value];
    }
    setSelected(newSelected);
    if (onChange) {
      onChange(item, newSelected);
    }
    setHighlight(index);
  }

  const generateOptions = () => {
    const renderResult = data.map((item, index) => {
      const classes = classNames('select-item', {
        active: highlight === index,
      });
      return (
        <li className={classes} key={item.value} onClick={() => handleItemClick(item, index)}>
          {renderTemplate(item)}
        </li>
      )
    });
    return (
      <ul style={{ display: showDropdown ? 'block' : 'none' }}>
        {renderResult}
      </ul>
    );
  }
  
  const componentRef = useRef<HTMLDivElement>(null);

  useClickOutside(componentRef, () => {
    setShowDropdown(false);
  })

  return (
    <div className="select-wrap" onClick={handleToggleDropdown} ref={componentRef}>
      <Input
        className="select"
        value={selected.join(',')}
        onKeyDown={handleKeyDown}
      />
      {generateOptions()}
    </div>
  )
}

Select.defaultProps = {
  multiple: false,
}

export default Select;