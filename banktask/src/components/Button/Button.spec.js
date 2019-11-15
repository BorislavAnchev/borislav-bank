import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { checkProps } from '../../utils';
import Button from './Button';

describe('The button component', () => {
  describe('Checking PropTypes', () => {
    
    afterEach(cleanup);

    it('Should not throw a warning', () => {
      const expectedProps = {
        children: 'Test Button',
        onClick: () => {

        },
        'data-testid': 'test'
      };
      const propsError = checkProps(Button, expectedProps);
      expect(propsError).toBeUndefined();
    });

    it('Should throw a warning in the browser console', () => {
      const expectedProps = {
        children: () => {},
        onClick: 'Not a function',
        'data-testid': 35
      };
      const propsError = checkProps(Button, expectedProps);
      expect(propsError).toBeTruthy();
    });
  });

  afterEach(cleanup);

  const mockFunc = jest.fn();
  const props = {
    children: 'Test Button',
    onClick: mockFunc,
    'data-testid': 'Test Button'
  };

  it('Should render the component', () => {
    const { getByTestId } = render(<Button {...props}/>);
    expect(getByTestId('Test Button Primitive')).toBeInTheDocument();
  });

  it('Should call the mock function on the onChange event', () => {
    const { getByTestId } = render(<Button {...props}/>);
    fireEvent.click(getByTestId('Test Button Primitive'), { button: 0 });
    expect(mockFunc.mock.calls.length).toBe(1);
  });
});