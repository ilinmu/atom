import React, { useState, createContext } from 'react';
import classNames from 'classnames';

import { MenuItemProps } from './menuItem';

type ModeType = 'vertical' | 'horizontal';
type SelectCallback = (selectedIndex: string) => void;

export interface MenuProps {
  defaultSelected?: string;
  className?: string;
  mode: ModeType;
  style?: React.CSSProperties;
  onSelect?: SelectCallback;
  defaultOpenSubMenu?: string[];
}

interface IMenuContext {
  index: string;
  onSelect?: SelectCallback;
  mode?: ModeType;
  defaultOpenSubMenu?: string[];
}

export const MenuContext = createContext<IMenuContext>({
  index: '0',
});

const Menu: React.FC<MenuProps> = (props) => {
  const {
    defaultSelected,
    className,
    mode,
    style,
    onSelect,
    defaultOpenSubMenu,
    children,
  } = props;
  const [active, setActive] = useState(defaultSelected);
  const classes = classNames('menu', className, {
    'menu-vertical': mode === 'vertical',
    'menu-horizontal': mode === 'horizontal',
  });

  const handleClick = (index: string) => {
    setActive(index);
    if (onSelect) {
      onSelect(index);
    }
  }

  const passedContext: IMenuContext = {
    index: active ? active : '0',
    onSelect: handleClick,
    mode,
    defaultOpenSubMenu,
  };

  const renderChildren = () => {
    return React.Children.map(children, (child, index) => {
      const childElemet = child as React.FunctionComponentElement<MenuItemProps>;
      const { displayName } = childElemet.type;
      if (displayName === 'MenuItem' || displayName === 'SubMenu') {
        return React.cloneElement(childElemet, {
          index: index.toString()
        });
      } else {
        console.warn('Error: Menu has a child which is not a MenuItem component');
      }
    })
  }

  return (
    <ul
      className={classes}
      style={style}
      data-testid="test-menu"
    >
      <MenuContext.Provider value={passedContext}>
        {renderChildren()}
      </MenuContext.Provider>
    </ul>
  )
}

Menu.defaultProps = {
  defaultSelected: '0',
  mode: 'horizontal',
  defaultOpenSubMenu: [],
}

export default Menu;