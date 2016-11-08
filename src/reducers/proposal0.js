import { RECEIVE_PROPOSAL0, FETCH_PROPOSAL0_REQUEST } from '../constants';
import { createReducer } from '../utils/misc';

const initialState = {
    data: null,
    isFetching: false,
    loaded: false,
};

export default createReducer(initialState, {
    [RECEIVE_PROPOSAL0]: (state, payload) =>
        Object.assign({}, state, {
            data: payload.data,
            isFetching: false,
            loaded: true,
        }),
    [FETCH_PROPOSAL0_REQUEST]: (state) =>
        Object.assign({}, state, {
            isFetching: true,
        }),
});
