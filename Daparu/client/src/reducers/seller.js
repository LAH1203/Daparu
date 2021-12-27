export const initialState = {
    number: null,
    name: null,
    product: [],
};

// action creator
export const registerSellerAction = data => {
    return {
        type: 'REGISTER_SELLER',
        data,
    };
};

export const logoutSellerAction = data => {
    return {
        type: 'LOGOUT_SELLER',
    };
};

export const reloadProductAction = data => {
    return {
        type: 'RELOAD_PRODUCT',
        data,
    };
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'REGISTER_SELLER':
            return {
                ...state,
                number: action.data.number,
                name: action.data.name,
                product: action.data.product,
            };
        case 'LOGOUT_SELLER':
            return {
                ...state,
                number: null,
                name: null,
                product: [],
            };
        case 'RELOAD_PRODUCT':
            return {
                ...state,
                product: action.data.product,
            };
        default:
            return state;
    }
};

export default reducer;