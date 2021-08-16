export const initialState = {
    isLoggedIn: false,
    me: null,
    loginData: {}
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
        default:
            return state;
    }
};

export default reducer;