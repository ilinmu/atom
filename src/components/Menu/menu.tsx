import React, { useState, createContext } from 'react';
import classNames from 'classnames';

type ModeType = 'vertical' | 'horizontal';
type SelectCallback = (selectedIndex: number) => void;

export interface MenuProps {
  defaultSelected?: number;
  className?: string;
  mode: ModeType;
  style?: React.CSSProperties;
  onSelect?: SelectCallback;
  children: React.ReactNode;
}

interface IMenuContext {
  index: number;
  onSelect?: SelectCallback;
}

export const MenuContext = createContext<IMenuContext>({
  index: 0,
});

const Menu: React.FC<MenuProps> = (props) => {
  const {
    defaultSelected,
    className,
    mode,
    style,
    onSelect,
    children,
  } = props;
  const [active, setActive] = useState(defaultSelected);
  const classes = classNames('menu', className, {
    'menu-vertical': mode === 'vertical',
  });

  const handleClick = (index: number) => {
    setActive(index);
    if (onSelect) {
      onSelect(index);
    }
  }

  const passedContext: IMenuContext = {
    index: active ? active : 0,
    onSelect: handleClick,
  };
  return (
    <ul className={classes} style={style}>
      <MenuContext.Provider value={passedContext}>
        {children}
      </MenuContext.Provider>
    </ul>
  )
}

export default Menu;