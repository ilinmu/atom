import React, { FC, useState, ChangeEvent } from 'react';
import Input, { InputProps } from '../Input/input';

export interface AutoCompleteProps extends Omit<InputProps, 'onSelect'> {
  fetchSuggestions: (string: string) => string[];
  onSelect?: (item: string) => void;
}

const AutoComplete: FC<AutoCompleteProps> = (props) => {
  const {
    fetchSuggestions,
    onSelect,
    value,
    ...restProps
  } = props;

  const [inputValue, setInputValue] = useState(value);

  const [suggestions, setSuggestions] = useState<string[]>([])

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.trim();
    setInputValue(value);
    const result = value ? fetchSuggestions(value) : [];
    setSuggestions(result);
  }

  const generateSuggestion = () => {
    const suggestionList = suggestions.map((item, index) => {
      return (
        <li key={index}>
          {item}
        </li>
      );
    })
    return (
      <ul>
        {suggestionList}
      </ul>
    );
  }

  return (
    <div className="autocomlete">
      <Input
        value={inputValue}
        onChange={handleInputChange}
        {...restProps}
      />
      {generateSuggestion()}
    </div>
  )
}

export default AutoComplete;