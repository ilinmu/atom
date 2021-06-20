import React from 'react';
import {
  fireEvent,
  render,
  RenderResult,
  cleanup,
  waitFor,
} from '@testing-library/react';

import Tabs, { TabsProps, ModeType } from './tabs';
import TabPane from './tabPane';

const defaultProps = {
  className: 'test',
  mode: ModeType.HORIZONTAL,
  defaultActiveKey: 0,
  onChange: jest.fn(),
};

const verticalProps = {
  className: 'test',
  mode: ModeType.VERTICAL,
  defaultActiveKey: 0,
  onChange: jest.fn(),
};

const generateTabs = (props: TabsProps) => {
  return (
    <Tabs {...props}>
      <TabPane title="tabpane0">active</TabPane>
      <TabPane title="tabpane1" disabled>
        disabled
      </TabPane>
      <TabPane title="third">tabpane2</TabPane>
    </Tabs>
  );
};

let wrapper: RenderResult,
  tabsElement: HTMLElement,
  activeElement: HTMLElement,
  disabledElement: HTMLElement,
  thirdElement: HTMLElement;

describe('Menu and MenuItem Component', () => {
  beforeEach(() => {
    wrapper = render(generateTabs(defaultProps));
    tabsElement = wrapper.getByTestId('test-tabs');
    activeElement = wrapper.getByText('active');
    disabledElement = wrapper.getByText('disabled');
    thirdElement = wrapper.getByText('third');
  });

  it('should render the correct Tabs and TabPane based on default props', () => {
    expect(tabsElement).toBeInTheDocument();

    const titles = tabsElement.querySelector('.tabs-titles') as HTMLElement;
    expect(titles.querySelectorAll(':scope > li').length).toBe(3);

    expect(tabsElement).toHaveClass('test tabs');
    expect(activeElement).toHaveClass('active');
    expect(disabledElement).toHaveClass('disabled');

    fireEvent.click(thirdElement);
    expect(defaultProps.onChange).toBeCalledWith(2);
  });

  it('should render the correct Tabs with vertical props', () => {
    cleanup();
    wrapper = render(generateTabs(verticalProps));
    tabsElement = wrapper.getByTestId('test-tabs');
    expect(tabsElement).toBeInTheDocument();
    expect(tabsElement).toHaveClass('vertical');
  });
});
