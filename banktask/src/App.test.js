import React from 'react';
import App from './App';
import { cleanup, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import configureMockStore from 'redux-mock-store';
import { renderWithRouter } from './utils';

const mockStore = configureMockStore();

describe('App component', () => {
    
  afterEach(cleanup);

  describe('<Header />', () => {
    it('Should render a <Header /> component in the Home page screen', () => {
      const { getByTestId } = renderWithRouter(<App/>, { store: mockStore() });
      expect(getByTestId('Header Component')).toBeInTheDocument();
    });

    it('Should render the image', () => {
      const { getByTestId } = renderWithRouter(<App/>, { store: mockStore() });
      expect(getByTestId('Logo Image')).toBeInTheDocument();
    });
  });

  it('Should render a Home page component', () => {
    const { getByTestId } = renderWithRouter(<App/>, { store: mockStore() });
    expect(getByTestId('Home Page Component')).toBeInTheDocument();
  });

  it('Should render a Create account page component', () => {
    const { getByTestId, getByText } = renderWithRouter(<App/>, { store: mockStore() });
    fireEvent.click(getByText('Add an account'), { button: 0 });
    expect(getByTestId('Create Account Component')).toBeInTheDocument();
  });
});