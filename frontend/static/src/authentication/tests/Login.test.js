import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event';
import axios from 'axios';

import Login from '../Login.js';


describe('Login component', () => {
    const mockSubmit = jest.fn();
    jest.mock('axios');

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

        enterFormData();
        fireEvent.submit(screen.getByTitle('login_form'));
        expect(mockSubmit).toHaveBeenCalledTimes(1);
    });

    test('handleLogin is called when submit button clicked', () => {

        enterFormData();
        fireEvent.click(screen.getByRole('button'));
        expect(mockSubmit).toHaveBeenCalledTimes(1);
        expect(mockSubmit).toBeCalled();
        expect(mockSubmit).toReturnWith();
    });

    test('axios post request', () => {


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