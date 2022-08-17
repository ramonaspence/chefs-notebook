import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event';
// import axios from 'axios';
import Login from '../Login.js';

const login = new Login;

describe('test inputs update state', () => {
    const mockSubmit = jest.fn();

    beforeEach(() => {
        
        mockSubmit.mockClear();
        render(<Login handleLogin={mockSubmit} />);
        const onSubmit = new mockSubmit;
    });

    test('inputing username updates state', () => {
        fireEvent.change(getUsername(), {target: {value: 'Text'}});
        expect(screen.getByDisplayValue('Text')).toBeInTheDocument();
    });

    test('inputing password updates state', () => {
        fireEvent.change(getPassword(), {target: {value: 'password'}});
        expect(screen.getByDisplayValue('password')).toBeInTheDocument();
    });

    test('handleLogin is called when form submits', () => {
        fireEvent.change(getUsername(), {target: {value: 'Text'}});
        fireEvent.change(getPassword(), {target: {value: 'password'}});
        fireEvent.submit(screen.getByTitle('login_form'));
        expect(mockSubmit).toHaveBeenCalledTimes(1);
    });

    test('handleLogin is called when submit button clicked', () => {
        fireEvent.change(getUsername(), {target: {value: 'Text'}});
        fireEvent.change(getPassword(), {target: {value: 'password'}});
        fireEvent.click(screen.getByRole('button'));
        expect(mockSubmit).toHaveBeenCalledTimes(1);
        expect(mockSubmit).toBeCalled();
        expect(mockSubmit).toReturnWith();
    });
});

describe('tests methods using axios', () => {
    const axios = require('axios');
    jest.mock('axios');

    test('capture login', () => {
        const data = {
            pk: 1, username: 'admin', email: 'ramonaejspence@gmail.com', 
            first_name: '', last_name: ''
        }
        const resp = {data: data}
        axios.mockResolvedValue(resp);
        return login.captureLogin().then(response => expect(response).toBe)
    });

    test('handleLogin', () => {
        const responseData = {
            key: '2e524ff04fd0c9dde399744afbf622bc7ab62a5e'
        }
        const resp = {data: responseData}
        axios.mockResolvedValue(resp);
        return login.handleLogin().then(resp => expect(resp).toEqual(responseData))
        // expect(axios.post).toHaveBeenCalled();
    });
});

function getUsername() {
    return screen.getByPlaceholderText(/username/);
}

function getPassword() {
    return screen.getByPlaceholderText(/password/);
}

function enterFormData() {
    fireEvent.change(getUsername(), {target: {value: 'Text'}});
    fireEvent.change(getPassword(), {target: {value: 'password'}});
}

// function fireHandleLogin() {
//     enterFormData();
//     fireEvent.submit(screen.getByTitle('login_form'))
// }