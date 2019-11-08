import React from 'react';
import Header from './Header';
import '@testing-library/jest-dom/extend-expect';
import { render, cleanup } from '@testing-library/react';

describe('Header component', () => {

  afterEach(cleanup);

  it('Should render the component', () => {
    const { getByTestId } = render(<Header/>);
    expect(getByTestId('Header Component')).toBeInTheDocument();
  });

  it('Should render the image', () => {
    const { getByTestId } = render(<Header/>);
    expect(getByTestId('Logo Image')).toBeInTheDocument();
  });
});