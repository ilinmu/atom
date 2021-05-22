import React, { useState, useContext } from 'react';
import classNames from 'classnames';

import { MenuContext, ModeType } from './menu';
import { MenuItemProps } from './menuItem';

export interface SubMenuProps {
  index?: string;
  title: string;
  className?: string;
}

const SubMenu: React.FC<SubMenuProps> = (props) => {
  const {
    index,
    title,
    className,
    children,
  } = props;
  const context = useContext(MenuContext);
  const openSubMenu = context.defaultOpenSubMenu as Array<string>;
  const isOpened = (index && context.mode === 'vertical')
    ? openSubMenu.includes(index)
    : false;
  const [open, setOpen] = useState(isOpened);

  
  const classes = classNames('menu-item submenu-item', className, {
    'active': context.index === index
  });

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setOpen(!open);
  }

  let timer: any;
  const handleMouse = (e: React.MouseEvent, toggle: boolean) => {
    clearTimeout(timer);
    e.preventDefault();
    timer = setTimeout(() => {
      setOpen(toggle);
    }, 300);
  }

  const clickEvent = context.mode === ModeType.VERTICAL
    ? { onClick: handleClick }
    : {}
  const hoverEvent = context.mode === ModeType.HORIZONTAL
    ? {
      onMouseEnter: (e: React.MouseEvent) => { handleMouse(e, true) },
      onMouseLeave: (e: React.MouseEvent) => { handleMouse(e, false) },
    }
    : {}
  const renderChildren = () => {
    return React.Children.map(children, (child, i) => {
      const childElement = child as React.FunctionComponentElement<MenuItemProps>;
      const {
        displayName,
      } = childElement.type;
      if (displayName === 'MenuItem') {
        return React.cloneElement(childElement, {
          index: `${index}-${i}`
        });
      } else {
        console.warn('Error: SubMenu has a child which is not a MenuItem component');
      }
    })
  }

  const subMenuClasses = classNames('submenu', {
    'menu-opened': open,
  })

  return (
    <li key={index} className={classes} {...hoverEvent}>
      <div className="submenu-title" {...clickEvent}>
        {title}
      </div>
      <ul className={subMenuClasses}>
        {renderChildren()}
      </ul>
    </li>
  )
}
SubMenu.displayName = 'SubMenu';
export default SubMenu;
