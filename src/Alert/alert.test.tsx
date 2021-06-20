import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Alert, { AlertType } from './alert';

const defaultProps = {
  type: AlertType.DEFAULT,
  title: 'default alert',
  closeable: true,
};

const withoutCloseProps = {
  type: AlertType.WARNING,
  title: 'without close',
  closeable: false,
};

const differentProps = {
  type: AlertType.SUCCESS,
  className: 'test-class',
  title: 'different alert',
  message: 'different alert message',
  closeable: true,
  onClose: jest.fn(),
};

describe('Alert Component', () => {
  it('should render the correct default alert', () => {
    const wrapper = render(<Alert {...defaultProps} />);
    const element = wrapper.getByText('default alert');
    expect(element).toBeInTheDocument();
    expect(element.className).toEqual('alert-message');

    const parent = element.parentNode as HTMLElement;
    expect(parent.tagName).toEqual('DIV');
    expect(parent.className).toEqual('alert alert-default');

    const iconElement = wrapper.getByText('X');
    expect(iconElement).toBeInTheDocument();
    expect(iconElement.className).toEqual('alert-icon');
    fireEvent.click(iconElement);
    expect(parent.style.display).toEqual('none');
  });

  it('should render the correct alert based on different props', () => {
    const wrapper = render(<Alert {...differentProps} />);
    const element = wrapper.getByText('different alert');
    expect(element).toBeInTheDocument();
    expect(element.className).toEqual('alert-title');

    const parent = element.parentNode as HTMLElement;
    expect(parent.tagName).toEqual('DIV');
    expect(parent.className).toEqual('alert test-class alert-success');

    const messageElement = wrapper.getByText('different alert message');
    expect(messageElement).toBeInTheDocument();
    expect(messageElement.className).toEqual('alert-message');

    const iconElement = wrapper.getByText('X');
    expect(iconElement).toBeInTheDocument();
    expect(iconElement.className).toEqual('alert-icon');
  });

  it('should render the correct alert without close', () => {
    const wrapper = render(<Alert {...withoutCloseProps} />);
    const element = wrapper.getByText('without close');
    const parent = element.parentNode as HTMLElement;
    expect(parent.className).toEqual('alert alert-warning');

    const iconElement = wrapper.queryByText('X');
    expect(iconElement).not.toBeInTheDocument();
  });

  it('should onClose can be called', () => {
    const wrapper = render(<Alert {...differentProps} />);
    const iconElement = wrapper.getByText('X');
    fireEvent.click(iconElement);
    expect(differentProps.onClose).toHaveBeenCalled();
  });
});
