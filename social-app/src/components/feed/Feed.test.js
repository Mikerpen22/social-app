import React from 'react'
import Feed from './Feed'
import { render, fireEvent, screen } from '@testing-library/react'
import { renderHook } from '@testing-library/react-hooks'
import "@testing-library/jest-dom/extend-expect"
import { useState } from 'react'
import { shallow, configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });


test('Should fetch articles for current logged in user', async ()=>{
    // When user clicked logout, should return to landing page with the word register
    const handleLoggedin = jest.fn();
    const wrapper = shallow(<Feed currUser={0}/>);

    setTimeout(() => {
      expect(screen.getByTestId("test-feed-id")).toHaveTextContent('comment');
    }, 3000);
})