import React, { FC, useState, useRef } from 'react';
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
  data: OptionDataType[];
  onChange: (item: OptionDataType, selected: string[]) => void;
  renderOption?: (item: OptionDataType) => React.ReactElement;
}

const Select: FC<SelectProps> = (props) => {
  const {
    data,
    value,
    onChange,
    renderOption,
  } = props;

  const [selected, setSelected] = useState(value ?? []);
  const [showDropdown, setShowDropdown] = useState(false);

  const handleToggleDropdown = () => {
    setShowDropdown(true);
  }

  const handleSelect = (item: OptionDataType) => {
    const newSelected = selected.concat(item.value);
    setSelected(newSelected);
    onChange(item, newSelected);
  }

  const generateOptions = () => {
    const renderResult = data.map((item, index) => {
      if (renderOption) {
        return renderOption(item);
      }
      return <li key={item.value} onClick={() => handleSelect(item)}>{item.name}</li>
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
      <div className="select">
        <span>{selected.join(',')}</span>
      </div>
      {generateOptions()}
    </div>
  )
}

export default Select;