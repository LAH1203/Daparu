import axios from "axios";

export const initialState = {
    number: null,
    name: null,
    product: [],
};

// action creator
export const registerSellerAction = (data) => {
    return {
        type: 'REGISTER_SELLER',
        data,
    }
};

export const logoutSellerAction = (data) => {
    return {
        type: 'LOGOUT_SELLER',
    }
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'REGISTER_SELLER':
            console.log("REGISTER_SELLER ACTION", action.data);
            return {
                ...state,
                number: action.data.number,
                name: action.data.name,
                product: action.data.product,
            };
        case 'LOGOUT_SELLER':
            console.log("LOGOUT_SELLER ACTION");
            return {
                ...state,
                number: null,
                name: null,
                product: [],
            };
        default:
            return state;
    }
};

export default reducer;