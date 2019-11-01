import React from 'react';
import { shallow } from 'enzyme';
import Header from './Header';
import { findByTestAttribute } from '../../utils/'

const setUp = (props = {}) => {
  const component = shallow(<Header {...props} />);
  return component;
}

describe('Header component', () => {

  let component;
  beforeEach(() => {
    component = setUp();
  });

  it('Should render without errors', () => {

    const wrapper = findByTestAttribute(component, 'headerComponent');
    expect(wrapper.length).toBe(1);
  });

  it('Should render the image', () => {
    const logo = findByTestAttribute(component, 'logoIMG');
    expect(logo.length).toBe(1);
  });
});