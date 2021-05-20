import React from 'react';
import { fireEvent, render, RenderResult, cleanup } from '@testing-library/react';

import Menu, { MenuProps } from './menu';
import MenuItem, { MenuItemProps } from './menuItem';

const defaultProps: MenuProps = {
  defaultSelected: 0,
  className: 'test',
  onSelect: jest.fn(),
}

const vertivalProps: MenuProps = {
  defaultSelected: 0,
  mode: 'vertical',
}

const generateMenu = (props: MenuProps) => {
  return (
    <Menu {...props}>
      <MenuItem index={0}>
        active
      </MenuItem>
      <MenuItem disabled index={1}>
        disabled
      </MenuItem>
      <MenuItem index={2}>
        third
      </MenuItem>
    </Menu>
  )
};

let wrapper: RenderResult,
    menuElement: HTMLElement,
    activeElement: HTMLElement,
    disabledElement: HTMLElement;

describe('Menu and MenuItem Component', () => {
  beforeEach(() => {
    wrapper = render(generateMenu(defaultProps));
    menuElement = wrapper.getByTestId('test-menu');
    activeElement = wrapper.getByText('active');
    disabledElement = wrapper.getByText('disabled');
  })

  it('should render the correct Menu and MenuItem based on default props', () => {
    expect(menuElement).toBeInTheDocument();
    expect(menuElement).toHaveClass('menu test');
    expect(menuElement.getElementsByTagName('li').length).toBe(3);
    expect(activeElement.className).toEqual('menu-item active');
    expect(disabledElement.className).toEqual('menu-item disabled');
  });

  it('click items should change active and call the callbacks', () => {
    const thirdElement = wrapper.getByText('third');
    fireEvent.click(thirdElement);
    expect(thirdElement).toHaveClass('active');
    expect(activeElement).not.toHaveClass('active');
    expect(defaultProps.onSelect).toBeCalledWith(2);
    fireEvent.click(disabledElement);
    expect(disabledElement).not.toHaveClass('active');
    expect(defaultProps.onSelect).not.toHaveBeenCalledWith(1)
  });

  it('should render vertical mode when mode is set to vertical', () => {
    cleanup();
    const verticalWrapper = render(generateMenu(vertivalProps));
    const menuElement = verticalWrapper.getByTestId('test-menu');
    expect(menuElement).toHaveClass('menu-vertical');
  })
})