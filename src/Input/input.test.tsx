import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Input, { InputSize } from './input';

const defaultProps = {
  className: 'test',
  prefix: 'http://',
  suffix: '.com',
  size: InputSize.Small,
  onPressEnter: jest.fn(),
};

const disabledProps = {
  disabled: true,
  onChange: jest.fn(),
  onPressEnter: jest.fn(),
};

describe('Input Component', () => {
  it('should render the correct default Input', () => {
    const wrapper = render(<Input {...defaultProps} />);
    const element = wrapper.getByTestId('test-input');
    expect(element).toBeInTheDocument();
    expect(element).toHaveClass('input-sl');
    const inputElement = element.getElementsByTagName('input')[0];
    expect(inputElement.disabled).toBeFalsy();

    fireEvent.change(inputElement, { target: { value: '123' } });
    expect(inputElement.value).toEqual('123');

    fireEvent.keyDown(inputElement, { key: 'Enter', code: 'Enter' });
    expect(defaultProps.onPressEnter).toHaveBeenCalledWith(inputElement.value);
  });

  it('should render the correct input based on disabled props', () => {
    const wrapper = render(<Input {...disabledProps} />);
    const element = wrapper.getByTestId('test-input');
    expect(element).toBeInTheDocument();
    const inputElement = element.getElementsByTagName('input')[0];
    expect(inputElement.disabled).toBeTruthy();

    fireEvent.keyDown(inputElement, { key: 'Enter', code: 'Enter' });
    expect(disabledProps.onPressEnter).not.toHaveBeenCalled();
  });
});
