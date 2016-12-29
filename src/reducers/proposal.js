import { RECEIVE_PROPOSAL, FETCH_PROPOSAL_REQUEST, FETCH_AGGREGATIONS_REQUEST, RECEIVE_AGGREGATIONS, RUN_PROPOSAL_REQUEST, RECEIVE_RUN_PROPOSAL } from '../constants';
import { createReducer } from '../utils/misc';

const initialState = {
    data: null,
    isFetching: false,
    loaded: false,
};

export default createReducer(initialState, {
    [FETCH_PROPOSAL_REQUEST]: (state,payload) =>
        Object.assign({}, state, {
            isFetching: true,
            message_text: payload.message,
            message_open: true,
        }),
    [RECEIVE_PROPOSAL]: (state, payload) =>
        Object.assign({}, state, {
            data: payload.data,
            allAggregations: payload.aggregations,
            isFetching: false,
            loaded: true,
            message_text: payload.message,
            message_open: false,
        }),
    [RUN_PROPOSAL_REQUEST]: (state,payload) =>
        Object.assign({}, state, {
            isFetching: true,
            message_text: payload.message,
            message_open: true,
        }),
    [RECEIVE_RUN_PROPOSAL]: (state, payload) =>
        Object.assign({}, state, {
            data: payload.data,
            allAggregations: payload.aggregations,
            isFetching: false,
            loaded: true,
            message_text: payload.message,
            message_open: true,
        }),
    [RECEIVE_AGGREGATIONS]: (state, payload) =>
        Object.assign({}, state, {
            aggregations_list: payload.data,
            isFetching: false,
            loaded: true,
        }),
    [FETCH_AGGREGATIONS_REQUEST]: (state) =>
        Object.assign({}, state, {
            isFetching: true,
            loaded: false,
        }),

});
