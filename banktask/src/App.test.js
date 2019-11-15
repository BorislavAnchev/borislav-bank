import React from 'react';
import App from './App';
import { render, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import configureMockStore from 'redux-mock-store';
import { Provider } from 'react-redux';

const mockStore = configureMockStore();

describe('App component', () => {
    
  afterEach(cleanup);

  describe('<Header />', () => {
    it('Should render a <Header /> component in the Home page screen', () => {
      const { getByTestId } = render(<Provider store={mockStore()}><App/></Provider>);
      expect(getByTestId('Header Component')).toBeInTheDocument();
    });

    it('Should render the image', () => {
      const { getByTestId } = render(<Provider store={mockStore()}><App/></Provider>);
      expect(getByTestId('Logo Image')).toBeInTheDocument();
    });
  });

  it('Should render a Home page component', () => {
    const { getByTestId } = render(<Provider store={mockStore()}><App/></Provider>);
    expect(getByTestId('Home Page Component')).toBeInTheDocument();
  });
});