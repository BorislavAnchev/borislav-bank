import React from 'react';
import HomePage from './HomePage';
import { render, cleanup, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

describe('Home page screen component ', () => {
    
    afterEach(cleanup);

    it('Should render a Home page component', () => {
      const { getByTestId } = render(<HomePage/>);
      expect(getByTestId('Home Page Component')).toBeInTheDocument();
    });
  });