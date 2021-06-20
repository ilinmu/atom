import { FC } from 'react';

import Tabs, { TabsProps } from './tabs';
import TabPane, { TabPaneProps } from './tabPane';

export type ITabsComponent = FC<TabsProps> & {
  TabPane: FC<TabPaneProps>;
};

const TransTabs = Tabs as ITabsComponent;
TransTabs.TabPane = TabPane;

export default TransTabs;
