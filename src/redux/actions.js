import axios from "axios";
import {FAILED_PRODUCTS, FETCH_PRODUCTS, START_PRODUCTS} from "./types";

export const startProducts = () => ({
    type: START_PRODUCTS,
});

export const failedProducts = (error) => ({
    type: FAILED_PRODUCTS,
    payload: error
});


export function fetchProducts(page, limit, search = "") {
    return async dispatch => {
        dispatch(startProducts())
        try {
            const data = await axios.get(`https://api.github.com/search/repositories?q=${search}&page=${page}&per_page=${limit}`).then(res => res.data)
            console.log(data)
            dispatch({
                type: FETCH_PRODUCTS,
                payload: data.items,
                total: data.total_count
            })
        } catch (e) {
            dispatch(failedProducts(e))
        }
    }
}
