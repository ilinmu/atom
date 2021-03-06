import React, { FC, useState, KeyboardEvent, ChangeEvent, useEffect, useRef } from 'react';
import classNames from 'classnames';
import Input, { InputProps } from '../Input/input';
import Icon from '../Icon/icon';
import useDebounce from '../../hooks/useDebounce';
import useClickOutside from '../../hooks/useClickOutside';
interface OptionData {
  value: string;
}

export type OptionDataType<T = {}> = T & OptionData;
export interface AutoCompleteProps extends Omit<InputProps, 'onSelect'> {
  fetchSuggestions: (string: string) => OptionDataType[] | Promise<OptionDataType[]>;
  onSelect?: (item: OptionDataType) => void;
  renderOption?: (item: OptionDataType) => React.ReactElement;
}

const AutoComplete: FC<AutoCompleteProps> = (props) => {
  const {
    fetchSuggestions,
    onSelect,
    renderOption,
    value,
    ...restProps
  } = props;

  const [inputValue, setInputValue] = useState(value as string ?? '');

  const [highlight, setHighlight] = useState(-1);

  const [suggestions, setSuggestions] = useState<OptionDataType[]>([])

  const [loading, setLoading] = useState(false);

  const debounceValue = useDebounce(inputValue, 500);

  const triggerSearch = useRef(false);

  const componentRef = useRef<HTMLDivElement>(null);

  useClickOutside(componentRef, () => {
    setSuggestions([]);
  })

  useEffect(() => {
    if (debounceValue && triggerSearch.current) {
      const results = fetchSuggestions(debounceValue);
      if (results instanceof Promise) {
        setLoading(true);
        results.then((list) => {
          setSuggestions(list);
          setLoading(false);
        })
      } else {
        setSuggestions(results);
      }
    } else {
      setSuggestions([]);
    }
  }, [debounceValue, fetchSuggestions]);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.trim();
    setInputValue(value);
    triggerSearch.current = true;
  }

  const handleItemClick = (item: OptionDataType) => {
    setInputValue(item.value);
    setSuggestions([]);
    if (onSelect) {
      onSelect(item);
    }
    triggerSearch.current = false;
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    const code = event.code;
    let newHighlight = highlight;
    switch (code) {
      case 'ArrowDown':
        newHighlight = highlight + 1;
        break;
      case 'ArrowUp':
        newHighlight = highlight - 1;
        break;
      case 'Enter':
        if (suggestions.length) {
          handleItemClick(suggestions[newHighlight]);
        }
        break;
      default:
        break;
    }
    if (newHighlight < 0) {
      newHighlight = 0
    }
    if (newHighlight >= suggestions.length) {
      newHighlight = suggestions.length - 1;
    }
    setHighlight(newHighlight);
  }

  const renderTemplate = (item: OptionDataType) => {
    return renderOption ? renderOption(item) : item.value;
  }

  const generateSuggestion = () => {
    const suggestionList = suggestions.map((item, index) => {
      const liClasses = classNames('suggestion-item', {
        'active': highlight === index,
      })
      return (
        <li key={index} className={liClasses} onClick={() => handleItemClick(item)}>
          {renderTemplate(item)}
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
    <div className="autocomlete" ref={componentRef}>
      <Input
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        {...restProps}
      />
      {loading && <Icon name="reload" />}
      {suggestions.length > 0 && generateSuggestion()}
    </div>
  )
}

export default AutoComplete;