import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Button, { ButtonProps, ButtonType, ButtonSize } from './button';

const defaultProps = {
  onClick:jest.fn(),
}

const differentProps = {
  type: ButtonType.Primary,
  size: ButtonSize.Large,
  className: 'test-class',
  onClick:jest.fn(),
}

const linkProps = {
  type: ButtonType.Link,
  href: 'http://example.com',
}

const disabledProps = {
  disabled: true,
  onClick: jest.fn(),
}

describe('Button Component', () => {
  it('showld render the correct default button', () => {
    const wrapper = render(<Button {...defaultProps}>default</Button>);
    const element = wrapper.getByText('default') as HTMLButtonElement;
    expect(element).toBeInTheDocument();
    expect(element).toHaveClass('btn btn-default');
    expect(element.tagName).toEqual('BUTTON');
    expect(element.disabled).toBeFalsy();
    
    fireEvent.click(element);
    expect(defaultProps.onClick).toHaveBeenCalled();
  });

  it('should render the correct button based on different props', () => {
    const wrapper = render(<Button {...differentProps}>different props</Button>);
    const element = wrapper.getByText('different props') as HTMLButtonElement;
    expect(element).toBeInTheDocument();
    expect(element).toHaveClass('btn btn-primary btn-lg test-class');
    expect(element.tagName).toEqual('BUTTON');
    expect(element.disabled).toBeFalsy();
    fireEvent.click(element);
    expect(differentProps.onClick).toHaveBeenCalled();
  });

  it('should render a link when type equals link and href is provided', () => {
    const wrapper = render(<Button {...linkProps}>link</Button>);
    const element = wrapper.getByText('link') as HTMLAnchorElement;
    expect(element).toBeInTheDocument();
    expect(element.tagName).toEqual('A');
    expect(element.className).toEqual('btn btn-link');
  });

  it('should render disabled button when disabled set to true', () => {
    const wrapper = render(<Button {...disabledProps}>disabled</Button>);
    const element = wrapper.getByText('disabled') as HTMLButtonElement;
    expect(element).toBeInTheDocument();
    expect(element.disabled).toBeTruthy();
    expect(element.className).toEqual('btn btn-default disabled');
    fireEvent.click(element);
    expect(disabledProps.onClick).not.toHaveBeenCalled();
  })
})