import { productService } from "../../services/product/product.service.remote"

/* eslint-disable no-case-declarations */
export const SET_PRODUCTS = 'SET_PRODUCTS'
export const SET_PRODUCT = 'SET_PRODUCT'
export const REMOVE_PRODUCT = 'REMOVE_PRODUCT'
export const ADD_PRODUCT = 'ADD_PRODUCT'
export const UPDATE_PRODUCT = 'UPDATE_PRODUCT'
const initialState = {
    products: null,
    product: null,
    currSong: null,
    currSelectedProduct: null,
    currSelectedSong: null,
    likedSongs: JSON.parse(localStorage.getItem('likedsongs')) || null,
    currProduct: null,
    albums: null
}

export function productReducer(state = initialState, action) {
    var newState = state
    var products
    var product
    console.log('Action:', action)
    switch (action.type) {
        case SET_PRODUCTS:
            newState = { ...state, products: action.products }
      
        case SET_PRODUCT:
            newState = { ...state, product: action.product }
            break

        case REMOVE_PRODUCT:
            const lastRemovedProduct = state.products.find(
                (product) => product._id === action.productId
            )
            products = state.products.filter(
                (product) => product._id !== action.productId
            )
            newState = { ...state, products, lastRemovedProduct }
            break

        case ADD_PRODUCT:
            newState = { ...state, products: [...state.products, action.product] }
            break

        case UPDATE_PRODUCT:
            products = state.products.map(product => (product._id === action.product._id) ? action.product : product)
            newState = { ...state, products }
            break

       
        default:
    }
    return newState
}

// unitTestReducer()
