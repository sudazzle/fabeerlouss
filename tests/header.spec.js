import React from 'react';
import { mount, shallow } from 'enzyme';
import { expect } from 'chai';

import Header from '../src/components/header';

import { AppContainer } from 'react-hot-loader';

describe('Header', function () {
  it('should have img tag', function () {
    const wrapper = shallow(<Header/>);
    expect(wrapper.find('img')).to.be.ok;
  });

  // it('should have props for email and src', function () {
  //   const wrapper = shallow(<App/>);
  //   expect(wrapper.props().email).to.be.defined;
  //   expect(wrapper.props().src).to.be.defined;
  // });
});