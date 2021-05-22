import React, { useState, createContext } from 'react';
import classNames from 'classnames';

import TabPaneComponent, { TabPaneProps } from './tabPane';
type TabsMode = 'vertical' | 'horizontal';

export interface TabsProps {
  className?: string;
  mode?: TabsMode;
  defaultActiveKey?: number;
  onChange?: (tabKey: number) => void;
}

interface ITabsContext {
  index: number;
  // onChange?: (tabKey: number) => void;
}

export const TabsContext = createContext<ITabsContext>({
  index: 0,
});

const Tabs: React.FC<TabsProps> = (props) => {
  const {
    className,
    mode,
    defaultActiveKey,
    onChange,
    children,
  } = props;
  const [active, setActive] = useState(defaultActiveKey);
  const classes = classNames('tabs', className, {
    'vertical': mode === 'vertical',
  });
  const handleTitleClick = (index: number) => {
    setActive(index);
    if (onChange) {
      onChange(index);
    }
  }
  const titleList = () => React.Children.map(children, (child, index) => {
    const childElement = child as React.FunctionComponentElement<TabPaneProps>;
    const {
      title,
      disabled,
    } = childElement.props;
    const titleClasses = classNames('tabs-title', {
      'active': index === active,
      'disabled': disabled,
    });
    return (
      <div className={titleClasses} onClick={() => handleTitleClick(index)}>
        {title}
      </div>
    );
  });

  const renderChildren = () => {
    return React.Children.map(children, (child, index) => {
      const childElement = child as React.FunctionComponentElement<TabPaneProps>;
      if (childElement.type.displayName === 'TabPane') {
        return React.cloneElement(childElement, {
          index: index,
        })
      } else {
        console.warn('Tabs has a child which is not a TabPane component')
      }
    })
  };

  const passedContext: ITabsContext = {
    index: active ? active : 0,
  }

  return (
    <div className={classes}>
      <ul className="tabs-titles">
        {titleList()}
      </ul>
      <ul className="tabs-contents">
        <TabsContext.Provider value={passedContext}>
          {renderChildren()}
        </TabsContext.Provider>
      </ul>
    </div>
  )
};

Tabs.defaultProps = {
  defaultActiveKey: 0,
};

export const TabPane: React.FC<TabPaneProps> = TabPaneComponent;
export default Tabs;