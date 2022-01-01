import Topbar from "./Topbar";
import React from 'react'
import { render, fireEvent, screen } from '@testing-library/react'
import { renderHook } from '@testing-library/react-hooks'
import "@testing-library/jest-dom/extend-expect"
import { useState } from 'react'
import { shallow, configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });
test('Should log out a user', async ()=>{
    // When user clicked logout, should return to landing page with the word register
    const handleLoggedin = jest.fn();
    const wrapper = shallow(<Topbar updateCurrUser={handleLoggedin}/>);
    wrapper.find("#link3").simulate("click");
    setTimeout(() => {
      expect(handleLoggedin).toHaveBeenCalled();
    }, 3000);
})

