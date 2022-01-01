import React from 'react'
import FriendsList from './FriendsList'
import { render, fireEvent, screen } from '@testing-library/react'
import { renderHook } from '@testing-library/react-hooks'
import "@testing-library/jest-dom/extend-expect"
import { useState } from 'react'
import { shallow, configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });


test('Should remove articles when removing a follower', async ()=>{
    // When user clicked logout, should return to landing page with the word register
    const deleteFriend = jest.fn();
    const wrapper = shallow(<FriendsList deleteFriendFromList={deleteFriend}/>);
    wrapper.find("#test-delete-btn").simulate("click");
    setTimeout(() => {
      expect(deleteFriend).toHaveBeenCalled();
    }, 3000);
})