import React from 'react';
import { fireEvent, render, RenderResult, cleanup, waitFor } from '@testing-library/react';

import Menu, { MenuProps, ModeType } from './menu';
import MenuItem from './menuItem';
import SubMenu from './subMenu';

const defaultProps: MenuProps = {
  defaultSelected: '0',
  className: 'test',
  mode: ModeType.VERTICAL,
  onSelect: jest.fn(),
}

const vertivalProps: MenuProps = {
  defaultSelected: '0',
  mode: ModeType.VERTICAL,
}

const generateMenu = (props: MenuProps) => {
  return (
    <Menu {...props}>
      <MenuItem>
        active
      </MenuItem>
      <MenuItem disabled>
        disabled
      </MenuItem>
      <MenuItem>
        third
      </MenuItem>
      <SubMenu title="subMenu">
        <MenuItem>subMenu 1</MenuItem>
        <MenuItem>subMenu 2</MenuItem>
      </SubMenu>
    </Menu>
  )
};

const createStyleFile = () => {
  const cssFile: string = `
    .submenu {
      display: none;
    }
    .submenu.menu-opened {
      display: block;
    }
  `;

  const style = document.createElement('style');
  style.type = 'text/css';
  style.innerHTML = cssFile;
  return style;
}

let wrapper: RenderResult,
    menuElement: HTMLElement,
    activeElement: HTMLElement,
    disabledElement: HTMLElement;

describe('Menu and MenuItem Component', () => {
  beforeEach(() => {
    wrapper = render(generateMenu(defaultProps));
    wrapper.container.append(createStyleFile());
    menuElement = wrapper.getByTestId('test-menu');
    activeElement = wrapper.getByText('active');
    disabledElement = wrapper.getByText('disabled');
  });

  it('should render the correct Menu and MenuItem based on default props', () => {
    expect(menuElement).toBeInTheDocument();
    expect(menuElement).toHaveClass('menu test');
    expect(menuElement.querySelectorAll(':scope > li').length).toBe(4);
    expect(activeElement.className).toEqual('menu-item active');
    expect(disabledElement.className).toEqual('menu-item disabled');
  });

  it('click items should change active and call the callbacks', () => {
    const thirdElement = wrapper.getByText('third');
    fireEvent.click(thirdElement);
    expect(thirdElement).toHaveClass('active');
    expect(activeElement).not.toHaveClass('active');
    expect(defaultProps.onSelect).toBeCalledWith('2');
    fireEvent.click(disabledElement);
    expect(disabledElement).not.toHaveClass('active');
    expect(defaultProps.onSelect).not.toHaveBeenCalledWith('1')
  });

  it('should render vertical mode when mode is set to vertical', () => {
    cleanup();
    const verticalWrapper = render(generateMenu(vertivalProps));
    const menuElement = verticalWrapper.getByTestId('test-menu');
    expect(menuElement).toHaveClass('menu-vertical');
  });

  it('should show subMenu items when hover on subMenu', async () => {
    const subMenuElement = wrapper.getByText('subMenu 1');
    expect(subMenuElement).not.toBeVisible();

    const titleElement = wrapper.getByText('subMenu');
    fireEvent.mouseEnter(titleElement);
    await waitFor(() => {
      expect(subMenuElement).toBeVisible();
    });
    fireEvent.click(subMenuElement);
    expect(defaultProps.onSelect).toBeCalledWith('3-0');
    
    fireEvent.mouseLeave(titleElement);
    await waitFor(() => {
      expect(subMenuElement).not.toBeVisible();
    })
  })
})