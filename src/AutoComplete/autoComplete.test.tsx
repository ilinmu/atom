import React from 'react';
import {
  render,
  RenderResult,
  fireEvent,
  waitFor,
  cleanup,
} from '@testing-library/react';
import AutoComplete, {
  AutoCompleteProps,
  OptionDataType,
} from './autoComplete';

const testArray = [
  { value: 'aaa', number: 11 },
  { value: 'bbb', number: 12 },
  { value: 'ccc', number: 13 },
  { value: 'ddd', number: 14 },
  { value: 'abc', number: 15 },
];

const testProps: AutoCompleteProps = {
  fetchSuggestions: (query) => {
    return testArray.filter((item) => item.value.includes(query));
  },
  onSelect: jest.fn(),
  placeholder: 'auto-complete',
};

const renderOptionProps: AutoCompleteProps = {
  fetchSuggestions: (query) => {
    return testArray.filter((item) => item.value.includes(query));
  },
  onSelect: jest.fn(),
  placeholder: 'auto-complete',
  renderOption: (item: OptionDataType) => <>{`${item.value}renderoption`}</>,
};

let wrapper: RenderResult, inputNode: HTMLInputElement;
describe('test AutoComplete component', () => {
  beforeEach(() => {
    wrapper = render(<AutoComplete {...testProps} />);
    inputNode = wrapper.getByPlaceholderText(
      'auto-complete',
    ) as HTMLInputElement;
  });
  it('basic AutoComplete behavior', async () => {
    fireEvent.change(inputNode, { target: { value: 'a' } });
    expect(inputNode.value).toEqual('a');
    await waitFor(() => {
      expect(wrapper.queryByText('aaa')).toBeInTheDocument();
      expect(wrapper.queryByText('abc')).toBeInTheDocument();
    });
    expect(wrapper.container.querySelectorAll('.suggestion-item').length).toBe(
      2,
    );

    fireEvent.click(wrapper.getByText('aaa'));
    expect(wrapper.container.querySelectorAll('.suggestion-item').length).toBe(
      0,
    );
    expect(testProps.onSelect).toHaveBeenCalledWith({
      value: 'aaa',
      number: 11,
    });
    expect(wrapper.queryByText('aaa')).not.toBeInTheDocument();
    expect(inputNode.value).toEqual('aaa');
  });
  it('should provide keyboard support', async () => {
    fireEvent.change(inputNode, { target: { value: 'a' } });
    await waitFor(() => {
      expect(wrapper.queryByText('aaa')).toBeInTheDocument();
      expect(wrapper.queryByText('abc')).toBeInTheDocument();
    });
    const first = wrapper.queryByText('aaa');
    const second = wrapper.queryByText('abc');

    fireEvent.keyDown(inputNode, { code: 'ArrowDown' });
    expect(first).toHaveClass('active');
    fireEvent.keyDown(inputNode, { code: 'ArrowDown' });
    expect(first).not.toHaveClass('active');
    expect(second).toHaveClass('active');

    fireEvent.keyDown(inputNode, { code: 'ArrowUp' });
    expect(second).not.toHaveClass('active');
    expect(first).toHaveClass('active');

    fireEvent.keyDown(inputNode, { code: 'Enter' });
    expect(first).not.toBeInTheDocument();
    expect(second).not.toBeInTheDocument();
    expect(wrapper.container.querySelectorAll('.suggestion-item').length).toBe(
      0,
    );
    expect(inputNode.value).toEqual('aaa');
  });
  it('click outside should hide the dropdown', async () => {
    fireEvent.change(inputNode, { target: { value: 'a' } });
    await waitFor(() => {
      expect(wrapper.queryByText('aaa')).toBeInTheDocument();
      expect(wrapper.queryByText('abc')).toBeInTheDocument();
    });
    fireEvent.click(document);
    expect(wrapper.queryByText('aaa')).not.toBeInTheDocument();
  });
  it('renderOption should generate the right template', async () => {
    cleanup();
    const optionWrapper: RenderResult = render(
      <AutoComplete {...renderOptionProps} />,
    );
    const optionInputNode: HTMLInputElement =
      optionWrapper.getByPlaceholderText('auto-complete') as HTMLInputElement;
    fireEvent.change(optionInputNode, { target: { value: 'a' } });
    await waitFor(() => {
      expect(optionWrapper.queryByText('aaarenderoption')).toBeInTheDocument();
      expect(optionWrapper.queryByText('abcrenderoption')).toBeInTheDocument();
    });
    // expect(testProps.renderOption).toHaveBeenCalledWith({ value: 'aaa', number: 11});
  });
  it('async fetchSuggestions should works fine', () => {});
});
