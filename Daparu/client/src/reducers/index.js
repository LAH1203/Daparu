import { combineReducers } from 'redux';

import user from './user';
import seller from './seller';

// (이전상태, 액션) => 다음상태
const rootReducer = combineReducers({
    index: (state = {}, action) => {
        switch (action.type) {
            default:
                return state;
        }
    },
    user,
    seller,
});

export default rootReducer;