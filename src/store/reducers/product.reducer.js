import { productService } from "../../services/product/product.service.remote"

/* eslint-disable no-case-declarations */
export const SET_PRODUCTS = 'SET_PRODUCTS'
export const SET_PRODUCT = 'SET_PRODUCT'
export const REMOVE_PRODUCT = 'REMOVE_PRODUCT'
export const ADD_PRODUCT = 'ADD_PRODUCT'
export const UPDATE_PRODUCT = 'UPDATE_PRODUCT'
const initialState = {
    products: [],
    product: null,
}

export function productReducer(state = initialState, action) {
    /* var state = state */


    switch (action.type) {
        case SET_PRODUCTS:     
            state = { ...state, products: action.products }
        case SET_PRODUCT:
            state = { ...state, product: action.product }
            break

        case REMOVE_PRODUCT:
            const lastRemovedProduct = state.products.find(
                (product) => product._id === action.productId
            )
            products = state.products.filter(
                (product) => product._id !== action.productId
            )
            state = { ...state, products, lastRemovedProduct }
            break

        case ADD_PRODUCT:
            state = { ...state, products: [...state.products, action.product] }
            break

        case UPDATE_PRODUCT:
            products = state.products.map(product => (product._id === action.product._id) ? action.product : product)
            state = { ...state, products }
            break


        default:
    }
    return state
}

// unitTestReducer()
