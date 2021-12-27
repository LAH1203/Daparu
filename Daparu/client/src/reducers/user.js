import axios from "axios";

import { API_ADDRESS } from '../utils/constants';

export const initialState = {
    isLoggedIn: false,
    me: null,
    loginData: {},
};

// action creator
export const loginAction = data => {
    return {
        type: 'LOG_IN',
        data,
    };
};

export const logoutAction = () => {
    return {
        type: 'LOG_OUT',
    };
};

export const addToCart = body => {
    const request = axios.post(API_ADDRESS + '/cart/add', body)
        .then(response => response.data);

    return {
        type: 'ADD_TO_CART',
        payload: request
    };
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'LOG_IN':
            return {
                ...state,
                isLoggedIn: true,
                me: action.data,
            };
        case 'LOG_OUT':
            return {
                ...state,
                isLoggedIn: false,
                me: null,
            };
        case 'ADD_TO_CART':
            return {
                ...state,
                userData: {
                    ...state.userData,
                    cart: action.payload,
                }
            };
        default:
            return state;
    }
};

export default reducer;