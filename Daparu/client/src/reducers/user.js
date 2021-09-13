import axios from "axios";

export const initialState = {
    isLoggedIn: false,
    me: null,
    loginData: {},
    cart: [],
};

// action creator
export const loginAction = (data) => {
    return {
        type: 'LOG_IN',
        data,
    }
};

export const logoutAction = () => {
    return {
        type: 'LOG_OUT',
    }
}

export function addToCart(body){
    const request = axios.post('http://localhost:5000/api/user/addToCart', body)
    .then(response => response.data);

    return {
        type: 'ADD_TO_CART',
        payload: request
    }
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'LOG_IN':
            console.log("LOG_IN ACTION", action.data);
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

        case ('ADD_TO_CART', action.payload):
            return{
                ...state,
                userData: {
                    ...state.userData,
                    cart: action.payload
                }
            }

        default:
            return state;
    }
};

export default reducer;