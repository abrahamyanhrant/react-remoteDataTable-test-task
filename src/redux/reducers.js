import {FAILED_PRODUCTS, FETCH_PRODUCTS, START_PRODUCTS} from "./types";

const initialState = {
    products: [],
    total: 0,
    loading: true
}

export const Reducer = (state = initialState, action) => {
    switch (action.type) {
        case START_PRODUCTS:
            return {...state }
        case FETCH_PRODUCTS:
            return {...state, products: action.payload, total: action.total}
        case FAILED_PRODUCTS:
            return {...state, products: [], total: 0}
        default:
            return state
    }
}