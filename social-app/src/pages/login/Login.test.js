import React from 'react'
import Login from './Login'
import { validateLogin } from './Login'
import { render, fireEvent, screen } from '@testing-library/react'
import { renderHook } from '@testing-library/react-hooks'
import "@testing-library/jest-dom/extend-expect"
import { useState } from 'react'
import { shallow, configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

describe("Login", () => {
  it("renders correctly", () => {
    shallow(<Login />);
  });
  
  it("User typing in info should update state", () => {
    const handleLoggedin = jest.fn();
    // Simulate user input then click login button
    // Test: window.alert should not be called if successfully login
    const wrapper = shallow(<Login currUser={0} updateCurrUser={handleLoggedin}/>);
    const handleLoggedinUser = jest.spyOn(React, "useState");
    handleLoggedinUser.mockImplementation(isLoggedIn => [isLoggedIn, setIsLoggedIn]);
    wrapper.find("#loginBtn").simulate("click");
    expect(handleLoggedin).toBeTruthy();
  })

  it("Should log in a user", async ()=>{
    const handleLoggedin = jest.fn();
    const wrapper = shallow(<Login currUser={0} updateCurrUser={handleLoggedin}/>);
    // const handleLoggedinUser = jest.spyOn(React, "useState");
    // handleLoggedinUser.mockImplementation(isLoggedIn => [isLoggedIn, setIsLoggedIn]);

    // Try 1:
    wrapper.find('#input1').simulate("change", {target: {name:'emailInput', value: "Sincere@april.biz"}});
    wrapper.find('#input2').simulate("change", {target: {name:'pwdInput', value: "Kulas Light"}});
    wrapper.find("#loginBtn").simulate('click');  // possible to click after finding simulate change?
    // expect(window.alert).toHaveBeenCalledWith('clicked');
    setTimeout(() => {
      expect(handleLoggedin).toHaveBeenCalled();
    }, 3000);
  })

  it("Should not log in an invalid user", async ()=>{
    const handleLoggedin = jest.fn();
    const wrapper = shallow(<Login currUser={0} updateCurrUser={handleLoggedin}/>);

    wrapper.find('#input1').simulate("change", {target: {name: 'emailInput', value: "wrongmail"}});
    wrapper.find('#input2').simulate("change", {target: {name: 'pwdInput', value: "1"}});
    wrapper.find('#loginBtn').simulate('click');

    setTimeout(() => {
      expect(wrapper.find('#input1').props().value = "")
    }, 5000);
  })

 });


