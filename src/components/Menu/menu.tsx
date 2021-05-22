import React, { useState, createContext } from 'react';
import classNames from 'classnames';

import MenuItemComponent, { MenuItemProps } from './menuItem';
import SubMenuComponent, { SubMenuProps } from './subMenu';

export enum ModeType {
  VERTICAL = 'vertical',
  HORIZONTAL = 'horizontal',
}

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
    'menu-vertical': mode === ModeType.VERTICAL,
    'menu-horizontal': mode === ModeType.HORIZONTAL,
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
      const childElement = child as React.FunctionComponentElement<MenuItemProps | SubMenuProps>;
      const { displayName } = childElement.type;
      if (displayName === 'MenuItem' || displayName === 'SubMenu') {
        return React.cloneElement(childElement, {
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
  mode: ModeType.VERTICAL,
  defaultOpenSubMenu: [],
}

export const MenuItem: React.FC<MenuItemProps> = MenuItemComponent;
export const SubMenu: React.FC<SubMenuProps> = SubMenuComponent;
export default Menu;
