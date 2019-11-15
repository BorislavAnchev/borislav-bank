import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { checkProps } from '../../utils';
import InputField from './InputField';

describe('The input field component', () => {
  describe('Checking PropTypes', () => {

    afterEach(cleanup);
    
    it('Should not throw a warning', () => {
      const expectedProps = {
        type: 'text',
        className: 'money-input-test-classname',
        value: '500',
        onChange: () => { },
        placeholder: 'Demo placeholder',
        'data-testid': 'Test Input'
      };
      const propsError = checkProps(InputField, expectedProps);
      expect(propsError).toBeUndefined();
    });

    it('Should throw a warning in the browser console', () => {
      const expectedProps = {
        type: 'text',
        className: 35,
        value: undefined,
        onChange: () => { },
        placeholder: 'Demo placeholder',
        'data-testid': 35
      };
      const propsError = checkProps(InputField, expectedProps);
      expect(propsError).toBeTruthy();
    });
  });

  afterEach(cleanup);

  const mockFunc = jest.fn();
  const props = {
    type: 'text',
    className: 'money-input-test-classname',
    value: '500',
    onChange: mockFunc,
    placeholder: 'Demo placeholder',
    'data-testid': 'Test Input'
  };    
  
  it('Should render the component', () => {
    const { getByTestId } = render(<InputField {...props}/>);
    expect(getByTestId('Test Input Primitive')).toBeInTheDocument();
  });

  it('Should call the mock function on the onChange event', () => {
    const { getByTestId } = render(<InputField {...props}/>);
    fireEvent.change(getByTestId('Test Input Primitive'), { target: { value: 'test' } });
    expect(mockFunc.mock.calls.length).toBe(1);
  });  
});