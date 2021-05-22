import React, { useContext } from 'react';
import classNames from  'classnames';

import { TabsContext } from './tabs';

export interface TabPaneProps {
  className?: string;
  index?: number;
  title: string | React.ReactNode;
  disabled?: boolean;
}

const TabPane: React.FC<TabPaneProps> = (props) => {
  const {
    className,
    index,
    disabled,
    children,
  } = props;

  const context = useContext(TabsContext);
  const classes = classNames('tabs-tabPane', className, {
    'disabled': disabled,
    'active': index === context.index,
  });
  return (
    <li
      key={index}
      className={classes}
    >
      <div className="tabs-tabPane-content">
        {children}
      </div>
    </li>
  );
}
TabPane.displayName = 'TabPane';
export default TabPane;