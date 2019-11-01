import React from 'react';
import { shallow } from 'enzyme';
import { findByTestAttribute, checkProps } from '../../utils';
import InputField from './InputField';

describe('The input field component', () => {
  describe('Checking PropTypes', () => {
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

  describe('Renders', () => {
    
    let wrapper;
    let mockFunc;

    beforeEach(() => {
      mockFunc = jest.fn();
      const props = {
        type: 'text',
        className: 'money-input-test-classname',
        value: '500',
        onChange: mockFunc,
        placeholder: 'Demo placeholder',
        'data-testid': 'Test Input'
      };
      wrapper = shallow(<InputField {...props} />);
    });
    
    it('Should render an InputField component', () => {
      const inputfield = findByTestAttribute(wrapper, 'Test Input Primitive');
      expect(inputfield.length).toBe(1);
    });

    it('Should emit the mock function on the onChange event', () => {
      const inputField = findByTestAttribute(wrapper, 'Test Input Primitive');
      inputField.simulate('change');
      inputField.simulate('change');
      inputField.simulate('change');
      const callback = mockFunc.mock.calls.length;
      expect(callback).toBe(3);
    });
  });
});