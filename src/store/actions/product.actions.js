import { store } from '../store'
import {
    ADD_PRODUCT,
    REMOVE_PRODUCT,
    SET_PRODUCTS,
    SET_PRODUCT,
  UPDATE_PRODUCT,

} from '../reducers/product.reducer'
import { productService } from '../../services/product'

export async function loadProducts() {
    try {
        const Products = await productService.queryProducts()
        store.dispatch(getCmdSetProducts(Products))
    } catch (err) {
        console.log('Cannot load Products', err)
        throw err
    }
}


export async function loadProduct(productId) {
    try {
        if(productId.productType) {
            store.dispatch(getCmdSetProduct(productId))
        }else {
            const Product = await productService.getById(productId)
            store.dispatch(getCmdSetProduct(Product))
        }
    } catch (err) {
        console.log('Cannot load Product', err)
        throw err
    }
}
export async function updateProducts(song, product, idx) {
    try {
        await product.songs.push(song)
        await productService.save(product)
        store.dispatch(getCmdUpdateProducts({ product, idx }))
    } catch (err) {
        console.log('Cannot save Product', err)
        throw err
    }
}

export async function removeProduct(product) {
    try {
        await productService.remove(product._id)
        store.dispatch(getCmdRemoveProduct(product._id))
    } catch (err) {
        console.log('Cannot remove Product', err)
        throw err
    }
}

export async function addProduct(product) {
    try {
        const savedProduct = await productService.save(product)
        store.dispatch(getCmdAddProduct(savedProduct))
        return savedProduct
    } catch (err) {
        console.log('Cannot add Product', err)
        throw err
    }
}

export async function updateProduct(product) {
    try {
        const savedProduct = await productService.save(product)
        store.dispatch(getCmdUpdateProduct(savedProduct))
        return savedProduct
    } catch (err) {
        console.log('Cannot add Product', err)
        throw err
    }
}





export async function setCurrProduct(product) {
    try {
        store.dispatch(getCmdSetCurrProduct(product))
    } catch (err) {
        console.log('Cannot load Product', err)
        throw err
    }
}


// Command Creators:
function getCmdSetProducts(products) {
    return {
        type: SET_PRODUCTS,
        products,
    }
}
function getCmdSetAlbums(albums) {
    return {
        type: SET_ALBUMS,
        albums,
    }
}
function getCmdUpdateProducts(products, idx) {
    return {
        type: UPDATE_PRODUCTS,
        products,
    }
}

function getCmdSetProduct(product) {
    return {
        type: SET_PRODUCT,
        product,
    }
}
function getCmdRemoveProduct(productId) {
    return {
        type: REMOVE_PRODUCT,
        productId,
    }
}
function getCmdAddProduct(product) {
    return {
        type: ADD_PRODUCT,
        product,
    }
}
function getCmdUpdateProduct(product) {
    return {
        type: UPDATE_PRODUCT,
        product,
    }
}
function getCmdUpdateSongProduct(song) {
    return {
        type: UPDATE_SONG,
        song,
    }
}
function getCmdSetLikedSongs(likedSongs) {
    return {
        type: UPDATE_LIKED_SONGS,
        likedSongs,
    }
}
function getCmdRemoveSong(songId, product) {
    return {
        type: REMOVE_SONG,
        songId,
        product
    }
}

function getCmdUpdateSongIdx(songs) {
    return {
        type: UPDATE_SONG_IDX,
        songs
    }
}

function getCmdSetSelectedProduct(product) {
    return {
        type: SET_CURR_SELECTED_PRODUCT,
        product,
    }
}

function getCmdsetCurrSelectedSong(song) {
    return {
        type: SET_CURR_SELECTED_SONG,
        song
    }
}

function getCmdSetCurrProduct(product) {
    return {
        type: SET_CURR_PRODUCT,
        product,
    }
}
// function getCmdUpdateLikedSongs(likedSongs) {
//   return {
//     type: UPDATE_LIKED_SONGS,
//     likedSongs,
//   }
// }
