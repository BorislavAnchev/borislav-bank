import React from 'react';
import App from './App';
import { render, cleanup } from '@testing-library/react'; // Fire event may need to be removed eventually due to not being needed and used.
import '@testing-library/jest-dom/extend-expect';

describe('App component', () => {
    
  afterEach(cleanup);

  describe('<Header />', () => { // Should I do such tests as some sort of integration tests? This is to check if the <Header /> is rendered when rendering the <App />
    it('Should render a <Header /> component in the Home page screen', () => {
      const { getByTestId } = render(<App/>);
      expect(getByTestId('Header Component')).toBeInTheDocument();
    });

    it('Should render the image', () => {
      const { getByTestId } = render(<App/>);
      expect(getByTestId('Logo Image')).toBeInTheDocument();
    });
  });

  it('Should render a Home page component', () => {
    const { getByTestId } = render(<App/>);
    expect(getByTestId('Home Page Component')).toBeInTheDocument();
  });
});