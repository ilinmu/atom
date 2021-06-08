import React from 'react'
import {
  render,
  RenderResult,
  fireEvent,
  waitFor,
} from '@testing-library/react'
import AutoComplete, { AutoCompleteProps } from './autoComplete'

const testArray = [
  {value: 'aaa', number: 11},
  {value: 'bbb', number: 12},
  {value: 'ccc', number: 13},
  {value: 'ddd', number: 14},
  {value: 'abc', number: 15},
];

const testProps: AutoCompleteProps = {
  fetchSuggestions: (query) => { return testArray.filter(item => item.value.includes(query)); },
  onSelect: jest.fn(),
  placeholder: 'auto-complete',
}

let wrapper: RenderResult, inputNode: HTMLInputElement
describe('test AutoComplete component', () => {
  beforeEach(() => {
    wrapper = render(<AutoComplete {...testProps}/>);
    inputNode = wrapper.getByPlaceholderText('auto-complete') as HTMLInputElement;
  })
  it('basic AutoComplete behavior', async () => {
    fireEvent.change(inputNode, { target: { value: 'a' } });
    expect(inputNode.value).toEqual('a');
    expect(wrapper.queryByText('aaa')).toBeInTheDocument();
    expect(wrapper.queryByText('abc')).toBeInTheDocument();
    expect(wrapper.container.querySelectorAll('.suggestion-item').length).toBe(2);

    fireEvent.click(wrapper.getByText('aaa'));
    expect(wrapper.container.querySelectorAll('.suggestion-item').length).toBe(0);
    expect(testProps.onSelect).toHaveBeenCalledWith({ value: 'aaa', number: 11});
    expect(wrapper.queryByText('aaa')).not.toBeInTheDocument();
    expect(inputNode.value).toEqual('aaa');
  })
  it('should provide keyboard support', async () => {
    
  })
  it('click outside should hide the dropdown', async () => {

  })
  it('renderOption should generate the right template', () => {

  })
  it('async fetchSuggestions should works fine', () => {

  })
})